<template>
  <div class="parent">
    <catalog-filterResult ref="filterResult" :loading="loading" @filterResult="onUpdateData" :locationRes="dy"
      :resultData="resultData" />
    <div class="space-check">
      <catalog-price @location="locationResult" title="Цена, руб." v-model="dataPrice"
        :max="activeFilters && activeFilters?.price ? activeFilters?.price?.max_price : filters?.price?.max_price"
        :min="activeFilters && activeFilters?.price ? activeFilters?.price?.min_price : filters?.price?.min_price" />

      <catalog-brands v-if="filters.brands && filters.brands.length > 1" @location="locationResult"
        :params="filters.brands" v-model="dataF.brand" :activeParams="activeFilters.brands" :key="filtersKeyBrand" />
      <v-divider v-if="filters.brands && filters.brands.length > 1" class="my-4" />
      <catalog-collections class="mt-4" v-if="filters.collections && filters.collections.length > 1"
        @location="locationResult" :key="filtersKeyColl" :params="filters.collections"
        :activeParams="activeFilters.collections" v-model="dataF.collection" />
      <v-divider v-if="filters.collections && filters.collections.length > 1" class="my-4" />
      <catalog-categories class="mt-4" v-if="filters.categories && filters.categories.length > 1"
        @location="locationResult" :key="filtersKeyCat" :params="filters.categories"
        :activeParams="activeFilters.categories" v-model="dataF.category_id" />
      <v-divider v-if="filters.categories && filters.categories.length > 1" class="my-4" />
    </div>
    <div v-for="(el, i) in filters.filters" :key="i">
      <div>
        <div v-if="el.type == 2" class="space-check">

          <catalog-price v-if="el.max != el.min" @location="locationResult" :title="el.name"
            v-model="dataF[el.filters_id]" :max="el.max" :min="el.min" />
          <!-- <catalog-ranges v-if="el.max != el.min" @location="locationResult" :title="el.name"
            v-model="dataF[el.filters_id]" :activeParams="activeFilters.filters" :minV="el.min" :maxV="el.max" /> -->
        </div>
        <div v-else class="space-check">
          <catalog-check1 v-if="el.filters_data.length > 1" v-model="dataF[el.filters_id]" @location="locationResult"
            :title="el.name" :params="el.filters_data" :activeParams="activeFilters.filters" />
          <v-divider v-if="el.filters_data.length > 1" class="my-4" />
        </div>
      </div>
    </div>
    <v-btn @click="toggleFunction($event)" outlined class="s-btn-cart s-btn-text clearBtn w-100 mt-3">
      Сбросить фильтр
      <img class="ml-2 el_card" src="/icons/Close catalog.svg" alt="">
    </v-btn>
  </div>
</template>

<script>
import { debounce } from "lodash";
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
      loading: false,
      dataF: {
        brand: [],
        category_id: [],
        collection: []
      },
      dataPrice: [],
      filtersKeyBrand: 0,
      filtersKeyColl: 1,
      filtersKeyCat: 2,
      dy: 0,
      resultData: {},
      disTop: 400,
      timeFilter: 0
    };
  },
  created() { this.initValueFilters(); },
  mounted() {
    if (this.activeFilters && Object.keys(this.activeFilters).length > 0) {
      this.updateFiltersData(this.activeFilters);
    }
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
  },
  watch: {
    activeFilters: function () {
      if (this.activeFilters) {
        this.timeFilter = 1000
      }
    },
    filters: function () { this.initValueFilters(); },
    value: function () {
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
    toggleFunction(e) {
      this.clearFilters();
      this.locationResult(e.target);
    },
    clearFilters() {
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
        if (this.value?.f[this.filters.filters[key]["filters_id"]]) {
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
    locationResult: debounce(async function (v) {
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

        if (this.$route.query.q) Object.assign(filtersCount, {
          "OR": [
            { id: { condition: "LIKE", value: "%" + this.$route.query.q + "%" } },
            { name: { condition: "LIKE", value: "%" + this.$route.query.q + "%" } },
            { vendor: { condition: "LIKE", value: "%" + this.$route.query.q + "%" } },
            { factory_article: { condition: "LIKE", value: "%" + this.$route.query.q + "%" } }]
        });

        let res, resPromote;
        if (this.$route.name.match('catalog')) {
          this.loading = true;
          try {
            res = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/filters/count', {
              params: {
                f: r,
                filters: filtersCount,
              }
            });
            this.updateFiltersData(res.data.data);
          } catch (error) {
            console.error(error);
          }
          this.loading = false;
        }
        if (this.$route.name.match('promote')) {
          this.loading = true;
          try {
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
          } catch (error) {
            console.error(error);
          }
          this.loading = false;
        }
        this.resultData = res ? res.data.data : resPromote.data.data
        // console.log(this.resultData);
      } catch (error) {
        console.error(error)
      }
    }, 0),
    updateFiltersData(data) {
      const updatedData = data.filters;
      // console.log('updatedData' + data);
      // console.log(this.filters);
      // console.log(data)
      for (const el of this.filters.filters) {
        if (el.type == 1) {
          const updatedFilter = updatedData.find(e => e.filters_id == el.filters_id);
          if (updatedFilter) {
            for (const filterEl of el.filters_data) {
              if (updatedFilter.filters_data.find(e => e.value == filterEl.value)) {
                filterEl.disabled = false;
              } else {
                let r;
                // console.log(el.filters_id)
                for (const key in this.dataF) {
                  // console.log(el.filters_id)
                  if (this.dataF[key] && this.dataF[key].length > 0 && +key !== +el.filters_id) {
                    r = true
                    // console.log(+key == +el.filters_id ? [key, el.filters_id] : false)
                    // console.log(this.dataF[key]);
                    break;
                  } else {
                    r = false
                  }
                  // console.log(r);
                }
                r ? filterEl.disabled = true : filterEl.disabled = false
              }
            }
          } else {
            for (const filterEl of el.filters_data) {
              // console.log(this.dataF.hasOwnProperty(el.filters_id));
              // console.log(this.dataF[el.filters_id].find(item => item == filterEl.value));
              if (this.dataF.hasOwnProperty(el.filters_id) && this.dataF[el.filters_id].find(item => item == filterEl.value)) {
                // console.log('Элемент есть в фильтре');
                el.disabled = false;
              } else {
                let r;
                for (const key in this.dataF) {
                  if (this.dataF[key] && this.dataF[key].length > 0 && +key !== +el.filters_id) {
                    r = true
                    // console.log(this.dataF[key]);
                    break;
                  } else {
                    r = false
                  }
                  // console.log(r);
                }
                // console.log('"Элемента ваще нигде нет"' + filterEl);
                r ? filterEl.disabled = true : filterEl.disabled = false
              }
            }
          }
        }
      }

      for (const el of this.filters.brands) {
        const a = data.brands.find(e => e.brand == el.brand);
        if (a) {
          el.disabled = false;
        } else {
          if (this.dataF.brand.find(item => item == el.brand)) {
            el.disabled = false;
          } else {
            let r;
            for (const key in this.dataF) {
              if (this.dataF[key] && this.dataF[key].length > 0 && key !== "brand") {
                r = true
                // console.log(this.dataF[key]);
                break;
              } else {
                r = false
              }
              // console.log(r);
            }
            r ? el.disabled = true : el.disabled = false
          }
        }
      }

      for (const el of this.filters.collections) {
        const b = data.collections.find(e => e.collection == el.collection);
        if (b) {
          el.disabled = false;
        } else {
          if (this.dataF.collection.find(item => item == el.collection)) {
            el.disabled = false;
          } else {
            let r;
            for (const key in this.dataF) {
              if (this.dataF[key] && this.dataF[key].length > 0 && key !== "collection") {
                r = true
                // console.log(this.dataF[key]);
                break;
              } else {
                r = false
              }
              // console.log(r);
            }
            r ? el.disabled = true : el.disabled = false
          }
        }
      }
      this.filtersKeyBrand++;
      this.filtersKeyColl++;
      this.filtersKeyCat++;
    }
  },
}
</script>

<style lang="scss">
.s-clear-filter {
  background-color: #e0e0e0 !important;
  border: unset !important;
}
</style>