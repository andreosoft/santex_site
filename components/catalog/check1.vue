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
    activeParams: Array,
    dataF: Object,
    idFilters: Number,
  },
  data() {
    return {
      toggleOpen: false,
    }
  },
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
  },
  methods: {
    // check(coll){
    //   let r;
    //   if(this.dataF) {
    //   for (const key in this.dataF) {
    //     if (this.dataF[key] && this.dataF[key].length > 0) {
    //       if(key == this.idFilters){
    //         r = false
    //       } else if(key !== this.idFilters) {
    //         r = true
    //       }
    //     }
    //   }
    // } 

    // // console.log(r);
    // let g, s;
    // g = this.v.find(item => item == coll);
    // s = this.activeParams?.find(item => item.filters_id == this.idFilters);

    // if(r) {
    //   if(s?.filters_data.find(item => item.value == coll)){
    //     return false
    //   } else {
    //     if(g){
    //       return false
    //     } else{
    //       return true
    //     }
    //   }
    // } else {
    //   return false
    // }
    // }
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
