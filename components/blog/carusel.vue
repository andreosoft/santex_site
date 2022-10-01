<template>
  <div>
    <common-carusel :items="items" :type="type">
      <template v-slot:default="{ els }">
        <v-row>
          <v-col :cols="12 / type" v-for="(el, k) in els" :key="k">
            <v-card>
              <common-video :item="el" />
              <!-- <NuxtLink :to="el.url">
                <div style="position: relative">
                  <img :src="el.img" width="100%" />
                  <div style="position: absolute; right: 20px; bottom: 20px" class="d-flex justify-center">
                    <v-btn @click="dialog = true; activeItem = el" class="align-self-center" fab title="Проиграть видео"><i class="fa fa-play"></i></v-btn>
                  </div>
                </div>
                <div class="underlined mt-4">{{ el.title }}</div>
                <div style="color: #767676">Длительность: {{ el.time }}</div>
              </NuxtLink> -->
            </v-card>
          </v-col>
        </v-row>
      </template>
    </common-carusel>
    <!-- <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="730px" transition="dialog-transition">
      <div class="s-popup">
        <div>
          <div class="text-right">
            <v-btn icon @click="dialog = false"><img src="/icons/close_menu.svg" /></v-btn>
          </div>
        </div>
        <div v-if="dialog">
          <iframe style="width: 100%; min-height: 500px;" :src="activeItem.video + '?autoplay=1'" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
      </div>
    </v-dialog> -->
  </div>
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
  data() {
    return {
      dialog: false,
      activeItem: null
    }
  }
};
</script>
