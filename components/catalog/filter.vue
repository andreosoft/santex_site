<template>
  <div class="parent">
    <!-- <p>filter {{ value }}</p> -->
    <!-- <div>
      <v-btn @click="onUpdateData()">Показать</v-btn>
    </div> -->
    <catalog-filterResult @filterResult="onUpdateData" :locationRes="dy" :resultData="resultData"/>
    <div class="space-check">
      <catalog-price @location="locationResult" title="Цена, руб." v-model="dataPrice" :max="filters.price.max_price" :min="filters.price.min_price" />
        <catalog-brands
        v-if="filters.brands"
        @location="locationResult"
        :params="filters.brands"
        v-model="dataF.brand"
        />
      <v-divider class="my-4" />
    </div>
    <div v-for="(el, i) in filters.filters" :key="i">
      <div>
        <div v-if="el.type == 2" class="space-check">
          <catalog-ranges v-if="el.numFilters.length > 1" @location="locationResult" :title="el.name" v-model="dataF[el.filters_id]" :params="el.numFilters" :min="el.min" :max="el.max" />
        </div>
        <div v-else class="space-check">
          <catalog-check1 v-if="el.filters.length > 1" @location="locationResult" :title="el.name" v-model="dataF[el.filters_id]" :params="el.filters" />
          <v-divider v-if="el.filters.length > 1" class="my-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from "lodash"
export default {
  props: {
    value: Object,
    filters: Object,
  },
  data() {
    return {
      dataF: {
        brand: [],
      },
      dataPrice: [],
      dy: 0,
      resultData: 0,
    };
  },
  created() {
    this.initValueFilters();
  },
  watch:{
  //   dataF: async function(){
  //     try{
  //       let r = {};
  //       for (const i in this.dataF) {
  //         if (this.dataF[i].length > 0) {
  //           r[i] = this.dataF[i];
  //         }
  //       }
  //     }
  //     catch (error){
  //       console.error(error)
  //     }
  //   },
    filters: function(){
        //  try {
           this.initValueFilters();
          //  console.log('filters function')
        //  }
        //  catch (error){
        //    console.error(error)
        //  }
    },
    value: function(){
      // try {
        // console.log('value function')
        this.initValueFilters();
        this.value.brand ? this.dataF.brand = this.value.brand : this.dataF.brand = [];
        // console.log("Инициализировано")
      // }
      // catch (error){
      //   console.error(error)
      // }
    }
  },
  computed: {
    // onUpdateData() {
    //   if(this.resultFilterValue){
    //     let r = {};
    //     for (const i in this.dataF) {
    //       if (this.dataF[i].length > 0) {
    //         r[i] = this.dataF[i];
    //       }
    //     }
    //     this.$emit('input', { f: r, price: this.dataPrice });
    //   }
    // },
    // locationRes(){
    //     document.body.querySelector('.s-filterResult').style.left = this.dx + 'px'
    //     document.body.querySelector('.s-filterResult').style.top = this.dy + 'px'
    // }
  },
  methods: {
    initValueFilters() {
      this.dataF = {
        brand: [],
      };
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
        if (this.dataF[i].length > 0 && i !== "brand") {
          r[i] = this.dataF[i];
        }
      }

      // console.log(r);
      // console.log(this.dataF.brand);
      this.$emit('input', { f: r, price: this.dataPrice, brand: this.dataF.brand.length !== 0 ? this.dataF.brand : []  });

      this.dy = 0;
      window.scrollTo(0, 0);
    },
    locationResult: debounce(async function(v){
      try {
        // console.log(v);
        let rect = v.getBoundingClientRect();
        // console.log(rect);
        // let scrolltop = document.body.querySelector('.parent').getBoundingClientRect().top + scrollY;
        // console.log(scrolltop);
        let scrolltop = window.pageYOffset + rect.top;
        // let elem = document.body.querySelector('.parent');
        // let rectElem = elem.getBoundingClientRect();
        // let scrollTopElem = window.pageYOffset || document.documentElement.scrollTop;
        // let parentTop = rectElem.top + scrollTopElem;
        // console.log(parentTop)
        this.dy = scrolltop - 418;

        let r = {};
        for (const i in this.dataF) {
          if (this.dataF[i].length > 0 && i !== "brand") {
            r[i] = this.dataF[i];
          }
        }
        let filtersCount = {
          category_id: this.$route.params.id ? this.$route.params.id : '',
          brand: this.dataF.brand.length !== 0 ? this.dataF.brand : {},
          price: this.dataPrice.length !== 0 ? this.dataPrice : {},
          status: 1
        }

        if (this.$route.query.q) Object.assign(filtersCount, { "OR": [
            {id: { condition: "LIKE", value: "%" + this.$route.query.q + "%" }},
            {name: { condition: "LIKE", value: "%" + this.$route.query.q + "%" }},
            {vendor: { condition: "LIKE", value: "%" + this.$route.query.q + "%" }},
            {factory_article: { condition: "LIKE", value: "%" + this.$route.query.q + "%" }}] });

            let res, resPromote;
            if(this.$route.name.match('catalog')){
              res = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/count', { 
          params: {
            f: r, 
            filters: filtersCount,
            // sort: {
            //   price: 'asc',
            //   order: 'asc'
            // },
            // pager: {
            //   count: 0,
            //   limit: 30,
            //   page: "0"
            // },
          }
        });
            }
        if(this.$route.name.match('promote')){
          resPromote = await this.$axios.get(this.$config.baseURL + '/api/site/promote_catalog/count', { 
            params: {
              f: r, 
              filters: {
                "ic.promote_id": this.$route.params.id,
                brand: this.dataF.brand.length !== 0 ? this.dataF.brand : {},
                price: this.dataPrice.length !== 0 ? this.dataPrice : {},
                status: 1
              },
              // sort: {
              //   price: 'asc',
              //   order: 'asc'
              // },
              // pager: {
              //   count: 0,
              //   limit: 30,
              //   page: "0"
              // },
            }
          });
        }
        this.resultData = res ? res.data.data : resPromote.data.data
      } catch (error) {
        console.error(error)
      }
    }, 1000)
  }
};
</script>