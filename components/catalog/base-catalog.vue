<template>
  <div>
    <v-row class="s-row">
      <v-col cols="3">


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


        <div>
          <catalog-filter :value="valueFilters" :filters="dataFilters" @input="$emit('update-data', $event);" />
        </div>
      </v-col>
      <v-col cols="9">
        <catalog-top-bar :count="pager.count" :sort="sort" />
        <v-row v-if="loading" class="s-row">
          <v-col cols="4" v-for="(el, i) in pager.limit" :key="i">
            <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else class="s-row">
          <v-col cols="4" v-for="(el, i) in data" :key="i">
            <catalog-item-list :el="el" @addItemFav="addItemFav" @addItemCom="addItemCom" @addItemCart="addItemCart" />
          </v-col>
        </v-row>
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
    }
  },
  data(){
    return {
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
    addItemFav(el){
      this.snackbarCom = false
      this.snackbarCart = false
      this.snackbarFav = el;
    },
    addItemCom(el){
      this.snackbarFav = false
      this.snackbarCart = false
      this.snackbarCom = el;
    },
    addItemCart(el){
      this.snackbarCom = false
      this.snackbarFav = false
      this.snackbarCart = el;
    }
  }
}
</script>
