<template>
  <v-card>
    <NuxtLink :to="'/catalog/' + el.id">
      <v-img :src="$config.baseImageURL + el.images[0]" />
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