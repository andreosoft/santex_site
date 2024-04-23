<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsDataPromote" />
        <h1 v-if="infoPromote?.length > 0 && infoPromote[0].name">{{ infoPromote[0].name }}</h1>
        <v-divider class="mb-8" />
        <div class="d-flex">
          <img v-if="carouselItems?.length > 0" class="w-100" :src="$config.baseImageURL + carouselItems[carouselItems.length - 1]" alt="banner">
          <!-- <index-mainCarusel :items="carouselItems"/> -->
        </div>
        <v-divider v-if="carouselItems?.length > 0"  class="mb-8" />
        <h4 v-if="infoPromote?.length > 0 && infoPromote[0].introtext" v-html="infoPromote[0].introtext"></h4>
        <!-- <v-divider class="mb-8" /> -->
        <div v-if="infoPromote?.length > 0 && infoPromote[0].content" v-html="infoPromote[0].content"></div>
        <v-divider class="mb-8" />
        <catalog-base-catalog v-if="dataPromote?.length > 0" :data="dataPromote" :loading="loading" :dataFilters="dataFiltersPromote" :valueFilters="valueFiltersPromote" :pager="pagerPromote" :sort="sort" @update-data="valueFilters = $event"/>
    <div class="text-center mt-10">
      <!-- <common-pagination :value="pager" /> -->
    </div>
      </v-container>
</template>

<script>

import {getData} from "@/pages/catalog/getData";
export default {
  data() {
    return { 
      toggleOpen: false,
      loading: true
    }
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
      if (v.category_id && v.category_id.length > 0) {
        filters.category_id = v.category_id;
      }
      this.$router.push({ query: Object.assign({}, this.$route.query, { filters: JSON.stringify(filters), f: JSON.stringify(v.f), page: 0 }) });
    },
    "$route": {
      async handler() {
        this.loading = true;
        let p = await getData({ route: this.$route, $axios: this.$axios, $config: this.$config, error: this.$error });
        this.loading = false;
        this.dataPromote = p.dataPromote;
        this.pagerPromote = p.pagerPromote;
      },
    }
  },
  async asyncData({ route, $axios, $config, error }) {
    return await getData({ route, $axios, $config, error });
  },
}
</script>