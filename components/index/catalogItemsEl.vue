<template>
  <v-card>
    <NuxtLink :to="el.parent_id > 0 ? '/catalog/' + el.id : '/allcategories/' + el.id" style="aspect-ratio: 1; display: block"> 
      <div class="s-item-img">
        <img v-if="el.images" :src="$config.baseImageURL + el.images[0] + '?width=500'" />
        <img v-else src="/black-square.jpg" />
      </div>
      <div style="position: absolute; bottom: 30px; left: 0; right: 0;">
        <div class="pa-2 text-center catalog-btn">
          <v-btn class="s-btn-text text-center" style="white-space: normal; max-width: 250px">{{ el.name }}</v-btn>
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

<style lang="scss">
  .s-item-img{
    height: 100%;
    aspect-ratio: 1/1;
    width: 100%;
    &>img{
      height: 100%;
      width: 100%;
      aspect-ratio: 1/1;
    }
  }
  .catalog-btn {
    /* span {
      width: 100%;
    } */
  }
</style>