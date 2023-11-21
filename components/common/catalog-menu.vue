<template>
  <transition name="fade">
    <div v-if="value" class="s-menu-catalog">
      <v-container style="position: relative; height: 100%">
        <div style="position: absolute; left: 0; right: 0; bottom: 0; top: 0">
          <div class="s-menu-catalog-left">
            <div class="pt-10">
              <div class="s-catalog-links">
                <div
                  v-for="(el, i) in items"
                  class="s-catalog-links-el"
                  :class="{ active: i == activeEl }"
                  @mouseover="activeEl = i"
                  @click="$emit('input')"
                  :key="i"
                >
                <nuxt-link :to="'/catalog/' + el.id">
                  <span class="s-catalog-links-el-icon"><img/></span>
                  <!-- <span class="s-catalog-links-el-icon"><img :src="el.icon"/></span> -->
                  {{ el.name }}
                </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="s-menu-catalog-right">
            <v-row>
              <v-col cols="9">
                <div class="pt-10 ma-5 ml-10 s-catalog-links">
                  <v-row>
                    <v-col
                      style="padding: 0;"
                      cols="6"
                      v-for="(el, i) in items[activeEl].content"
                      :key="i"
                      @click="$emit('input')"
                    >
                      <nuxt-link :to="'/catalog/' + el.id" class="s-catalog-links-el">{{
                        el.name
                      }}</nuxt-link>
                    </v-col>
                  </v-row>
                  <div class="s-catalog-brends">
                    <div class="pb-4"><b>Бренды</b></div>
                    <v-row class="s-catalog-brends-links" style="padding: 5px;">
                      <v-col
                        cols="4"
                        style="padding: 5px;"
                        v-for="(el, i) in items[activeEl].brands"
                        :key="i"
                        @click="$emit('input')"
                      >
                        <nuxt-link class="underlined" :to="el">{{ el }}</nuxt-link>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
              <v-col cols="3">
                <div class="text-center pt-10" v-if="items[activeEl].ads">
                  <v-img :src="items[activeEl].ads.img" />
                  <p class="pt-4">
                    <b>{{ items[activeEl].ads.name }}</b>
                  </p>
                  <div @click="$emit('input')">
                    <nuxt-link class="underlined" :to="items[activeEl].ads.url">Подробнее</nuxt-link>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-container>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: Boolean,
    items: Array,
  },
  data() {
    return {
      activeEl: 0,
    };
  },
  methods: {
    hi() {
      alert('hi')
    }
  }
};
</script>

<style lang="scss">

</style>