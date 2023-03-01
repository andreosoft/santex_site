<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ title }}</h1>
    <!-- <catalog-top-select /> -->
    <v-row class="s-row">
      <v-col cols="3">
        <catalog-filter :value="dataFilters" />
      </v-col>
      <v-col cols="9">
        <catalog-top-bar :count="pager.count" :sort="sort"/>
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
  const resFilters = await $axios.get($config.baseURL + '/api/site/catalog/filters', { params: { filters: filters} });
  const dataFilters = resFilters.data.data;
  // console.log(dataFilters);
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