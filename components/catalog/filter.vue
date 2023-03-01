<template>
  <div>
    <div>
      <catalog-price title="Цена, руб." v-model="data.price" :max="value.price.max_price" :min="value.price.min_price" />
      <v-divider class="my-4" />
    </div>
    <div v-for="(el, i) in value.filters" :key="i">
      <catalog-check1 :title="el.name" v-model="data.material" :params="el.filters" />
      <v-divider class="my-4" />
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