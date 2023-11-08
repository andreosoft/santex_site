<template>
  <div>
    <!-- {{ params }} -->
    <b> {{ title }} </b>
    <!-- {{ v }} -->
    <!-- <v-row class="my-1">
      <v-col cols="6">
        <v-text-field outlined hide-details dense v-model="min" />
      </v-col>
      <v-col cols="6">
        <v-text-field outlined hide-details dense v-model="max"/>
      </v-col>
    </v-row> -->
    <catalog-numberRange :range="v" :max="max" :min="min" @location="$emit('location', $event)" @dataNumberRange="dataNumberRange = $event"/>
    <v-range-slider v-model="v" @click="$emit('location', $event.target)" hide-details class="align-center" :min="min" :max="max">
    </v-range-slider>
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
      dataNumberRange: []
    }
  },
  computed: {
    v: {
      get() {
        let d = [this.min, this.max];
        // if(this.dataNumberRange){
        //   for(let i = 0; i < this.params.length; i++){
        //     this.params[i]
        //   }
        // }
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
          // location: $event.target);
      }
    }
  },
  watch: {
    dataNumberRange: async function() {
      try {
        if(this.dataNumberRange){
          // let closestLeft;
          // let closestRight;
          for(let i = 0; i < this.dataNumberRange.length; i++){
            this.dataNumberRange[i] = +this.dataNumberRange[i];
            // if(!this.params.find(v => v == this.dataNumberRange[i])){
            //   closestLeft = +Math.max(...this.params.filter(v => v < this.dataNumberRange[i])).toFixed();
            //   closestRight = +Math.min(...this.params.filter(v => v > this.dataNumberRange[i])).toFixed();
            //   console.log("Число: " + this.dataNumberRange[i])
            //   console.log(closestLeft, closestRight)
            //   if(closestLeft == -Infinity){
            //     this.dataNumberRange[i] = closestRight
            //   } else if (closestRight == Infinity) {
            //     this.dataNumberRange[i] = closestLeft
            //   }

            //   if((this.dataNumberRange[i] - closestLeft) > (closestRight - this.dataNumberRange[i])){
            //     this.dataNumberRange[i] = closestRight
            //   }
            //   else{
            //     this.dataNumberRange[i] = closestLeft
            //   }
            // }
          }
          this.v = this.dataNumberRange
        }
         }
         catch (error){
           console.error(error)
         }
    }
  }
}
</script>
