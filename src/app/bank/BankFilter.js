let { Virtual } = window.interfaces;
import BankTuple from "./BankTuple";
import { main, map } from "./googlePlaces.js";

class BankFilter extends Virtual.Component {
    constructor() {

        super(...arguments);
        this.state = {
            filterText: "",
            filterType: ""
        }
    }
    shouldComponenetUpdate(nextProps, nexState) {
        return nexState != this.state;
    }
    setFilterText(event) {
        let newState = {...this.state, filterText: event.target.value };
        this.setState(newState);

        this.props.filterNearBy(newState);
    }
    setFilterType(filterType) {
        let newState = {...this.state, filterType };
        this.setState(newState);

        this.props.filterNearBy(newState);
    }
    render() {
        return <input className="w3-input" type="text" placeholder="Search your banks or atm" value={this.state.filterText} onChange={this.setFilterText.bind(this)} />

    }
}
export default BankFilter;

