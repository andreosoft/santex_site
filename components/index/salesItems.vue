<template>
    <div>
        <div style="margin-bottom: 96px !important;" class="s-text-h2 text-center">Распродажа</div>
        <div style="margin-bottom: 110px!important;">
          <div class="d-none d-lg-block">
            <v-row>
              <v-col class="pa-0" lg="6" v-for="(el, i) in items" :key="i">
                <index-new-items-el :el="el" />
              </v-col>
            </v-row>
          </div>
          <div class="d-bock d-lg-none">
            <!-- <v-carousel v-model="carouselModel">
              <v-carousel-item v-for="(el, i) in items" :key="i">
                <index-new-items-el-carusel :el="el" />
              </v-carousel-item> -->
            <!-- </v-carousel> -->
          </div>
        </div>
        <div class="text-center mt-14">
          <v-btn class="s-btn-main s-btn-text">
            <NuxtLink to="/sales">БОЛЬШЕ ТОВАРОВ</NuxtLink>
          </v-btn>
        </div>
      </div>
</template>

<script>

export default {
    props: {
        items: Array
    }
}
</script>