var global = {
    id : 'poat',
    map : '',
    geocoder : '',
    default : new google.maps.LatLng(-37.812, 144.961)
};

function initialize() {

  var mapStyles = [
      {
          featureType:"all",
          elementType:"all",
          stylers:
          [
              {visibility:"on"},
              {hue:"#0091ff"},
              {invert_lightness:true}
          ]
      },
      {
          featureType:"water",
          elementType:"all",
          stylers:
          [
              {visibility:"on"},
              {hue:"#005eff"},
              {invert_lightness:true}
          ]
      },
      {
          featureType:"poi",
          stylers:
          [
              {visibility:"off"}
          ]
      },
      {
          featureType:"transit",
          elementType:"all",
          stylers:
          [
              {visibility:"off"}
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
