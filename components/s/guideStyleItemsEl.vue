<template>
  <v-card>
    <NuxtLink v-if="el.isparent == 0" :to="'/catalog/' + el.id">
      <img v-if="el.images" :src="$config.baseImageURL + el.images[0]" style="width: 100%;"/>
      <div v-else style="width: 419px; height: 419px; background-color: black;"></div>
      <div style="position: absolute; bottom: 50px; left: 0; right: 0">
        <div class="pa-2 text-center">
          <p style="color: white; font-weight: bold" class="s-btn-text">{{ el.name }}</p>
          <v-btn class="s-btn-text">Перейти</v-btn>
        </div>
      </div>
    </NuxtLink>
    <NuxtLink v-else :to="'/interior/' + el.id">
      <img :src="$config.baseImageURL + el.images[0]" style="width: 100%;"/>
      <div style="position: absolute; bottom: 50px; left: 0; right: 0">
        <div class="pa-2 text-center">
          <v-btn class="s-btn-text">Перейти в интерьер</v-btn>
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