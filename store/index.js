export const state = () => ({
    categories: []
})

export const getters = {
    getCategories(state) {
        return state.categories
    },
}

export const mutations = {
}

export const actions = {
    async nuxtServerInit({ state, getters }, { }) {
        const res = await this.$axios.get(this.$config.baseURL + '/api/site/categories/top-menu-list');
        state.categories = res.data.data;
        getters.cartData;
    },
}