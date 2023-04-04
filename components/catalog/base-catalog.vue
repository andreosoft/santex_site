<template>
  <div>
    <v-row class="s-row">
      <v-col cols="3">
        <catalog-filter :filters="dataFilters" v-model="valueFilters" />
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
    data: Object,
    dataFilters: Object,
    valueFilters: Object,
    pager: Object,
    sort: Object,
  }
}
</script>
