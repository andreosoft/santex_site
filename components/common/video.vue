<template>
    <div style="position: relative">
        <v-img :src="item.img" />
        <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0" class="d-flex justify-center ">
            <v-btn class="align-self-center" fab title="Проиграть видео"><i class="fa fa-play"></i></v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object
    }
}
</script>