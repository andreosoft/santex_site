<template>
  <div>
    <v-container class="s-main-slider-container">
      <section id="main-splide" class="splide s-main-slider">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="(el, i) in items" :key="i" class="splide__slide">
              <nuxt-link :to="el.params?.url"><img :src="$config.baseImageURL + el.images[0]" alt=""></nuxt-link>
            </li>
          </ul>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script>
import { Splide } from '@splidejs/splide';

export default {
  props: {
    items: Array,
  },
  data() {
    return {
      carouselModel: 0,
    };
  },
  computed: {
    length() {
      return this.items.length;
    },
  },
  mounted() {
    var splide = new Splide('#main-splide', {
      perPage: 1,
      fixedWidth: "1370px",
      rewind: true,
      type: 'loop'
    });
    splide.mount();
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
.s-main-slider {
  margin: 0 -100px;

  .splide__slide {
    margin: 0 100px;
  }

  .splide__track {
    overflow: inherit;
  }

  .splide__arrow {
    width: 50px;
    height: 50px;
    border: 1px solid #cacaca;
    background: #fff;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }

  .splide__arrow--prev {
    left: -2em;
  }

  .splide__arrow--next {
    right: -2em;
  }

  @media only screen and (max-width: 1600px) {

    .splide__arrow--prev {
      left: 8em;
    }

    .splide__arrow--next {
      right: 8em;
    }
  }

  .splide__pagination {
    height: 50px;
    bottom: -19px;
    background: no-repeat center url(/img/carusel1.png);

    li {
      margin-bottom: 19px;

      .splide__pagination__page {
        height: 14px;
        width: 14px;
        background: #fff;
        border: 1px solid #242424;
        margin: 5px;

        &.is-active {
          background: #242424;
          transform: none;
        }
      }
    }
  }
}

.s-carusel-blog .v-carousel__controls {
  background: none;
}
</style>