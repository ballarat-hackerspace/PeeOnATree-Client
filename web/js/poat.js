var global = {
    id : 'poat',
    map : '',
    geocoder : '',
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

function scaledIcon(icon, x, y) {
  return new google.maps.MarkerImage(
    icon,
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(x, y)
  );
}

function events() {
  var url = "http://www.eventsvictoria.com/distributionservice/rss.xml"
  $.get(url, function(data) {
  var treeIcon =

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
        icon: scaledIcon(global.icons.tree, 29, 32)
      })

      // set all markers not selected
      marker.selected = false;

      // tree events
      google.maps.event.addListener(marker, 'mouseover', function () {
        if(marker.selected == false)
          this.setIcon(scaledIcon(global.icons.treehover, 29, 32));
      });

      google.maps.event.addListener(marker, 'mouseout', function () {
        if(marker.selected == false)
          this.setIcon(scaledIcon(global.icons.tree, 29, 32));
      });

      google.maps.event.addListener(marker, 'click', function () {
        if(marker.selected == false) {
          this.setIcon(scaledIcon(global.icons.treeselected, 29, 32));
          marker.selected = true;
        } else {
          marker.selected = false;
          this.setIcon(scaledIcon(global.icons.tree, 29, 32));
        }
      });

      // Add to map
      marker.setMap(global.map);

    });
  });
}

$(document).ready(function() {
  events();
  initialize();
});
