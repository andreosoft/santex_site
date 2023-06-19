<template>
  <v-card class="s-card-campare pa-4">
    <div class="mb-10">
      <div style="position: relative;">
        <v-img style="width: 400px; height: 250px" :src="$config.baseImageURL+el.image+'?width=270&height=270'" />
        <div style="position: absolute; right: 0px; top: -10px">
          <v-btn @click="removeItem(el)" icon style="padding-bottom: 4px;"><i style="font-size: 20px;" class="grey--text fas fa-times-circle"></i></v-btn>
        </div>
      </div>
      <nuxt-link :to="'/catalog/view/' + el.id">
        <div class="d-flex justify-space-between mb-4">
          <div style="margin: 3px 0; font-size: 13px">
            <catalog-available :value="el.store" />
          </div>
          <div style="margin: 3px 0; font-size: 13px; color: #949494">
            Код товара: {{ el.id }}
          </div>
        </div>
        <div class="mb-4" style="margin: 3px 0; font-size: 16px; font-weight: bold;">{{ el.name }}</div>
        <!-- <div class="my-1" style="font-size: 11px">
          <div>
            <div v-if="el.depth !== '' "><span style="color: #949494">Габариты
              (Г.Ш.В):</span><span>{{`${el.depth} x ${el.width} x ${el.height}` }}</span></div>
      <div v-else><span style="color: #949494">Габариты
              (Д.Ш.В):</span><span>{{`${el.lengthItem} x ${el.width} x ${el.height}` }}</span></div>
          </div>
          <div>
            <span style="color: #949494">Бренд: </span><span>{{ el.brand }}</span>
          </div>
        </div> -->
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
    <div class="d-flex justify-space-between align-center">
      <div><v-btn @click="toCart" dark class="s-btn-cart s-btn-text">В корзину</v-btn></div>
      <div><v-btn @click="toFavorite" plain small><img src="/icon-like.png" alt="" /></v-btn></div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    el: Object,
  },
  data(){
    return {

    }
  },
  methods: {
    toCart(){
      let item = {
      code: this.el.id,
      name: this.el.name,
      img: this.el.images[0],
      price: this.el.price,
      old_price: this.el.price_old,
      brand: this.el.brand,
      count: 1,
      type: this.el.type,
      width: this.el.width,
      height: this.el.height,
      depth: this.el.depth,
      lengthItem: '',
    };
    this.$store.commit('cart/add', item);
    },
    removeItem(el){
      this.$store.commit('compare/remove', el);
    },
    toFavorite(){
      let item = {
      id: this.el.id,
      name: this.el.name,
      images: this.el.images[0],
      price: this.el.price,
      old_price: this.el.price_old,
      brand: this.el.brand,
      count: 1,
      width: this.el.width,
      height: this.el.height,
      depth: this.el.depth,
      lengthItem: '',
    };
      this.$store.commit('favorite/addItem', item);
    }
  }
};
</script>

<style lang="scss">
.s-card-campare {
  border-top: 1px solid #DBDBDB!important;
  border-bottom: 1px solid #DBDBDB!important;
  border-right: 1px solid #DBDBDB!important;
}
</style>