<template>
  <!-- <v-app style="background: no-repeat  url('/Товар_Характеристики.png'); opacity: 1;"> -->
  <v-app>
    <common-header :catalogMenuItems="$store.state.categories" />
    <v-main>
      <nuxt />
    </v-main>
    <common-footer />
  </v-app>
</template>

<script>
export default {
};
</script>