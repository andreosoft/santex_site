<template>
  <v-card>
    <NuxtLink :to="'/catalog/' + el.id">
      <v-img :src="$config.baseImageURL + el.images" />
      <div class="s-cart-tite-1">
        <div class="pa-10">
          <div class="d-inline-block mr-3" style="vertical-align: top">
            <v-btn fab><img src="/icons/basket.svg" alt="" /></v-btn>
          </div>
          <div class="d-inline-block dark--text">
            <div class="text-uppercase text-h5">
              {{ el.name }}
            </div>
            <!-- <div>{{ el.titleItem }} <i class="fa fa-long-arrow-right"></i></div> -->
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