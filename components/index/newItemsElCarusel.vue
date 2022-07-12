<template>
  <v-card>
    <NuxtLink :to="el.to">
      <img :src="el.img" />
      <div class="s-cart-tite-1" style="bottom: 160px">
        <div class="pa-10">
          <div class="d-inline-block mr-3" style="vertical-align: top">
            <v-btn fab><img src="/icon-basket.png" alt="" /></v-btn>
          </div>
          <div class="d-inline-block white--text">
            <div class="text-uppercase text-h5">
              {{ el.titleCollection }}
            </div>
            <div>{{ el.titleItem }} <i class="fa fa-long-arrow-right"></i></div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </v-card>
</template>

<script>
export default {
  props: {
    el: Object,
  },
};
</script>