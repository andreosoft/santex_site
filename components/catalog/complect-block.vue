<template>
  <div style="border: 1px solid #ddd">
    <div class="d-flex pa-8" style="">
      <div v-for="(el, i) in data" :key="i" class="">
        <div class="d-flex align-center">
          <div class="pa-8" v-if="i != 0" style="font-size: 30px">
            <i class="far fa-plus"></i>
          </div>
          <div class="black--text" style="width: 180px">
            <v-checkbox />
            <div>
              <v-img :src="el.image[0]" />
            </div>
            <div>{{ el.name }}</div>
            <div class="mt-4">
              <span style="font-size: 22px">
                <number :value="el.price" /> ₽
              </span>
              <span class="ml-4 grey--text " style="
              display: inline-block;
                    padding-top: 2px;
                      font-size: 16px;
                      vertical-align: top;
                      text-decoration: line-through;
                    " v-if="el.old_price">
                <number :value="el.old_price" /> ₽
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex pa-8 justify-space-between align-center" style="border-top: 1px solid #ddd">
      <div class="d-flex align-center">
        <div class="mr-8">
          <v-btn dark class="s-btn-main"><b>В корзину комплектом</b></v-btn>
        </div>
        <div>
          <div>
            <span style="font-size: 32px; font-weight: bold;">
              <number :value="27345" /> <span style="font-weight: normal;">₽</span>
            </span>
            <span class="ml-4 grey--text " style="
                    display: inline-block;
                    padding-top: 6px;
                      font-size: 16px;
                      vertical-align: top;
                      text-decoration: line-through;
                    " v-if="true">
              <number :value="18345" /> ₽
            </span>
          </div>
          <div>Комплект: <b>2 товара</b></div>
        </div>
      </div>
      <div>
        <span class="grey--text" style="cursor: pointer">
          <span>Еще товары 1</span>
          <i style="font-size: 12px;" class="ml-4 fas fa-chevron-down"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>