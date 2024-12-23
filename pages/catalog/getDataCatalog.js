import { breadcrumbs } from "@/pages/catalog/modules/breadcrumbs";
import { isEqual } from "lodash";
export async function getDataCatalog({ route, $axios, $config, error, store }) {
  let pager = { page: 0, count: 0, limit: 30 };
  pager.page = route.query.page ?? 0;
  const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
  const category_id = route.params.id;
  const f = route.query.f ? JSON.parse(route.query.f) : {};
  const addFilters = route.query.filters ? JSON.parse(route?.query?.filters) : {};
  let filters = route.query.filters ? JSON.parse(route?.query?.filters) : {};

  if (category_id) Object.assign(filters, { category_id: category_id });

  let res;

  try {
    res = await $axios.get($config.baseURL + "/api/site/catalog", {
      params: {
        f: f,
        filters: filters,
        sort: sort,
        pager: pager,
      },
    });
  } catch (e) {
    console.error(e);
    return error({ statusCode: 404, message: "Страница не найдена" });
  }
  // console.log(res?.data?.data?.length);
  if (res?.data?.data?.length == 0 || !res?.data?.data) {
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
  if (category_id) Object.assign(activeFiltersOnly, { category_id: category_id });
  if (addFilters) Object.assign(activeFiltersOnly, addFilters);

  // Активные фильтры в каталоге
  let resActiveFilters, activeFilters;
  try {
    const emptyF = (addFilters && Object.keys(addFilters).length > 0) || (f && Object.keys(f).length > 0);
    const hasChangeF = !isEqual(store.getters["catalog/getQueryFilters"], { f: f, filters: addFilters });
    // console.log(hasChangeF)
    if (res && emptyF && hasChangeF) {
      resActiveFilters = await $axios.get($config.baseURL + "/api/site/catalog/filters",{
          params: {
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

  // if(+category_id !== +store.getters['catalog/getCatId'].id && Object.keys(store.getters['catalog/getFiltersPages'].filters).length > 0){
  //   console.log('Obnulilis`')
  //   // store.commit('catalog/updateActiveFilters', {})
  //   // store.commit('catalog/updateQueryFilters', {f: {}, filters: {}})
  // }

  // Все фильтры каталога
  let filtersOnly = {};
  if (category_id) Object.assign(filtersOnly, { category_id: category_id });

  // console.log(+category_id !== +store.getters['catalog/getCatId'].id)
  // console.log(+category_id)
  // console.log(store.getters['catalog/getCatId'].id)

  let resFilters, resCat, dataFilters;
  try {
    if (res && category_id && (Object.keys(store.getters["catalog/getFiltersPages"].filters).length == 0 || +category_id !== +store.getters["catalog/getCatId"].id)) {
      resFilters = await $axios.get(
        $config.baseURL + "/api/site/catalog/filters",
        {
          params: {
            filters: filtersOnly,
          },
        }
      );
      dataFilters = resFilters ? resFilters.data.data : {};
      store.commit("catalog/updateFilters", { ...dataFilters });

      resCat = (await $axios.get(($config.baseURL + "/api/site/categories/" + category_id))).data.data;

      const updateData = {
        id: resCat,
        type: "catalog",
      };
      store.commit("catalog/updateCatId", updateData);
    }
  } catch (e) {
    console.error(e);
    return error({ statusCode: 404, message: "Страница не найдена" });
  }

  // let dataFilters = resFilters ? resFilters.data.data : {};
  // console.log(dataFilters)
  // if (Object.keys(store.getters['catalog/getFiltersPages'].filters).length == 0 || +category_id !== +store.getters['catalog/getCatId'].id) {
  //   console.log('GetData update')
  //   store.commit('catalog/updateFilters', { ...dataFilters});
  // }

  // try {
  //   if (category_id && res && (Object.keys(store.getters['catalog/getFiltersPages']).length == 0 || +category_id !== +store.getters['catalog/getCatId'].id)){

  //   }
  //  } catch (e) {
  //       console.error(e);
  //   }

  const title = Object.keys(store.getters["catalog/getCatId"]).length > 0 ? store.getters["catalog/getCatId"].name : "";
  pager = res ? res.data.pager : "";

  const breadcrumbsData = breadcrumbs({category_id, title, resCat: store.getters["catalog/getCatId"]});
  const loading = false;

  return {
    title,
    data,
    breadcrumbsData,
    sort,
    pager,
    dataFilters,
    activeFilters,
    filters,
    valueFilters,
    loading,
  };
}
