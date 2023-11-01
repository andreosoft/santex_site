<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>Поиск</h1>
    <div class="mb-10">
      <p><b>Вы искали: </b><span class="underlined">{{ searchInput }}</span>, найдено {{ pager.count }} шт.</p>
    </div>
    <v-divider class="mb-10" />
    <base-catalog
    :id="category_id"
    :value="searchInput"
    :loading="loading"
    :data="data"
    :dataFilters="dataFilters"
    :valueFilters="valueFilters"
    :pager="pager"
    :sort="sort"
    @update-filters="dataFilters = $event" 
    @update-data="updateValueFilters" />
    <div class="text-center mt-10 ">
      <common-pagination :value="pager" />
    </div>
  </v-container>
</template>

<script>
import { getData } from "@/pages/catalog/getData";
import BaseCatalog from "@/components/catalog/base-catalog.vue";

export default {
  components: { BaseCatalog },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    updateValueFilters(value) {
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
        this.loading = true;
        let p = await getData({ route: this.$route, $axios: this.$axios, $config: this.$config });
        this.loading = false;
        this.data = p.data;
        this.dataFilters = p.dataFilters;
        this.valueFilters = p.valueFilters;
        this.pager = p.pager;
        this.searchInput = p.searchInput;
      },
    },
  },
  async asyncData({ route, $axios, $config }) {
    return await getData({ route, $axios, $config });
  },
}
</script>
