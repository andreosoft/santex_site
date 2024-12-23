<template>
    <div>
        <b>Коллекции</b>
      <div class="a-catalog-check1">
        <div v-for="(el, i) of paramsData" :key="i">
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
        <v-btn 
          small 
          plain 
          @click="paramsData.length <= 4 ? paramsData = paramsFilter() : paramsData = paramsFilter().slice(0, 4)">
          {{ paramsData.length <= 4 ? 'Показать все' : 'Скрыть' }}
      </v-btn>
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
        toggleOpen: false,
        paramsData: this.paramsFilter().slice(0, 4)
      }
    },
    methods: {
      paramsFilter() {
        return this.params.filter(el => el.collection);
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