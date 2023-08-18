<template>
  <div>
    <div>
      <common-carusel :items="items" :type="type">
        <template v-slot:default="{ els }">
          <v-row>
            <v-col :cols="12 / type" v-for="(el, k) in els" :key="k">
              <s-guide-style-items-el :el="el" />
            </v-col>
          </v-row>
        </template>
      </common-carusel>
    </div>
    <div class="text-center mt-14 pt-8">
      <v-btn class="s-btn-main s-btn-text">
        <NuxtLink to="/">ВСЕ ИНТЕРЬЕРЫ</NuxtLink>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  data() {
    return {
      type: 3
    };
  },
};
</script>