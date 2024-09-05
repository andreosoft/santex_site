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
    :dataFilters="dataFilters"
    :valueFilters="valueFilters"
    :activeFilters="activeFilters"
    :pager="pager"
    :sort="sort"
    @update-filters="dataFilters = $event" 
    @update-data="valueFiltersFinal" />
    <div class="text-center mt-10 ">
      <common-pagination :value="pager" />
    </div>
  </v-container>
</template>

<script>
import { getDataSearch } from "@/pages/catalog/search/getDataSearch";
import BaseCatalog from "@/components/catalog/base-catalog.vue";

export default {
  components: { BaseCatalog },
  data() {
    return {
      loading: true,
      search: ''
    };
  },
  async asyncData({ route, $axios, $config, error }) {
    return await getDataSearch({ route, $axios, $config, error })
  },
  methods: {
    submitSearch() {
      if(this.search.trim()){
        this.$router.push({ path: '/catalog/search', query: { q: this.search } })
      }
    },
    valueFiltersFinal(v) {
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
  },
  watch: {
    "$route": {
      async handler() {
        this.loading = true;
        let p = await getDataSearch({ route: this.$route, $axios: this.$axios, $config: this.$config, error: this.$error });
        this.loading = false;
        this.data = p.data;

        
        for(const key in this.dataFilters) {
          if(key == 'f') {
            if(Object.values(this.dataFilters[key]).length > 0) {
              break;
            }
          } else if (this.dataFilters[key].length > 0) {
            break;  
          } else {
            this.dataFilters = p.dataFilters
          }
        }
        window.scrollTo(0,0);



        this.activeFilters = p.activeFilters;
        this.pager = p.pager;
        this.searchInput = p.searchInput;
        this.search = '';
      },
    },
  }
}
</script>
