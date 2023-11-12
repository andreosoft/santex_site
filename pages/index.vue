<template>
  <div>
    <index-mainCarusel :items="carouselItems" class="mb-10" />
    <index-mainInfoBlock />
    <common-divider1 class="mb-10" />
    <index-new-items :items="collectionItems" class="mb-5" />
    <common-divider1 class="mb-10" />
    <index-guide-style-items :items="dataInterior" class="mb-5" />
    <common-divider1 class="mb-10" />
    <index-catalog-items :items="catalogItems" class="mb-5" />
    <common-divider1 class="mb-10" />
    <index-salesItems :items="salesItems" class="mb-5" />
    <common-divider1 class="mb-10"/>
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
    // let qwe = await $axios.get($config.baseURL + "/api/site/interior");
    // let data = qwe.data.data;
    // console.log(qwe);
    let dataInterior = [];
    try {
      dataInterior = (await $axios.get($config.baseURL + '/api/site/interior')).data.data;
    } catch (error) {
      console.error(error);
    }
let salesItems = [];
    try {
      salesItems = (await $axios.get($config.baseURL + '/api/site/promote')).data.data;
      // console.log('Товары со скидкой')
      // console.log(salesItems);
    } catch (error) {
      console.error(error);
    }

    const videoItem = {
      img: "/img/coll1.png",
      video: "https://www.youtube.com/embed/nOKam63GgzQ"
    }
    
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
    // console.log(catalogItems);
    // console.log(carouselItems);
    return { carouselItems, collectionItems, styleItems, catalogItems, videoItem, dataInterior, salesItems };
  },
};
</script>