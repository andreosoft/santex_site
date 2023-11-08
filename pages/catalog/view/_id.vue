<template>
  <v-container class="mb-14">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>{{ data.name }}</h1>
    <v-row class="mt-4">
      <v-col cols="6">
        <common-image-gallery :value="data.images" />
      </v-col>
      <v-col cols="6">
        <div class="d-flex justify-space-between">
          <div>
            <catalog-available :value="data.store" />
          </div>
          <div style="font-size: 14px;" class="grey--text"><span>Код товара: </span><span>{{ data.id }}</span></div>
        </div>
        <div class="my-3">{{ data.decription }}</div>
        <v-divider />
        <div class="my-3 d-flex justify-space-between align-center">
          <div>
            <span v-if="data.price" style="font-size: 46px; font-weight: bold;">
              <number :value="data.price" /> <span style="font-weight: normal;">₽</span>
            </span>
            <span v-else style="font-size: 46px; font-weight: bold;">
              <span style="font-weight: normal;">Цена не указана</span>
            </span>
            <span class="ml-4 grey--text" style="
                  display: inline-block;
                  padding-top: 6px;
                  font-size: 22px;
                  vertical-align: top;
                  text-decoration: line-through;
                " v-if="data.price_old">
              <number :value="data.price_old" /> ₽
            </span>
          </div>
          <div><a>
              <v-img :src="data.brend_logo" contain height="100" />
            </a></div>
        </div>
        <div class="my-4">
          <table>
            <tr>
              <td style="width: 50%"><b>Доставка:</b></td>
              <td>Послезавтра (700 ₽ )</td>
            </tr>
            <tr>
              <td><b>Самовывоз:</b></td>
              <td>Завтра (бесплатно )</td>
            </tr>
          </table>
        </div>
        <v-divider />
        <div class="my-4">
          <div v-for="(el, i) in data.params" :key="i">
            <div class="my-2 grey--text">{{ el.name }}</div>
            <div class="d-flex" style="margin: -2px">
              <div class="ma-1" v-for="(e, k) in el.options" :key="k">
                <v-btn class="s-btn-text">{{ e.text }}</v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="my-8">
          <div class="d-flex justify-space-between align-center">
            <div>
              <span>
                <v-btn @click="toCart" style="width: 200px;" class="s-btn-cart s-btn-text" dark>Купить</v-btn>
              </span><span class="ml-4">
                <v-btn style="width: 200px;" class="s-btn-cart s-btn-text" @click="Buyoneclick">Купить в 1
                  клик</v-btn>
              </span>
              <!-- <s-popup-buyoneclick v-model="showBuyoneclick" /> -->
            </div>
            <div>


              <!-- Избранное -->
<v-snackbar v-model="snackbarFav">{{ dataResultFav }} <template v-slot:action="{ attrs }">
  <v-btn color="pink" text v-bind="attrs" @click="snackbarFav = false">
    Закрыть
  </v-btn>
</template>
</v-snackbar>
<!-- Сравнение -->
        <v-snackbar v-model="snackbarCom">{{ dataResultCom }} <template v-slot:action="{ attrs }">
  <v-btn color="pink" text v-bind="attrs" @click="snackbarCom = false">
    Закрыть
  </v-btn>
</template>
</v-snackbar>
<!-- Корзина -->
        <v-snackbar v-model="snackbarCart">{{ dataResultCart }} <template v-slot:action="{ attrs }">
  <v-btn color="pink" text v-bind="attrs" @click="snackbarCart = false">
    Закрыть
  </v-btn>
</template>
</v-snackbar>



              <v-btn @click="toCompare" plain small><img src="/icon-similar.png" alt="compare" /></v-btn>
              <v-btn @click="toFavorite" plain small>
                <img :class="{'favorite': !checkAvailable}" src="/icons/like-black.svg" alt="favorite-black">
                <img :class="{'favorite': checkAvailable}" src="/icons/like.svg" alt="favorite">
              </v-btn>
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="mb-4">
            <v-simple-table dense>
              <tbody>
              <tr>
                <td>
                  <b>Артикул</b>
                </td>
                <td v-if="data.inner_article">
                  {{ data.inner_article}}
                </td>
                <td v-else>
                  {{ data.factory_article}}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Бренд</b>
                </td>
                <td>
                  {{data.brand}}
                </td>
              </tr>
                <tr v-for="(el, i) in data.filters.slice(0, 10)" :key="i">
                  <td>
                    <b>{{ el.name }}</b>
                  </td>
                  <td>{{ el.value }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
          <div>
            <a class="grey--text underlined" href="#full-info">Все характеристики</a>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-4 mb-14" />
    <!-- <div class="mb-14">
      <h2 class="mb-8">Соберите комплект и получите скидку</h2>
      <catalog-complect-block :data="data.complect_data" />
    </div> -->
    <div class="mb-8" id="full-info">
      <v-tabs class=" mb-14" style="border-bottom: 1px solid #ddd" v-model="tabModel">
        <v-tab>Описание и характеристики</v-tab>
        <v-tab>Комплектующие</v-tab>
        <!-- <v-tab>С этим товаром покупают</v-tab> -->
      </v-tabs>
      <v-tabs-items v-model="tabModel">
        <v-tab-item>
          <div class="mb-6" v-html="data.content" />
          <div class="mb-4">
            <v-row>
              <v-col :cols="6">
                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(el, i) in data.filters.slice(0, Math.ceil(data.filters.length / 2))" :key="i">
                      <td>
                        <b>{{ el.name }}</b>
                      </td>
                      <td>{{ el.value }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
              <v-col :cols="6">
                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(el, i) in data.filters.slice(Math.ceil(data.filters.length / 2))" :key="i">
                      <td>
                        <b>{{ el.name }}</b>
                      </td>
                      <td>{{ el.value }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
            </v-row>

          </div>
        </v-tab-item>
        <v-tab-item>
          <catalog-complect-block :data="data.complect_data" />
        </v-tab-item>
        <v-tab-item>
          <div class="d-flex mt-2">
            <div class="s-catalog-links" style="width: 360px;">
              <div v-for="(el, i) in data.with_buy_groups" :key="i" class="s-catalog-links-el" :class="{
                active: i == activeEl_with_buy_groups
              }" @click="activeEl_with_buy_groups = i"> <b>{{ el }}</b>
              </div>
            </div>
            <div class="pl-4 ml-4" style="border-left: 1px solid #ddd;">
              <div class="">
                <div v-for="(el, i) in data.similar_data" :key="i" class="ma-2 d-inline-block">
                  <catalog-item-list-small-type-2 :data="el" />
                </div>
              </div>
            </div>
          </div>

        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-divider class="mb-10" />
    <div>
      <a @click="redirect_back"><i class="fas fa-long-arrow-alt-left mr-4"></i>Вернуться назад</a>
    </div>
  </v-container>
</template>

<script>
import Number from "../../../components/number.vue";
import { mapGetters } from 'vuex';
async function getData({ route, $axios, $config }) {
  let id = route.params.id;
  const res = await $axios.get($config.baseURL + '/api/site/catalog/' + id);
  const data = res.data.data;
  const resCat = await $axios.get($config.baseURL + '/api/site/categories/' + data.category_id);
  const dataCat = resCat.data.data;
  console.log(dataCat);
  const breadcrumbsData = [
    {
      url: "",
      title: "Каталог",
    },
    {
      url: "/catalog/" + dataCat.id,
      title: dataCat.name,
    },
    {
      url: "",
      title: data.name,
    },
  ];
  return { data, breadcrumbsData };
}
export default {
  data() {
    return {
      snackbarFav: false,
      snackbarCom: false,
      snackbarCart: false,
      // showBuyoneclick: false,
      tabModel: 0,
      galleryModel: 0,
      activeEl_with_buy_groups: 0,
      toFav: false,
      // item: {
      //   code: this.obj.id,
      //   name: this.obj.name,
      //   // img: this.obj.images[0],
      //   price: this.obj.price,
      //   old_price: this.obj.price_old,
      //   brand: this.obj.brand,
      //   count: 1,
      //   type: this.obj.type,
      // }
    };
  },
  computed: {
    ...mapGetters ({
      dataFav: 'favorite/favItems',
      dataResultFav: 'favorite/dataResult',
      dataResultCom: 'compare/dataResult',
      dataResultCart: 'cart/dataResult',
    }),
    checkAvailable(){
      const sim = this.dataFav.find((item) => {if(item.id === this.data.id){ return item }})
        if (sim) {
            return true;
        } else {
            return false;
        }
    }
  },
  methods: {
    redirect_back(){
      if(this.$route.hash){this.$router.go(-2)}else{this.$router.back()}
    },
    toCompare(){
                let item = {
                  id: this.data.id,
                  name: this.data.name,
                  image: this.data.images ? this.data.images[0] : '',
                  price: this.data.price,
                  old_price: this.data.price_old,
                  brand: this.data.brand,
                  available: 1,
                  dataParams: {}
                };
                this.data.filters.forEach((element, index) => {
                  if(index!==0){
                    if(element.name === 'Прозводитель'){
                      element.name = 'Бренд';
                    }
                    item.dataParams[element.name] = element.value
                  }
                });
                // console.log(item)
                this.$store.commit('compare/addItem', item);
                this.snackbarFav = false;
                this.snackbarCart = false;
                this.snackbarCom = true;
              },
    toFavorite(){
      // this.toFav ? this.toFav = false : this.toFav = true;
      if(!this.checkAvailable){
                let height = '';
                let width = '';
                let depth = '';
                let lengthItem = '';
                this.data.filters.forEach(item => {
                  if(item.name === 'Высота'){
                    height = item.value
        } else if(item.name === 'Ширина') {
          width = item.value
        } else if(item.name === 'Глубина'){
          depth = item.value
        } else if(item.name === 'Длина'){
          lengthItem = item.value;
        }
      });
      // console.log('Высота ' + height)
      // console.log('Ширина ' + width)
      // console.log('Глубина ' + depth)
      // console.log('Длина ' + lengthItem)
      const item = {
        id: this.data.id,
        name: this.data.name,
        images: this.data.images[0],
        price: this.data.price,
        old_price: this.data.price_old,
        brand: this.data.brand,
        count: 1,
        type: this.data.type,
        store: this.data.available,
        width,
        height,
        depth,
        lengthItem,
      }
      this.$store.commit('favorite/addItem', item);
      this.snackbarCom = false;
      this.snackbarCart = false;
      this.snackbarFav = true;
    } else if(this.checkAvailable){
      const item = {
        id: this.data.id
      }
      this.$store.commit('favorite/remove', item)
      this.snackbarCom = false;
      this.snackbarCart = false;
      this.snackbarFav = true;
    }
      // this.$router.push('/favorite');
    },
    toCart(){
      let height = '';
      let width = '';
      let depth = '';
      let lengthItem = '';
      this.data.filters.forEach(item => {
        if(item.name === 'Высота'){
          height = item.value
        } else if(item.name === 'Ширина') {
          width = item.value
        } else if(item.name === 'Глубина'){
          depth = item.value
        } else if(item.name === 'Длина'){
          lengthItem = item.value;
        }
      });
      // console.log('Высота ' + height)
      // console.log('Ширина ' + width)
      // console.log('Глубина ' + depth)
      // console.log('Длина ' + lengthItem)
      const item = {
        code: this.data.id,
        name: this.data.name,
        img: this.data.images[0],
        price: this.data.price,
        old_price: this.data.price_old,
        brand: this.data.brand,
        count: 1,
        type: this.data.type,
        width,
        height,
        depth,
        lengthItem,
      }
      this.$store.commit('cart/add', item);
      this.snackbarCom = false;
      this.snackbarFav = false;
      this.snackbarCart = true;
    },
    Buyoneclick(){
      let height = '';
      let width = '';
      let depth = '';
      let lengthItem = '';
      this.data.filters.forEach(item => {
        if(item.name === 'Высота'){
          height = item.value
        } else if(item.name === 'Ширина') {
          width = item.value
        } else if(item.name === 'Глубина'){
          depth = item.value
        } else if(item.name === 'Длина'){
          lengthItem = item.value;
        }
      });
      // console.log('Высота ' + height)
      // console.log('Ширина ' + width)
      // console.log('Глубина ' + depth)
      // console.log('Длина ' + lengthItem)
      const item = {
        code: this.data.id,
        name: this.data.name,
        img: this.data.images[0],
        price: this.data.price,
        old_price: this.data.price_old,
        brand: this.data.brand,
        count: 1,
        type: this.data.type,
        width,
        height,
        depth,
        lengthItem,
      }
      this.$store.commit('cart/add', item);
      this.$router.push({ path: '/cart'});
    }
  },
  async asyncData({ route, $axios, $config }) {
    return await getData({ route, $axios, $config });
    Number;
    console.log(params);
    const data = {
      id: 100,
      name: "УГЛОВАЯ КОРЗИНКА ДЛЯ ДУША",
      image: ["/img/catalog/1.png", "/img/catalog/1.png", "/img/catalog/1.png"],
      decription: `Из 2-х частей: металлическая корзинка и вынимающаяся, небьющаяся, стойкая
к мыльному налету и невосприимчивая к воздействию ультрафиолетовых
лучей пластиковая вставка`,
      fullDecription: `Из 2-х частей: металлическая корзинка и вынимающаяся, небьющаяся, стойкая
к мыльному налету и невосприимчивая к воздействию ультрафиолетовых
лучей пластиковая вставка`,
      brend_logo: "/img/catalog/keuco.png",
      code: "4554545",
      price: 1540,
      old_price: 8220,
      brend_name: "Название бренда",
      size: "44 x 75 x 20",
      available: 1,
      params: [
        {
          name: "Какой то параметр",
          options: [{ text: "65" }, { text: "80" }, { text: "100" }],
        },
      ],
      params_info: [
        {
          name: "Производитель:",
          value: "Royal Bath",
        },
        {
          name: "Коллекция:",
          value: "HP",
        },
        {
          name: "Код товара:",
          value: "RB8120-HP1-M-L",
        },
        {
          name: "Ширина:",
          value: "120",
        },
        {
          name: "Дина:",
          value: "80",
        },
        {
          name: "Высота:",
          value: "217",
        },
        {
          name: "Материал:",
          value: "Аллюминий, стекло, акрил",
        },
        {
          name: "Цвет:",
          value: "Белый",
        },
        {
          name: "Вес:",
          value: "77,7",
        },
        {
          name: "Стилистика дизайнера:",
          value: "С совеременным дизайном",
        },
        {
          name: "Гарантия:",
          value: "10 лет",
        },
        {
          name: "Страна:",
          value: "Германия",
        },
      ],
      complect_data: [
        {
          id: 100,
          name: `Название товара на сайте в несколько строк`,
          image: ["/img/catalog/2.png"],
          price: 7222,
          old_price: 8200,
        },
        {
          id: 100,
          name: `Название товара на сайте в несколько строк`,
          image: ["/img/catalog/2.png"],
          price: 7222,
          old_price: 8200,
        },
        {
          id: 100,
          name: `Название товара на сайте в несколько строк`,
          image: ["/img/catalog/3.png"],
          price: 7222,
          old_price: 8200,
        },
        {
          id: 100,
          name: `Название товара на сайте в несколько строк`,
          image: ["/img/catalog/4.png"],
          price: 7222,
          old_price: 8200,
        },
      ],
      similar_data: [
        {
          id: 100,
          name: "Название товара",
          image: ["/img/favorite/1.png"],
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
          image: ["/img/favorite/2.png"],
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
          image: ["/img/favorite/3.png"],
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
          image: ["/img/favorite/4.png"],
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
          image: ["/img/favorite/5.png"],
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
          image: ["/img/favorite/1.png"],
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
          image: ["/img/favorite/1.png"],
          code: "4554545",
          price: 1540,
          old_price: 8220,
          brend_name: "Название бренда",
          size: "44 x 75 x 20",
          available: 1,
        },
      ],
      with_buy_groups: [
        "Все", "Комплектующие", "Защита от протечек воды", "Кнопки смыва", "Унитаз", "Душ"
      ]
    };
    const breadcrumbsData = [
      {
        url: "",
        title: "Каталог",
      },
      {
        url: "/catalog/1",
        title: "Аксессуары",
      },
      {
        url: "",
        title: data.name,
      },
    ];
    return { data, breadcrumbsData };
  },
};
</script>
