<template>
    <div class="s-common-video" :class="{'s-common-video-width': !fullWidth}">

        <iframe v-if="!item.video" :src="item.name" frameborder="0" allowfullscreen class="video"></iframe>
        <iframe v-else :src="item.video" frameborder="0" allowfullscreen class="video"></iframe>
    </div>
    <!-- <div class="s-common-video" :class="{'s-common-video-width': !fullWidth}" style="position: relative">
        <v-img :src="item.img" />
        <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0" class="d-flex justify-center ">
            <v-btn @click="dialog = true" class="align-self-center" fab title="Проиграть видео"><i class="fa fa-play"></i></v-btn>
        </div>
        <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="730px"
            transition="dialog-transition">
            <div class="s-popup">
                <div>
                    <div class="text-right">
                        <v-btn icon @click="dialog = false"><img src="/icons/close_menu.svg" /></v-btn>
                    </div>
                </div>
                <div v-if="dialog">
                    <iframe style="width: 100%; min-height: 500px;" :src="item.video + '?autoplay=1'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </v-dialog>
    </div> -->
</template>

<script>
export default {
    props: {
        item: Object,
        fullWidth: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialog: false
        }
    }
}
</script>

<style lang="scss">
.s-common-video {
    margin: auto;
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

    .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}

.s-common-video-width {
    max-width: 1000px;
}
</style>
