<template>
  <v-card class="s-card-good pa-4">
    <div>
      <nuxt-link :to="'/catalog/tile/view/' + el.id">
        <div style="position: relative;">
          <v-img :src="el.image[0]" />
        </div>
        </nuxt-link>
        <div class="d-flex justify-space-between mb-4">
          <div style="margin: 3px 0; font-size: 13px">
            <catalog-available :value="el.available" />
          </div>
          <div style="margin: 3px 0; font-size: 13px; color: #949494">
            Код товара: {{ el.code }}
          </div>
        </div>
        <div class="mb-4" style="margin: 3px 0; font-size: 16px; font-weight: bold;"><nuxt-link :to="'/catalog/tile/view/' + el.id">{{ el.name }}</nuxt-link></div>
        <div class="my-1" style="font-size: 11px">
          <div>
            <span style="color: #949494">Габариты (Д.Ш.В): </span><span>{{ el.size }}</span>
          </div>
          <div>
            <span style="color: #949494">Бренд: </span><span>{{ el.brend_name }}</span>
          </div>
        </div>
        <div>
          <div style="max-width: 160px">
            <div class="mb-2 d-flex justify-space-between">
              <v-btn class="s-btn-tail-select" small dark>м<sup>2</sup></v-btn>
              <v-btn class="s-btn-tail-select" small>шт</v-btn>
              <v-btn class="s-btn-tail-select" small>упак</v-btn>
            </div>
            <v-text-field hide-details class="s-input-text-center" outlined dense v-model="el.count">
              <div @click="el.count = el.count + 1" style="margin-top: 3px;" slot="append" icon><i class="fas fa-plus"></i></div>
              <div @click="el.count >= 1 ? el.count = el.count - 1 : 0" style="margin-top: 3px;" slot="prepend-inner"
                icon><i class="fa-solid fa-minus"></i></div>
            </v-text-field>
          </div>
        </div>
        <div class="my-2" style=" font-weight: bold;">
          <span style="font-size: 20px">
            <number :value="el.price" /> ₽
          </span><span class="ml-2" v-if="el.old_price"
            style="font-size: 13px; text-decoration: line-through; color: #949494">
            <number :value="el.old_price" /> ₽
          </span>
        </div>
    </div>
    <div class="d-flex justify-space-between">
      <div>
        <v-btn dark class="s-btn-cart s-btn-text">В корзину</v-btn>
      </div>
      <div>
        <v-btn icon><img src="/icon-like.png" alt="" /></v-btn>
        <v-btn icon><img src="/icon-similar.png" alt="" /></v-btn>
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