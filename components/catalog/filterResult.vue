<template>
  <div class="d-flex align-center justify-space-between"
    :class="{ 's-filterResult': true, 's-filterResultVisible': locationRes && visible }"
    :style="{ top: locationRes + 'px' + '!important' }">
    <div class="w-100" style="display: flex; justify-content: space-between; align-items: center; ">
      <span style="text-align: center; color: white;">
        <span v-if="!loading">Найдено товаров: {{ resultData.count }}</span>
      </span>
      <v-btn v-if="resultData.count > 0 && locationRes" :loading="loading" @click="onUpdateData">Показать</v-btn>
    </div>
  </div>
</template>


<script>

export default {
  props: {
    loading: Boolean,
    locationRes: {
      type: Number
    },
    resultData: Object
  },
  data() {
    return {
      scrollNum: 0,
      visible: true
    }
  },
  watch: {
    resultData: function () {
      this.visible = true;
      // console.log(this.resultData + ' Данные изменены')
    },
    locationRes: function () {
      this.visible = true;
    }
  },
  methods: {
    onUpdateData() {
      this.$emit('filterResult', true);
    },
    handleScroll() {
      // console.log(window.scrollY - this.scrollNum > 40);
      // console.log('Отображается: ' + this.visible);
      if ((window.scrollY - this.scrollNum > 40) && this.visible) {
        this.scrollNum = window.scrollY;
        this.visible = false;
      }
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
}

</script>