<template>
  <div>
    <v-row class="s-row">
      <v-col cols="3">
        <div>
          <catalog-filter :value="valueFilters" :filters="dataFilters" @input="$emit('update-data', $event);" />
        </div>
      </v-col>
      <v-col cols="9">
        <catalog-top-bar :count="pager.count" :sort="sort" />
        <v-row v-if="loading" class="s-row">
          <v-col cols="4" v-for="(el, i) in pager.limit" :key="i">
            <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else class="s-row">
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
    data: Array,
    dataFilters: Object,
    valueFilters: Object,
    pager: Object,
    sort: Object,
    loading: {
      type: Boolean,
      default: false
    }
  },
}
</script>
