export default {
    getDetails: (name) => {
        return {
            type: "GET_DETAIL",
            name
        }
    },
    saveNearBy: (nearby) => {
        return {
            type: "SAVE_NEARBY",
            nearby
        }
    }
}
