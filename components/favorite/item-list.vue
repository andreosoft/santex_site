<template>
  <v-card class="s-card-good pa-4">
    <div>
      <div style="position: relative;" class="mb-2">
        <v-img :src="$config.baseImageURL+el.images+'?width=270&height=270'" />
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
  methods: {
    removeItem(el){
      this.$store.commit('favorite/remove', el);
    },
    async toCompare(el){
      try{
        let respCom = await this.$axios.get(this.$config.baseURL + '/api/site/catalog/' + el.id);
        const dataCom = respCom.data.data.filters;
        // console.log(dataCom);
        let height = dataCom.find(element => element.name == 'Высота');
        let width = dataCom.find(element => element.name == 'Ширина');
        let depth = dataCom.find(element => element.name == 'Глубина');
        let shape = dataCom.find(element => element.name == 'Форма');
        let garanty = dataCom.find(element => element.name == 'Гарантия');
        let countryMade = dataCom.find(element => element.name == 'Страна производства');
        let lineShape = dataCom.find(element => element.name == 'Линии форм');
        let sinkCountertop = dataCom.find(element => element.name == 'Раковина-столешница');
        let hidedrain = dataCom.find(element => element.name == 'Со скрытым сливом');
        let widthWashing = dataCom.find(element => element.name == 'Ширина стиральной машины');
        let depthWashing = dataCom.find(element => element.name == 'Глубина стиральной машины');
        let distanceDrain = dataCom.find(element => element.name == 'Расстояние от смесителя до слива');
        let minLengthPour = dataCom.find(element => element.name == 'Рекомендованная мин. длина излива');
        let typeOfShell = dataCom.find(element => element.name == 'Вид раковины');

        let item = {
          id: el.id,
          name: el.name,
          image: el.images[0],
          price: el.price,
          old_price: el.price_old,
          brand: el.brand,
          available: el.store,
          dataParams: {
                "Ширина": width ? width.value : 'Не указано',
                "Глубина": depth ? depth.value : 'Не указано',
                "Высота": height ? height.value : 'Не указано',
                "Габариты": width&&depth ? `${width.value}x${depth.value}` : 'Не указано',
                "Ширина стиральной машины": widthWashing ? widthWashing.value : 'Не указано',
                "Глубина стиральной машины": depthWashing ? depthWashing.value : 'Не указано',
                "Вид раковины": typeOfShell ? typeOfShell.value : 'Не указано',
                "Форма": shape ? shape.value : 'Не указано',
                "Расстояние от смесителя до слива": distanceDrain ? distanceDrain.value : 'Не указано',
                "Рекомендованная мин. длина излива": minLengthPour ? minLengthPour.value : 'Не указано',
                "Гарантия": garanty ?  garanty.value : 'Не указано',
                "Страна": countryMade ? countryMade.value : 'Не указано',
                "Линии форм": lineShape ? lineShape.value : 'Не указано',
                "Раковина-столешница": sinkCountertop ? sinkCountertop.value : 'Не указано',
                "Со скрытым сливом": hidedrain ? hidedrain.value : 'Не указано',
            }
        };
        this.$store.commit('compare/addItem', item);
      } catch(e){
        console.error(e);
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
      } catch (e){
        console.error(e);
      }
  }
  }
};
</script>