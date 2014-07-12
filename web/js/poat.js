var global = {
  id : 'poat',
  map : '',
  geocoder : '',
  clusterer: null,
  clusterOpts: {gridSize: 100, maxZoom: 18},
  minZoom: 16,
  icons : {tree: "icons/tree.png", treehover: "icons/tree-hover.png", treeselected: "icons/tree-selected.png"},
  default : new google.maps.LatLng(-37.5652504, 143.8567112)
};

function initialize() {

  var mapStyles = [
    {
      "stylers": [
        { "visibility": "on" },
        { "invert_lightness": true }
      ]
    },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road",
      "stylers": [
        { "visibility": "simplified" },
        { "hue": "#ff9100" }
      ]
    },{
      "featureType": "transit",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        { "invert_lightness": true },
        { "visibility": "on" }
      ]
    },{
      "featureType": "water",
      "stylers": [
        { "invert_lightness": true }
      ]
    }
  ];

  var mapOptions = {
    zoom: global.minZoom,
    minZoom: global.minZoom,
    center: global.default,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, global.id]
    },
    mapTypeId: global.id
  };

  // Create map and geocoder objects
  global.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  // Map events
  google.maps.event.addListener(global.map, "idle", updateMap);

  // Style Google Map
  var styledMapOptions = { name: 'Poat' };
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
    title: tree.trid,
    icon: scaledIcon(global.icons.tree, 29, 32)
  })

  // set all markers not selected
  marker.selected = false;

  // tree event handlers
  registerTreeMarkerEvents(marker);

  return marker;
}

function registerTreeMarkerEvents(marker) {
  // tree events
  google.maps.event.addListener(marker, 'mouseover', function () {
    if(this.selected == false)
      this.setIcon(scaledIcon(global.icons.treehover, 29, 32));
  });

  google.maps.event.addListener(marker, 'mouseout', function () {
    if(this.selected == false)
      this.setIcon(scaledIcon(global.icons.tree, 29, 32));
  });

  google.maps.event.addListener(marker, 'click', function () {
    if(this.selected == false) {
      this.setIcon(scaledIcon(global.icons.treeselected, 29, 32));
      this.selected = true;
    } else {
      this.selected = false;
      this.setIcon(scaledIcon(global.icons.tree, 29, 32));
    }
  });
}

function updateMap() {
  if(global.clusterer) global.clusterer.clearMarkers();
  var url = buildUrl();
  console.log(url);
  $.getJSON(url, function(trees) {
    var markers = [];
    $.each(trees, function(i, tree) {
      var tm = treeMarker(tree);
      markers.push(tm);
    });
    global.clusterer = new MarkerClusterer(global.map, markers, global.clusterOpts);
  });
}

function buildUrl(lnglat, radius) {
  var lnglat = global.map.getCenter();
  var zoom = global.map.getZoom();
  var r = mapRadius(zoom);
  var url = "http://54.79.38.93/PeeOnATree-Server/api/trees/bylocation/{0},{1},{2}";
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

$(document).ready(function() {
  initialize();
});
