<template>
  <div>
    <div class="s-text-h2 text-center" style="margin-bottom: 86px">
      ПРИХОДИТЕ В SantehKonfort Elite:
    </div>
    <div>
      <v-container>
        <common-video :item="item"/>
      </v-container>
    </div>
    <div class="mb-14" />
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style lang="scss">

</style>