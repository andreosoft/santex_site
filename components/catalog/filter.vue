<template>
  <div>
    <catalog-price
      title="Цена, руб."
      v-model="data.price"
      :max="filter.price.max"
      :min="filter.price.min"
    />
    <v-divider class="my-4" />
    <catalog-check1
      title="Производить"
      v-model="data.material"
      :params="filter.material"
    />
    <v-divider class="my-4" />
    <catalog-check1
      title="Материал"
      v-model="data.material"
      :params="filter.material"
    />
    <v-divider class="my-4" />
    <catalog-check1
      title="Размер"
      v-model="data.material"
      :params="filter.material"
    />
    <v-divider class="my-4" />
    <catalog-check1
      title="Параметр"
      v-model="data.material"
      :params="filter.material"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        price: [0, 10000],
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