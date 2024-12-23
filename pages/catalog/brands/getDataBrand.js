import { breadcrumbs } from '@/pages/catalog/modules/breadcrumbs';
import { isEqual } from "lodash";
export async function getDataBrand({ route, $axios, $config, error, store }) {
  let pager = { page: 0, count: 0, limit: 30 };
  pager.page = route.query.page ?? 0;
  const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
  const category_id = route.params.id;
  const f = route.query.f ? JSON.parse(route.query.f) : {};
  const addFilters = route.query.filters ? JSON.parse(route?.query?.filters) : {};
  let filters = route.query.filters ? JSON.parse(route?.query?.filters) : {};
  console.log(filters)
//   if (category_id) Object.assign(filters, { category_id: category_id });


  let res;
    try {
      res = await $axios.get($config.baseURL + '/api/site/catalog', {
        params: {
          f: f,
          filters: filters,
          sort: sort,
          pager: pager
        }
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
    category_id: filters.category_id,
    collection: filters.collection
  }


  let activeFiltersOnly = {};
  if (addFilters) Object.assign(activeFiltersOnly, addFilters);

  // console.log(activeFiltersOnly)
  // Активные фильтры в каталоге
  let resActiveFilters, activeFilters, hasOtherKey;
  try {


    for (const key in activeFiltersOnly) {
      if (key !== 'brand' && activeFiltersOnly[key].length > 0) {
        hasOtherKey = true;
        break;
      } else {
        hasOtherKey = false
      }
    }

    const emptyF = (hasOtherKey || (f && Object.keys(f).length > 0));
    const hasChangeF = !isEqual(store.getters["catalog/getQueryFilters"], { f: f, filters: addFilters });

    if (res && emptyF && hasChangeF) {
      resActiveFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', {
        params: {
          f: f,
          filters: activeFiltersOnly
        }
      });
      activeFilters = resActiveFilters ? resActiveFilters.data.data : {};
      store.commit("catalog/updateActiveFilters", { ...activeFilters });
    } 

    const updateData = {
      f: f,
      filters: addFilters,
    };
    store.commit("catalog/updateQueryFilters", { ...updateData });
  } catch (e) {
    console.error(e)
    return error({ statusCode: 404, message: "Страница не найдена" });
  }

  // Все фильтры 

  let resFilters, dataFilters;
  try {
    if (res && (Object.keys(store.getters["catalog/getFiltersPages"].filters).length == 0 || filters?.brand[0] !== store.getters["catalog/getCatId"].id) ) {
      resFilters = await $axios.get($config.baseURL + "/api/site/catalog/filters",
        {
          params: {
            filters: {"brand": filters?.brand}
          },
        }
      );
      dataFilters = resFilters ? resFilters.data.data : {};
      store.commit("catalog/updateFilters", { ...dataFilters });
      

      const updateData = {
        id: { id: filters?.brand[0] },
        type: "brands"
      };
      store.commit("catalog/updateCatId", updateData);
    }
  } catch (e) {
    console.error(e);
    return error({ statusCode: 404, message: "Страница не найдена" });
  }
  
  pager = res ? res.data.pager : '';

  const breadcrumbsData = breadcrumbs({category_id, resCat: store.getters["catalog/getCatId"]});
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
    loading,
    category_id,
  };
}
