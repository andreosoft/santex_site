<template>
    <div class="s-timepicker">
        <div class="s-timepicker-title">
            Выбрать время
        </div>
        <div class="s-timepicker-content">
            <div class="d-inline-block" v-for="(el, i) in dataTime" :class="{active: el == value}" @click="$emit('input', el)">{{el}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: String
    },
    data() {
        return {
            dataTime: [
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
            ]
        }
    }
}
</script>

<style lang="scss">
    .s-timepicker {
        .s-timepicker-title {
            background: #222222;
            padding: 16px 0;
            color: #fff;
            text-align: center;
            font-weight: bold;
        }
        .s-timepicker-content {
            background: #F2F2F2;
            text-align: center;
            padding: 6px 10px;
        }
        .d-inline-block {
            display: inline-block;
            color: #222222;
            background: #fff;
            border: 1px solid #d0d0d0;
            border-radius: 20px;
            padding: 4px 16px 1px 16px;
            margin: 6px 6px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            &:hover {
                background: #d0d0d0;
            }
            &.active {
                background: #222222;
                color: #fff;
                border-color: #222222;
            }
        }
    }
</style>