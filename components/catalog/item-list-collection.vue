<template>
  <v-card class="s-card-good">
    <div>
      <nuxt-link :to="'/catalog/collection/view/' + el.id">
        <div style="position: relative;">
          <v-img :src="el.image[0]" />
        </div>
      </nuxt-link>
      <div class="pa-8">
        <div class="d-flex justify-space-between mb-4">
          <div style="margin: 3px 0; font-size: 13px">
            <catalog-available :value="el.available" />
          </div>
        </div>
        <div class="mb-4" style="margin: 3px 0; font-size: 16px; font-weight: bold;">
          <nuxt-link :to="'/catalog/collection/view/' + el.id">{{ el.name }}</nuxt-link>
        </div>
        <div class="mb-4" style="font-size: 11px">
          <div>
            <span style="color: #949494">Основной размер: </span><span>22,1x89, 14,7x89 см</span>
          </div>
          <div>
            <span style="color: #949494">Бренд: </span><span>{{ el.brend_name }}</span>
          </div>
          <div>
            <span style="color: #949494">Страна: </span><span>Германия</span>
          </div>
        </div>
        <div class="mb-4">
          <div class="d-flex" style="margin: 0 -4px">
            <div v-for="(el, i) in el.styles" style="padding: 0 4px;">
              <img :src="el" />
            </div>
          </div>
        </div>
        <div class="my-2" style=" font-weight: bold;">
          <span style="font-size: 20px">
            от
            <number :value="el.price" /> руб./м<sup>2</sup>
          </span>
        </div>

        <div>
          <div class="d-flex justify-space-between">
            <div>
              <v-btn to="/catalog/collection/view/1"  dark class="s-btn-cart s-btn-text">Подробнее</v-btn>
            </div>
            <div>
              <v-btn icon><img src="/icon-like.png" alt="" /></v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    el: Object,
  },
};
</script>