<template>
  <v-card class="s-card-good pa-4">
    <div>
      <div style="position: relative;" class="mb-2">
        <v-img :src="$config.baseImageURL+el.image+'?width=270&height=270'" />
        <div style="position: absolute; right: 0px; top: -10px">
          <v-btn @click="removeItem(el)" icon style="padding-bottom: 4px;"><i style="font-size: 20px;" class="grey--text fas fa-times-circle"></i></v-btn>
        </div>
      </div>
      <nuxt-link :to="'/catalog/view/' + el.id">
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
            <div v-if="el.depth !== '' "><span style="color: #949494">Габариты
              (Г.Ш.В):</span><span>{{`${el.depth} x ${el.width} x ${el.height}` }}</span></div>
      <div v-else><span style="color: #949494">Габариты
              (Д.Ш.В):</span><span>{{`${el.lengthItem} x ${el.width} x ${el.height}` }}</span></div>
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
        <v-btn icon><img src="/icon-similar.png" alt="compare" /></v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    el: Object,
  },
  methods: {
    removeItem(el){
      this.$store.commit('favorite/remove', el);
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
    // let arrItems = [];
    //   if(localStorage.usercart){
    //     let product = JSON.parse(localStorage.getItem('usercart'));
    //     console.log(product);
    //     let simillar = product.find((element) => {if(element.code === item.code){return element}});
    //     if(simillar){
    //       // console.log('Такой объект уже есть');
    //       simillar.count++;
    //       localStorage.setItem('usercart', JSON.stringify(product));
    //     } else {
    //       // console.log('Новый объект');
    //       product.push(item);
    //       localStorage.setItem('usercart', JSON.stringify(product));
    //     }
    //         } else {
    //           // console.log('Первый объект');
    //           arrItems.push(item);
    //           localStorage.setItem('usercart', JSON.stringify(arrItems));
    //   }
  }
  }
};
</script>