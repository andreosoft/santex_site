<template>
  <v-app style="background: url(/img/404.png); ">
    <common-header />
    <v-main>
      <v-container class="mb-10">
        <v-divider class="mb-8" />
        <div style="padding: 120px 0;" class="text-center">
          <div style="font-weight: bold; font-size: 46px;">Страница не найдена</div>
          <div style="font-size: 20px; margin: 36px 0;">К сожалению данная страница не найдена или была удалена</br>
            перейдите на главную страницу сайта</div>
          <div>
            <v-btn dark to="/">На главную</v-btn>
          </div>
        </div>
      </v-container>
    </v-main>
    <common-footer />
  </v-app>
</template>
<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

