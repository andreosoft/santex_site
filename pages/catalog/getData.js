export async function getData({ route, $axios, $config }) {
  let pager = { page: 0, count: 0, limit: 30 };
  pager.page = route.query.page ?? 0;
  const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
  const category_id = route.params.id;
  const f = route.query.f ? JSON.parse(route.query.f) : {};
  const addFilters = route.query.filters ? JSON.parse(route.query.filters) : {};
  const searchInput = route.query.q ? route.query.q : null;
  console.log(searchInput)
  let filters = addFilters;
  if (category_id) Object.assign(filters, { category_id: category_id });
  if (searchInput) Object.assign(filters, { name: { condition: "LIKE", value: "%" + searchInput + "%" } });
  const res = await $axios.get($config.baseURL + '/api/site/catalog', {
    params: {
      f: f,
      filters: filters,
      sort: sort,
      pager: pager
    }
  });
  const data = res.data.data;
  let resCat;
  if (category_id) resCat = await $axios.get($config.baseURL + '/api/site/categories/' + category_id,);
  const resFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', { params: { filters: filters } });

  let dataFilters = resFilters.data.data;
  // console.log(dataFilters);
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

  const title = resCat ? resCat.data.data.name : '';
  pager = res.data.pager;


  function breadcrumbs(category_id, title, value) {
    let breadcrumbsData;
    if (category_id !== undefined) {
      breadcrumbsData = [
        {
          url: "",
          title: "Каталог",
        },
        {
          url: "/catalog/" + category_id,
          title: title,
        },
      ];
    } else if (value !== undefined) {
      breadcrumbsData = [
        {
          url: "",
          title: "Поиск"
        },
        {
          url: "",
          title: value
        }
      ]
    }
    return breadcrumbsData;
  }
  const breadcrumbsData = breadcrumbs(category_id, title, searchInput);

  return { title, data, breadcrumbsData, sort, pager, dataFilters, filters, searchInput };
}





// export async function getData({ route, $axios, $config }) {
//   let pager = { page: 0, count: 0, limit: 30 };
//   pager.page = route.query.page ?? 0;

//   let dataFilters = resFilters.data.data;

//   let mass = [];
//   let conutI = 0;
//   const maxI = 5;
//   for (let key in dataFilters.filters) {
//     if (dataFilters.filters[key].type === 2) {
//       conutI++;
//       if (conutI > maxI) {
//         dataFilters.filters[key].type = 1;
//         continue;
//       }
//       let maxVal;
//       let minVal;
//       dataFilters.filters[key].numFilters = [];
//       for (let i = 0; i < dataFilters.filters[key].filters.length; i++) {
//         const item = dataFilters.filters[key].filters[i];
//         let n = Number(item.trim().replace(/\,/g, '.'));
//         if (n == NaN) continue;
//         if (i == 0) { // инициализация
//           maxVal = n;
//           minVal = n;
//         }
//         if (n < minVal) minVal = n;
//         else if (n > maxVal) maxVal = n;
//         dataFilters.filters[key].numFilters.push(n);
//       }
//       if (minVal == NaN || maxVal == NaN) {
//         dataFilters.filters[key].type = 1;
//       } else {
//         dataFilters.filters[key].min = Math.floor(minVal);
//         dataFilters.filters[key].max = Math.ceil(maxVal);

//         // console.log(dataFilters.filters[key]);
//       }

//     }
//   }

//   const title = resCat.data.data.name;
//   pager = res.data.pager;
//   // const breadcrumbsData = [
//   //   {
//   //     url: "",
//   //     title: "Каталог",
//   //   },
//   //   {
//   //     url: "/catalog/" + category_id,
//   //     title: title,
//   //   },
//   // ];
//   return { title, data, sort, pager, dataFilters, filters };
// }