<template>
  <div>
    <index-mainCarusel :items="carouselItems" class="mb-10" />
    <index-mainInfoBlock />
    <common-divider1 class="mb-10" />
    <index-new-items :items="collectionItems" class="mb-5" />
    <common-divider1 class="mb-10" />
    <index-guide-style-items :items="styleItems" class="mb-5" />
    <common-divider1 class="mb-10" />
    <index-catalog-items :items="catalogItems" class="mb-5" />
    <common-divider1 class="mb-10" />
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
    const videoItem = {
      img: "/img/coll1.png",
      video: "https://www.youtube.com/embed/nOKam63GgzQ"
    }
    // const catalogItems = [
    //   {
    //     img: "/img/cat1.png",
    //     title: "Унитазы",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat2.png",
    //     title: "Ванны",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat3.png",
    //     title: "Душевые уголки",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat4.png",
    //     title: "Инсталяции",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat5.png",
    //     title: "Смесители",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat6.png",
    //     title: "Душ",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat7.png",
    //     title: "Полотенцесушители",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat8.png",
    //     title: "Сифоны",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat9.png",
    //     title: "МЕбель для ванных комнат",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat10.png",
    //     title: "Кухонные мойки",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat3.png",
    //     title: "Душевые уголки",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat4.png",
    //     title: "Инсталяции",
    //     to: "/"
    //   },
    //   {
    //     img: "/img/cat5.png",
    //     title: "Смесители",
    //     to: "/"
    //   },
    // ]
    const styleItems = [
      {
        img: "/img/guide1.png",
        to: "/interior/1"
      },
      {
        img: "/img/guide2.png",
        to: "/interior/1"
      },
      {
        img: "/img/guide3.png",
        to: "/interior/1"
      },
      {
        img: "/img/guide4.png",
        to: "/interior/1"
      },
      {
        img: "/img/guide5.png",
        to: "/interior/1"
      }
    ];
    const collectionItems = [
      {
        img: "/img/coll1.png",
        titleCollection: "ARTELINEA",
        titleItem: "Раковина PORTOFINO",
        to: "/",
      },
      {
        img: "/img/coll2.png",
        titleCollection: "ARTELINEA",
        titleItem: "Раковина PORTOFINO",
        to: "/",
      },
      {
        img: "/img/coll3.png",
        titleCollection: "ARTELINEA",
        titleItem: "Раковина PORTOFINO",
        to: "/",
      },
      {
        img: "/img/coll4.png",
        titleCollection: "ARTELINEA",
        titleItem: "Раковина PORTOFINO",
        to: "/",
      },
    ];
    // const carouselItems = [
    //   {
    //     to: "/",
    //     img: "/banners/banner1.png",
    //   },
    //   {
    //     to: "/",
    //     img: "/banners/banner1.png",
    //   },
    //   {
    //     to: "/",
    //     img: "/banners/banner1.png",
    //   },
    //   {
    //     to: "/",
    //     img: "/banners/banner1.png",
    //   },
    // ];
    let catalogItems = [];
    try {
      catalogItems = (await $axios.get($config.baseURL + '/api/site/categories', {
        params: {
          filters: { parent_id: 0, status: 1, main_show: 1 },
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
    // console.log(catalogItems);
    // console.log(carouselItems);
    return { carouselItems, collectionItems, styleItems, catalogItems, videoItem };
  },
};
</script>