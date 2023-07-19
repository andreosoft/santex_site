<template>
  <v-card class="s-card-campare pa-4">
    <div class="mb-10">
      <div style="position: relative;">
        <nuxt-link :to="'/catalog/view/' + el.id">
          <v-img style="width: 400px; height: 250px" :src="$config.baseImageURL+el.image+'?width=270&height=270'" />
        </nuxt-link>
        <div style="position: absolute; right: 0px; top: -10px">
          <v-btn @click="removeItem(el)" icon style="padding-bottom: 4px;"><i style="font-size: 20px;" class="grey--text fas fa-times-circle"></i></v-btn>
        </div>
      </div>
      <div class="d-flex justify-space-between mb-4">
        <div style="margin: 3px 0; font-size: 13px">
          <catalog-available :value="el.store" />
        </div>
        <div style="margin: 3px 0; font-size: 13px; color: #949494">
            Код товара: {{ el.id }}
          </div>
        </div>
        <!-- <div> -->
          
          <div :class="{'mb-4': true, 'titleItem': true}">{{ el.name }} </div>
          <!-- <div @click="fullname ? fullname = false : fullname = true" :class="{'mb-4': true, 'overflowToggle': true, 'noneVisible': !fullname}">{{ el.name }} </div> -->
          <!-- <p v-if="!fullname" class="grey--text" style="font-size: 11px; position: relative; left: 200px; top: -36px">Подробнее</p> -->
        <!-- </div> -->
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
    </div>
    <div class="d-flex justify-space-between align-center">
      <div><v-btn @click="toCart(el)" dark class="s-btn-cart s-btn-text">В корзину</v-btn></div>
      <div>
        <v-btn @click="toFavorite(el)" plain small>
          <img v-show="checkAvailable" src="/icons/like-black.svg" alt="favorite-black">
          <img v-show="!checkAvailable" src="/icons/like.svg" alt="favorite">
      </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    el: Object,
  },
  data(){
    return {
      fullname: false,
    }
  },
  computed: {
    ...mapGetters ({
      dataFav: 'favorite/favItems',
    }),
    checkAvailable(){
      const sim = this.dataFav.find((item) => {if(item.id === this.el.id){ return item }})
        if (sim) {
            return true;
        } else {
            return false;
        }
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
        this.$emit('addItemCart', true);
      } catch (e){
        console.error(e);
      }
    },
    removeItem(el){
      this.$store.commit('compare/remove', el);
      this.$emit('removeItemCom', true);
    },
    async toFavorite(el){
      if(!this.checkAvailable){
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
            images: el.image,
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
          this.$emit('addItemFav', true);
      }
        catch (e){
          console.error(e);
        }
      } else if (this.checkAvailable){
        const item = {
        id: el.id
      }
      this.$store.commit('favorite/remove', item)
      this.$emit('addItemFav', true);
      }
    }
  },
}

</script>

<style lang="scss">
.s-card-campare {
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  height: 547.5px;
  border-top: 1px solid #DBDBDB!important;
  border-bottom: 1px solid #DBDBDB!important;
  border-right: 1px solid #DBDBDB!important;
}
.overflowToggle{
  overflow: visible !important;
  height: auto !important;
  margin: 3px 0;
  font-size: 16px;
  font-weight: bold;
}
.titleItem{
  margin: 3px 0;
  font-size: 16px;
  font-weight: bold;
  height: 48px;
  position: relative;
  hyphens: auto;
  overflow: hidden !important;
}
.titleItem:after{
	content: "";
	text-align: right;
	position: absolute;
	bottom: 0;
	right: 0;
	width: 70%;
	height: 1.2em;
	background: linear-gradient(to right, rgba(255, 255, 255, 0), white 100%);
	pointer-events: none;
}
</style>