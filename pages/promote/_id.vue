<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsDataPromote" />
    <h1 v-if="Object.keys(getId).length > 0 && getId.name">{{ getId.name }}</h1>
    <v-divider class="mb-8" />
    <div class="d-flex">
      <img
        v-if="carouselItems?.length > 0"
        class="w-100"
        :src="$config.baseImageURL + carouselItems[carouselItems.length - 1]"
        alt="banner"
      />
      <!-- <index-mainCarusel :items="carouselItems"/> -->
    </div>
    <v-divider v-if="carouselItems?.length > 0" class="mb-8" />
    <h4 v-if="Object.keys(getId).length > 0 && getId.introtext" v-html="getId.introtext"></h4>
    <!-- <v-divider class="mb-8" /> -->
    <div v-if="Object.keys(getId).length > 0 && getId.content" v-html="getId.content"></div>
    <v-divider class="mb-8" />
    <catalog-base-catalog
      v-if="dataPromote?.length > 0"
      :data="dataPromote"
      :loading="loading"
      :dataFilters="getFiltersPages.filters"
      :valueFilters="valueFiltersPromote"
      :activeFilters="getActiveFilters"
      :pager="pagerPromote"
      :sort="sort"
      @update-data="valueFiltersPromote = $event"
    />
    <div class="text-center mt-10">
      <!-- <common-pagination :value="pager" /> -->
    </div>
  </v-container>
</template>

<script>
import { getDataPromote } from "@/pages/promote/getDataPromote";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      getFiltersPages: "catalog/getFiltersPages",
      getId: "catalog/getCatId",
      getActiveFilters: "catalog/getActiveFilters",
    }),
  },
  beforeDestroy() {
    if(this.$route.name.match('catalog-brands') || this.$route.name.match('catalog-collections')) {
      // console.log('Страница брендов или коллекций')
      this.$store.commit("catalog/updateActiveFilters", {});
    } else if (this.getFiltersPages.id.id == this.$route.params.id || this.getFiltersPages.id.id == this.$route.query.q) {
      // console.log("updateQueryFilters promote");
      this.$store.commit("catalog/updateActiveFilters", {});
      this.$store.commit("catalog/updateQueryFilters", { f: {}, filters: {} });
    } else {
      // console.log("cler all promote");
      this.$store.commit("catalog/clearFilters");
    }
  },
  async asyncData(params) {
    return await getDataPromote(params);
  },
  watch: {
    valueFiltersPromote(v) {
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
      if (v.category_id && v.category_id.length > 0) {
        filters.category_id = v.category_id;
      }
      this.$router.push({query: Object.assign({}, this.$route.query, {
          filters: JSON.stringify(filters),
          f: JSON.stringify(v.f),
          page: 0,
        }),
      });
    },
    $route: {
      async handler() {
        this.loading = true;
        let p = await getDataPromote({
          route: this.$route,
          $axios: this.$axios,
          $config: this.$config,
          error: this.$error,
          store: this.$store,
        });
        this.loading = false;
        // this.activeFilters = p.activeFilters;
        this.dataPromote = p.dataPromote;
        this.pagerPromote = p.pagerPromote;
      },
    },
  },
};
</script>
