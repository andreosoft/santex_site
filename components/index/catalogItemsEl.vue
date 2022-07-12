<template>
  <v-card>
    <NuxtLink :to="el.to">
      <v-img :src="el.img" />
      <div style="position: absolute; bottom: 30px; left: 0; right: 0">
        <div class="pa-2 text-center">
          <v-btn class="s-btn-text">{{ el.title }}</v-btn>
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