<template>
  <common-carusel :items="items" :type="type">
    <template v-slot:default="{ els }">
      <v-row>
        <v-col :cols="12 / type" v-for="(el, k) in els" :key="k">
          <v-card>
            <NuxtLink :to="el.url">
              <div style="position: relative">
                <img :src="el.img" width="100%" />
                <div
                  style="position: absolute; right: 20px; bottom: 20px"
                  class="d-flex justify-center"
                >
                  <v-btn class="align-self-center" fab title="Проиграть видео"
                    ><i class="fa fa-play"></i
                  ></v-btn>
                </div>
              </div>
              <div class="underlined mt-4">{{ el.title }}</div>
              <div style="color: #767676">Длительность: {{ el.time }}</div>
            </NuxtLink>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </common-carusel>
</template>

<script>
export default {
  props: {
    items: Array,
    type: {
      type: Number,
      default: 2,
    },
  },
};
</script>
