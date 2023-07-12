<template>
  <div class="s-footer white--text py-2 pt-10" style="background: #2a2726;">
    <v-container>
      <v-row class="py-10">
        <v-col class="d-none d-md-flex" md="3">
          <nuxt-link to="/"><img src="/logo1.png" alt="" /></nuxt-link>
        </v-col>
        <v-col cols="6" lg="3">
          <div
            class="mb-3"
            v-for="(el, i) in leftLinks"
            :key="i"
            style="font-size: 14px"
          >
            <nuxt-link :to="el.to">{{ el.title }}</nuxt-link>
          </div>
        </v-col>
        <v-col cols="6" lg="3">
          <div
            class="mb-3"
            v-for="(el, i) in rightLinks"
            :key="i"
            style="font-size: 14px"
          >
            <nuxt-link :to="el.to">{{ el.title }}</nuxt-link>
          </div>
        </v-col>
        <v-col xs="6" lg="3">
          <div class="pb-8">
            <div style="color: #777" class="text-center text-sm-right">
              Гарантия и возвраты
            </div>
            <div class="text-center text-sm-right">
              <a
                style="font-size: 32px; font-weight: lighter"
                href="tel:84952256285"
                >8 495 225 62 85</a
              >
            </div>
          </div>
          <div class="text-right">
            <v-btn style="text-transform: none;" rounded class="black--text s-btn-main s-btn-text" to="/consulting"
              >Запись на консультацию</v-btn
            >

          </div>
        </v-col>
      </v-row>
      <hr />
      <v-row class="s-bottom">
        <v-col style="text-align: center !important;" cols="6" lg="2"><a href="/">© SantehKomfort Elite, {{ new Date().getFullYear() }}</a> </v-col>
        <v-col style="text-align: center !important;" cols="6" lg="2"><nuxt-link to="/publicOffer">Публичная оферта</nuxt-link> </v-col>
        <v-col style="text-align: center !important;" cols="6" lg="2"><nuxt-link to="/privacy">Политика конфиденциальности</nuxt-link></v-col>
        <v-col style="text-align: center !important;" cols="6" lg="2"><nuxt-link to="/acceptRules">Правила приемки</nuxt-link> </v-col>
        <v-col style="text-align: center !important;" cols="6" lg="2"><nuxt-link to="/userAgreement">Пользовательское соглашение</nuxt-link></v-col>
        <v-col cols="6" xs="6" lg="2" class="text-right"><img src="/img/mench1.png" /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopupConsult: false,
      leftLinks: [
        {
          to: "/",
          title: "Каталог",
        },
        {
          to: "/",
          title: "Распродажа",
        },
        {
          to: "/brends",
          title: "Бренды",
        },
        {
          to: "/blog",
          title: "Блог",
        },
        {
          to: "/designers",
          title: "Дизайнеры",
        },
      ],
      rightLinks: [
        {
          to: "/pages/about",
          title: "О компании",
        },
        {
          to: "/pages/contacts",
          title: "Контакты",
        },
        {
          to: "/pages/payment",
          title: "Оплата",
        },
        {
          to: "/pages/delivery",
          title: "Доставка",
        },
        {
          to: "/pages/garanty",
          title: "Гарантия и возвраты",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.s-footer {
  a {
    color: #eee !important;
  }
  hr {
    border: none;
    border-bottom: solid 2px #777;
    margin: 20px 0;
  }
  .s-bottom {
    a {
      color: #777 !important;
      font-size: 14px;
    }
  }
}
</style>