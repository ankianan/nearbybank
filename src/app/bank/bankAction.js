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
    },
    filterNearBy: ({ filterType, filterText }) => {
        return {
            type: "FILTER_NEARBY",
            filterType,
            filterText
        }
    }
}
