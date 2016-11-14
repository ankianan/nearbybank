let { Virtual } = window.interfaces;
import * as routeStatic from "../root/routeStatic";
class BankDetail extends Virtual.Component {
    constructor() {
        super(...arguments);
    }
    render() {
        return <div className="w3-card-4">
            <header className="w3-container w3-light-grey">
                <h3>{this.props.name}</h3>
            </header>
            <div className="w3-container">
                <p>Trends</p>
                <table className="w3-table w3-teal">
                    <tbody>
                        <tr>
                            <th>Timing</th>
                            <th className="w3-hide-small">Duration</th>
                            <th>Active bankers</th>
                        </tr>
                        <tr>
                            <td>Morning</td>
                            <td className="w3-hide-small">08 am to 12 pm</td>
                            <td>{this.props.detail.morning}</td>
                        </tr>
                        <tr>
                            <td>Afternoon</td>
                            <td className="w3-hide-small">12 pm to 04 pm</td>
                            <td>{this.props.detail.afternoon}</td>
                        </tr>
                        <tr>
                            <td>Evening</td>
                            <td className="w3-hide-small">04 pm to 08 pm</td>
                            <td>{this.props.detail.evening}</td>
                        </tr>
                        <tr>
                            <td>Late Evening</td>
                            <td className="w3-hide-small">After 08pm</td>
                            <td>{this.props.detail.lateEvening}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
            </div>            
        </div>
    }
}
export default BankDetail;
