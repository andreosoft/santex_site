<template>
  <div>
    <common-top />
    <v-container>
      <div class="py-4 mb-6">
        <div class="d-flex justify-space-between">
          <div>
            {{ $store.getters.getD }}
            <a class="s-header-phones pr-3" href="tel://88007759985">8 800 775 99 85</a>
            <a class="s-header-phones pr-3" href="tel://84952256285">8 495 225 62 85</a>
          <a target="_blank" href="https://api.whatsapp.com/send/?phone=89672823107"><span><img src="/icons/whats_small.svg" alt="" /></span></a>
          </div>
          <div class="s-header-actions-block">
            <nuxt-link to="/"><img src="/icons/profile.svg" alt="" /></nuxt-link>
            <nuxt-link class="ml-6" to="/favorite">
              <img src="/icons/like.svg" alt="" />
              <div v-show="countItemsFav !== 0" class="cartIcon">{{ countItemsFav }}</div>
            </nuxt-link>
            <nuxt-link class="ml-6" to="/compare">
              <img src="/icons/compare.svg" alt="" />
              <div v-show="countItemsCom !== 0" class="cartIcon">{{ countItemsCom }}</div>
            </nuxt-link>
            <!-- <div style="width: 70px;" class="ml-6 d-inline-block"> -->
              <nuxt-link class="ml-6" to="/cart">
                  <img src="/icons/basket.svg" alt="compare" />
                  <div v-show="countItems !== 0" class="cartIcon">{{ countItems }}</div>
              </nuxt-link>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="s-header-main-logo">
        <nuxt-link to="/"><img src="/icons/logo.svg" /></nuxt-link>
      </div>
      <div>
        <div class="d-flex justify-space-between">
          <div>
            <div class="s-header-menu-btn" @click="showCatalogMenu = !showCatalogMenu">
              <i v-if="showCatalogMenu" class="fa fa-times pr-2"></i>
              <i v-else class="fa fa-bars pr-2"></i> Каталог
              товаров
            </div>
          </div>
          <div class="s-header-menu-links pt-2">
            <nuxt-link to="/brends">Бренды</nuxt-link>
            <nuxt-link to="/blog">Блог</nuxt-link>
            <nuxt-link to="/designers">Наши дизайнеры</nuxt-link>
            <nuxt-link to="/consulting">Запись на консультацию</nuxt-link>
            <nuxt-link to="/promote/1"><img src="/icon-discont.png" class="pr-1" />Распродажа</nuxt-link>
          </div>
          <form @submit.prevent="submitSearch()">
            <div class="s-header-menu-search">
              <v-text-field v-model="search" single-line outlined dense label="Я хочу найти">
                <template v-slot:append>
                  <img style="cursor: pointer" @click="submitSearch()" src="/icons/Search.svg" />
                </template>
              </v-text-field>
            </div>
          </form>
        </div>
      </div>
    </v-container>
    <common-catalog-menu v-model="showCatalogMenu" :items="catalogMenuItems" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    catalogMenuItems: Array
  },
  data() {
    return {
      showCatalogMenu: false,
      search: '',
      mass: []
    }
  },
  methods: {
    submitSearch() {
      this.$router.push({ path: '/catalog/search', query: { q: this.search } })
    },
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

.s-header-menu-search {
  min-width: 260px;
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
