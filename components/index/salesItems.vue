<template>
    <div>
        <div style="margin-bottom: 96px !important;" class="s-text-h2 text-center">Распродажа</div>
        <div style="margin-bottom: 110px!important;">
          <div class="d-none d-lg-block">
            <v-row>
              <v-col class="pa-0" lg="6" v-for="(el, i) in activeData" :key="i">
                <index-new-items-el :sales="true" style="height: 488px" :el="el" />
              </v-col>
            </v-row>
          </div>
          <!-- <div class="d-bock d-lg-none">
            <v-carousel v-model="carouselModel">
              <v-carousel-item v-for="(el, i) in items" :key="i">
                <index-new-items-el-carusel :el="el" />
              </v-carousel-item>
            </v-carousel>
          </div> -->
        </div>
        <div class="text-center mt-14">
          <v-btn class="s-btn-main s-btn-text">
            <nuxt-link to="/promote/1">БОЛЬШЕ ТОВАРОВ</nuxt-link>
          </v-btn>
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
      toggleTwo: 2,
    };
  },
  computed: {
    activeData() {
      return this.items.slice(0, this.toggleTwo); 
    },
  }
}
</script>