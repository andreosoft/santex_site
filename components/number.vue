<template>
  <span>{{ val }}</span>
</template>

<script>
export default {
  props: {
    value: [String, Number],
  },
  computed: {
    val() {
      if (this.value) {
        return this.value.toLocaleString('ru');
      }
      return this.value;
    },
  },
};
</script>