export const state = ()=>({
    filtersPages: {},
})

export const getters = {
    getFiltersPages(state) {
        return state.filtersPages
    }
}

export const mutations = {
    updateFilters(state, value){
        state.filtersPages = value
    }
}

export const actions = {
   
}