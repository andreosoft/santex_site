<template>
    <div>
        <b>Коллекции</b>
      <div class="a-catalog-check1" :class="{ close: !toggleOpen }">
        <div v-for="(el, i) of params" :key="i">
          <v-checkbox 
          v-if="el.collection" 
          :disabled="el.disabled"
          class="ms-2" 
          dense 
          hide-details 
          @click="$emit('location', $event.target)" 
          :value="String(el.collection)" 
          v-model="v" 
          :label="String(el.collection)" 
          />
        </div>
      </div>
      <div v-if="needExpand" class="mt-2">
        <v-btn small plain @click="toggleOpen = !toggleOpen">{{ toggleOpen ? 'Скрыть': 'Показать все' }}</v-btn>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      params: Array,
      value: Array,
    },
    data() {
      return {
        toggleOpen: false
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
        if (this.params.length > 4) return true;
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
  