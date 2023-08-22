<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>Блог</h1>
    <h2>Полезные советы в ремонте</h2>
    <div>
      <blog-carusel :items="blogData1" :type="2" />
    </div>

    <v-divider class="my-10 pa-0" />
    <h2>Обзор квартир и домов</h2>
    <blog-carusel :items="blogData2" :type="3" />
    <v-divider class="my-10 pa-0" />
    <h2>Новинки в сфере дизайна интерьера</h2>
    <blog-carusel :items="blogData3" :type="3" />
    <v-divider class="my-10 pa-0" />
    <h2>Прогуляемся по европейским производствам</h2>
    <blog-carusel :items="blogData4" :type="3" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      carouselModel: 0,
    };
  },
  async asyncData({ $http, $axios, $config }) {
    const breadcrumbsData = [
      {
        url: "",
        title: "Блог",
      },
    ];

    let blogData1 = [];
    try {
      blogData1 = (await $axios.get($config.baseURL + '/api/site/content', {
        params: {
          filters: { parent_id: 8, status: 1 },
          sort: { "key": "id", "order": "ASC" }
        }
      })).data.data;
    } catch (error) {
      console.error(error);
    }
    let blogData2 = [];
    try {
      blogData2 = (await $axios.get($config.baseURL + '/api/site/content', {
        params: {
          filters: { parent_id: 9, status: 1 },
          sort: { "key": "id", "order": "ASC" }
        }
      })).data.data;
    } catch (error) {
      console.error(error);
    }
    let blogData3 = [];
    try {
      blogData3 = (await $axios.get($config.baseURL + '/api/site/content', {
        params: {
          filters: { parent_id: 10, status: 1 },
          sort: { "key": "id", "order": "ASC" }
        }
      })).data.data;
    } catch (error) {
      console.error(error);
    }
    let blogData4 = [];
    try {
      blogData4 = (await $axios.get($config.baseURL + '/api/site/content', {
        params: {
          filters: { parent_id: 11, status: 1 },
          sort: { "key": "id", "order": "ASC" }
        }
      })).data.data;
    } catch (error) {
      console.error(error);
    }

    return { breadcrumbsData, blogData1, blogData2, blogData3, blogData4 };
  },
};
</script>