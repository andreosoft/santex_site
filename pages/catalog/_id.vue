<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ title }}</h1>
    <base-catalog
      :data="data"
      :loading="loading"
      :dataFilters="getFiltersPages.filters"
      :valueFilters="valueFilters"
      :activeFilters="getActiveFilters"
      :pager="pager"
      :sort="sort"
      @update-data="valueFilters = $event"
    />
    <div class="text-center mt-10">
      <common-pagination :value="pager" />
    </div>
  </v-container>
</template>

<script>
import { getDataCatalog } from "@/pages/catalog/getDataCatalog";
import BaseCatalog from "@/components/catalog/base-catalog.vue";
import { mapGetters } from "vuex";
export default {
  components: { BaseCatalog },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      getFiltersPages: "catalog/getFiltersPages",
      getId: "catalog/getCatId",
      getActiveFilters: "catalog/getActiveFilters"
    }),
  },
  beforeDestroy() {
    if(this.$route.name.match('catalog-brands') || this.$route.name.match('catalog-collections')) {
      this.$store.commit("catalog/updateActiveFilters", {});
    } else if (this.getFiltersPages.id.id == this.$route.params.id || this.getFiltersPages.id.id == this.$route.query.q) {
      this.$store.commit("catalog/updateActiveFilters", {});
      this.$store.commit("catalog/updateQueryFilters", { f: {}, filters: {} });
    } else {
      this.$store.commit("catalog/clearFilters");
    }
  },
  async asyncData(params) {
    return await getDataCatalog(params);
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
      this.$router.push({query: Object.assign({}, this.$route.query, {
          filters: JSON.stringify(filters),
          f: JSON.stringify(v.f),
          page: 0,
        }),
      });
    },
    "$route": {
      async handler() {
        this.loading = true;
        let p = await getDataCatalog({
          route: this.$route,
          $axios: this.$axios,
          $config: this.$config,
          error: this.$error,
          store: this.$store,
        });
        console.log("route");
        this.loading = false;
        this.data = p.data;
        // this.activeFilters = p.activeFilters;
        this.pager = p.pager;
      },
    },
  },
};
</script>
