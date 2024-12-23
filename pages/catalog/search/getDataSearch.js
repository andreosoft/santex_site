import { breadcrumbs } from "../modules/breadcrumbs";
import { isEqual } from "lodash";
export async function getDataSearch({ route, $axios, $config, error, store }) {
  let pager = { page: 0, count: 0, limit: 30 };
  pager.page = route.query.page ?? 0;
  const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
  const f = route.query.f ? JSON.parse(route.query.f) : {};
  const searchInput = route.query.q ? route.query.q : null;
  let filters = route.query.filters ? JSON.parse(route?.query?.filters) : {};
  const addFilters = route.query.filters ? JSON.parse(route?.query?.filters) : {};

  let res;
  if (searchInput) {
    try {
      res = await $axios.get($config.baseURL + "/api/site/catalog/search", {
        params: {
          q: searchInput,
          f: f,
          filters: filters,
          sort: sort,
          pager: pager,
        },
      });
    } catch (error) {
      console.error(e);
      return error({ statusCode: 404, message: "Страница не найдена" });
    }
  }

  if (searchInput == null && (res?.data?.data?.length == 0 || !res?.data?.data)) {
    return error({ statusCode: 404, message: "Страница не найдена" });
  }

  const data = res ? res.data.data : [];

  const valueFilters = {
    f: f,
    price: filters.price,
    brand: filters.brand,
    collection: filters.collection,
  };

  let activeFiltersOnly = {};
  if (addFilters) Object.assign(activeFiltersOnly, addFilters);

  // Активные фильтры в поиске
  let resActiveFilters, activeFilters;
  try {
    const emptyF = ((addFilters && Object.keys(addFilters).length > 0) || (f && Object.keys(f).length > 0))
    const hasChangeF = !isEqual(store.getters["catalog/getQueryFilters"], { f: f, filters: addFilters });
    if (res && emptyF && hasChangeF) {
      resActiveFilters = await $axios.get($config.baseURL + "/api/site/catalog/filters", {
          params: {
            q: searchInput ? searchInput : "",
            f: f,
            filters: activeFiltersOnly,
          },
        }
      );
      activeFilters = resActiveFilters ? resActiveFilters.data.data : {};
      store.commit("catalog/updateActiveFilters", { ...activeFilters });

      const updateData = {
        f: f,
        filters: addFilters,
      };
      store.commit("catalog/updateQueryFilters", { ...updateData });
    }
  } catch (e) {
    console.error(e);
    return error({ statusCode: 404, message: "Страница не найдена" });
  }

  // Все фильтры
  let resFilters, dataFilters;
  try {
    console.log(searchInput !== store.getters["catalog/getCatId"].id);
    if (res && (Object.keys(store.getters["catalog/getFiltersPages"].filters).length == 0 || searchInput !== store.getters["catalog/getCatId"].id) ) {
      resFilters = await $axios.get(
        $config.baseURL + "/api/site/catalog/filters",
        {
          params: {
            q: searchInput ? searchInput : "",
            f: {},
            filters: {},
          },
        }
      );
      dataFilters = resFilters ? resFilters.data.data : {};
      store.commit("catalog/updateFilters", { ...dataFilters });

      const updateData = {
        id: { id: searchInput },
        type: "search",
      };
      store.commit("catalog/updateCatId", updateData);
    }
  } catch (e) {
    console.error(e);
    return error({ statusCode: 404, message: "Страница не найдена" });
  }

  // if (Object.keys(store.getters['catalog/getCatId']).length == 0 || searchInput !== store.getters['catalog/getCatId'].id) {
  //   const updateData = {
  //     id: {id: searchInput},
  //     type: 'search'
  //   }
  //   store.commit('catalog/updateCatId', updateData);
  // }

  // if (Object.keys(store.getters['catalog/getFiltersPages'].filters).length == 0 || searchInput !== store.getters['catalog/getCatId'].id) {
  //   console.log('GetData update')
  //   store.commit('catalog/updateFilters', { ...dataFilters});
  // }

  pager = res ? res.data.pager : "";

  const breadcrumbsData = breadcrumbs({ searchInput });
  const loading = false;

  return {
    data,
    breadcrumbsData,
    sort,
    pager,
    dataFilters,
    activeFilters,
    filters,
    valueFilters,
    searchInput,
    loading,
  };
}
