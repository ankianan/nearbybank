let { VirtualDom, Virtual } = window.interfaces;
import NearByBankList from "./root/NearByBankList.js";
import {main,map} from "./root/googlePlaces.js";

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            /*console.log(place);
            createMarker(results[i]);*/
        }
        VirtualDom.render(<NearByBankList places={results} />, document.getElementById("root"));
    }
}

window.initMap = function(){main(callback);};
