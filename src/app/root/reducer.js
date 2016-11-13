let { combineReducers } = window.interfaces.Redux;
import route from "./routeReducer.js";
import bank from "../bank/bankReducer.js";
export default combineReducers({
    title: (state = "", action) => {
        switch (action.type) {
            case "CHANGE_ROUTE":
                return action.title;
            default:
                return state;

        }
    },
    route,
    bank
});
