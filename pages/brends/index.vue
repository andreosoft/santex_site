<template>
  <v-container class="mb-10">
    <v-divider class="mb-8" />
    <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
    <h1>Бренды</h1>
    <v-divider class="mb-8" />
    <div class="d-flex justify-space-between align-center">
      <div>
        <div v-for="(el, i) in brendLetters" :key="i" class="s-btn-brend-letter"
          :class="{ black: i == activeBrend, 'white--text': i == activeBrend }" @click="activeBrend = i">{{ el
          }}</div>
      </div>
      <div>
        <span class="text-uppercase s-btn" :class="{ active: view == 0 }" @click="view = 0">
        <img style="margin: 0 4px 4px 0;" src="/icons/catalog_card.svg" alt="" />
          Плитка</span>
        <span style="border-left: 1px solid #b8b6b6; padding: 8px 10px; margin-left: 20px;" />
        <span class="text-uppercase s-btn" :class="{ active: view == 1 }" @click="view = 1">
        <img style="margin: 0 4px 4px 0;" src="/icons/catalog_list.svg" alt="" />
          Список</span>
      </div>
    </div>
    <v-divider class="mt-8 mb-16" />
    <div>
      <div v-if="view == 0">
        <div class="d-flex flex-wrap">
          <div class="d-flex justify-center align-center pa-4 s-plate-brend" style="" v-for="(el, i) in activeData" :key="i">
            <nuxt-link style="max-width: 100%;" :to="'/catalog/search?q=' + el.name">
              <v-img v-if="el.images && el.images[0]" contain :src="$config.baseImageURL + el.images[0]"/>
              <v-img v-else contain :src="'/black-square.jpg'"/>
              <div class="s-plate-brend-btn" style="">
                <v-btn fab class="black" dark><i class="fas fa-long-arrow-right"></i></v-btn>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex flex-wrap">
          <div class="mb-4" style="width: 250px;" v-for="(el, i) in activeData" :key="i">
            <nuxt-link :to="'/catalog/search?q=' + el.name">{{ el.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="view == 0 && activeData.length >= 16">
      <div class="mt-16 text-center">
        <a @click="toggleAll = !toggleAll" class="s-btn-else"><i class="fas fa-redo"></i> {{ toggleAll ? 'Скрыть' : 'Показать еще' }} </a>
      </div>
    </div>
  </v-container>
</template>

<script>
import { uniq } from 'lodash';
export default {
  data() {
    return {
      view: 0,
      activeBrend: 0,
      toggleAll: false,
    }
  },
computed: {
  activeData() {
    if (this.dataBrands.filter(item => item['name'].trim()[0] == this.brendLetters[this.activeBrend])) {
      if(this.view == 0){
        if(this.toggleAll) {
          return this.dataBrands.filter(item => item['name'].trim()[0] == this.brendLetters[this.activeBrend]);
        } else {
          return this.dataBrands.filter(item => item['name'].trim()[0] == this.brendLetters[this.activeBrend]).slice(0, 16);
        }
      } else {
        return this.dataBrands.filter(item => item['name'].trim()[0] == this.brendLetters[this.activeBrend]);
      }

    }
  }
},
  async asyncData({ $axios, $config }) {
    const breadcrumbsData = [
      {
        url: "",
        title: "Бренды",
      }
    ];
    const dataBrands = (await $axios.get($config.baseURL + '/api/site/brand', { params: { filters: { status: 1 } } })).data.data;

    let brendLetters = [];
    dataBrands.forEach(el => {
      brendLetters.push(el['name'].trim()[0]);
    })
  
    brendLetters = uniq(brendLetters).sort();
    return { breadcrumbsData, brendLetters, dataBrands }
  }
}
</script>

<style lang="scss">
.s-plate-brend {
  margin: 0 -1px -1px 0;
  width: 335px;
  height: 335px;
  border: 1px solid #9e9e9e;
  position: relative;
  .s-plate-brend-btn {
    position: absolute; bottom: 40px; left: 0; right: 0; text-align: center; opacity: 0;
  }
  &:hover {
    background: #ececec;
    .s-plate-brend-btn {
      transition: all 1s;
      opacity: 1;
    }
  }
  transition: all 1s;
}

.s-btn-brend-letter {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #0000008a;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  padding: 8px;
  &:hover {
    background: #00000018;
  }
}

.s-btn {
  cursor: pointer;
  color: #9e9e9e;
  img {
      filter: invert(60%);
    }

  &.active {
    color: #000;
    img {
      filter: invert(0%);
    }
  }
}
</style>