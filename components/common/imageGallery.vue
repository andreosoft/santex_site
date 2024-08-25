<template>
    <div v-if="images">
        <common-openImage v-if="fullimg" :value="images" :index="galleryModel" @closeFullImg="fullimg = false" />
        <v-window v-model="galleryModel">
            <v-window-item v-for="(el, i) in images" :key="i">
                <v-card @click="fullimg = true" class="ma-2">
                    <v-img :src="$config.baseImageURL + el "  height="600" contain/>
                </v-card>
            </v-window-item>
        </v-window>
        <div>
<!--    <div class="d-flex overfow-auto img-cover">      -->
            <div class="d-flex flex-wrap img-cover">
                <!-- <v-card class="ma-2 s-catalog-gallery" style="position: relative;">
                <v-img width="100" :src="data.images[0]" />
                <div style="position: absolute; left:0; right: 0; top: 0; bottom: 0;"
                  class="d-flex justify-center align-center">
                  <v-btn class="white" icon title="Проиграть видео"><i style="margin-left: 4px;
      margin-bottom: 3px;" class="fa fa-play"></i></v-btn>
                </div>
              </v-card> -->
                <v-card v-for="(el, i) in images" :key="i" class="ma-2 s-catalog-gallery"
                    :class="{ active: galleryModel == i }" @click="galleryModel = i">
                    <v-img width="100" height="100" :src="$config.baseImageURL + el + '?height=100'" :contain="true"/>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: Array
    },
    data() {
        return {
            galleryModel: 0,
            fullimg: false
        }
    },
    watch: {
        fullimg() {
            if (this.fullimg) {
                document.querySelector('html').style.overflow = 'hidden';
            } else {
                document.querySelector('html').style.overflow = 'auto';
            }
        }
    },
    computed: {
        images() {
            return this.value
        }
    }
}
</script>
