import { isEqual } from 'lodash';
export async function getDataPromote({ route, $axios, $config, error, store }) {
    let pagerPromote = { page: 0, count: 0, limit: 0 };
    pagerPromote.page = route.query.page ?? 0;
    const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
    const category_id = route.params.id;
    const f = route.query.f ? JSON.parse(route.query.f) : {};
    const addFilters = route.query.filters ? JSON.parse(route?.query?.filters) : {};
    // let filters = route.query.filters ? JSON.parse(route?.query?.filters) : {};

    // if (category_id) Object.assign(filters, { "ic.promote_id": category_id });

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
    const dataPromote = resPromote ? resPromote.data.data : '';


    // Все фильтры

    let resFiltersPromote, dataFiltersPromote, infoPromote, carouselItems;
    try{
      if(resPromote && category_id > 0 && (Object.keys(store.getters['catalog/getFiltersPages'].filters).length == 0 || +category_id !== +store.getters['catalog/getCatId'].id) || store.getters['catalog/getFiltersPages'].type !== 'promote'){
        resFiltersPromote = await $axios.get($config.baseURL + '/api/site/promote_catalog/filters', { params: { filters: {"status": 1, "ic.promote_id": category_id} } });
        dataFiltersPromote = resFiltersPromote ? resFiltersPromote.data.data : '';
        // console.log(dataFiltersPromote);
        store.commit('catalog/updateFilters', { ...dataFiltersPromote});

        infoPromote = (await $axios.get($config.baseURL + '/api/site/promote/', { params: { filters: { "id": category_id } } })).data.data;
        const updateData = {
          id: infoPromote[0],
          type: 'promote'
        }
        store.commit('catalog/updateCatId', updateData);
        console.log(store.getters['catalog/getCatId']);
        carouselItems = Object.keys(store.getters['catalog/getCatId'])?.length > 0 && store.getters['catalog/getCatId'].images ? store.getters['catalog/getCatId'].images.slice(1, 1) : [];
      }
    } catch (e) {
      console.error(e)
      return error({ statusCode: 404, message: "Страница не найдена" });
    }

    if ((resPromote?.data?.data?.length == 0 || !resPromote?.data?.data) || Object.keys(store.getters['catalog/getCatId'])?.length == 0) {
      return error({ statusCode: 404, message: "Страница не найдена" });
    }

    let activeFiltersOnly = { "status": 1, "ic.promote_id": category_id };
    if (addFilters) Object.assign(activeFiltersOnly, addFilters);
    // console.log(addFilters);



    // Активные фильтры в промо
    let resActiveFilters, activeFilters;
    try {
      const emptyF = ((addFilters && Object.keys(addFilters).length > 0) || (f && Object.keys(f).length > 0))
      const hasChangeF = !isEqual(store.getters['catalog/getQueryFilters'], {f: f, filters: addFilters});
      if (resPromote && emptyF && hasChangeF){
        resActiveFilters = await $axios.get($config.baseURL + '/api/site/promote_catalog/filters', {
          params: {
            f: f,
            filters: activeFiltersOnly
          }
        });
        activeFilters = resActiveFilters ? resActiveFilters.data.data : {};
        store.commit('catalog/updateActiveFilters', { ...activeFilters});

        const updateData = {
          f: f,
          filters: addFilters
        }
        store.commit('catalog/updateQueryFilters', { ...updateData});
      }
    } catch (e) {
      console.error(e)
      return error({ statusCode: 404, message: "Страница не найдена" });
    }



    const valueFiltersPromote = {
      f: f,
      price: filtersPromote.price,
      brand: filtersPromote.brand,
      category_id: filtersPromote.category_id,
      collection: filtersPromote.collection
    }

    pagerPromote = resPromote ? resPromote.data.pager : '';

    let breadcrumbsDataPromote;
    if (Object.keys(store.getters['catalog/getCatId'])?.length > 0) breadcrumbsDataPromote = [{
      url: `/promote/${category_id}`,
      title: store.getters['catalog/getCatId'].name,
    }]
    const loading = false;


    return {
      sort,
      activeFilters,
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
