<template>
  <v-expansion-panels focusable v-if="range[0] != null && range[1] != null">
    <v-expansion-panel>
      <v-expansion-panel-header>
    <b>{{ title }}</b>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
    <v-row class="my-1">
      <v-col cols="6">
        <v-text-field  outlined hide-details dense :placeholder="'от ' + min" :value="range[0]" @change="$set(range, 0, $event)" />
      </v-col>
      <v-col cols="6">
        <v-text-field outlined hide-details dense :placeholder="'до ' + max" :value="range[1]" @change="$set(range, 1, $event)" />
      </v-col>
    </v-row>
        <v-range-slider
          v-model="range"
          @change="$emit('input', range)"
          :max="max"
          :min="min"
          hide-details
          class="align-center"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>

  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    title: String,
    max: Number,
    min: Number,
    value: Array
  },
  data() {
    return { range: this.value };
  },
};
</script>

<style lang="scss">
.space-check .v-item-group{
  z-index: 0;
  position: relative;
  border: 0.2px black solid;
.v-expansion-panel::before{
  box-shadow: unset;
}

}
</style>
