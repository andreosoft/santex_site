<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ title }}</h1>
    <base-catalog :data="data" :dataFilters="dataFilters" :valueFilters="valueFilters" :pager="pager" :sort="sort" @update-data="updateValueFilters"/>
    <div class="text-center mt-10 ">
      <common-pagination :value="pager" />
    </div>
  </v-container>
</template>

<script>
import {getData} from "@/pages/catalog/getData";
import BaseCatalog from "@/components/catalog/base-catalog.vue";

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
  methods: {
    updateValueFilters(value){
        this.valueFilters = value;
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
        let p = await getData({ route: this.$route, $axios: this.$axios, $config: this.$config });
        this.data = p.data;
        this.pager = p.pager;
      },
    }
  },
  async asyncData({ route, $axios, $config }) {
    return await getData({ route, $axios, $config });
  },
};
</script>
