<template>
  <v-card>
    <NuxtLink :to="sales ? '/promote/1' : '/promote/2'">
      <v-img v-if="el.images && el.images[0]" :src="$config.baseImageURL + el.images[0]" />
      <div class="s-cart-tite-1" style="bottom: 160px">
        <div class="pa-10">
          <div class="d-inline-block mr-3" style="vertical-align: top">
            <v-btn fab><img src="/icon-basket.png" alt="" /></v-btn>
          </div>
          <div class="d-inline-block white--text">
            <div class="text-uppercase text-h5">
              {{ el.collection ? el.collection : el.introtext ? el.introtext : 'Не указано' }}
            </div>
            <div>{{ el.name }} <i class="fa fa-long-arrow-right"></i></div>
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
    sales: {
      type: Boolean,
      default: false
    }
  },
};
</script>