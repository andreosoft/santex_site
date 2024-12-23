<template>
  <div>
    <b>{{ title }}</b>
    <div class="a-catalog-check1">
      <div v-for="(el, i) of paramsData" :key="i">
        <v-checkbox class="ms-2" dense hide-details @click="$emit('location', $event.target)" :value="el.value"
          v-model="v" :label="el.value" :disabled="el.disabled" />
      </div>
    </div>
    <div v-if="needExpand" class="mt-2">
      <v-btn 
        small 
        plain 
        @click="paramsData.length <= 4 ? paramsData = params : paramsData = params.slice(0, 4)">
        {{ paramsData.length <= 4 ? 'Показать все' : 'Скрыть' }}
      </v-btn>
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
      paramsData: this.params.slice(0, 4)
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
      if (this.params.length > 4) return true;
      return false;
    }
  }
};
</script>