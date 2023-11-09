<template>
  <div>
    <div id="head" style="margin-bottom: 96px !important;" class="s-text-h2 text-center">Каталог товаров</div>
    <!-- <div class="d-none d-xl-block">
      <v-row>
        <v-col class="pa-0" xl="2"  v-for="(el, i) in items.slice(0,12)" :key="i">
          <index-catalog-items-el :el="el" />
        </v-col>
      </v-row>
    </div> -->
    <div class="d-lg-block">
      <v-row>
        <v-col class="pa-0" lg="3"  v-for="(el, i) in dataCatalog" :key="i">
          <index-catalog-items-el :el="el" />
        </v-col>
      </v-row>
    </div>
    <!-- <div class="d-none d-md-block d-lg-none">
      <v-row>
        <v-col class="pa-0" md="4"  v-for="(el, i) in items.slice(0,9)" :key="i">
          <index-catalog-items-el :el="el" />
        </v-col>
      </v-row>
    </div> -->
    <div class="d-bock d-lg-none">
      <!-- <v-carousel v-model="carouselModel">
        <v-carousel-item v-for="(el, i) in items" :key="i">
          <index-new-items-el-carusel :el="el" />
        </v-carousel-item>
      </v-carousel> -->
    </div>
    <div class="text-center mt-14 pt-8">
        <v-btn @click="dataCatalog.length == 8 ? dataCatalog = items : dataCatalog = items.slice(0, 8)" class="s-btn-main s-btn-text">ВСЕ КАТЕГОРИИ</v-btn>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        items: Array
    },
    data() {
        return {
            dataCatalog: this.items.slice(0, 8)
        }
    }
}
</script>