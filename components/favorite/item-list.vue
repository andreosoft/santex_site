<template>
  <v-card class="s-card-good pa-4">
    <div>
      <div style="position: relative;" class="mb-2">
        <v-img style="width: 400px; height: 250px" :src="$config.baseImageURL+el.images+'?width=270&height=270'" />
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
            <div v-if="el.height && el.width && el.length"><span style="color: #949494">Габариты (Д.Ш.В): </span>
              <span>{{`${el.length} x ${el.width} x ${el.height}` }}</span>
            </div>
            <div v-else-if="!el.length && el.width && el.height"><span style="color: #949494">Габариты (Ш.В): </span>
              <span>{{`${el.width} ${' x ' + el.height}` }}</span>
            </div>
            <div v-else-if="!el.width && el.length && el.height"><span style="color: #949494">Габариты (Д.В): </span>
              <span>{{`${el.length}${' x ' + el.height}` }}</span>
            </div>
            <div v-else-if="!el.height && el.length && el.width"><span style="color: #949494">Габариты (Д.Ш): </span>
              <span>{{`${el.length} x ${el.width}` }}</span>
            </div>
            <div v-else><span style="color: #949494">Габариты (Д.Ш.В): </span>
              <span>Не указаны</span>
            </div>
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
      <div><v-btn @click="toCart(el)" dark class="s-btn-cart s-btn-text">В корзину</v-btn></div>
      <div>
        <v-btn @click="toCompare(el)" icon><img src="/icon-similar.png" alt="compare" /></v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    el: Object,
  },
  data()  {
    return {
    }
  },
  methods: {
    removeItem(el){
      this.$store.commit('favorite/remove', el);
      this.$emit('removeItemFav', true);
    },
    async toCompare(el){
      try{
        let respCom = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/' + el.id);
        const dataCom = respCom.data.data.filters;
        // console.log(dataCom);
        let item = {
                  id: el.id,
                  name: el.name,
                  image: el.images,
                  price: el.price,
                  old_price: el.price_old,
                  brand: el.brand,
                  available: 1,
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
                // console.log(item)
                this.$store.commit('compare/addItem', item);
                this.$emit('addItemCom', true);
    } catch(e){
      console.log(e);
    }},
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
          img: el.images,
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
  }
  }
};
</script>