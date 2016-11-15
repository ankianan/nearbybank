export default (state = {
    name: "",
    detail: {},
    nearby: [],
    places: {},
    filtered: []

}, action) => {
    switch (action.type) {
        case "GET_DETAIL":
            return {...state, name: action.name, detail: { "morning": 50, "afternoon": 80, "evening": 40, "lateEvening": 10 } };
        case "SAVE_NEARBY":
            let nearby = [];
            let places = {};
            action.nearby.map((data) => {
                nearby.push(data.id);
                places[data.id] = data;
            });
            return {...state, nearby, places, filtered: nearby };
        case "FILTER_NEARBY":
            return {...state,
                filtered: state.nearby.filter(function(id) {
                    let branchName = state.places[id].name.toLowerCase();
                    let { filterType, filterText } = action;

                    if (branchName.indexOf(filterText.toLowerCase()) != -1) {
                        return true;
                    }
                    return false;
                })
            }
        default:
            return state;
    }
}
