<template>
  <v-card>
    <NuxtLink v-if="el.hasOwnProperty('isparent')" :to="subcat ? '/catalog/' + el.id : '/allcategories/' + el.id">
      <img v-if="el.images" :src="$config.baseImageURL + el.images[0]" style="width: 100%;"/>
      <img v-else src="/black-square.jpg" style="width: 419px; height: 419px"/>
      <div style="position: absolute; bottom: 50px; left: 0; right: 0">
        <div class="pa-2 text-center catalog-btn">
          <!-- <p style="color: white; font-weight: bold" class="s-btn-text"></p> -->
          <v-btn class="s-btn-text text-center" style="white-space: normal; max-width: 80%">{{ el.name }}</v-btn>
        </div>
      </div>
    </NuxtLink>
    <NuxtLink v-else :to="'/interior/' + el.id">
      <img v-if="el.images && el.images[0]" :src="$config.baseImageURL + el.images[0]" style="width: 100%;"/>
      <img v-else class="w-100 h-100" src="/black-square.jpg" />
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
    subcat: {
      type: Boolean,
      default: false
    }
  },
};
</script>