<template>
  <div>
    <index-mainCarusel :items="carouselItems" class="mb-10" />
    <index-mainInfoBlock />
    <common-divider1 class="mb-10" />
    <index-new-items v-if="newItems" :items="newItems" class="mb-5" />
    <common-divider1 v-if="newItems" class="mb-10" />
    <index-guide-style-items :items="dataInterior" class="mb-5" />
    <common-divider1 class="mb-10" />
    <index-catalog-items :items="catalogItems" class="mb-5" />
    <common-divider1 class="mb-10" />
    <index-salesItems v-if="salesItems" :items="salesItems" class="mb-5" />
    <common-divider1 v-if="salesItems" class="mb-10"/>
    <index-video :item="videoItem" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouselModel: 0,
    };
  },
  async asyncData({ $axios, $config }) {
   
    let dataInterior = [];
    try {
      dataInterior = (await $axios.get($config.baseURL + '/api/site/interior')).data.data;
    } catch (error) {
      console.error(error);
    }
let salesItems = [];
    try {
      salesItems = (await $axios.get($config.baseURL + '/api/site/promote', { params: { filters: { type: 3, status: 1 } } })).data.data;
      // console.log('Товары со скидкой')
      // console.log(salesItems);
    } catch (error) {
      console.error(error);
    }
    // console.log(salesItems);
    let salesRes;
  try {
      salesRes = (await $axios.get($config.baseURL + '/api/site/promote_catalog', {
        params: {
          f: {},
          filters: {"status": 1, "ic.promote_id": salesItems[0].id},
          sort: { key: "price", order: "ASC" },
          pager: { page: 0, count: 0, limit: 0 }
        }
      })).data.data;
  } catch (e) {
    console.error(e);
  }

    const videoItem = {
      img: "/img/coll1.png",
      video: "https://www.youtube.com/embed/nOKam63GgzQ"
    }
    let newItems = [];
    try {
      newItems = (await $axios.get($config.baseURL + '/api/site/promote', {
        params: {
          filters: { status: 1, type: 2},
        },
      })).data.data;
    } catch (error) {
      console.error(error);
    }
    // console.log(newItems);
  let itemsNewRes;
  try {
      itemsNewRes = (await $axios.get($config.baseURL + '/api/site/promote_catalog', {
        params: {
          f: {},
          filters: {"status": 1, "ic.promote_id": newItems[0].id},
          sort: { key: "price", order: "ASC" },
          pager: { page: 0, count: 0, limit: 0 }
        }
      })).data.data;
  } catch (e) {
    console.error(e);
  }


    let catalogItems = [];
    try {
      catalogItems = (await $axios.get($config.baseURL + '/api/site/categories', {
        params: {
          filters: { status: 1, main_show: 1 },
          sort: { "key": "sort", "order": "ASC" }
        },
      })).data.data;
    } catch (error) {
      console.error(error);
    }
    let carouselItems = [];
    try {
      carouselItems = (await $axios.get($config.baseURL + '/api/site/content', {
        params: {
          filters: { parent_id: 5 },
          sort: { "key": "id", "order": "ASC" }
        }
      })).data.data;
    } catch (error) {
      console.error(error);
    }

    return { 
      carouselItems, 
      newItems,
      itemsNewRes,
      catalogItems, 
      videoItem, 
      dataInterior, 
      salesItems,
      salesRes 
    };
  },
};
</script>