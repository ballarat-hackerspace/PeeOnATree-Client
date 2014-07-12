var poat = angular.module('poat', ['ngRoute']);

// configure our routes
poat.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/overview.html',
        controller:  'OverviewCtrl'
      }).
      when('/stats', {
        templateUrl: 'templates/stats.html',
        controller:  'statsController'
      });

    $httpProvider.defaults.withCredentials = true;
  }]

  // configure html5 to get links working on jsfiddle
  //$locationProvider.html5Mode(true);
);

poat.run(function($rootScope) {
  $rootScope.config = {
    say:  'woot',
    test: 'test',
  }
});

// create the controller and inject Angular's $scope
poat.controller('OverviewCtrl', [ '$scope', '$http', function($scope, $http) {
  console.log("loading");

  $scope.global = {
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
      minZoom: $scope.global.minZoom,
      center: $scope.global.default,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, $scope.global.id]
      },
      mapTypeId: $scope.global.id
    };

    // Create map and geocoder objects
    $scope.global.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    $scope.global.geocoder = new google.maps.Geocoder();

    // Map events
    google.maps.event.addListener($scope.global.map, "idle", $scope.updateMap);

    // Style Google Map
    var styledMapOptions = { name: "POAT" };
    var customMapType = new google.maps.StyledMapType(mapStyles, styledMapOptions);
    $scope.global.map.mapTypes.set($scope.global.id, customMapType);
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
      icon: scaledIcon($scope.global.icons.tree, 29, 32)
    });
    marker.selected = false;
    registerTreeMarkerEvents(marker);
    return marker;
  }

  $scope.registerTreeMarkerEvents = function(marker) {
    // tree events
    google.maps.event.addListener(marker, "mouseover", function () {
      if(this.selected == false)
        this.setIcon(scaledIcon($scope.global.icons.treehover, 29, 32));
    });

    google.maps.event.addListener(marker, "mouseout", function () {
      if(this.selected == false)
        this.setIcon(scaledIcon($scope.global.icons.tree, 29, 32));
    });

    google.maps.event.addListener(marker, "click", function () {
      if(this.selected == false) {
        this.setIcon(scaledIcon($scope.global.icons.treeselected, 29, 32));
        this.selected = true;
        // todo: do something with id (like lookup tree info api)
        console.log(marker.id);
      } else {
        this.selected = false;
        this.setIcon(scaledIcon($scope.global.icons.tree, 29, 32));
      }
    });
  }

  $scope.updateMap = function() {
    var url = $scope.buildUrl();
    $.getJSON(url, function(trees) {
      var markers = [];
      $.each(trees, function(i, tree) {
        var tm = $scope.treeMarker(tree);
        markers.push(tm);
      });
      if($scope.global.clusterer) $scope.global.clusterer.clearMarkers();
      $scope.global.clusterer = new MarkerClusterer($scope.global.map, markers, $scope.global.clusterOpts);
    });
  }

  $scope.buildUrl = function(lnglat, radius) {
    var lnglat = $scope.global.map.getCenter();
    var zoom = $scope.global.map.getZoom();
    var r = $scope.mapRadius(zoom);
    var url = $scope.global.apiurl+"/trees/bylocation/{0},{1},{2}";
    return url.replace("{0}",lnglat.k).replace("{1}",lnglat.B).replace("{2}",r);
  }

  $scope.mapRadius = function(zoom) {
    var radius = 1;
    switch($scope.global.map.getZoom()) {
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
    $scope.global.geocoder.geocode( { "address": address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $scope.global.map.setCenter(results[0].geometry.location);
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
        $scope.global.map.setCenter(latlng);
        $("#follow").removeClass("polling");
      });
    }
  }

  $http({
    method: 'POST',
    url:    'http://54.79.38.93/PeeOnATree-Server/api/user/logon',
    data:   "email=noisymime@gmail.com&password=passw0rd&remember-me=1",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .success(function(data, status) {
    console.log( 'yay' );
    console.log( data );
    console.log( status );
  }).
  error(function(data, status) {
    console.log( 'nay' );
    console.log( data );
    console.log( status );
  });

  $scope.mapInit();

  console.log("loaded");
}]);

poat.controller('aboutController', function($scope) {
  $scope.message = 'Look! I am an about page.';
  console.log( $scope.message );
});

poat.controller('contactController', function($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
  console.log( $scope.message );
});
