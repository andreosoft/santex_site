<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex justify-space-between">
            <h1>{{ title }}</h1>
            {{ dataFav }}
            <div>
                <v-btn v-show="dataFav.length !== 0" @click="removeAll" outlined class="mb-5 pt-2 pb-2 clearBtn">Очистить список <img src="/icons/del_card.svg" class="del_card ms-2" /></v-btn>
            </div>
        </div>
        <v-divider class="mb-10" />
        <div v-if="dataFav.length == 0" style="padding: 120px 0;" class="text-center">
            <div style="font-weight: bold; font-size: 46px;">В избранном пусто</div>
            <div style="font-size: 20px; margin: 5px 0 30px 0;">Перейдите в каталог</div>
            <div>
              <v-btn dark to="/catalog/156">В каталог</v-btn>
            </div>
          </div>
        <div v-show="dataFav.length !== 0">
            <v-row class="s-row">
                <v-col cols="3" v-for="(el, i) in dataFav" :key="i">
                    <favorite-item-list :el="el" />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters({
            dataFav: 'favorite/favItems'
        })
    },
    methods: {
        removeAll(){
            this.$store.commit('favorite/removeAll');
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