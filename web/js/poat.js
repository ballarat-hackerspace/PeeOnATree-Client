var global = {
    id : 'poat',
    map : '',
    geocoder : '',
    icons : {tree: "icons/trees.png"},
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

function events() {
  var url = "http://www.eventsvictoria.com/distributionservice/rss.xml"
  $.get(url, function(data) {
    $xml = $(data);
    $xml.find("item").each(function(i, itm) {
      var mTitle = $(itm).find('title').text();
      var address = $(itm).find('venue').find("address");
      var lng = $(itm).find('longitude').text();
      var lat = $(itm).find('latitude').text();
      var mPosition = new google.maps.LatLng(lat,lng);
      var marker = new google.maps.Marker({
        position: mPosition,
        title: mTitle,
        icon: global.icons.tree
      }).setMap(global.map);
    });
  });
}

$(document).ready(function() {
  events();
  initialize();
});
