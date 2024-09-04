<template>
  <div>
    <b>{{ title }}</b>
    <div class="a-catalog-check1" :class="{ close: !toggleOpen }">
      <div v-for="(el, i) of params" :key="i">
        <v-checkbox class="ms-2" dense hide-details @click="$emit('location', $event.target)" :value="el.value"
          v-model="v" :label="el.value" :disabled="el.disabled" />
      </div>
    </div>
    <div v-if="needExpand" class="mt-2">
      <v-btn small plain @click="toggleOpen = !toggleOpen">{{ toggleOpen ? 'Скрыть' : 'Показать все' }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    params: Array,
    value: Array,
  },
  data() {
    return {
      toggleOpen: false,
    }
  },
  // watch: {
  //   params(){
  //     if(this.params){
  //       this.params.forEach(element => {
  //           if(element.disabled == true){
  //             if(this.v.includes(element.value)) {
  //               v = v.filter(item => item !== element.value);
  //             }
  //           }
  //         });
  //     }
  //     }
  // },
  computed: {
    v: {
      get() {
        return this.value;
      },
      set(v) {
          this.$emit('input', v);
      }
    },
    needExpand() {
      if (this.params.length > 8) return true;
      return false;
    }
  }
};
</script>

<style lang="scss">
.a-catalog-check1 {
  overflow: hidden;

  &.close {
    max-height: 130px;
  }
}
</style>
