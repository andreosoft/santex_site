<template>
    <v-container class="mb-10">
      <v-divider class="mb-8" />
      <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
      <h1>Каталог</h1>
      <base-catalog 
        :data="data" 
        :loading="loading" 
        :dataFilters="getFiltersPages.filters" 
        :activeFilters="getActiveFilters"
        :valueFilters="valueFilters" 
        :pager="pager"
        :sort="sort" 
        @update-data="valueFilters = $event"/>
      <div class="text-center mt-10 ">
        <common-pagination :value="pager" />
      </div>
    </v-container>
  </template>
  
  <script>
  import { getDataBrand } from "@/pages/catalog/brands/getDataBrand";
  import BaseCatalog from "@/components/catalog/base-catalog.vue";
  import { mapGetters } from "vuex";
  export default {
    components: {BaseCatalog},
    data() {
      return { 
        loading: true,
      }
    },
    computed: {
    ...mapGetters({
      getFiltersPages: "catalog/getFiltersPages",
      getId: "catalog/getCatId",
      getActiveFilters: "catalog/getActiveFilters",
    }),
  },
  beforeDestroy() {
    // console.log(this.getFiltersPages)
    // console.log(this.$route.params.id)
    if(this.$route.name.match('catalog-brands') || this.$route.name.match('catalog-collections')) {
      // console.log('Страница брендов или коллекций')
      this.$store.commit("catalog/updateActiveFilters", {});
      // this.$store.commit("catalog/updateQueryFilters", { f: {}, filters: {} });
    } else if (this.getFiltersPages.id.id == this.$route.params.id || this.getFiltersPages.id.id == this.$route.query.q) {
      // console.log("updateQueryFilters Brands/");
      this.$store.commit("catalog/updateActiveFilters", {});
      this.$store.commit("catalog/updateQueryFilters", { f: {}, filters: {} });
    } else {
      // console.log("clear all Brands");
      this.$store.commit("catalog/clearFilters");
    }
  },
    async asyncData(params) {
      return await getDataBrand(params);
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
          let p = await getDataBrand({
            route: this.$route, 
            $axios: this.$axios, 
            $config: this.$config, 
            error: this.$error, 
            store: this.$store,
          });
          this.loading = false;
          this.data = p.data;
          // this.activeFilters = p.activeFilters;
          this.pager = p.pager;
        },
      },
      '$route.query': {
        handler(newValue, oldValue) {
          if (newValue.filters) {
            try {
              const filters = JSON.parse(newValue.filters);
              const oldfilters = JSON.parse(oldValue.filters);
              if (filters.brand && filters.brand[0] !== oldfilters.brand[0]) {
                // console.log(filters.brand)
                // console.log(oldfilters.brand)
                // console.log('Смена brand')
                this.valueFilters = { "f":{}, "brand": filters.brand };
                // this.$store.commit("catalog/updateActiveFilters", {});
                this.$store.commit("catalog/clearFilters");
              }
            } catch (e) {console.error(e);}
          }
        },
        deep: true
      }
    },
  };
  </script>
  