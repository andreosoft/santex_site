<template>
  <div>
    <b> {{ title }} </b>
    <!-- <v-row class="my-1">
      <v-col cols="6">
        <v-text-field outlined hide-details dense v-model="min" />
      </v-col>
      <v-col cols="6">
        <v-text-field outlined hide-details dense v-model="max"/>
      </v-col>
    </v-row> -->
    <v-range-slider v-model="v" hide-details class="align-center" :min="min" :max="max" />
  </div>
</template>


<script>
export default {
  props: {
    title: String,
    params: Array,
    min: Number,
    max: Number,
    value: Array,
  },
  data() {
    return {
    }
  },
  computed: {
    v: {
      get() {
        let d = [this.min, this.max];
        if (this.value && Array.isArray(this.value) && this.value.length > 0) {
          let maxVal;
          let minVal;
          for (let i = 0; i < this.value.length; i++) {
            const n = this.value[i];
            if (i == 0) {
              maxVal = n;
              minVal = n;
            }
            if (n <= minVal) minVal = n;
            else if (n >= maxVal) maxVal = n;
          }
          if (minVal) d[0] = Math.floor(minVal);
          if (maxVal) d[1] = Math.ceil(maxVal);
          
        }
        return d;
      },
      set(v) {
        let r = [];
        if (v[0] == this.min && v[1] == this.max) return this.$emit('input', []);
        for (let i = 0; i < this.params.length; i++) {
          const n = this.params[i];
          if (Math.floor(n) >= v[0] && Math.ceil(n) <= v[1]) r.push(n);
        }
        return this.$emit('input', r);
      }
    }
  },
}
</script>

<style lang="scss"></style>
