<template>
  <div class="parent">
    <!-- <p>filter {{ value }}</p> -->
    <div>
      <v-btn @click="onUpdateData(), updateDataFilters()">Показать</v-btn>
    </div>
    <div class="space-check">
      <catalog-price title="Цена, руб." v-model="dataPrice" :max="filters.price.max_price" :min="filters.price.min_price" />
      <v-divider class="my-4" />
    </div>
    <div v-for="(el, i) in filters.filters" :key="i">
      <div>
        <div v-if="el.type == 2" class="space-check">
          <catalog-ranges :title="el.name" v-model="dataF[i]" :params="el.numFilters" :min="el.min" :max="el.max" />
        </div>
        <div v-else class="space-check">
          <catalog-check1 :title="el.name" v-model="dataF[i]" :params="el.filters" />
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
    filters: Object
  },
  data() {
    return {
      dataF: {},
      dataPrice: [],
    };
  },
  created() {
    this.initValueFilters();
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
      this.$emit('input', { f: r, price: this.dataPrice });
    }
  }
};
</script>