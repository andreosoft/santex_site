<template>
  <div>
    <common-alert/>
    <common-top @showCatalog="showCatalogMenu = false" />
    <v-container>
      <div class="py-4 mb-6">
        <div class="d-flex justify-space-between">
          <div>
            {{ $store.getters.getD }}
            <a class="s-header-phones pr-3" href="tel://88007759985">8 800 775 99 85</a>
            <a class="s-header-phones pr-3" href="tel://84952256285">8 495 225 62 85</a>
          <a target="_blank" href="https://api.whatsapp.com/send/?phone=89672823107"><span><img src="/icons/whats_small.svg" alt="" /></span></a>
          </div>
          <div class="s-header-actions-block" @click="disableMenu($event)">
            <nuxt-link class="s-main-link" to="/"><img src="/icons/profile.svg" alt="" /></nuxt-link>
            <nuxt-link class="ml-6 s-main-link" to="/favorite">
              <img src="/icons/like.svg" alt="" />
              <div v-show="countItemsFav !== 0" class="cartIcon">{{ countItemsFav }}</div>
            </nuxt-link>
            <nuxt-link class="ml-6 s-main-link" to="/compare">
              <img src="/icons/compare.svg" alt="" />
              <div v-show="countItemsCom !== 0" class="cartIcon">{{ countItemsCom }}</div>
            </nuxt-link>
            <!-- <div style="width: 70px;" class="ml-6 d-inline-block"> -->
              <nuxt-link class="ml-6 s-main-link" to="/cart">
                  <img src="/icons/basket.svg" alt="compare" />
                  <div v-show="countItems !== 0" class="cartIcon">{{ countItems }}</div>
              </nuxt-link>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="s-header-main-logo" @click="showCatalogMenu = false">
        <nuxt-link to="/"><img src="/icons/logo.svg" /></nuxt-link>
      </div>
      <div>
        <div class="d-flex justify-space-between"
        :class="{ 's-activesearch': longsearch }"
        >
          <div>
            <div class="s-header-menu-btn" @click="showCatalogMenu = !showCatalogMenu">
              <i v-if="showCatalogMenu" class="fa fa-times pr-2"></i>
              <i v-else class="fa fa-bars pr-2"></i> Каталог
              товаров
            </div>
          </div>
          <div class="s-header-menu-links pt-2" @click="disableMenu($event)">
            <nuxt-link class="s-main-link" to="/brends">Бренды</nuxt-link>
            <nuxt-link class="s-main-link" to="/blog">Блог</nuxt-link>
            <nuxt-link class="s-main-link" to="/designers">Наши дизайнеры</nuxt-link>
            <nuxt-link class="s-main-link" to="/consulting">Запись на консультацию</nuxt-link>
            <nuxt-link class="s-main-link" to="/promote/1"><img src="/icon-discont.png" class="pr-1" />Распродажа</nuxt-link>
          </div>
          <form 
          @click="longsearch = true"
          @submit.prevent="submitSearch()"
          class="s-form-search"
          >
            <div class="s-header-menu-search" :class="{'s-header-menu-search-long': longsearch}" style="border-radius: 4px">
              <v-text-field
                @input="submitSearch()" 
                v-model="search" 
                single-line 
                outlined 
                dense 
                hide-details
                label="Я хочу найти">
                <template v-slot:append>
                  <img style="cursor: pointer" @click="submitSearch()" src="/icons/Search.svg" />
                </template>
              </v-text-field>
            </div>
          </form>
          <v-row
          @click="[longsearch = false, search = '']"
          id="s-search-result" 
          class="d-flex flex-column ma-0 flex-nowrap"  
          :class="{'visibility-active': longsearch && search.trim()}"
          >
          <v-col v-if="searchData?.category?.length === 0 && searchData?.brand?.length === 0 && searchData?.catalog?.length === 0">
            <p class="mb-0">Ничего не найдено</p>
          </v-col>
              <nuxt-link 
              v-if="searchData?.category && searchData?.category.length > 0"
              v-for="el in searchData?.category"
              :key="el._id" 
              class="d-flex flex-row align-center w-100"
              :to="'/catalog/' + el._id"
              >
                <div style="margin: 10px 20px">
                  <v-img 
                  contain 
                  style="width: 50px; height: 50px;"
                  v-if="el._source.images && el._source.images[0]"
                  :src="$config.baseImageURL + el._source.images[0]"
                  />
                  <v-img v-else src="/black-square.jpg" />
                </div>
                <p class="mb-0">{{ el._source.name }}</p>
              </nuxt-link>
              <nuxt-link 
              v-if="searchData?.brand && searchData?.brand.length > 0"
              v-for="el in searchData?.brand"
              :key="el._id" 
              class="d-flex flex-row align-center w-100"
              :to="'/catalog/search?q=' + el._source.name"
              >
                <div style="margin: 10px 20px">
                  <v-img 
                  contain 
                  style="width: 50px; height: 50px;"
                  v-if="el._source.images && el._source.images[0]"
                  :src="$config.baseImageURL + el._source.images[0]"
                  />
                  <v-img v-else src="/black-square.jpg" />
                </div>
                <p class="mb-0">{{ el._source.name }}</p>
              </nuxt-link>
              <nuxt-link 
              v-if="searchData?.catalog && searchData?.catalog.length > 0"
              v-for="el in searchData?.catalog"
              :key="el._id" 
              class="d-flex flex-row align-center w-100"
              :to="'/catalog/view/' + el._id"
              >
                <div style="margin: 10px 20px">
                  <v-img 
                  contain 
                  style="width: 50px; height: 50px;"
                  v-if="el._source.images && el._source.images[0]"
                  :src="$config.baseImageURL + el._source.images[0]"
                  />
                  <v-img
                  contain 
                  style="width: 50px; height: 50px;"
                  v-else src="/black-square.jpg" />
                </div>
                <p class="mr-3 mb-0 w-50">{{ el._source.name }}</p>
                <div class="wrapper mx-auto"></div>
                <p v-if="el._source.price" class="mr-3 mb-0">{{ el._source.price }} ₽</p>
                <p v-else class="mr-3 mb-0">Не указано</p>
              </nuxt-link>
              <v-col v-if="searchData?.category?.length !== 0 || searchData?.brand?.length !== 0 || searchData?.catalog?.length !== 0">
                <nuxt-link class="underlined" :to="'/catalog/search?q=' + search">Посмотреть все результаты</nuxt-link>
              </v-col>
          </v-row>
          <v-overlay @click="longsearch = false" :value="longsearch"></v-overlay>
        </div>
      </div>
    </v-container>
    <common-catalog-menu v-model="showCatalogMenu" :items="catalogMenuItems" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';
export default {
  props: {
    catalogMenuItems: Array
  },
  data() {
    return {
      showCatalogMenu: false,
      search: '',
      longsearch: false,
      mass: [],
      searchData: [],
    }
  },
  methods: {
    disableMenu(e){
      if(e.target.classList.contains('s-main-link') || e.target.closest('.s-main-link')){
        this.showCatalogMenu = false;
      }
    },
    submitSearch: debounce(async function() {
      try {
        let alldata;
        if(this.search.trim()){
          // this.$router.push({ path: '/catalog/search', query: { q: this.search } })
          alldata = (await this.$axios.get(this.$config.baseURL + '/api/site/catalog/hits', { params: { q: this.search } })).data.data;
          // console.log(this.search);
          // console.log(alldata);
          this.searchData = alldata;
          this.showCatalogMenu = false;
        }
      } catch (error) {
        console.error(error)
      }
    }, 800),
  },
  computed: {
    ...mapGetters ({
      countItems: 'cart/countItems',
      countItemsFav: 'favorite/countItems',
      countItemsCom: 'compare/countItems'
    })
  }
}
</script>



<style lang="scss">
.w-50{
  width: 50% !important;
}
#s-search-result{
  visibility: hidden;
  position: absolute;
  z-index: 1000000;
  background-color: #fff;
  right: 45px;
  width: 623px;
  top: 222px;
  overflow: auto;
  max-height: 390px;
  border-radius: 4px;
  &>a{
    border-bottom: 1px solid #DBDBDB;
  }
}
.visibility-active{
  visibility: visible !important;
}
.s-header-menu-search-long{
  background-color: #fff;
  right: 0 !important;
  width: 240% !important;
  position: absolute;
  z-index: 1000000;
  min-width: unset !important;
}
.s-form-search {
  position: relative;
  min-width: 260px;
}
.s-header-main-logo {
  height: 0;
  top: -66px;
  position: relative;
  text-align: center;

  a {
    // position: absolute;
  }
}

.s-header-phones {
  font-size: 16px;
  font-weight: bold;
}

.s-header-menu-links {
  margin-left: 80px;

  a {
    padding: 0 20px;
    font-size: 16px;
    font-weight: bold;
  }
}

.s-header-actions-block a {
  padding-left: 20px;
}

.s-header-menu-btn {
  vertical-align: middle;
  cursor: pointer;
  color: #fff !important;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: bold;
  background: #272727;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  i {
    width: 18px;
  }
}

.cartIcon{
  background-color: black;
  border-radius: 50px;
  color: white;
  width: 20px;
  height: 20px;
  text-align: center;
  vertical-align: bottom;
  font-size: 13px;
  padding-top: 1px;
  display: inline-block;
}
</style>
