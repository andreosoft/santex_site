<template>
  <div class="s-top-bar mb-5">
    <v-container class="py-1">
      <div class="d-flex justify-space-between">
        <div>
          <div>
            <img src="/icons/location.svg" style="height: 14px;" class="pr-2"
              />
            <span style="color: #aaa; font-size: 14px" class="pr-2">Ваш город:</span>
            <s-select-city v-model="currentCity" />
          </div>
        </div>
        <div>
          <span class="s-top-link" v-for="(el, i) in links" :key="i">
            <nuxt-link :to="el.to"> {{ el.title }} </nuxt-link>
          </span>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      activeCity: 0,
      currentCity: "moscow",
      links: [
        {
          to: "/pages/about",
          title: "О компании",
        },
        {
          to: "/pages/delivery",
          title: "Доставка",
        },
        {
          to: "/pages/payment",
          title: "Оплата",
        },
        {
          to: "/pages/contacts",
          title: "Контакты",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.s-top-bar {
  background: #f2f2f2;
  padding: 0 0;
}
.s-top-link a{
  font-size: 14px;
  padding-left: 20px;
}
</style>