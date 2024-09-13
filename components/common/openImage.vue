<template>
    <div>
        <v-row class="parent-fullimage">
            <v-col class="col-2 d-flex flex-column align-center overflow-y-auto overflow-x-hidden left-menu">
                <v-card 
                v-for="(el, i) in images" 
                :key="i" 
                class="ma-2 s-catalog-gallery"
                :class="{ active: galleryModel == i }" 
                @click="galleryModel = i"
                >
                    <v-img width="100" height="100" :src="$config.baseImageURL + el + '?height=100'" :contain="true"/>
                </v-card>
            </v-col>
                <v-col class="d-flex flex-row justify-space-between middle-menu">
                    <v-col class="w-100 pa-0 ma-0">
                        <v-btn @click="galleryModel == 0 ? galleryModel = images.length - 1 : galleryModel--" class="left-btn" style="z-index: 1000">
                            <img src="/icons/arrow_left.svg" alt="">
                        </v-btn>
                        <v-window  
                            v-model="galleryModel" 
                            class="h-100 full-gallery mx-auto"
                        >
                            <v-window-item v-for="(el, i) in images" :key="i" class="h-100">
                                <v-card @click="fullimg = true" class="ma-2 h-100">
                                    <v-img class="h-100" :src="$config.baseImageURL + el" contain/>
                                </v-card>
                            </v-window-item>
                        </v-window>
                        <v-btn @click="galleryModel++" class="right-btn">
                            <img src="/icons/arrow_right.svg" alt="">
                        </v-btn>
                    </v-col>
                        <div class="exit-btn">
                            <button @click="$emit('closeFullImg')">
                                <v-img src="/icons/del_card.svg" contain/>
                            </button>
                        </div>
                </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        value: Array,
        index: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            galleryModel: 0,   
        }
},
methods: {
    toggleArrows(e){
        if(e.key == 'ArrowLeft') {
            this.galleryModel == 0 ? this.galleryModel = this.images.length - 1 : this.galleryModel--
        } else if(e.key == 'ArrowRight') {
            this.galleryModel++
        } else if(e.key == 'Escape') {
            this.$emit('closeFullImg')
        }
    }
},
mounted() {
    window.addEventListener('keydown', this.toggleArrows);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.toggleArrows);
},
computed: {
    images(){
        return this.value
    }
},
}
</script>

<style lang="scss" scoped>
    .parent-fullimage{
            background-color: white;
            bottom: 0;
            left: 0;
            outline: none;
            overflow-x: hidden;
            overflow-y: hidden;
            position: fixed;
            top: 0;
            width: 100vw;
            z-index: 100000;
            .exit-btn{
                position: fixed;
                right: 18px;
                top: 18px;
            }
            .parent-menu-middle{
                border-radius: 0;
                margin: 0;
                max-width: none;
                min-height: 100vh;
                width: 100%;
                min-width: 392px;
                position: relative;
            }
            .left-menu{
                height: 100vh;
                position: absolute;
                width: 140px;
                left: 0;
                top: 0;
            }
            .middle-menu{
                height: calc(100% - 48px);
                left: 156px;
                position: absolute;
                top: 24px;
                width: calc(100% - 208px);
                .right-btn, .left-btn{
                    position: absolute;
                    top: 50%;
                    min-width: unset !important;
                    transform: translateY(-50%);
                    width: 50px;
                    height: 50px;
                    border: 1px solid #cacaca;
                    border-radius: 100%;
                    background: #fff;
                    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
                    span{
                        width: 50px;
                        height: 50px;
                    }
                }
                .left-btn{
                    &::before{
                        content: unset;
                    }
                    left: 0;
                }
                .right-btn{
                    right: 0;
                }
            }
    }

</style>