<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>Поиск</h1>
    <!-- <p>name {{valueFilters}}</p> -->
    <div class="mb-10">
        <p><b>Вы искали: </b><span class="underlined">{{searchInput}}</span>, найдено {{ data.length }} шт.</p>
    </div>
    <v-divider class="mb-10"/>
   <base-catalog :value="searchInput" :data="data" :dataFilters="dataFilters" :valueFilters="valueFilters" :pager="pager" :sort="sort" @update-data="updateValueFilters"/>
   <!-- <test :value="valueFilters"/> -->
<!--    <v-row  class="s-row">-->
<!--      <v-col cols="3">-->
<!--        <catalog-filter v-model="filter" />-->
<!--      </v-col>-->
<!--      <v-col cols="9">-->
<!--        <catalog-top-bar />-->
<!--        <v-row  class="s-row">-->
<!--          <v-col cols="4" v-for="(el, i) in data" :key="i">-->
<!--            <catalog-item-list :el="el" />-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-col>-->
<!--    </v-row>-->
    <div class="text-center mt-10 ">
      <v-pagination v-model="page" :length="4" circle></v-pagination>
    </div>
  </v-container>
</template>

<script>
import {getData} from "@/pages/catalog/getData";
import BaseCatalog from "@/components/catalog/base-catalog.vue";
// console.log(searchInput);
export default {
  components: {BaseCatalog},
  data() {
    return {
      carouselModel: 0,
      page: 1,
      filter: {
        price: {},
      },
      valueFilters: {
        f: {}
      },
      filters: { parent_id: 0 },
      sort: { key: "name", order: "ASC" },

    };
  },
  methods: {
    updateValueFilters(value){
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
        let p = await getData({ route: this.$route, $axios: this.$axios, $config: this.$config });
        this.data = p.data;
        this.pager = p.pager;
      },
    },
    },
    async asyncData({ route, $axios, $config }) {
      // console.log(route);
      // console.log($axios);
      // console.log($config);
      return await getData({ route, $axios, $config });
    },
}
</script>
