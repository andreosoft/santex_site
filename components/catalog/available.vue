<template>
  <div>
    <div v-if="value">
      <i class="fas fa-check-circle"></i>
      <span class="grey--text" style="font-size: 13px">Есть в наличии</span>
    </div>
    <div v-else>
      <i class="fas fa-times-circle"></i>
      <span class="grey--text" style="font-size: 13px">Нет в наличии</span>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        value: Number
    }
}
</script>