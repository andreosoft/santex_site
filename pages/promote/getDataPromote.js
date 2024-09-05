export async function getDataPromote({ route, $axios, $config, error }) {
    let pagerPromote = { page: 0, count: 0, limit: 0 };
    pagerPromote.page = route.query.page ?? 0;
    const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
    const category_id = route.params.id;
    const f = route.query.f ? JSON.parse(route.query.f) : {};
    let filters = route.query.filters ? JSON.parse(route?.query?.filters) : {};
  
    if (category_id) Object.assign(filters, { "ic.promote_id": category_id });
  
  
    let carouselItems = [];
    let infoPromote;
    try {
      if (category_id > 0) infoPromote = (await $axios.get($config.baseURL + '/api/site/promote/',
        { params: { filters: { "id": category_id } } })).data.data;

      carouselItems = infoPromote?.length > 0 && infoPromote[0].images ? infoPromote[0].images.splice(1, 1) : [];
      
    } catch (error) {
      console.error(error);
      return error({ statusCode: 404, message: "Страница не найдена" });
    }
  
    let filtersPromote = { "status": 1, "ic.promote_id": category_id };
    Object.assign(filtersPromote, route.query.filters ? JSON.parse(route.query.filters) : {});
  
    let resPromote;
    try {
      if (category_id > 0) {
        resPromote = await $axios.get($config.baseURL + '/api/site/promote_catalog', {
          params: {
            f: f,
            filters: filtersPromote,
            sort: sort,
            pager: pagerPromote
          }
        });
      }
    } catch (e) {
      console.error(e);
      return error({ statusCode: 404, message: "Страница не найдена" });
    }
    if ((resPromote?.data?.data?.length == 0 || !resPromote?.data?.data) || infoPromote?.length == 0) {
      return error({ statusCode: 404, message: "Страница не найдена" });
    }
    const dataPromote = resPromote ? resPromote.data.data : '';

    let filtersPromoteOnly = { "status": 1, "ic.promote_id": category_id };
  
    const resFiltersPromote = resPromote ? await $axios.get($config.baseURL + '/api/site/promote_catalog/filters', { params: { filters: filtersPromoteOnly } }) : '';
    const dataFiltersPromote = resFiltersPromote ? resFiltersPromote.data.data : '';
  
  
  
    let activeFiltersOnly = { "status": 1, "ic.promote_id": category_id };
    if (filters) Object.assign(activeFiltersOnly, filters);
  
    // Активные фильтры в каталоге
    let resActiveFilters;
    try {
      if (resPromote && ((filters && Object.keys(filters).length > 0) || (f && Object.keys(f).length > 0))){
        resActiveFilters = await $axios.get($config.baseURL + '/api/site/promote_catalog/filters', {
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
  
  
    const valueFiltersPromote = {
      f: f,
      price: filtersPromote.price,
      brand: filtersPromote.brand,
      category_id: filtersPromote.category_id,
      collection: filtersPromote.collection
    }
  
    pagerPromote = resPromote ? resPromote.data.pager : '';

    let breadcrumbsDataPromote;
    if (infoPromote?.length > 0) breadcrumbsDataPromote = [{
      url: `/promote/${category_id}`,
      title: infoPromote[0].name,
    }]
    const loading = false;
  
  // console.log(activeFilters);
  
    return {
      sort,
      activeFilters,
      filters,
      loading,
      dataPromote,
      valueFiltersPromote,
      dataFiltersPromote,
      pagerPromote,
      carouselItems,
      category_id,
      infoPromote,
      breadcrumbsDataPromote
    };
  }
  