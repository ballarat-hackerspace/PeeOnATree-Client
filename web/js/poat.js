var global = {
  id : "poat",
  map : "",
  geocoder : "",
  apiurl: "http://54.79.38.93/PeeOnATree-Server/api",
  clusterer: null,
  dog: null,
  gpsTimer: null,
  gpsRefresh: 10000,
  clusterOpts: {gridSize: 100, maxZoom: 18, styles: [
    { textColor: "white", url: "icons/scluster.png", height: 32, width: 32 },
    { textColor: "white", url: "icons/mcluster.png", height: 48, width: 48 },
    { textColor: "white", url: "icons/lcluster.png", height: 64, width: 64 }
  ]},
  minZoom: 16,
  icons : {
    dog: "icons/dog.png",
    tree: "icons/tree.png",
    treehover: "icons/tree-hover.png",
    treeselected: "icons/tree-selected.png",
    treemarked: "icons/tree-marked.png"
  },
  default : new google.maps.LatLng(-37.56483209284608,143.8572060675633)
};

function initialize() {
    mapInit();
    searchInit();
    followInit();
}

function searchInit() {
  $("#search").keypress(function(e) {
    if(e.which == 13) search();
  });
}

function followInit() {
  $("#follow").attr("title","Location from GPS");
  $("#follow").click(function() {
    if($(this).hasClass("active")) {
      if(global.gpsTimer) clearInterval(global.gpsTimer);
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
      console.log("pssst... follow me")
      geolocate();
      global.gpsTimer = setInterval(geolocate, global.gpsRefresh);
    }
  });
  dogMarker();
}

function mapInit() {
  var mapStyles = [
    {"stylers": [{ "hue": "#00ff4d" }]},
    {"featureType": "road", "stylers": [{ "visibility": "simplified" }]},
    {"featureType": "water","stylers": [{ "invert_lightness": true }]},
    {"featureType": "transit", "stylers": [{ "visibility": "off" }]},
    {"featureType": "water", "elementType": "labels.text.fill"}
  ];

  var mapOptions = {
    zoom: 20,
    minZoom: global.minZoom,
    center: global.default,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, global.id]
    },
    mapTypeId: global.id
  };

  // Create map and geocoder objects
  global.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  global.geocoder = new google.maps.Geocoder();

  // Map events
  google.maps.event.addListener(global.map, "idle", updateMap);

  // Style Google Map
  var styledMapOptions = { name: "POAT" };
  var customMapType = new google.maps.StyledMapType(mapStyles, styledMapOptions);
  global.map.mapTypes.set(global.id, customMapType);
}

function scaledIcon(icon, x, y) {
  return new google.maps.MarkerImage(
    icon,
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(x, y)
  );
}

function treeMarker(tree) {
  var mPosition = new google.maps.LatLng(tree.latitude,tree.longitude);
  var marker = new google.maps.Marker({
    position: mPosition,
    id: tree.trid,
    marked: tree.datetime,
    tree: tree,
    icon: treeState(tree)
  });
  marker.selected = false;
  registerTreeMarkerEvents(marker, tree);
  return marker;
}

function treeState(tree) {
  var icon = global.icons.tree;
  if(tree.datetime) icon = global.icons.treemarked;
  return scaledIcon(icon, 29, 32);
}

function registerTreeMarkerEvents(marker, tree) {
  // tree events
  google.maps.event.addListener(marker, "mouseover", function () {
    if(this.selected == false)
      this.setIcon(scaledIcon(global.icons.treehover, 29, 32));
  });

  google.maps.event.addListener(marker, "mouseout", function () {
    if(this.selected == false)
      this.setIcon(treeState(tree));
  });

  google.maps.event.addListener(marker, "click", function () {
    if(this.selected == false) {
      this.setIcon(scaledIcon(global.icons.treeselected, 29, 32));
      this.selected = true;
      window.location.href = './tree.html?' + marker.id;
    } else {
      this.selected = false;
      this.setIcon(treeState(tree));
    }
  });
}

function updateMap() {
  var url = buildUrl();
  $.getJSON(url, function(trees) {
    var markers = [];
    $.each(trees, function(i, tree) {
      var tm = treeMarker(tree);
      markers.push(tm);
    });
    if(global.clusterer) global.clusterer.clearMarkers();
    global.clusterer = new MarkerClusterer(global.map, markers, global.clusterOpts);
  });
}

function dogMarker() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updatePosition, noLocation);
  } else {
    noLocation();
  }
}

function noLocation() {
  updateDog(global.map.getCenter());
  $("#follow").removeClass("polling");
}

function updatePosition(position) {
  var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  global.map.setCenter(latlng);
  updateDog(latlng);
  $("#follow").removeClass("polling");
}

function updateDog(latlng) {
if(global.dog) {
  global.dog.setPosition(latlng);
} else {
  var dog = new google.maps.MarkerImage(
    global.icons.dog,
    null, /* size is determined at runtime */
    new google.maps.Point(0,0),
    new google.maps.Point(16, 16),
    new google.maps.Size(32, 32)
  );
  var marker = new google.maps.Marker({
    position: latlng,
    id: "dog",
    icon: dog
  });
  marker.setMap(global.map);
  global.dog = marker;
}}

function buildUrl(lnglat, radius) {
  var lnglat = global.map.getCenter();
  var zoom = global.map.getZoom();
  var r = mapRadius(zoom);
  var url = global.apiurl+"/trees/bylocation/{0},{1},{2}";
  return url.replace("{0}",lnglat.k).replace("{1}",lnglat.B).replace("{2}",r);
}

function mapRadius(zoom) {
  var radius = 1;
  switch(global.map.getZoom()) {
    case 17:
      radius = .5
      break;
    case 18:
      radius = .25
      break;
    case 19:
      radius = .125
      break;
    case 20:
      radius = .0625
      break;
  }
  return radius;
}

function search() {
  var address = $("#search").val();
  global.geocoder.geocode( { "address": address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      global.map.setCenter(results[0].geometry.location);
      console.log("Location found: " + results[0].formatted_address);
    } else if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
      console.log("Sorry hit Google's API query limit. Try again another day");
    } else if(status == google.maps.GeocoderStatus.ZERO_RESULTS) {
      console.log("Sorry no results found for that location");
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });
}

function geolocate() {
  if(navigator.geolocation) {
    $("#follow").addClass("polling");
    navigator.geolocation.getCurrentPosition(updatePosition, noLocation);
  }
}


function mark_tree(){
  var url = global.apiurl + "/tree/{0}/mark"
  url = url.replace("{0}",tree)
  $.getJSON(url, function(data) {});
  alert("Tree marked!");
}


$(document).ready(function() {
  initialize();
});
