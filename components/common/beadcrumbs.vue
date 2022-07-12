<template>
  <div class="s-beadcrumbs">
    <NuxtLink to="/">Главная</NuxtLink>
    <span v-for="(el, i) in value" :key="i">
      <span class="px-3"><img class=" mb-1" src="/icons/small_arrow_gray.svg" alt="" /></span><NuxtLink :to="el.url">{{ el.title }}</NuxtLink>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
  },
};
</script>

<style lang="scss">
    .s-beadcrumbs a, .s-beadcrumbs span {
        color: #848484!important;
        font-size: 14px!important;
    }
</style>