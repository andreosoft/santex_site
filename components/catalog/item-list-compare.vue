<template>
  <v-card class="pa-4 s-card-campare ">
    <div class="mb-10">
      <nuxt-link :to="'/catalog/view/' + el.id">
        <div style="position: relative;">
          <v-img :src="el.image[0]" />
          <div style="position: absolute; right: 0px; top: -10px">
            <v-btn icon style="padding-bottom: 4px;"><i style="font-size: 20px;" class="grey--text fas fa-times-circle"></i></v-btn>
          </div>
        </div>
        <div class="d-flex justify-space-between mb-4">
          <div style="margin: 3px 0; font-size: 13px">
            <catalog-available :value="el.available" />
          </div>
          <div style="margin: 3px 0; font-size: 13px; color: #949494">
            Код товара: {{ el.code }}
          </div>
        </div>
        <div class="mb-4" style="margin: 3px 0; font-size: 16px; font-weight: bold;">{{ el.name }}</div>
        <div class="my-2" style=" font-weight: bold;">
          <span style="font-size: 20px; font-weight: bold;">
            <number :value="el.price" /> ₽
          </span><span class="ml-2" v-if="el.old_price"
            style="font-size: 13px; text-decoration: line-through; color: #949494">
            <number :value="el.old_price" /> ₽
          </span>
        </div>
      </nuxt-link>
    </div>
    <div class="d-flex justify-space-between">
      <div>
        <v-btn dark class="s-btn-cart s-btn-text" >В корзину</v-btn>
      </div>
      <div>
        <v-btn plain small><img src="/icon-like.png" alt="" /></v-btn>
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

<style lang="scss">
.s-card-campare {
  border-top: 1px solid #DBDBDB!important;
  border-bottom: 1px solid #DBDBDB!important;
  border-right: 1px solid #DBDBDB!important;
}
</style>