let { Virtual, page } = window.interfaces;
let { createStore, bindActionCreators, applyMiddleware } = window.interfaces.Redux
import logger from "../../jass/redux/middleware/logger.js";
import reducer from "./reducer.js";

import routeAction from "./routeAction.js";
import routeConfig from "./routeConfig.js";
import * as routesStatic from "./routeStatic.js";

import bankAction from "../bank/bankAction.js";
import NearByBankList from "../bank/NearByBankList.js";
import BankDetail from "../bank/BankDetail.js";
class RootComponent extends Virtual.Component {
    constructor() {
        super(...arguments);
        this.state = {}
        this.store = createStore(reducer, this.state, applyMiddleware(logger));
        this.boundedBankAction = bindActionCreators(bankAction, this.store.dispatch);

        let boundedRouteAction = bindActionCreators(routeAction, this.store.dispatch);
        routeConfig(boundedRouteAction);

        this.store.subscribe(() => {
            this.setState(this.store.getState());
        });

        page("/");
    }
    render() {
        let page = "";
        if (this.state.route) {
            if (this.state.route.current == routesStatic.BANK_NEARBY) {
                page = <NearByBankList bank={this.state.bank} {...this.boundedBankAction} />
            }
            if (this.state.route.current.indexOf(routesStatic.BANK_DETAIL) != -1) {
                page = <BankDetail name={this.state.bank.name} detail={this.state.bank.detail} {...this.boundedBankAction} />
            }
        }
        return <div>
                    <div className="w3-container w3-teal">
                        <h1>{this.state.title}</h1>
                    </div>
                    {page}
                </div>
    }

}
export default RootComponent;
