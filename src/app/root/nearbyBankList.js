let { Virtual } = window.interfaces;
import BankTuple from "./BankTuple";

class NearByBankList extends Virtual.Component {
    constructor() {

        super(...arguments);

        let offset = 3;
        let total = this.props.places.length;
        let seen = Math.min(offset, total);

        this.state = {
            offset,
            total,
            seen
        };

    }
    showMore() {
        let { total, offset, seen } = this.state;

        let remaining = total - seen;

        if (remaining > offset) {
            seen += offset;
        } else {
            seen += remaining;
        }

        this.setState({
            seen
        });
    }
    render() {



        let places = this.props.places
            .slice(0, this.state.seen)
            .map((value, index) => {

                return <BankTuple key={index} name={value.name} vicinity={value.vicinity} />

            });

        let showMore = (this.state.total > this.state.seen) ? <button onClick={this.showMore.bind(this)} >Show More</button> : "";



        return <div>
                    <ul className="w3-ul">
                      {places}
                    </ul>
                    {showMore}
                </div>;
    }
}
export default NearByBankList;
