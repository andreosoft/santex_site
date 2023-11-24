<template>
  <div>
    <v-row v-if="data[0].isparent == 0" class="s-row d-flex justify-center mb-5 mt-5">
      <!-- {{data}} -->
      <div>
        <!-- <img v-if="categoriesData.images" :src="$config.baseImageURL + categoriesData.images[0]" alt="banner"> -->
        <img src="/banners/banner1.png" alt="banner">
      </div>
    </v-row>
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
    <v-row class="s-row">
      <v-col v-if="data[0].isparent !== 0" cols="3">
        <div>
          <catalog-filter :value="valueFilters" :filters="dataFilters" @input="$emit('update-data', $event);" />
        </div>
      </v-col>
      <v-col v-if="data[0].isparent !== 0" cols="9">
        <catalog-top-bar :count="pager.count" :sort="sort" />
        <v-row v-if="loading" class="s-row">
          <v-col cols="4" v-for="(el, i) in pager.limit" :key="i">
            <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else class="s-row" :class="{ close: !toggleOpen, 'catalog-items': pager.limit == 0 }">
          <v-col cols="4" v-for="(el, i) in data" :key="i">
            <catalog-item-list :el="el" @addItemFav="addItemFav" @addItemCom="addItemCom" @addItemCart="addItemCart" />
          </v-col>
        </v-row>
        <div v-if="pager.limit == 0 && data.length > 3" class="mt-14 mb-14 text-center">
          <a class="s-btn-else" @click="toggleOpen = !toggleOpen"><i class="fas fa-redo"></i>{{ toggleOpen ? 'Скрыть': 'Показать еще' }}</a>
      </div>
      </v-col>
      <v-col v-else cols="12">
        <!-- <catalog-top-bar :count="pager.count ? pager.count : data.length" /> -->
        <v-row v-if="loading" class="s-row">
          <v-col cols="4" v-for="(el, i) in pager.limit" :key="i">
            <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else-if="data[0].isparent !== 0" class="s-row" :class="{ close: !toggleOpen, 'catalog-items': pager.limit == 0 }">
          <v-col cols="4" v-for="(el, i) in data" :key="i">
            <catalog-item-list :el="el" @addItemFav="addItemFav" @addItemCom="addItemCom" @addItemCart="addItemCart" />
          </v-col>
        </v-row>
        <v-row v-else class="s-row" :class="{ close: !toggleOpen, 'catalog-items': pager.limit == 0 }">
          <v-col cols="4" v-for="(el, i) in data" :key="i">
            <s-guide-style-items-el :el="el" />
          </v-col>
        </v-row>
        <v-row class="s-row">
          <!-- <v-col cols="4" v-for="(el, i) in data" :key="i">
            <s-guide-style-items-el :el="el" />
          </v-col> -->
        </v-row>
        <!-- <div v-if="pager.limit == 0 && data.length > 3" class="mt-14 mb-14 text-center">
          <a class="s-btn-else" @click="toggleOpen = !toggleOpen"><i class="fas fa-redo"></i>{{ toggleOpen ? 'Скрыть': 'Показать еще' }}</a>
      </div> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: Array,
    dataFilters: Object,
    valueFilters: Object,
    pager: Object,
    sort: Object,
    loading: {
      type: Boolean,
      default: false
    },
    categoriesData: Object
  },
  data() {
    return {
      toggleOpen: false,
      snackbarFav: false,
      snackbarCom: false,
      snackbarCart: false
    }
  },
  computed: {
    ...mapGetters({
      dataFav: 'favorite/favItems',
      dataResultFav: 'favorite/dataResult',
      dataResultCom: 'compare/dataResult',
      dataResultCart: 'cart/dataResult',
    })
  },
  methods: {
    addItemFav(el) {
      this.snackbarCom = false
      this.snackbarCart = false
      this.snackbarFav = el;
    },
    addItemCom(el) {
      this.snackbarFav = false
      this.snackbarCart = false
      this.snackbarCom = el;
    },
    addItemCart(el) {
      this.snackbarCom = false
      this.snackbarFav = false
      this.snackbarCart = el;
    }
  }
}
</script>

<style lang="scss">

.catalog-items {
  overflow: hidden;
  &.close {
    max-height: 550px;
  }
}
</style>