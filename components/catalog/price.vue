<template>
  <div v-if="range[0] != null && range[1] != null">
    <b>{{ title }}</b>
    <v-row class="my-1">
      <v-col cols="6">
        <v-text-field  outlined hide-details dense :placeholder="'от ' + min" :value="range[0]" @change="$set(range, 0, $event)" />
      </v-col>
      <v-col cols="6">
        <v-text-field outlined hide-details dense :placeholder="'до ' + max" :value="range[1]" @change="$set(range, 1, $event)" />
      </v-col>
    </v-row>
<!--    {{range}}-->
    <v-range-slider
      v-model="range"
      @change="$emit('input', range)"
      :max="max"
      :min="min"
      hide-details
      class="align-center"
    />
  </div>
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
