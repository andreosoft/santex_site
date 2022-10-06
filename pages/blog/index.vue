<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>Блог</h1>
    <h2>Полезные советы в ремонте</h2>
    <div>
      <blog-carusel :items="blogData1" />
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
  async asyncData({ $http }) {
    const breadcrumbsData = [
      {
        url: "",
        title: "Блог",
      },
    ];
    const blogData1 = [
      {
        img: "https://i.ytimg.com/vi/yXA8ETN-4wY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD4nmKeRNw40-NlquoQzMefS8k9sw",
        url: "",
        video: "https://www.youtube.com/embed/7HqmGjWLNKw",
        title: "ДИКО популярные тренды интерьера в 2022 - 2023 году. I SALONI 2022, Милан",
        time: "30:28",
      },
      {
        img: "/img/blog/2.png",
        url: "",
        video: "https://www.youtube.com/embed/JcdwZq0HAb4",
        title: "ПАРЯЩАЯ ОТДЕЛЬНОСТОЯЩАЯ ВАННА | TOTO - ISH FRANKFURT",
        time: "30:28",
      },
      {
        img: "/img/blog/1.png",
        url: "",
        video: "https://www.youtube.com/embed/_3HdeYbj2Yc",
        title: "ИСКУПАЛАСЬ В БАССЕЙНЕ НА СПОР на ВЫСТАВКЕ CERSAIE 2019",
        time: "30:28",
      },
      {
        img: "/img/blog/2.png",
        url: "",
        video: "https://www.youtube.com/embed/3anMb-NR6tg",
        title: "ТРЕХКОМНАТНАЯ КВАРТИРА 43 квадрата. РУМТУР",
        time: "30:28",
      },
    ];
    const blogData2 = [
      {
        img: "/img/blog/3.png",
        url: "",
        video: "https://www.youtube.com/embed/X191SrT7ChE",
        title: "Какие фабрики остались? Сантехника и плитка : MOSBUILD 2022",
        time: "30:28",
      },
      {
        img: "/img/blog/4.png",
        url: "",
        video: "https://www.youtube.com/embed/7HqmGjWLNKw",
        title: "ДИКО популярные тренды интерьера в 2022 - 2023 году. I SALONI 2022, Милан",
        time: "30:28",
      },
      {
        img: "/img/blog/5.png",
        url: "",
        video: "https://www.youtube.com/embed/JcdwZq0HAb4",
        title: "ПАРЯЩАЯ ОТДЕЛЬНОСТОЯЩАЯ ВАННА | TOTO - ISH FRANKFURT",
        time: "30:28",
      },
      {
        img: "/img/blog/6.png",
        url: "",
        video: "https://www.youtube.com/embed/X191SrT7ChE",
        title: "Какие фабрики остались? Сантехника и плитка : MOSBUILD 2022",
        time: "30:28",
      },
    ];
    const blogData3 = [
      {
        img: "/img/blog/6.png",
        url: "",
        video: "https://www.youtube.com/embed/7HqmGjWLNKw",
        title: "ДИКО популярные тренды интерьера в 2022 - 2023 году. I SALONI 2022, Милан",
        time: "30:28",
      },
      {
        img: "/img/blog/7.png",
        url: "",
        video: "https://www.youtube.com/embed/X191SrT7ChE",
        title: "Какие фабрики остались? Сантехника и плитка : MOSBUILD 2022",
        time: "30:28",
      },
      {
        img: "/img/blog/8.png",
        url: "",
        video: "https://www.youtube.com/embed/3anMb-NR6tg",
        title: "ТРЕХКОМНАТНАЯ КВАРТИРА 43 квадрата. РУМТУР",
        time: "30:28",
      },
      {
        img: "/img/blog/9.png",
        url: "",
        video: "https://www.youtube.com/embed/7HqmGjWLNKw",
        title: "ДИКО популярные тренды интерьера в 2022 - 2023 году. I SALONI 2022, Милан",
        time: "30:28",
      },
    ];
    const blogData4 = [
      {
        img: "/img/blog/10.png",
        url: "",
        video: "https://www.youtube.com/embed/3anMb-NR6tg",
        title: "ТРЕХКОМНАТНАЯ КВАРТИРА 43 квадрата. РУМТУР",
        time: "30:28",
      },
      {
        img: "/img/blog/10.png",
        url: "",
        video: "https://www.youtube.com/embed/7HqmGjWLNKw",
        title: "ДИКО популярные тренды интерьера в 2022 - 2023 году. I SALONI 2022, Милан",
        time: "30:28",
      },
      {
        img: "/img/blog/11.png",
        url: "",
        video: "https://www.youtube.com/embed/JcdwZq0HAb4",
        title: "ПАРЯЩАЯ ОТДЕЛЬНОСТОЯЩАЯ ВАННА | TOTO - ISH FRANKFURT",
        time: "30:28",
      },
      {
        img: "/img/blog/10.png",
        url: "",
        video: "https://www.youtube.com/embed/7HqmGjWLNKw",
        title: "ДИКО популярные тренды интерьера в 2022 - 2023 году. I SALONI 2022, Милан",
        time: "30:28",
      },
    ];
    return { breadcrumbsData, blogData1, blogData2, blogData3, blogData4 };
  },
};
</script>