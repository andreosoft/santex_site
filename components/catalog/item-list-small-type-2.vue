<template>
  <v-card class="pa-4" width="220px">
    <div class="mb-8">
      <nuxt-link :to="'/catalog/view/' + data.id">
        <div>
          <v-img :src="data.image[0]" />
        </div>
        <div style="margin: 3px 0; font-size: 16px; height: 50px;">{{ data.name }}</div>
        <div class="my-2">
          <span style="font-size: 18px">
            <number :value="data.price" /> ₽
          </span><span class="ml-2" v-if="data.old_price"
            style="font-size: 13; text-decoration: line-through; color: #949494">
            <number :value="data.old_price" /> ₽
          </span>
        </div>
      </nuxt-link>
    </div>
    <div class="d-flex justify-space-between align-center">
      <div>
        <v-btn dark small class="s-btn-cart-small s-btn-text" >В корзину</v-btn>
      </div>
      <div>
        <div class="">
          <span style="cursor: pointer;" class="mr-2"><img src="/icon-like.png" alt="" /></span>
          <span style="cursor: pointer;"><img src="/icon-similar.png" alt="" /></span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>