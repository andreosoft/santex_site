<template>
  <div>
    <b>{{ title }}</b>
    <div v-for="(el, i) of params" :key="i">
        <v-checkbox dense hide-details :value="el" :label="el"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    params: Array,
    value: Array
  },
};
</script>