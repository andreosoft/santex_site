export const state = () => ({
  filtersPages: {
    filters: {
      id: {},
      type: "",
      filters: {},
      activeFiltersData: {},
      queryFilters: {
        f: {},
        filters: {},
      },
    },
  },
});

export const getters = {
  getFiltersPages(state) {
    return state.filtersPages.filters;
  },
  getCatId(state) {
    return state.filtersPages.filters.id;
  },
  getActiveFilters(state) {
    return state.filtersPages.filters.activeFiltersData;
  },
  getQueryFilters(state) {
    return state.filtersPages.filters.queryFilters;
  },
};

export const mutations = {
  clearFilters(state) {
    state.filtersPages = {
      filters: {
        id: {},
        type: "",
        filters: {},
        activeFiltersData: {},
        queryFilters: {
          f: {},
          filters: {},
        },
      },
    };
  },
  updateFilters(state, value) {
    state.filtersPages.filters.filters = { ...value };
  },
  updateActiveFilters(state, value) {
    state.filtersPages.filters.activeFiltersData = { ...value };
  },
  updateQueryFilters(state, value) {
    state.filtersPages.filters.queryFilters = { ...value };
  },
  updateCatId(state, value) {
    state.filtersPages.filters["id"] = value.id;
    state.filtersPages.filters["type"] = value.type;
  },
  updateFiltersProperty(state, { key1, key2, key3, value }) {
    if (key3 == 'all') {
      state.filtersPages.filters.filters[key1].find((item) => item.filters_id == key2).filters_data.forEach(el => el.disabled = value);
    } else if(key3 || key3 == 0) {
      state.filtersPages.filters.filters[key1].find((item) => item.filters_id == key2).filters_data[key3].disabled = value;
    } else {
      switch (key1) {
        case "brands": {
          if (key2) {
            state.filtersPages.filters.filters[key1].find((item) => item.brand == key2).disabled = value;
          }
          break;
        }
        case "collections": {
          if (key2) {
            state.filtersPages.filters.filters[key1].find((item) => item.collection == key2)["disabled"] = value;
          }
          break;
        }
      }
    }
  },
};

export const actions = {
  // fetchData({commit}, filters){ {
  //     try {
  //       console.log(filters);
  //       commit('updateFilters', filters);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }
};
