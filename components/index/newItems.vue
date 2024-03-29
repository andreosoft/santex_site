<template>
  <div>
    <div style="margin-bottom: 96px !important;" class="s-text-h2 text-center">Новинки: из коллекций лучших брендов</div>
    <div style="margin-bottom: 110px!important;">
      <div class="d-none d-lg-block">
        <v-row>
          <v-col class="pa-0 col-lg-6" v-for="(el, i) in activeData" :key="i">
            <index-new-items-el :el="el" />
          </v-col>
        </v-row>
      </div>
      <div class="d-bock d-lg-none">
        <v-carousel v-model="carouselModel">
          <v-carousel-item v-for="(el, i) in items" :key="i">
            <index-new-items-el-carusel :el="el" />
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
    <div class="text-center mt-14">
      <v-btn @click="toggleTwo < items.length ? toggleTwo+=2 : toggleTwo = 4" class="s-btn-main s-btn-text">
        <span v-if="items.length > 5">{{ toggleTwo < items.length ? 'БОЛЬШЕ НОВИНОК' : 'СКРЫТЬ' }}</span>
        <span v-else>БОЛЬШЕ НОВИНОК</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  data() {
    return {
      carouselModel: 0,
      toggleTwo: 4,
    };
  },
  computed: {
    activeData() {
      return this.items.slice(0, this.toggleTwo); 
    },
  }
};
</script>

<style lang="scss">
.s-cart-tite-1 {
  position: absolute;
  bottom: 0;
}
</style>