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
      <div><v-btn @click="toCart(el)" dark class="s-btn-cart s-btn-text">В корзину</v-btn></div>
      <div><v-btn @click="toFavorite(el)" plain small><img src="/icon-like.png" alt="" /></v-btn></div>
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
    async toCart(el){
      try{
        let respCom = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/' + el.id);
        const dataCom = respCom.data.data.filters;
        // console.log(dataCom);
        let height = '';
        let width = '';
        let depth = '';
        let lengthItem = '';
        dataCom.forEach(item => {
          if(item.name === 'Высота'){
            height = item.value
          } else if(item.name === 'Ширина') {
            width = item.value
          } else if(item.name === 'Глубина'){
            depth = item.value
          } else if(item.name === 'Длина'){
            lengthItem = item.value;
          }
        });
        // console.log('Высота ' + height)
        // console.log('Ширина ' + width)
        // console.log('Глубина ' + depth)
        // console.log('Длина ' + lengthItem)
        const item = {
          code: el.id,
          name: el.name,
          img: el.image[0],
          price: el.price,
          old_price: el.price_old,
          brand: el.brand,
          count: 1,
          type: el.type,
          width,
          height,
          depth,
          lengthItem,
        }
        this.$store.commit('cart/add', item);
      } catch (e){
        console.error(e);
      }
    },
    removeItem(el){
      this.$store.commit('compare/remove', el);
    },
    async toFavorite(el){
      try{
        let respCom = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/' + el.id);
        const dataCom = respCom.data.data.filters;
        // console.log(dataCom);
        let height = '';
        let width = '';
        let depth = '';
        let lengthItem = '';
        dataCom.forEach(item => {
          if(item.name === 'Высота'){
            height = item.value
          } else if(item.name === 'Ширина') {
            width = item.value
          } else if(item.name === 'Глубина'){
            depth = item.value
          } else if(item.name === 'Длина'){
            lengthItem = item.value;
          }
        });
          const item = {
            id: el.id,
            name: el.name,
            images: el.image[0],
            price: el.price,
            old_price: el.price_old,
            brand: el.brand,
            count: 1,
            type: el.type,
            store: el.store,
            width,
            height,
            depth,
            lengthItem,
          }
          // console.log('Высота ' + itemFav.height)
          // console.log('Ширина ' + itemFav.width)
          // console.log('Глубина ' + itemFav.depth)
          // console.log('Длина ' + itemFav.lengthItem)
          // console.log(itemFav);
            // this.$router.push('/favorite');
          this.$store.commit('favorite/addItem', item);
      }
        catch (e){
          console.error(e);
        }
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