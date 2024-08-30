<template>
  <div v-if="range[0] != null && range[1] != null">
    <b>{{ title }}</b>
    <!-- {{ range }} -->
    <!-- <v-row class="my-1">
      <v-col cols="6">
        <v-text-field outlined hide-details dense :placeholder="'от ' + min" :value="range[0]"
          @change="$set(range, 0, $event)" />
      </v-col>
      <v-col cols="6">
        <v-text-field outlined hide-details dense :placeholder="'до ' + max" :value="range[1]"
          @change="$set(range, 1, $event)" />
      </v-col>
    </v-row> -->
    <catalog-numberRange :range="range" :max="roundMax" :min="min" @location="$emit('location', $event)"  @dataNumberRange="range = $event"  />
    <!--    {{range}}-->
    <v-range-slider @mouseup="$emit('location', $event.target)" v-model="range" :max="roundMax" :min="min" hide-details class="align-center" />
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
  computed: {
    roundMax() {
      return Math.round(this.max);
    },
    range: {
      get() {
        let d = [this.min, this.roundMax];
        if (this.value && Array.isArray(this.value)) {
          for (const el of this.value) {
            if (el.condition == ">=") d[0] = el.value;
            else if (el.condition == "<=") d[1] = el.value;
          }
        }
        return d;
      },
      set(v) {
        let d = [];

        if (v[0] !== this.min) d.push({ condition: ">=", value: v[0] });
        if (v[1] !== this.roundMax) d.push({ condition: "<=", value: v[1] });
        this.$emit('input', d);
      }

    }
  },
};
</script>
