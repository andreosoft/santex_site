<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ title }}</h1>
    <base-catalog 
      :data="data" 
      :loading="loading" 
      :dataFilters="$route.params.id ? dataFilters : activeFilters" 
      :valueFilters="valueFilters" 
      :activeFilters="$route.params.id ? activeFilters : {}"
      :pager="pager"
      :sort="sort" 
      @update-data="valueFilters = $event"/>
    <div class="text-center mt-10 ">
      <common-pagination :value="pager" />
    </div>
  </v-container>
</template>

<script>
import { getDataCatalog } from "@/pages/catalog/getDataCatalog";
import BaseCatalog from "@/components/catalog/base-catalog.vue";
export default {
  components: {BaseCatalog},
  data() {
    return { 
      loading: true,
    }
  },
  async asyncData({route, $axios, $config, error}) {
    return await getDataCatalog({route, $axios, $config, error});
  },
  watch: {
    valueFilters(v) {
      let filters = {};
      if (v.price && v.price.length > 0) {
        filters.price = v.price;
      }
      if (v.brand && v.brand.length > 0) {
        filters.brand = v.brand;
      }
      if (v.collection && v.collection.length > 0) {
        filters.collection = v.collection;
      }
      this.$router.push({ query: Object.assign({}, this.$route.query, { filters: JSON.stringify(filters), f: JSON.stringify(v.f), page: 0 }) });
    },
    "$route": {
      async handler() {
        this.loading = true;
        let p = await getDataCatalog({route: this.$route, $axios: this.$axios, $config: this.$config, error: this.$error});
        this.loading = false;
        this.data = p.data;
        this.activeFilters = p.activeFilters;
        this.pager = p.pager;
      },
    }
  },
};
</script>
