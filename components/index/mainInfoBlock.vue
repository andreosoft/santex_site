<template>
  <v-container>
    <v-row class="my-3" align="center">
      <v-col cols="12" lg="7">
        <img class="s-title-img" style="width: 800px" src="/img/main-block1.png" />
      </v-col>
      <v-col cols="12" lg="5" class="">
        <div class="s-title-header text-center">
          ТОЛЬКО<br />
          В SANTEHKOMFORT Elite:
        </div>
        <hr class="style-1 pb-4" />
        <p class="s-title-text text-center mb-4">
          Комплектация санузла от грамотных специалистов с опытом работы от
          10-ти лет. Так же у нас вы можете заказать полностью проект помещения
          или только ванной комнаты.
        </p>
        <div class="text-center mt-5">
          <v-btn class="s-btn-main s-btn-text">ПОДРОБНЕЕ</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.s-title-header {
  font-size: 43px;
  font-weight: bold;
}
.s-title-text {
  font-size: 20px;
}
@media (min-width: 1264px) {
  .s-title-img {
    margin-left: -45px;
  }
}
</style>