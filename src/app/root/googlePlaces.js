export var map;
var service;
var infowindow;


function initialize(latitude, longitude, callback, searchType) {
    var pyrmont = new google.maps.LatLng(latitude, longitude);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    var request = {
        location: pyrmont,
        rankBy: google.maps.places.RankBy.DISTANCE,
        types: ['bank','atm ']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

export function main(callback, searchType = "atm") {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            initialize(position.coords.latitude, position.coords.longitude, callback, searchType);
        });
    } else {
        /* geolocation IS NOT available */
    }
}
