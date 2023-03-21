<template>
    <v-expansion-panels focusable>
      <v-expansion-panel>
        <v-expansion-panel-header>
    <b>{{ title }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
    <div class="a-catalog-check1" :class="{ close: !toggleOpen }">
      <div v-for="(el, i) of params" :key="i">
        <v-checkbox class="ml-2" dense hide-details :value="el" :label="el" />
      </div>
    </div>
    <div v-if="needExpand" class="mt-2"><v-btn small plain @click="toggleOpen = !toggleOpen">{{ toggleOpen ? 'Скрыть': 'Показать все' }}</v-btn></div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
  props: {
    title: String,
    params: Array,
    value: Array
  },
  data() {
    return {
      toggleOpen: false
    }
  },
  computed: {
    needExpand() {
      if (this.params.length > 8) return true;
      return false;
    }
  }
};
</script>

<style lang="scss">
.a-catalog-check1 {
  overflow: hidden;

  &.close {
    max-height: 290px;
  }
}
.space-check .v-item-group{
  z-index: 0;
  position: relative;
  border: 0.2px black solid;
  .v-expansion-panel::before{
    box-shadow: unset;
  }

}


</style>
