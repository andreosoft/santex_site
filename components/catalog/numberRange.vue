<template>
<div>
    <v-row class="my-1">
        <v-col cols="6">
          <v-text-field outlined hide-details dense :placeholder="'от ' + min" :value="range[0]"
            @change="$set(range, 0, $event)" @blur="$emit('location', $event.target)" />
        </v-col>
        <v-col cols="6">
          <v-text-field outlined hide-details dense :placeholder="'до ' + max" :value="range[1]"
            @change="$set(range, 1, $event)" @blur="$emit('location', $event.target)" />
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
    // methods: {
    //   textField(e){
    //       this.$emit('location', e.target);
    //     }
    // }
}
</script>
