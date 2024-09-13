export const state = ()=>({
    filtersPages: {
        id: '',
        type: '',
        filters: {},
    },
})

export const getters = {
    getFiltersPages(state) {
        return state.filtersPages
    }
}

export const mutations = {
    updateFilters(state, value){
        state.filtersPages.id = value.id
        state.filtersPages.type = value.type
        state.filtersPages.filters = value.filters
    }
}

export const actions = {
   
}