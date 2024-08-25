<template>
  <v-card>
    <NuxtLink :to="el.parent_id > 0 ? '/catalog/' + el.id : '/allcategories/' + el.id">
      <img v-if="el.images" :src="$config.baseImageURL + el.images[0] + '?width=500'" />
      <img v-else src="/black-square.jpg" />
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

<style>
.catalog-btn {
  span {
    width: 100%;
  }
}
</style>