<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ title }}</h1>
    <!--    <p> {{ dataFilters.filters }} </p>-->
    <!--     <catalog-top-select />-->
    <v-row class="s-row">
      <v-col cols="3">
        <catalog-filter :value="dataFilters" />
      </v-col>
      <v-col cols="9">
        <catalog-top-bar :count="pager.count" :sort="sort" />
        <v-row class="s-row">
          <v-col cols="4" v-for="(el, i) in data" :key="i">
            <catalog-item-list :el="el" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="text-center mt-10 ">
      <common-pagination :value="pager" />
    </div>
  </v-container>
</template>

<script>

async function getData({ route, $axios, $config }) {
  let pager = { page: 0, count: 0, limit: 30 };
  pager.page = route.query.page ?? 0;
  const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
  const category_id = route.params.id;
  const filters = { category_id: category_id };

  const res = await $axios.get($config.baseURL + '/api/site/catalog', { params: { filters: filters, sort: sort, pager: pager } });
  const data = res.data.data;
  const resCat = await $axios.get($config.baseURL + '/api/site/categories/' + category_id,);
  const resFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', { params: { filters: filters } });

  let dataFilters = resFilters.data.data;

  // console.log(typeof (dataFilters));

  // dataFilters.filters.forEach(item => console.log(item));
  // console.log(dataFilters);
  // console.log(typeof (data));
  let mass = []
  let conutI = 0;
  const maxI = 5;
  for (let key in dataFilters.filters) {
    // console.log(key);
    if (dataFilters.filters[key].type === 2) {
      // dataFilters.filters[key].filters.forEach(item =>{
      // dataFilters.filters[key].num = Number(item.replace(/\,/g, '.'));
      // })
      // dataFilters.filters[key].filters.sort(function qwe (a,b){
      //   return Number(a.replace(/\,/g, '.'))-Number(b.replace(/\,/g, '.'));
      // })
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
        dataFilters.filters[key].min = minVal;
        dataFilters.filters[key].max = maxVal;

        console.log(dataFilters.filters[key]);
      }

      // dataFilters.filters[key].min = minvalue(dataFilters.filters[key].filters)
      // mass.length = 0
      // dataFilters.filters[key].max = maxvalue(dataFilters.filters[key].filters)
      // mass.length = 0
      // dataFilters.filters[key].filters.forEach(item => {
      // // key.num = Number(item.replace(/\,/g, '.'));
      // })
    }
  }

  // function minvalue(arr){
  //   arr.forEach(item =>{
  //     mass.push(Number(item.replace(/\,/g, '.')))
  //   })
  //   mass.sort(function qwe(a,b){
  //     return a-b;
  //   })
  //   return mass[0];
  // }

  // function maxvalue(arr){
  //   arr.forEach(item =>{
  //     mass.push(Number(item.replace(/\,/g, '.')))
  //   })
  //   mass.sort(function qwe(a,b){
  //     return a-b;
  //   })
  //   return mass[mass.length - 1];
  // }
  const title = resCat.data.data.name;
  pager = res.data.pager;
  const breadcrumbsData = [
    {
      url: "",
      title: "Каталог",
    },
    {
      url: "/catalog/" + category_id,
      title: title,
    },
  ];
  return { title, data, breadcrumbsData, sort, pager, dataFilters };
}
// function stg(dataFilters){
//   dataFilters.forEach(item => console.log(item));
// }
// stg(dataFilters);
export default {
  data() {
    return {
      carouselModel: 0,
      page: 1,
      filter: {
        price: {},
      },
      filters: { parent_id: 0 },
      sort: { key: "name", order: "ASC" },

    };
  },
  watch: {
    "$route": {
      async handler() {
        let p = await getData({ route: this.$route, $axios: this.$axios, $config: this.$config });
        this.data = p.data;
      }
    }
  },
  async asyncData({ route, $axios, $config }) {
    return await getData({ route, $axios, $config });
  },
};
</script>
