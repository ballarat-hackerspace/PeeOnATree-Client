var global = {
    id : 'poat',
    map : '',
    geocoder : '',
    default : new google.maps.LatLng(-37.812, 144.961)
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
    zoom: 12,
    center: global.default,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, global.id]
    },
    mapTypeId: global.id
  };

  // Create map and geocoder objects
  global.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  // Style Google Map
  var styledMapOptions = { name: 'Poat' };
  var customMapType = new google.maps.StyledMapType(mapStyles, styledMapOptions);
  global.map.mapTypes.set(global.id, customMapType);
}

$(document).ready(function() { initialize(); });
