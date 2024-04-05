export async function getData({ route, $axios, $config, error }) {
  let pager = { page: 0, count: 0, limit: 30 };
  pager.page = route.query.page ?? 0;
  // console.log(route.query);
  let pagerPromote = { page: 0, count: 0, limit: 0 };
  pagerPromote.page = route.query.page ?? 0;
  const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
  // const sortSub = route.query.sort ? JSON.parse(route.query.sort) : { key: "name", order: "ASC" };
  const category_id = route.params.id;
  const f = route.query.f ? JSON.parse(route.query.f) : {};
  const addFilters = route.query.filters ? JSON.parse(route?.query?.filters) : {};
  
  const searchInput = route.query.q ? route.query.q : null;
  let filters = addFilters;

  Object.assign(filters, { status: 1 });
  if (category_id) Object.assign(filters, { category_id: category_id });
  if (searchInput) Object.assign(filters, { "OR": [
    {id: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {name: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {vendor: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {factory_article: { condition: "LIKE", value: "%" + searchInput + "%" }}] });
    
    // console.log(route);
  let res;
    try {
      if((route.name.match('catalog') && category_id>0) || (route.name.match('catalog-search'))){
        res = await $axios.get($config.baseURL + '/api/site/catalog', {
          params: {
            f: f,
            filters: filters,
            sort: sort,
            pager: pager
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
    // console.log(res?.data?.data?.length);
    if (route.name.match('catalog') && searchInput == null && (res?.data?.data?.length == 0 || !res?.data?.data)) {
      return error({ statusCode: 404, message: "Страница не найдена"});
    }

    // if (route.params.id) Object.assign(subcatfilters, { "parent_id": category_id });
  // let resCategories;
  //   try {
  //     if(route.name.match('catalog')){
  //       resCategories = await $axios.get($config.baseURL + '/api/site/categories', {
  //         params: {
  //           f: f,
  //           filters: subcatfilters,
  //           sort: sortSub,
  //           pager: pager
  //         }
  //       });
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // res = await $axios.get($config.baseURL + '/api/site/catalog', {
  //   params: {
  //     f: f,
  //     filters: filters,
  //     sort: sort,
  //     pager: pager
  //   }
  // });
  const data = res ? res.data.data : [];
  
  // console.log();
  let carouselItems = [];
  let infoPromote;
  try {
    if (route.name.match('promote') && category_id>0) infoPromote = (await $axios.get($config.baseURL + '/api/site/promote/', {params: {filters: {"id": category_id}}})).data.data;
    // console.log(infoPromote);
    carouselItems = infoPromote?.length > 0 ? infoPromote[0].images.splice(1, 1) : [];
    // console.log(carouselItems);
  } catch (error) {
    console.error(error);
  }

  let filtersPromote = {"status": 1};
  Object.assign(filtersPromote, route.query.filters ? JSON.parse(route.query.filters) : {});
  // Object.assign(filtersPromote, { "ic.promote_id": 1 });
  if (route.name.match('promote')) Object.assign(filtersPromote, { "ic.promote_id": category_id });
  let resPromote;
  try {
    if(route.name.match('promote') && category_id>0){
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
  }
  if (route.name.match('promote') && (resPromote?.data?.data?.length == 0 || !resPromote?.data?.data) || infoPromote?.length == 0) {
    return error({ statusCode: 404, message: "Страница не найдена"});
  }
  const dataPromote = resPromote ? resPromote.data.data : '';
  // const resPromote = await $axios.get($config.baseURL + '/api/site/promote_catalog', {
  //   params: {
  //     f: f,
  //     filters: filtersPromote,
  //     sort: sort,
  //     pager: pagerPromote
  //   }
  // });
  // const dataPromote = resPromote.data.data;
  let filtersPromoteOnly = {"status": 1};
  if (route.name.match('promote')) Object.assign(filtersPromoteOnly, { "ic.promote_id": category_id });

  
  const FiltersPromote = resPromote ? await $axios.get($config.baseURL + '/api/site/promote_catalog/filters', {params: {filters: filtersPromoteOnly}}) : '';
  const dataFiltersPromote = FiltersPromote ? FiltersPromote.data.data : '';

  let resCat;
  try { if (category_id && category_id !== 'allcategories' && res) resCat = await $axios.get($config.baseURL + '/api/site/categories/' + category_id);} catch (e) {console.error(e)}
  
  let filtersOnly = {};
  Object.assign(filtersOnly, { status: 1 });
  if (category_id) Object.assign(filtersOnly, { category_id: category_id });
  if (searchInput) Object.assign(filtersOnly, { "OR": [
    {id: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {name: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {vendor: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {factory_article: { condition: "LIKE", value: "%" + searchInput + "%" }}] });
    

  let resFilters;
  try {
    if(res) resFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', { params: { filters: filtersOnly } });  
  } catch (e) {
    console.error(e)
  }
  
  const valueFilters = {
    f: f,
    price: filters.price,
    brand: filters.brand,
  }
  const valueFiltersPromote = {
    f: f,
    price: filtersPromote.price,
    brand: filtersPromote.brand,
    category_id: filtersPromote.category_id
  }
  let dataFilters = resFilters ? resFilters.data.data : '';



  let conutI = 0;
  const maxI = 5;
  for (let key in dataFilters.filters) {
    if (dataFilters.filters[key].type === 2) {
      conutI++;
      if (conutI > maxI) {
        dataFilters.filters[key].type = 1;
        continue;
      }
      let maxVal;
      let minVal;
      dataFilters.filters[key].numFilters = [];
      for (let i = 0; i < dataFilters.filters[key].filters.length; i++) {
        const item = dataFilters.filters[key].filters[i];
        let n = item;
        if (n == NaN) continue;
        if (i == 0) { // инициализация
          maxVal = n;
          minVal = n;
        }
        if (n < minVal) minVal = n;
        else if (n > maxVal) maxVal = n;
        dataFilters.filters[key].numFilters.push(n);
      }
      if (minVal == NaN || maxVal == NaN) {
        dataFilters.filters[key].type = 1;
      } else {
        dataFilters.filters[key].min = Math.floor(minVal);
        dataFilters.filters[key].max = Math.ceil(maxVal);

        // console.log(dataFilters.filters[key]);
      }

    }
  }
  // Promote page
  let conutIPromote = 0;
  const maxIPromote = 5;
  for (let key in dataFiltersPromote.filters) {
    if (dataFiltersPromote.filters[key].type === 2) {
      conutIPromote++;
      if (conutIPromote > maxIPromote) {
        dataFiltersPromote.filters[key].type = 1;
        continue;
      }
      let maxVal;
      let minVal;
      dataFiltersPromote.filters[key].numFilters = [];
      for (let i = 0; i < dataFiltersPromote.filters[key].filters.length; i++) {
        const item = dataFiltersPromote.filters[key].filters[i];
        let n = item;
        if (n == NaN) continue;
        if (i == 0) { // инициализация
          maxVal = n;
          minVal = n;
        }
        if (n < minVal) minVal = n;
        else if (n > maxVal) maxVal = n;
        dataFiltersPromote.filters[key].numFilters.push(n);
      }
      if (minVal == NaN || maxVal == NaN) {
        dataFiltersPromote.filters[key].type = 1;
      } else {
        dataFiltersPromote.filters[key].min = Math.floor(minVal);
        dataFiltersPromote.filters[key].max = Math.ceil(maxVal);

        // console.log(dataFiltersPromote.filters[key]);
      }

    }
  }

  const title = resCat ? resCat.data.data.name : '';
  pager = res ? res.data.pager : '';
  pagerPromote = resPromote ? resPromote.data.pager : '';

  function breadcrumbs(category_id, title, value) {
    let breadcrumbsData;
    if (category_id !== undefined) {
      if(resCat){
        if (resCat.data.data.parent_id){
          breadcrumbsData = [
            {
              url: "/allcategories",
              title: 'Каталог',
            },
            {
              url: "/allcategories/" + resCat.data.data.parent_id,
              title: resCat.data.data.parent_name,
            },
            {
              url: "/catalog/" + category_id,
              title: title,
            },
          ];
        } else {
          breadcrumbsData = [
            {
              url: "/allcategories",
              title: 'Каталог',
            },
            {
              url: "/catalog/" + category_id,
              title: title,
            },
          ];
        }
      } else {
        breadcrumbsData = [
          {
            url: "/catalog/" + category_id,
            title: title,
          },
        ];
      }
    } else if (value !== undefined) {
      breadcrumbsData = [
        {
          url: "",
          title: "Поиск"
        },
        // {
        //   url: "",
        //   title: value
        // }
      ]
    }
    return breadcrumbsData;
  }
  const breadcrumbsData = breadcrumbs(category_id, title, searchInput);
  let breadcrumbsDataPromote;
  if(route.name.match('promote') && infoPromote?.length > 0) breadcrumbsDataPromote = [{
    url: `/promote/${category_id}`,
    title: infoPromote[0].name,
  }]
  const loading = false;



  return { 
    title, 
    data, 
    breadcrumbsData, 
    sort, 
    pager, 
    dataFilters, 
    filters, 
    valueFilters, 
    searchInput, 
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