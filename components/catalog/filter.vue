<template>
  <div class="parent">
    <!-- <p>filter {{ value }}</p> -->
    <!-- <div>
      <v-btn @click="onUpdateData()">Показать</v-btn>
    </div> -->
    <!-- {{ dataPrice }}
    {{ dataF }}
    {{ dx }}
    {{ dy }} -->
    <div class="space-check">
      <catalog-price @location="locationResult" title="Цена, руб." v-model="dataPrice" :max="filters.price.max_price" :min="filters.price.min_price" />
      <catalog-filterResult @filterResult="filterResults" :locationRes="dy !=0 ? dy : 0"/>
      <v-divider class="my-4" />
    </div>
    <div v-for="(el, i) in filters.filters" :key="i">
      <div>
        <div v-if="el.type == 2" class="space-check">
          <catalog-ranges @location="locationResult" :title="el.name" v-model="dataF[i]" :params="el.numFilters" :min="el.min" :max="el.max" />
        </div>
        <div v-else class="space-check">
          <catalog-check1 @location="locationResult" :title="el.name" v-model="dataF[i]" :params="el.filters" />
          <v-divider class="my-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    updateDataFilters: Function,
    value: Object,
    filters: Object,
    id: String
  },
  data() {
    return {
      dataF: {},
      dataPrice: [],
      dy: 0
    };
  },
  created() {
    this.initValueFilters();
  },
  watch:{
    dataF: async function(){
      try{
        let r = {};
        for (const i in this.dataF) {
          if (this.dataF[i].length > 0) {
            r[i] = this.dataF[i];
          }
        }
        // if (this.id) Object.assign(filters, { category_id: category_id });
        // const resp = await this.$axios.get(this.$config.baseURL + '/api/site/catalog', { f: r, price: this.dataPrice });
        // console.log(resp.data.data);
      }
      catch (error){
        console.error(error)
      }
    },
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
      for (const key in this.filters.filters) {
        let f = [];
        if (this.value?.f[key]) f = this.value.f[key];
        this.$set(this.dataF, key, f);
      }
    },
    onUpdateData() {
      let r = {};
      for (const i in this.dataF) {
        if (this.dataF[i].length > 0) {
          r[i] = this.dataF[i];
        }
      }
      // console.log({ f: r, price: this.dataPrice });
      this.$emit('input', { f: r, price: this.dataPrice });
      this.dy = 0;
      window.scrollTo(0, 0);
    },
    filterResults() {
      this.onUpdateData();
    },
    locationResult(v){
      let rect = v.getBoundingClientRect();
      let scrolltop = window.pageYOffset + rect.top;
      this.dy = scrolltop-235;
      console.log(this.dy)
    }
  }
};
</script>