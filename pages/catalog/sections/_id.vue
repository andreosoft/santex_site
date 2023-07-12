<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <h1>{{ title }}</h1>
        <!-- <base-catalog :data="data" :loading="loading" :dataFilters="dataFilters" :valueFilters="valueFilters" :pager="pager" :sort="sort" @update-data="valueFilters = $event"/> -->
        <div class="text-center mt-10 ">
          <common-pagination :value="pager" />
        </div>
      </v-container>
</template>

<script>
import BaseCatalog from "@/components/catalog/base-catalog.vue";
async function getData({route, $axios, $config}){
  let pager = { page: 0, count: 0, limit: 30 };
  pager.page = route.query.page ?? 0;
  const sort = route.query.sort ? JSON.parse(route.query.sort) : { key: "price", order: "ASC" };
  const category_id = route.params.id;
  const f = route.query.f ? JSON.parse(route.query.f) : {};
  const addFilters = route.query.filters ? JSON.parse(route.query.filters) : {};
  const searchInput = route.query.q ? route.query.q : null;
  let filters = addFilters;
  Object.assign(filters, { status: 1 });
  if (category_id) Object.assign(filters, { category_id: category_id });
  if (searchInput) Object.assign(filters, { "OR": [
    {id: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {name: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {vendor: { condition: "LIKE", value: "%" + searchInput + "%" }},
    {factory_article: { condition: "LIKE", value: "%" + searchInput + "%" }}] });
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
  const valueFilters = {
    price: filters.price,
    f: f
  }
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
          url: "/catalog/sections/" + category_id,
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

  const loading = false
  return { title, data, breadcrumbsData, sort, pager, dataFilters, filters, valueFilters, searchInput, loading };
}

export default {
    components: {
        BaseCatalog
    },
    // props: {
    //     section_id: {
    //         type: String,
    //         required: true
    //     }
    // },
    data () {
        return {
            loading: true
        }
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
        this.loading = true;
        let p = await getData({ route: this.$route, $axios: this.$axios, $config: this.$config });
        this.loading = false;
        this.data = p.data;
        this.pager = p.pager;
      },
    }
  },
    async asyncData({ route, $axios, $config }) {
        return await getData({ route, $axios, $config });
  },
}
</script>