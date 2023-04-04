<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ title }}</h1>
    <!--    <p> {{ dataFilters.filters }} </p>-->
    <!--     <catalog-top-select />-->
<!--    <base-catalog :data="data" :dataFilters="dataFilters" :valueFilters="valueFilters" :pager="pager" :sort="sort"/>-->
    <v-row class="s-row">
      <v-col cols="3">
        <catalog-filter :filters="dataFilters" v-model="valueFilters" />
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
import {getData} from "@/pages/catalog/getData";
import {config} from "@fortawesome/fontawesome-svg-core";
import BaseCatalog from "@/components/catalog/base-catalog.vue";

// async function getData({ route, $axios, $config }) {
//   let pager = { page: 0, count: 0, limit: 30 };
//   pager.page = route.query.page ?? 0;
//   const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
//   const category_id = route.params.id;
//   const f = route.query.f ? JSON.parse(route.query.f) : {};
//   const addFilters = route.query.filters ? JSON.parse(route.query.filters) : {};
//   const filters = Object.assign({ category_id: category_id }, addFilters);
//   const res = await $axios.get($config.baseURL + '/api/site/catalog', { params: { f: f, filters: filters, sort: sort, pager: pager } });
//   const data = res.data.data;
//   const resCat = await $axios.get($config.baseURL + '/api/site/categories/' + category_id,);
//   const resFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', { params: { filters: filters } });
//
//   let dataFilters = resFilters.data.data;
//
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
//
//         // console.log(dataFilters.filters[key]);
//       }
//
//     }
//   }
//
//   const title = resCat.data.data.name;
//   pager = res.data.pager;
//   const breadcrumbsData = [
//     {
//       url: "",
//       title: "Каталог",
//     },
//     {
//       url: "/catalog/" + category_id,
//       title: title,
//     },
//   ];
//   return { title, data, breadcrumbsData, sort, pager, dataFilters, filters };
// }
export default {
  components: {BaseCatalog},
  data() {
    return {
      carouselModel: 0,
      page: 1,
      filter: {
        price: {},
      },
      valueFilters: {
        f: {}
      },
      filters: { parent_id: 0 },
      sort: { key: "name", order: "ASC" },

    };
  },
  watch: {
    valueFilters(v) {
      let filters = {};
      if (v.price && v.price.length > 0) {
        filters.price = v.price;
      }
      this.$router.push({ query: Object.assign({}, this.$route.query, { filters: JSON.stringify(filters), f: JSON.stringify(v.f), page: 0 }) });
    },
    "$route": {
      async handler() {
        let p = await getData({ route: this.$route, $axios: this.$axios, $config: this.$config });
        this.data = p.data;
        this.pager = p.pager;
        console.log(this.$route);
      },

    },
  },
  async asyncData({ route, $axios, $config }) {
    return await getData({ route, $axios, $config });
  },
};
</script>
