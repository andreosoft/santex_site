import { breadcrumbs } from '@/pages/catalog/modules/breadcrumbs';
export async function getDataCatalog({ route, $axios, $config, error }) {
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
  
  let resCat;
  try { if (category_id && res) resCat = await $axios.get($config.baseURL + '/api/site/categories/' + category_id); } catch (e) { console.error(e);  }


  const valueFilters = {
    f: f,
    price: filters.price,
    brand: filters.brand,
    collection: filters.collection
  }


  let activeFiltersOnly = {};
  if (category_id) Object.assign(activeFiltersOnly, { category_id: category_id });
  if (addFilters) Object.assign(activeFiltersOnly, addFilters);



  // Активные фильтры в каталоге
  let resActiveFilters;
  try {
    if (res && ((addFilters && Object.keys(addFilters).length > 0) || (f && Object.keys(f).length > 0))){
      resActiveFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', {
        params: {
          f: f,
          filters: activeFiltersOnly
        }
      });
    } 
  } catch (e) {
    console.error(e)
    return error({ statusCode: 404, message: "Страница не найдена" });
  }

  let activeFilters = resActiveFilters ? resActiveFilters.data.data : {};



  let filtersOnly = {};
  if (category_id) Object.assign(filtersOnly, { category_id: category_id });

  let resFilters;
  try {
    if (res && category_id) resFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', { params: { 
      filters: filtersOnly
     } });
  } catch (e) {
    console.error(e)
    return error({ statusCode: 404, message: "Страница не найдена" });
  }

  let dataFilters = resFilters ? resFilters.data.data : {};

  const title = resCat ? resCat.data.data.name : '';
  pager = res ? res.data.pager : '';

  let searchInput = route.query.q ? route.query.q : ''
  const breadcrumbsData = breadcrumbs(category_id, title, searchInput, resCat);
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
    category_id,
  };
}
