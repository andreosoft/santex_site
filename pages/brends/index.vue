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
          <div class="d-flex justify-center align-center pa-4 s-plate-brend" style="" v-for="(el, i) in data" :key="i">
            <nuxt-link style="max-width: 100%;" to="/">
              <v-img contain :src="el.image[0]" />
              <div class="s-plate-brend-btn" style="">
                <v-btn fab class="black" dark><i class="fas fa-long-arrow-right"></i></v-btn>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex flex-wrap">
          <div class="mb-4" style="width: 250px;" v-for="(el, i) in data" :key="i">
            <nuxt-link to="/">{{ el.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="mt-16 text-center">
        <a class="s-btn-else"><i class="fas fa-redo"></i> Показать еще</a>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      view: 0,
      activeBrend: 10
    }
  },
  async asyncData(params) {
    const brendLetters = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    const breadcrumbsData = [
      {
        url: "",
        title: "Бренды",
      }
    ];
    const data = [
      {
        name: 'Agape',
        image: ['/img/brends/1.png']
      },
      {
        name: "ARTCERAM",
        image: ["/img/brends/2.png"]
      },
      {
        name: "Axor",
        image: ["/img/brends/3.png"]
      },
      {
        name: "Bette",
        image: ["/img/brends/4.png"]
      },
      {
        name: "Burgbad",
        image: ["/img/brends/5.png"]
      },
      {
        name: "BWT",
        image: ["/img/brends/6.png"]
      },
      {
        name: "Cisal",
        image: ["/img/brends/7.png"]
      },
      {
        name: "Devon&Devon",
        image: ["/img/brends/8.png"]
      },
      {
        name: "Dorn Bracht",
        image: ["/img/brends/9.png"]
      },
      {
        name: "Duravit",
        image: ["/img/brends/10.png"]
      },
      {
        name: "EMCO BAD",
        image: ["/img/brends/11.png"]
      },
      {
        name: "Geberit",
        image: ["/img/brends/12.png"]
      },
      {
        name: "Gessi",
        image: ["/img/brends/13.png"]
      },
      {
        name: "Globo",
        image: ["/img/brends/12.png"]
      },
      {
        name: "Hansgrohe",
        image: ["/img/brends/10.png"]
      },
      {
        name: "Jacuzzi",
        image: ["/img/brends/9.png"]
      },
    ]
    return { data, breadcrumbsData, brendLetters }
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