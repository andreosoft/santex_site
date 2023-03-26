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
    <v-range-slider
      v-model="mass"
      hide-details
      class="align-center"
      :min="min"
      :max="max"
      />
  </div>
</template>


<script>
export default {
  props:{
    title: String,
    params: Array,
    min: Number,
    max: Number
  },
  data() {
    return {
      values: this.params,
      mass: [this.min, this.max],
      range: [],
      starter: 0,
      end: 0
    }
  },
    methods: {
      // rangevalues(values){
      //   values.forEach(item =>{
      //     this.range.push(Number(item.replace(/\,/g, '.')))
      //   })
      //   this.range.sort(function qwe(a,b){
      //     return a-b;
      //   })
      //   this.range.forEach(item=> {
      //     if(item == this.mass[0]){
      //       this.starter = item;
      //     } else if(item == this.mass[1]){
      //       this.end = item;
      //     }
      //   })
      //     return this.range.slice(this.starter, this.end+1)
      // }
    }

}
</script>

<style lang="scss">


</style>
