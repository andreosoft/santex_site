<template>
  <div>
    <!-- <p> base {{valueFilters}}</p> -->
    <v-row class="s-row">
      <v-col cols="3">
        <div>
          <catalog-filter :updateDataFilters="updateValueFilters" :value="value" :filters="dataFilters" v-model="valueFilters" />
        </div>
      </v-col>
      <v-col cols="9">
        <catalog-top-bar :count="pager.count" :sort="sort" />
        <v-row class="s-row">
          <v-col cols="4" v-for="(el, i) in data" :key="i">
            <catalog-item-list :el="el" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    updateDataFilters: Function,
    value: String,
    data: Array,
    dataFilters: Object,
    valueFilters: Object,
    pager: Object,
    sort: Object,
  },
  methods: {
    updateValueFilters(){
        let value  = this.valueFilters;
        this.$emit('update-data', value);
    }
  }
}
</script>
