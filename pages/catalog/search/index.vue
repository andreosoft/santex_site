<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>Поиск</h1>
    <div class="mb-10">
      <p><b>Вы искали: </b><span class="underlined">{{ searchInput }}</span>, найдено {{ pager.count }} шт.</p>
    </div>
    <v-divider class="mb-10" />
    <div v-show="data.length == 0">
      <div class="mb-10" style="font-weight: bold;">К сожалению по вашему запросу ничего не найдено.</br>
          Попробуйте изменить ключевые слова поиска.</div>
      <div style="width: 724px;">
        <v-text-field @keyup.enter="submitSearch()" v-model="search" single-line outlined dense label="Я хочу найти">
          <template v-slot:append>
            <img style="cursor: pointer" @click="submitSearch()" src="/icons/Search.svg" />
          </template>
        </v-text-field>
      </div>
  </div>
    <base-catalog
    :loading="loading"
    :data="data"
    :dataFilters="getFiltersPages.filters"
    :activeFilters="getActiveFilters"
    :valueFilters="valueFilters"
    :pager="pager"
    :sort="sort"
    @update-data="valueFilters = $event" />
    <div class="text-center mt-10 ">
      <common-pagination :value="pager" />
    </div>
  </v-container>
</template>

<script>
import { getDataSearch } from "@/pages/catalog/search/getDataSearch";
import BaseCatalog from "@/components/catalog/base-catalog.vue";
import { mapGetters } from 'vuex';
export default {
  components: { BaseCatalog },
  data() {
    return {
      loading: true,
      search: ''
    };
  },
  computed: {
    ...mapGetters({
      getFiltersPages: 'catalog/getFiltersPages',
      getId: 'catalog/getCatId',
      getActiveFilters: "catalog/getActiveFilters",
    }),
  },
  beforeDestroy() {
    if(this.$route.name.match('catalog-brands') || this.$route.name.match('catalog-collections')) {
      // console.log('Страница брендов или коллекций')
      this.$store.commit("catalog/updateActiveFilters", {});
      // this.$store.commit("catalog/updateQueryFilters", { f: {}, filters: {} });
    } else if (this.getFiltersPages.id.id == this.$route.params.id || this.getFiltersPages.id.id == this.$route.query.q) {
      // console.log("updateQueryFilters");
      this.$store.commit("catalog/updateActiveFilters", {});
      this.$store.commit("catalog/updateQueryFilters", { f: {}, filters: {} });
    } else {
      // console.log("clear all");
      this.$store.commit("catalog/clearFilters");
    }
  },
  async asyncData(params) {
    return await getDataSearch(params)
  },
  methods: {
    submitSearch() {
      if(this.search.trim()){
        this.$router.push({ path: '/catalog/search', query: { q: this.search } })
      }
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
      if (v.collection && v.collection.length > 0) {
        filters.collection = v.collection;
      }
      if(typeof v.price == 'object' || typeof v.brand == 'object' || v.f[0] || typeof v.collection == 'object') {
        this.$router.push({ query: Object.assign({}, this.$route.query, { filters: JSON.stringify(filters), f: JSON.stringify(v.f), page: 0 }) });
      }
    },
    "$route": {
      async handler() {
        this.loading = true;
        let p = await getDataSearch({ route: this.$route, $axios: this.$axios, $config: this.$config, error: this.$error, store: this.$store });
        this.loading = false;
        this.data = p.data;
        // console.log('route')
        // for(const key in this.dataFilters) {
        //   if(key == 'f') {
        //     if(Object.values(this.dataFilters[key]).length > 0) {
        //       break;
        //     }
        //   } else if (this.dataFilters[key].length > 0) {
        //     break;
        //   } else {
        //     this.dataFilters = p.dataFilters
        //   }
        // }
        window.scrollTo(0,0);

        // this.activeFilters = p.activeFilters;
        this.pager = p.pager;
        this.searchInput = p.searchInput;
        this.search = '';
      },
    },
    '$route.query.q'() {
      this.$store.commit("catalog/updateActiveFilters", {});
      this.$store.commit("catalog/updateQueryFilters", { f: {}, filters: {} });
      this.valueFilters = { "f":{} };
  }
  }
}
</script>
