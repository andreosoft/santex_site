<template>
  <v-card style="border: 1px solid #949494" class="pa-4" width="220px">
    <div>
      <nuxt-link :to="'/catalog/view/' + data.id">
        <div>
          <v-img :src="data.image[0]" />
        </div>
        <div style="margin: 3px 0; font-size: 16px">{{ data.name }}</div>
        <div class="my-2">
          <span style="font-size: 18px"><number :value="data.price" /> ₽</span
          ><span
            class="ml-2"
            v-if="data.old_price"
            style="font-size: 13; text-decoration: line-through; color: #949494"
            ><number :value="data.old_price" /> ₽</span
          >
        </div>
      </nuxt-link>
    </div>
    <div class="d-flex justify-space-between">
      <div><v-btn dark small class="s-btn-text">В корзину</v-btn></div>
      <div>
        <v-btn icon><img src="/icon-like.png" alt="" /></v-btn>
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