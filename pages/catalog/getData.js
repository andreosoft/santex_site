export default {
  async getData({route, $axios, $config}) {
    let pager = {page: 0, count: 0, limit: 30};
    pager.page = route.query.page ?? 0;
    const sort = route.query.sort ? JSON.parse(route.query.sort) : {key: "price", order: "ASC"};
    const category_id = route.params.id;
    const f = route.query.f ? JSON.parse(route.query.f) : {};
    const addFilters = route.query.filters ? JSON.parse(route.query.filters) : {};
    const filters = Object.assign({category_id: category_id}, addFilters);
    const res = await $axios.get($config.baseURL + '/api/site/catalog', {
      params: {
        f: f,
        filters: filters,
        sort: sort,
        pager: pager
      }
    });
    const data = res.data.data;
    const resCat = await $axios.get($config.baseURL + '/api/site/categories/' + category_id,);
    const resFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', {params: {filters: filters}});

    let dataFilters = resFilters.data.data;

    let mass = [];
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
          let n = Number(item.trim().replace(/\,/g, '.'));
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

    const title = resCat.data.data.name;
    pager = res.data.pager;
    // const breadcrumbsData = [
    //   {
    //     url: "",
    //     title: "Каталог",
    //   },
    //   {
    //     url: "/catalog/" + category_id,
    //     title: title,
    //   },
    // ];
    return {title, data, sort, pager, dataFilters, filters};
  }
}


