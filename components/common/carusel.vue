<template>
  <div style="position: relative">
    <div class="s-carusel-contols left">
      <v-btn fab @click="prev()"><i class="fa fa-chevron-left"></i></v-btn>
    </div>
    <v-window v-model="carouselModel">
      <v-window-item v-for="(els, i) in data" :key="i">
        <slot :els="els"></slot>
      </v-window-item>
    </v-window>
    <div class="s-carusel-contols right">
      <v-btn fab @click="next()"><i class="fa fa-chevron-right"></i></v-btn>
    </div>
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
      carouselModel: 0,
    };
  },
  computed: {
    data() {
      let r = [];
      if (this.items) {
        for (let i = 0; i < this.items.length / this.type; i++) {
          r[i] = [];
          for (let k = 0; k < this.type; k++) {
            let a = i * this.type + k;
            if (this.items[a]) r[i].push(this.items[a]);
          }
        }
      }
      return r;
    },
    length() {
      return this.items.length / this.type;
    },
  },
  methods: {
    next() {
      this.carouselModel =
        this.carouselModel + 1 === this.length ? 0 : this.carouselModel + 1;
    },
    prev() {
      this.carouselModel =
        this.carouselModel - 1 < 0 ? this.length - 1 : this.carouselModel - 1;
    },
  },
};
</script>

<style lang="scss">
.s-carusel-blog .v-carousel__controls {
  background: none;
}

.s-carusel-contols {
  position: absolute;
  top: calc(40% - 28px);
  z-index: 1;

  &.left {
    left: -80px;
  }

  &.right {
    right: -80px;
  }

  @media only screen and (max-width: 1600px) {
    .v-btn--fab.v-size--default {
      height: 36px;
      width: 36px;
    }

    &.left {
      left: 10px;
    }

    &.right {
      right: 10px;
    }
  }
}
</style>