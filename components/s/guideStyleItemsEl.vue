<template>
  <v-card>
    <NuxtLink :to="'/interior/' + el.id">
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