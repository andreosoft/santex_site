<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ title }}</h1>
    <v-row class="s-row">
      <v-col cols="3">
        <catalog-filter v-model="filter" />
      </v-col>
      <v-col cols="9">
        <div>
          <div class="s-tail-header">
            <nuxt-link to="/catalog/tile/1"  class="s-tail-header-title active"><img src="/icons/tail1.svg"/>Товары<span class="s-taile-count">1260</span></nuxt-link>
            <nuxt-link to="/catalog/collection/1"  class="s-tail-header-title"><img src="/icons/tail2.svg"/>Коллекции<span class="s-taile-count">25</span></nuxt-link>
          </div>
        </div>
        <catalog-top-bar />
        <v-row class="s-row">
          <v-col cols="4" v-for="(el, i) in data" :key="i">
            <catalog-item-list-tail :el="el" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="text-center mt-10 ">
      <v-pagination v-model="page" :length="4" circle></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabModel: 0,
      filter: {
        price: {},
      },
    };
  },
  async asyncData(params) {
    console.log(params);
    const title = "Плитка";
    const data = [
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/1.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/2.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/3.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/4.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/5.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/6.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/1.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/1.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
      {
        id: 100,
        name: "Название товара",
        image: ["/img/catalog/tail/1.png"],
        code: "4554545",
        price: 1540,
        old_price: 8220,
        brend_name: "Название бренда",
        size: "44 x 75 x 20",
        available: 1,
      },
    ];
    const breadcrumbsData = [
      {
        url: "",
        title: "Каталог",
      },
      {
        url: "",
        title: title,
      },
    ];
    return { title, data, breadcrumbsData };
  },
};
</script>