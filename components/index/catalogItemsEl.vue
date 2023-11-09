<template>
  <v-card>
    <NuxtLink :to="'/catalog/sections/' + el.id">
      <v-img v-if="el.images" :src="$config.baseImageURL + el.images[0]"/>
      <div v-else style="background-color: black; width: 450px; height: 360px"></div>
      <div style="position: absolute; bottom: 30px; left: 0; right: 0">
        <div class="pa-2 text-center">
          <v-btn class="s-btn-text">{{ el.name }}</v-btn>
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