<template>
    <div>
        <div style="margin-bottom: 96px !important;" class="s-text-h2 text-center">Распродажа</div>
        <div style="margin-bottom: 110px!important;">
          <div>
            <v-row>
              <v-col class="pa-0 col-12" v-for="(el, i) in activeData" :key="i">
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
          <v-btn @click="toggleTwo < items.length ? toggleTwo+=2 : toggleTwo = 2" class="s-btn-main s-btn-text">
            <span v-if="items.length > 2">{{ toggleTwo < items.length ? 'БОЛЬШЕ ТОВАРОВ' : 'СКРЫТЬ' }}</span>
            <span v-else>БОЛЬШЕ ТОВАРОВ</span>
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