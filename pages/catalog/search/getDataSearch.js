import { breadcrumbs } from "../modules/breadcrumbs";
export async function getDataSearch({ route, $axios, $config, error }) {
    let pager = { page: 0, count: 0, limit: 30 };
    pager.page = route.query.page ?? 0;
    const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
    const f = route.query.f ? JSON.parse(route.query.f) : {};
    const category_id = route.params.id;
    const searchInput = route.query.q ? route.query.q : null;
    let filters = route.query.filters ? JSON.parse(route?.query?.filters) : {};
  
  
    let res;
    if (searchInput) {
      try {
        res = await $axios.get($config.baseURL + '/api/site/catalog/search', {
          params: {
            q: searchInput,
            f: f,
            filters: filters,
            sort: sort,
            pager: pager
          }
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
      collection: filters.collection
    }
  
  
    let activeFiltersOnly = {};
    if (filters) Object.assign(activeFiltersOnly, filters);  
  
    // Активные фильтры в поиске
    let resActiveFilters;
    try {
      if (res && ((filters && Object.keys(filters).length > 0) || (f && Object.keys(f).length > 0))){
        resActiveFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', {
          params: {
            q: searchInput ? searchInput : '',
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
  
  


    let resFilters;
    try {
      if (res) resFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', { params: { 
        q: searchInput ? searchInput : '',
        f: {},
        filters: {}
       } });
    } catch (e) {
      console.error(e)
      return error({ statusCode: 404, message: "Страница не найдена" });
    }
  
    let dataFilters = resFilters ? resFilters.data.data : {};
  
    let resCat;
    const title = resCat ? resCat.data.data.name : '';
    pager = res ? res.data.pager : '';
  
    const breadcrumbsData = breadcrumbs(category_id, title, searchInput, resCat);
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
  