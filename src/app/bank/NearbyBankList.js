let { Virtual } = window.interfaces;
import BankTuple from "./BankTuple";
import BankFilter from "./BankFilter";
import { main, map } from "./googlePlaces.js";

class NearByBankList extends Virtual.Component {
    constructor() {

        super(...arguments);

        let offset = 3;
        let numberOfTupleToBeShown = 3;

        this.state = {
            offset,
            numberOfTupleToBeShown
        };

        if (!this.props.bank.filtered.length) {
            main(this.callback.bind(this));
        }


    }

    /*function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }*/

    callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            this.props.saveNearBy(results);
        }
    }
    showMore() {
        let { offset, numberOfTupleToBeShown } = this.state;
        let total = this.props.bank.filtered.length;

        let remaining = total - numberOfTupleToBeShown;

        if (remaining > offset) {
            numberOfTupleToBeShown += offset;
        } else {
            numberOfTupleToBeShown += remaining;
        }

        this.setState({
            numberOfTupleToBeShown
        });
    }
    render() {

        let banksNearby = this.props.bank.filtered.map((id) => {
                return this.props.bank.places[id];
            })
            .slice(0, this.state.numberOfTupleToBeShown)
            .map((value, index) => {

                return <BankTuple key={index} name={value.name} vicinity={value.vicinity} getDetails={this.props.getDetails} />

            });

        let showMore = (this.props.bank.filtered.length > this.state.numberOfTupleToBeShown) ? <button className="w3-btn-block w3-teal" onClick={this.showMore.bind(this)} >Show More</button> : "";



        return <div>
                    <BankFilter filterNearBy={this.props.filterNearBy} />
                    <ul className="w3-ul">
                      {banksNearby}
                    </ul>
                    {showMore}
                </div>;
    }
}
export default NearByBankList;
