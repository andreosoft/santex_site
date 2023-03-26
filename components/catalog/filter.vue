<template>
  <div>
    <div class="space-check">
      <catalog-price title="Цена, руб." v-model="data.price" :max="value.price.max_price" :min="value.price.min_price" />
<!--      <v-divider class="my-4" />-->
      <p>{{rangevalues}}</p>
    </div>
<div v-for="(el, i) in value.filters" :key="i">
    <div v-if="el.type == 2" class="space-check">
      <catalog-ranges :title="el.name" :params="el.filters" :min="el.min" :max="el.max"/>
    </div>
    <div v-else class="space-check">
      <catalog-check1 :title="el.name" v-model="data.material" :params="el.filters"/>
<!--      <v-divider class="my-4" />-->
    </div>
</div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
  },
  data() {
    return {
      rangevalues: [],
      data: {
        price: [this.value.price.min_price, this.value.price.max_price],
        material: [],
      },
      filter: {
        price: {
          max: 1000,
          min: 0,
        },
        material: ["Один параметр", "Два параметр", "Три параметр"],
      },
    };
  },

};
</script>
