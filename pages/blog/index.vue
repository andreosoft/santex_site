<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>Блог</h1>
    <h2>Полезные советы в ремонте</h2>
    <p>
      <blog-carusel :items="blogData1" />
    </p>

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
  async asyncData({ $http }) {
    const breadcrumbsData = [
      {
        url: "",
        title: "Блог",
      },
    ];
    const blogData1 = [
      {
        img: "/img/blog/1.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/2.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/1.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/2.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
    ];
    const blogData2 = [
      {
        img: "/img/blog/3.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/4.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/5.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/6.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
    ];
    const blogData3 = [
      {
        img: "/img/blog/6.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/7.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/8.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/9.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
    ];
    const blogData4 = [
      {
        img: "/img/blog/10.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/10.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/11.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
      {
        img: "/img/blog/10.png",
        url: "",
        title: "Название ролика",
        time: "4:31",
      },
    ];
    return { breadcrumbsData, blogData1, blogData2, blogData3, blogData4 };
  },
};
</script>