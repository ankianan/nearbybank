export default (state = {
    name: "",
    detail: {},
    nearby: []
}, action) => {
    switch (action.type) {
        case "GET_DETAIL":
            return {...state, name: action.name, detail: { "morning": 50, "afternoon": 80, "evening": 40, "lateEvening": 10 } };
        case "SAVE_NEARBY":
            return {...state, nearby: action.nearby };
        default:
            return state;
    }
}
