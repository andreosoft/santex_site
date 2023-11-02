<template>
  <v-card class="s-card-good pa-4">
    <div>
      <nuxt-link :to="'/catalog/view/' + el.id">
        <div style="position: relative;" class="mb-2">
          <v-img v-if="el.images && el.images[0]" :contain="true" style="width: 400px; height: 250px" :src="$config.baseImageURL+el.images[0]+'?height=250'" />
        </div>
        <div class="d-flex justify-space-between mb-2">
          <div style="margin: 3px 0; font-size: 13px">
            <catalog-available :value="el.store" />
          </div>
          <div style="margin: 3px 0; font-size: 13px; color: #949494">
            Код товара: {{ el.id }}
          </div>
        </div>
        <div class="mb-4" style="margin: 3px 0; font-size: 16px; font-weight: bold" :class="{ 'hidden-text': hiddentext }">{{ el.name }}</div>
        <div class="my-1" style="font-size: 11px">
          <div>
            <!-- <span style="color: #949494">Габариты (Д.Ш.В): </span><span>{{ el.width }}</span> -->
            <div v-if="itemList.depth && itemList.height"><span style="color: #949494">Габариты (Г.Ш.В): </span>
              <span>{{`${itemList.depth + ' x '} ${itemList.width} ${' x ' + itemList.height}` }}</span>
            </div>
            <div v-else-if="!itemList.height"><span style="color: #949494">Габариты (Г.Ш): </span>
              <span>{{`${itemList.depth + ' x '} ${itemList.width}`}}</span>
            </div>
              <div v-else><span style="color: #949494">Габариты (Д.Ш.В): </span>
                <span>{{`${itemList.lengthItem} x ${itemList.width} ${' x ' + itemList.height}` }}</span>
              </div>
          </div>
          <div>
            <span style="color: #949494">Бренд: </span><span>{{ el.brand }}</span>
          </div>
        </div>
        <div class="my-2" style=" font-weight: bold;">
          <span v-if="el.price" style="font-size: 20px">
            <number :value="el.price" /> ₽
          </span>
          <span v-else style="font-size: 20px">
            Цена не указана
          </span>
          <span class="ml-2" v-if="el.price_old"
            style="font-size: 13px; text-decoration: line-through; color: #949494">
            <number :value="el.price_old" /> ₽
          </span>
        </div>
      </nuxt-link>
    </div>
    <div class="d-flex justify-space-between">
      <div><v-btn @click="toCart(el)" dark class="s-btn-cart s-btn-text">В корзину</v-btn></div>
      <div>
        <v-btn @click="toFavorite(el)" icon>
          <img v-show="checkAvailable" src="/icons/like-black.svg" alt="favorite-black">
          <img v-show="!checkAvailable" src="/icons/like.svg" alt="favorite">
        </v-btn>
        <v-btn @click="toCompare(el)" icon><img src="/icon-similar.png" alt="" /></v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    el: Object,
    hiddentext: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      itemList: {
        depth: '',
        width: '',
        height: '',
        lengthItem: '',
      }
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
  computed: {
    ...mapGetters({
      dataFav: 'favorite/favItems'
    }),
    checkAvailable(){
      const sim = this.dataFav.find((item) => {if(item.id === this.el.id){ return item }});
        if (sim) {return true;} else {return false;}
    }
  },
  async fetch (){
  let respSize = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/' + this.el.id);
  const dataSize = respSize.data.data.filters;
  dataSize.forEach(item => {
          if(item.name === 'Высота'){
            this.itemList.height = item.value
          } else if(item.name === 'Ширина') {
            this.itemList.width = item.value
          } else if(item.name === 'Глубина'){
            this.itemList.depth = item.value
          } else if(item.name === 'Длина'){
            this.itemList.lengthItem = item.value;
          }
        });
},
  methods: {
    async toCompare(el){
      try{
        let respCom = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/' + el.id);
        const dataCom = respCom.data.data.filters;
        // console.log(dataCom);
        let item = {
          id: el.id,
          name: el.name,
          image: el.images ? el.images[0] : '',
          price: el.price,
          old_price: el.price_old,
          brand: el.brand,
          available: el.store,
          dataParams: {}
        };
        dataCom.forEach((element, index) => {
                  if(index!==0){
                    if(element.name === 'Прозводитель'){
                      element.name = 'Бренд';
                    }
                    item.dataParams[element.name] = element.value
            }
        });

        this.$store.commit('compare/addItem', item);
        this.$emit('addItemCom', true);
      } catch(e){
        console.error(e);
      }
      
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
            images: el.images[0],
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
      } else if(this.checkAvailable){
        const item = {
        id: el.id
      }
      this.$store.commit('favorite/remove', item)
        this.$emit('addItemFav', true);
      }
    },
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
          img: el.images[0],
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
      
    // console.log('Высота ' + height)
    // console.log('Ширина ' + width)
    // console.log('Глубина ' + depth)
    // console.log('Длина ' + lengthItem)
    // let item = {
    //   code: this.el.id,
    //   name: this.el.name,
    //   img: this.el.images[0],
    //   price: this.el.price,
    //   old_price: this.el.price_old,
    //   brand: this.el.brand,
    //   count: 1,
    //   type: this.el.type,
    //   width: this.el.width,
    //   height: this.el.height,
    //   depth: this.el.depth,
    //   lengthItem: '',
    // };
    // this.$store.commit('cart/add', item);
  }
  }
};
</script>

<style lang="scss">
  .hidden-text{
    height: 48px;
    position: relative;
    hyphens: auto;
    overflow: hidden !important;
  }
  .hidden-text:after{
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