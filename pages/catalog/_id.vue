<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ title }}</h1>
    <base-catalog :data="subcat ? subcat?.content : data" :categoriesData="subcat ? subcat : {}" :loading="loading" :dataFilters="dataFilters" :valueFilters="valueFilters" :pager="pager" :sort="sort" @update-data="valueFilters = $event"/>
    <div class="text-center mt-10 ">
      <common-pagination :value="pager" />
    </div>
  </v-container>
</template>

<script>
import {getData} from "@/pages/catalog/getData";
import BaseCatalog from "@/components/catalog/base-catalog.vue";
import { mapGetters } from "vuex";

export default {
  components: {BaseCatalog},
  data() {
    return { 
      loading: true
    }
  },
  computed: {
    ...mapGetters ({categories: 'getCategories'}),
    subcat(){
      return this.categories.find(item => item.id == this.category_id)
    }
  },
  watch: {
    valueFilters(v) {
      // console.log(v)
      let filters = {};
      if (v.price && v.price.length > 0) {
        filters.price = v.price;
      }
      if (v.brand && v.brand.length > 0) {
        filters.brand = v.brand;
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
};
</script>
