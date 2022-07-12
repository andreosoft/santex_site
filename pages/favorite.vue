<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex justify-space-between">
            <h1>{{ title }}</h1>
            <div>
                <v-btn class="s-btn-text">Очистить список <i style="font-size: 20px; margin-top: -6px;" class="ml-2 grey--text fas fa-times-circle"></i></v-btn>
            </div>
        </div>
        <v-divider class="mb-10" />
        <div>
            <v-row class="s-row">
                <v-col cols="3" v-for="(el, i) in data" :key="i">
                    <favorite-item-list :el="el" />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    async asyncData(params) {
        const title = "Избранные товары"
        const breadcrumbsData = [
            {
                url: "",
                title: title,
            }
        ];
        const data = [
            {
                id: 100,
                name: "Название товара",
                image: ["/img/favorite/1.png"],
                code: "4554545",
                price: 1540,
                old_price: 8220,
                brend_name: "Название бренда",
                size: "44 x 75 x 20",
                available: 1,
            },
            {
                id: 100,
                name: "Название товара",
                image: ["/img/favorite/2.png"],
                code: "4554545",
                price: 1540,
                old_price: 8220,
                brend_name: "Название бренда",
                size: "44 x 75 x 20",
                available: 1,
            },
            {
                id: 100,
                name: "Название товара",
                image: ["/img/favorite/3.png"],
                code: "4554545",
                price: 1540,
                old_price: 8220,
                brend_name: "Название бренда",
                size: "44 x 75 x 20",
                available: 1,
            },
            {
                id: 100,
                name: "Название товара",
                image: ["/img/favorite/4.png"],
                code: "4554545",
                price: 1540,
                old_price: 8220,
                brend_name: "Название бренда",
                size: "44 x 75 x 20",
                available: 1,
            },
            {
                id: 100,
                name: "Название товара",
                image: ["/img/favorite/5.png"],
                code: "4554545",
                price: 1540,
                old_price: 8220,
                brend_name: "Название бренда",
                size: "44 x 75 x 20",
                available: 1,
            },
            {
                id: 100,
                name: "Название товара",
                image: ["/img/favorite/6.png"],
                code: "4554545",
                price: 1540,
                old_price: 8220,
                brend_name: "Название бренда",
                size: "44 x 75 x 20",
                available: 1,
            }
        ]
        return { title, data, breadcrumbsData }
    }
}
</script>