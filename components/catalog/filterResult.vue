<template>
  <div :class="{'s-filterResult': true, 's-filterResultVisible': dataRes && visible}" :style="{top: dataRes + 'px' + '!important'}">
      <div style="display: flex; justify-content: space-between; align-items: center; ">
        <span style="text-align: center; color: white;">Найдено товаров: {{ resultData }} </span>
        <v-btn @click="onUpdateData">Показать</v-btn>
      </div>
    </div>
  </template>


  <script>

  export default {
    props: {
      locationRes: {
        type: Number,
        default: 0
      },
      resultData: Number
    },
    computed: {
      dataRes:{
        get(){
          return this.locationRes
        },
        set(data){
          return data;
        }
      }
    },
    data(){
        return {
          scrollNum: 0,
          visible: false
        }
    },
    watch: {
      dataRes: function(){
        this.dataRes ? this.visible = true : this.visible = false;
      }
    },
    methods: {
      onUpdateData(){
        this.$emit('filterResult', true);
      },
      handleScroll(){
        if((window.scrollY - this.scrollNum > 20) && (this.visible === true)){
          this.scrollNum = window.scrollY;
          this.visible = false;
        }
      }
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll)
    },
  }

</script>