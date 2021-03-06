var global = {
  id : "poat",
  map : "",
  geocoder : "",
  apiurl: "http://54.79.38.93/PeeOnATree-Server/api",
  clusterer: null,
  gpsTimer: null,
  gpsRefresh: 10000,
  clusterOpts: {gridSize: 100, maxZoom: 18, styles: [
    { textColor: "white", url: "icons/scluster.png", height: 48, width: 48 },
    { textColor: "white", url: "icons/mcluster.png", height: 48, width: 48 },
    { textColor: "white", url: "icons/lcluster.png", height: 48, width: 48 }
  ]},
  minZoom: 16,
  icons : {
    tree: "icons/tree.png", treehover: "icons/tree-hover.png", treeselected: "icons/tree-selected.png"
  },
  default : new google.maps.LatLng(-37.5652504, 143.8567112)
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
}

poat.controller('OverviewCtrl', function($scope) {
  $scope.mapInit = function() {
    var mapStyles = [
      {"stylers": [{ "invert_lightness": true }]},
      {"featureType": "road", "stylers": [{ "visibility": "simplified" },{ "hue": "#ff9100" }]},
      {"featureType": "water","stylers": [{ "invert_lightness": true }]},
      {"featureType": "transit", "stylers": [{ "visibility": "off" }]},
      {"featureType": "poi", "stylers": [{ "visibility": "off" }]},
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
  };



  $scope.scaledIcon = function(icon, x, y) {
    return new google.maps.MarkerImage(
      icon,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(x, y)
    );
  }

  $scope.treeMarker = function(tree) {
    var mPosition = new google.maps.LatLng(tree.latitude,tree.longitude);
    var marker = new google.maps.Marker({
      position: mPosition,
      id: tree.trid,
      icon: scaledIcon(global.icons.tree, 29, 32)
    });
    marker.selected = false;
    registerTreeMarkerEvents(marker);
    return marker;
  }

  $scope.registerTreeMarkerEvents = function(marker) {
    // tree events
    google.maps.event.addListener(marker, "mouseover", function () {
      if(this.selected == false)
        this.setIcon(scaledIcon(global.icons.treehover, 29, 32));
    });

    google.maps.event.addListener(marker, "mouseout", function () {
      if(this.selected == false)
        this.setIcon(scaledIcon(global.icons.tree, 29, 32));
    });

    google.maps.event.addListener(marker, "click", function () {
      if(this.selected == false) {
        this.setIcon(scaledIcon(global.icons.treeselected, 29, 32));
        this.selected = true;
        // todo: do something with id (like lookup tree info api)
        console.log(marker.id);
      } else {
        this.selected = false;
        this.setIcon(scaledIcon(global.icons.tree, 29, 32));
      }
    });
  }

  $scope.updateMap = function() {
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

  $scope.buildUrl = function(lnglat, radius) {
    var lnglat = global.map.getCenter();
    var zoom = global.map.getZoom();
    var r = mapRadius(zoom);
    var url = global.apiurl+"/trees/bylocation/{0},{1},{2}";
    return url.replace("{0}",lnglat.k).replace("{1}",lnglat.B).replace("{2}",r);
  }

  $scope.mapRadius = function(zoom) {
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

  $scope.search = function() {
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

  $scope.geolocate = function() {
    if(navigator.geolocation) {
      $("#follow").addClass("polling");
      navigator.geolocation.getCurrentPosition(function(position) {
        var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        global.map.setCenter(latlng);
        $("#follow").removeClass("polling");
      });
    }
  }
});
