export default (state = { previous: "", current: "" }, action) => {
    switch (action.type) {
        case "CHANGE_ROUTE":
            return {...state, previous: state.current, current: action.route }
        default:
            return state;
    }
}
