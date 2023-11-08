<template>
<div>
    <v-row class="my-1">
        <v-col cols="6">
          <v-text-field class="input-number" type="number" outlined hide-details dense :placeholder="'от ' + min" :value="Number(range[0])"
            @change="$set(range, 0, $event)" @keyup.enter="dataEmit($event)" />
        </v-col>
        <v-col cols="6">
          <v-text-field class="input-number" type="number" outlined hide-details dense :placeholder="'до ' + max" :value="Number(range[1])"
            @change="$set(range, 1, $event)" @keyup.enter="dataEmit($event)" />
        </v-col>
      </v-row>
</div>
</template>

<script>
export default{
    props: {
        max: Number,
        min: Number,
        range: Array
    },
    methods: {
        dataEmit(e){
            this.$emit('dataNumberRange', this.range)
            this.$emit('location', e.target)
        }
    }
}
</script>

<style lang="scss">

.input-number input[type="number"]::-webkit-inner-spin-button, 
.input-number input[type="number"]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

</style>
