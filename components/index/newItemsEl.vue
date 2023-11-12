<template>
  <v-card>
    <NuxtLink :to="el.to ? el.to : '/promote/' + el.id">
      <v-img :src="el.img ? el.img : $config.baseImageURL + el.images[el.images.length-1]" />
      <div class="s-cart-tite-1">
        <div class="pa-10">
          <div class="d-inline-block mr-3" style="vertical-align: top">
            <v-btn fab><img src="/icons/basket.svg" alt="" /></v-btn>
          </div>
          <div class="d-inline-block white--text">
            <div class="text-uppercase text-h5">
              <b>{{ el.titleCollection ? el.titleCollection : el.introtext }}</b>
            </div>
            <div><b>{{ el.titleItem ? el.titleItem : el.name }}</b> <i class="fa fa-long-arrow-right"></i></div>
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
  }
};
</script>