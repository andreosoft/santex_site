<template>
  <div class="parent">
    <catalog-filterResult 
      ref="filterResult"
      @filterResult="onUpdateData" 
      :locationRes="dy" 
      :resultData="resultData.count"
    />
    <div class="space-check">
      <catalog-price 
      @location="locationResult" 
      title="Цена, руб." 
      v-model="dataPrice" 
      :max="activeFilters && activeFilters?.price ? activeFilters?.price?.max_price : filters?.price?.max_price" 
      :min="activeFilters && activeFilters?.price ? activeFilters?.price?.min_price : filters?.price?.min_price"
      />
        <catalog-brands
        v-if="filters.brands && filters.brands.length>1"
        @location="locationResult"
        :params="filters.brands"
        v-model="dataF.brand"
        :activeParams="resultData && resultData?.brands ? resultData?.brands : activeFilters?.brands"
        :dataF="dataF"
        />
        <v-divider v-if="filters.brands && filters.brands.length>1" class="my-4" />
        <catalog-collections
        class="mt-4"
        v-if="filters.collections && filters.collections.length>1"
        @location="locationResult"
        :params="filters.collections"
        :activeParams="resultData && resultData?.collections ? resultData?.collections : activeFilters?.collections"
        v-model="dataF.collection"
        :dataF="dataF"
        />
        <v-divider v-if="filters.collections && filters.collections.length>1" class="my-4" />
        <catalog-categories class="mt-4"
        v-if="filters.categories && filters.categories.length>1"
        @location="locationResult"
        :params="filters.categories"
        :activeParams="resultData && resultData?.categories ? resultData?.categories : activeFilters?.categories"
        v-model="dataF.category_id"
        :dataF="dataF"
        />
      <v-divider  v-if="filters.categories && filters.categories.length>1" class="my-4" />
    </div>
    <div v-for="(el, i) in filters.filters" :key="i">
      <div>
        <div v-if="el.type == 2" class="space-check">
          <catalog-ranges 
          v-if="el.numFilters.length > 1" 
          @location="locationResult" 
          :title="el.name" 
          v-model="dataF[el.filters_id]" 
          :params="el.numFilters" 
          :activeParams="activeFilters?.filters"
          :minV="el.min" 
          :maxV="el.max" 
          />
        </div>
        <div v-else class="space-check">
          <catalog-check1 
          v-if="el.filters.length > 1" 
          v-model="dataF[el.filters_id]" 
          @location="locationResult" 
          :idFilters="el.filters_id"
          :title="el.name" 
          :params="el.filters" 
          :activeParams="resultData && resultData?.filters ? resultData?.filters : activeFilters?.filters"
          :filters_data="el.filters_data" 
          :dataF="dataF"
          />
          <v-divider v-if="el.filters.length > 1" class="my-4" />
        </div>
      </div>
    </div>
    <v-btn 
      @click="toggleFunction($event)" 
      outlined
      class="s-btn-cart s-btn-text clearBtn w-100 mt-3">       
      Сбросить фильтр
       <img class="ml-2 el_card" src="/icons/Close catalog.svg" alt="">
     </v-btn>
  </div>
</template>

<script>
import {debounce} from "lodash";
export default {
  props: {
    value: Object,
    filters: Object,
    activeFilters: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dataF: {
        brand: [],
        category_id: [],
        collection: []
      },
      dataPrice: [],
      dy: 0,
      resultData: {},
      disTop: 400,
      timeFilter: 0
    };
  },
  created() { this.initValueFilters(); },
  // mounted() {
  //   this.$nextTick(() => {
  //     // let elem = this.$refs.filterResult;
  //     // function getDistanceToDocumentTop(element) {
  //     //       return window.scrollY + element.getBoundingClientRect().top;
  //     //     }
  //     //     if(elem){
  //     //       // console.log(elem.$el);
  //     //       this.disTop = getDistanceToDocumentTop(elem.$el) + 30;
  //     //       // console.log(this.disTop);
  //     //     }
  //   })
  // },
  watch:{
    activeFilters: function(){
      if(this.activeFilters) {
        this.timeFilter = 1000
      }
    },
    filters: function(){this.initValueFilters();},
    value: function(){
        this.initValueFilters();
        this.value.brand ? this.dataF.brand = this.value.brand : this.dataF.brand = [];
        this.value.collection ? this.dataF.collection = this.value.collection : this.dataF.collection = [];
        this.value.category_id ? this.dataF.category_id = this.value.category_id : this.dataF.category_id = [];
    }
  },
  // computed: {
  //   getDistanceToDocumentTop(){
  //     // let elem = this.$refs.filterResult;
  //     //     if(elem){
  //     //       console.log(elem.$el);
  //     //       console.log(this.disTop);
  //     //       return window.scrollY + elem.$el.getBoundingClientRect().top + 30;
  //     //     } else {
  //     //       return this.$refs.filterResult
  //     //     }
  //   }
  // },
  methods: {
    toggleFunction(e){
      this.clearFilters();
      this.locationResult(e.target);
    },
    clearFilters(){
      this.dataF = {
        brand: [],
        category_id: [],
        collection: []
      };
      this.dataPrice = [];
      for (const key in this.filters.filters) {
        // let f = [];
        // if (this.value?.f[this.filters.filters[key]["filters_id"]]){
        //   f = this.value.f[this.filters.filters[key]["filters_id"]];
        // } 
        // console.log(this.filters.filters[key]["filters_id"], f);
        this.$set(this.dataF, this.filters.filters[key]["filters_id"], []);
      }
      this.resultData = {};
    },
    initValueFilters() {
      this.dataF = {
        brand: this.value.brand ? this.value.brand : [],
        collection: this.value.collection ? this.value.collection : [],
        category_id: this.value.category_id ? this.value.category_id : [],
      };
      this.dataPrice = this.value.price ? this.value.price : [];
      for (const key in this.filters.filters) {
        let f = [];
        if (this.value?.f[this.filters.filters[key]["filters_id"]]){
          f = this.value.f[this.filters.filters[key]["filters_id"]];
        } 
        // console.log(this.filters.filters[key]["filters_id"], f);
        this.$set(this.dataF, this.filters.filters[key]["filters_id"], f);
      }
        // for (const key in this.filters.brands) {
        //   if(this.filters.brands[key].brand){
        //     let f = [];
        //     if (this.value?.f[this.filters.brands[key].brand]) f = this.value.f[this.filters.brands[key].brand];
        //     this.$set(this.dataF["brands"], this.filters.brands[key].brand, f);
        //   }
        // }
    },
    onUpdateData() {
      let r = {};
      for (const i in this.dataF) {
        if (this.dataF[i].length > 0 && i !== "brand" && i !== "collection" && i !== "category_id") {
          r[i] = this.dataF[i];
        }
      }


      // Подгрузка товаров
      this.$emit('input', { 
        f: r,
        price: this.dataPrice, 
        brand: this.dataF.brand.length !== 0 ? this.dataF.brand : [], 
        category_id: this.dataF.category_id.length !== 0 ? this.dataF.category_id : [],
        collection: this.dataF.collection.length !== 0 ? this.dataF.collection : []
      });

      this.dy = 0;
      window.scrollTo(0, 0);
    },
    locationResult: debounce(async function(v){
      try {
        let rect = v.getBoundingClientRect();
        let scrolltop = window.scrollY + rect.top;
        const middleY = scrolltop + rect.height / 2;
        this.dy = middleY - this.disTop;


        let r = {};
        for (const i in this.dataF) {
          if (this.dataF[i].length > 0 && i !== "brand" && i !== "collection" && i !== "category_id") {
            r[i] = this.dataF[i];
          }
        }

        // console.log(r);
        // this.onUpdateData();


        let filtersCount = {
          category_id: this.$route.params.id ? this.$route.params.id : '',
          brand: this.dataF.brand.length !== 0 ? this.dataF.brand : {},
          collection: this.dataF.collection.length !== 0 ? this.dataF.collection : {},
          // category_id: this.dataF.category_id.length !== 0 ? this.dataF.category_id : {},
          price: this.dataPrice.length !== 0 ? this.dataPrice : {}
        }

        if (this.$route.query.q) Object.assign(filtersCount, { "OR": [
            {id: { condition: "LIKE", value: "%" + this.$route.query.q + "%" }},
            {name: { condition: "LIKE", value: "%" + this.$route.query.q + "%" }},
            {vendor: { condition: "LIKE", value: "%" + this.$route.query.q + "%" }},
            {factory_article: { condition: "LIKE", value: "%" + this.$route.query.q + "%" }}] });

            let res, resPromote;
            if(this.$route.name.match('catalog')){
              res = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/filters', { 
          params: {
            f: r, 
            filters: filtersCount,
          }
        });
            }
        if(this.$route.name.match('promote')){
          resPromote = await this.$axios.get(this.$config.baseURL + '/api/site/promote_catalog/filters', { 
            params: {
              f: r, 
              filters: {
                "ic.promote_id": this.$route.params.id,
                brand: this.dataF.brand.length !== 0 ? this.dataF.brand : {},
                collection: this.dataF.collection.length !== 0 ? this.dataF.collection : {},
                price: this.dataPrice.length !== 0 ? this.dataPrice : {},
                category_id: this.dataF.category_id.length !== 0 ? this.dataF.category_id : {}
              },
            }
          });
        }
        this.resultData = res ? res.data.data : resPromote.data.data
        // console.log(this.resultData);
      } catch (error) {
        console.error(error)
      }
    }, 0)
  },
};
</script>

<style lang="scss">
.s-clear-filter{
  background-color: #e0e0e0 !important;
  border: unset !important;
}
</style>