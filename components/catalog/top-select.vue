<template>
    <div class="mb-6">
        <div class="d-flex" style="flex: 0 0 100%;">
            <div class="s-catalog-top-select d-flex align-center" v-for="(el, i) in data" :key="i">
                <div class="pr-2"><img :src="el.image[0]" /></div>
                <div>
                    <div>{{ el.name }}</div>
                    <div class="grey--text">{{ el.count }}</div>
                </div>
            </div>
            <div class="s-catalog-top-select d-flex align-center">
                <div>Показать<br>все категории</div>
                <div class="pl-2">
                    <v-btn fab dark small><i class="fas fa-long-arrow-down"></i></v-btn>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    name: "Мыльницы",
                    image: ["/img/catalog/top/1.png"],
                    count: "392 товара"
                },
                {
                    name: "Стаканы",
                    image: ["/img/catalog/top/2.png"],
                    count: "392 товара"
                },
                {
                    name: "Дозаторы",
                    image: ["/img/catalog/top/3.png"],
                    count: "392 товара"
                },
                {
                    name: "Комплекты",
                    image: ["/img/catalog/top/4.png"],
                    count: "392 товара"
                },
                {
                    name: "Бумагодержатели",
                    image: ["/img/catalog/top/5.png"],
                    count: "392 товара"
                },
                {
                    name: "Ёршики",
                    image: ["/img/catalog/top/6.png"],
                    count: "392 товара"
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.s-catalog-top-select {
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    border-right: 1px solid #aaa;
    &:first-child {
        border-left: 1px solid #aaa;
    }
    margin: 0;
    padding: 20px 17px;
    font-size: 13px;
    cursor: pointer;
}
</style>