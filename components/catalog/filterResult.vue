<template>
  <div :class="{'s-filterResult': true, 's-filterResultVisible': dataRes!==0}" :style="{top: dataRes + 'px' + '!important'}">
      <div style="display: flex; justify-content: space-between; align-items: center; ">
        <span style="text-align: center; color: white;">Найдено товаров: </span>
        <v-btn @click="onUpdateData($event)">Показать</v-btn>
      </div>
    </div>
  </template>


  <script>

  export default {
    props: {
      locationRes: {
        type: Number,
        default: 0
      }
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
            // dataValue: false
        }
    },
    // watch: {
    //   dataRes: function(){
    //     if(this.dataRes !== 0 && !this.dataValue){
    //       setTimeout(() => {
    //         this.dataValue = true;
    //       }, 3*1000);
    //     } else if(this.dataRes !== 0 && this.dataValue){
    //       this.dataValue = false
    //       setTimeout(() => {
    //         this.dataValue = true;
    //       }, 3*1000);
    //     }
          
    //   }
    // },
    methods: {
      onUpdateData(event){
        this.$emit('filterResult', true);
      }
    }
  }

</script>