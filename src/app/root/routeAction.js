export default {
    bankNearBy: () => {
        return {
            type: "CHANGE_ROUTE",
            route: "/bank/nearby",
            title : "Nearby Banks"
        }
    },
    bankDetail: (name) => {
        return {
            type: "CHANGE_ROUTE",
            route: `/bank/detail/${name}`,
            title : "Bank Status"
        }
    }
}
