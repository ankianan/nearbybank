import * as routeStatic from "./routeStatic.js";
export default {
    bankNearBy: () => {
        return {
            type: "CHANGE_ROUTE",
            route: routeStatic.BANK_NEARBY,
            title : "Nearby Banks"
        }
    },
    bankDetail: (name) => {
        return {
            type: "CHANGE_ROUTE",
            route: `${routeStatic.BANK_DETAIL}${name}`,
            title : "Bank Status"
        }
    }
}
