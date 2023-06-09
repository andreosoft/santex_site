<template>
  <v-card class="s-card-good pa-4">
    <div>
      <nuxt-link :to="'/catalog/view/' + el.id">
        <div style="position: relative;" class="mb-2">
          <v-img v-if="el.images && el.images[0]" :src="$config.baseImageURL+el.images[0]+'?width=270&height=270'" />
        </div>
        <div class="d-flex justify-space-between mb-2">
          <div style="margin: 3px 0; font-size: 13px">
            <catalog-available :value="el.store" />
          </div>
          <div style="margin: 3px 0; font-size: 13px; color: #949494">
            Код товара: {{ el.id }}
          </div>
        </div>
        <div class="mb-4" style="margin: 3px 0; font-size: 16px; font-weight: bold;">{{ el.name }}</div>
        <div class="my-1" style="font-size: 11px">
          <div>
            <span style="color: #949494">Габариты (Д.Ш.В): </span><span>{{ el.width }}</span>
          </div>
          <div>
            <span style="color: #949494">Бренд: </span><span>{{ el.brand }}</span>
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
      </nuxt-link>
    </div>
    <div class="d-flex justify-space-between">
      <div><v-btn @click="toCart" dark class="s-btn-cart s-btn-text">В корзину</v-btn></div>
      <div>
        <v-btn @click="toFavorite" icon><img src="/icon-like.png" alt="" /></v-btn>
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
  data(){
    return {
      // item: {
      //   code: this.el.id,
      //   name: this.el.name,
      //   img: this.el.images[0] !== null ? this.el.images[0] : '',
      //   price: this.el.price,
      //   old_price: this.el.price_old,
      //   brand: this.el.brand,
      //   count: 1,
      //   type: this.el.type,
      // }
    }
  },
  methods: {
    toFavorite(){
    // console.log('Высота ' + item.height)
    // console.log('Ширина ' + item.width)
    // console.log('Глубина ' + item.depth)
    // console.log('Длина ' + item.lengthItem)
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
      // this.$router.push('/favorite');
    },
    toCart(){
    // console.log('Высота ' + height)
    // console.log('Ширина ' + width)
    // console.log('Глубина ' + depth)
    // console.log('Длина ' + lengthItem)
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
  }
  }
};
</script>
