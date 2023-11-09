<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsDataPromote" />
        <h1>Акции</h1>
        <v-divider class="mb-8" />
        <div>
          <img :src="$config.baseImageURL + carouselItems[carouselItems.length - 1]" alt="banner">
          <!-- <index-mainCarusel :items="carouselItems"/> -->
        </div>
        <v-divider class="mb-8" />
        <h2>Жирные скидки -20%</h2>
        <!-- <v-divider class="mb-8" /> -->
        <p>Текстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блок</p>
        <v-divider class="mb-8" />
        <catalog-base-catalog :data="dataPromote" :loading="loading" :dataFilters="dataFiltersPromote" :valueFilters="valueFilters" :pager="pagerPromote" :sort="sort" @update-data="valueFilters = $event"/>
    <div class="text-center mt-10">
      <!-- <common-pagination :value="pager" /> -->
    </div>
      </v-container>
</template>

<script>

import {getData} from "@/pages/catalog/getData";
export default {
  //   async asyncData(params) {
  //   const breadcrumbsDataPromote = [
  //     {
  //       url: "/promote",
  //       title: "Акции",
  //     }
  //   ];
  //   return { breadcrumbsDataPromote }
  // },
  data() {
    return { 
      toggleOpen: false,
      loading: true,
      breadcrumbsDataPromote: [{
        url: `/promote/${this.$route.params.id}`,
        title: "Акции",
      }]
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
      this.$router.push({ query: Object.assign({}, this.$route.query, { filters: JSON.stringify(filters), f: JSON.stringify(v.f), page: 0 }) });
    },
    "$route": {
      async handler() {
        this.loading = true;
        let p = await getData({ route: this.$route, $axios: this.$axios, $config: this.$config });
        this.loading = false;
        this.dataPromote = p.dataPromote;
        this.pagerPromote = p.pagerPromote;
      },
    }
  },
  async asyncData({ route, $axios, $config }) {
    return await getData({ route, $axios, $config });
  },
}
</script>