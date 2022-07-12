<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex justify-space-between">
            <h1>{{ title }}</h1>
            <div>
                <v-btn class="s-btn-text">Очистить список <i style="font-size: 20px; margin-top: -6px;"
                        class="ml-2 grey--text fas fa-times-circle"></i></v-btn>
            </div>
        </div>
        <v-divider class="mb-10" />
        <div>
            <div class="d-flex">
                <div style="width: 500px">
                    <div class="mb-10" style="height: 500px; border: 1px solid #DBDBDB; padding: 60px 20px 30px 20px;">
                        <div class="mb-8" style="font-size: 20px; font-weight: bold;">
                            Добавлено: 6 шт.
                        </div>
                        <v-divider class="mb-8" />
                        <div>
                            <div><b>Список товаров</b></div>
                            <div>
                                <v-select :items="itemsList" v-model="valueList"></v-select>
                            </div>
                        </div>
                        <div style="margin-bottom: 120px;">
                            <div class="grey--text mb-4">
                                <i class="fa-regular fa-circle"></i> Только отличия
                            </div>
                            <div>
                                <i class="fa-regular fa-circle-check"></i> Все параметры
                            </div>
                        </div>
                        <div>
                            <img src="/logo2.png" />
                        </div>
                    </div>
                    <div>
                        <div class="s-comapre-table">
                            <div v-for="(el, i) in data[0].dataParams" class="s-comapre-table-row grey--text">
                                {{ i }}
                            </div>
                        </div>
                    </div>
                </div>
                <div style="overflow: auto">
                    <div>
                        <div class="d-flex">
                            <div style="width: 400px" v-for="(el, i) in data" :key="i">
                                <div class="mb-10">
                                <catalog-item-list-compare style="height: 500px;" :el="el" />
                                </div>
                                <div class="s-comapre-table">
                                    <div v-for="(param, i) in el.dataParams" class="s-comapre-table-row">
                                        {{ param }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            itemsList: [
                "Все товары"
            ],
            valueList: "Все товары"
        }
    },
    async asyncData(params) {
        const title = "Сравнение товаров";
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
                dataParams: {
                    "Ширина": "60 cm",
                    "Глубина": "55 cm",
                    "Высота": "10 cm§",
                    "Габариты2": "60x55",
                    "Ширина стиральной машины": "60 cm",
                    "Глубина стиральной машины": "45 cm",
                    "Вид раковины": "-",
                    "Форма": "Прямоугольная",
                    "Расстояние от смесителя до слива": "12 см>",
                    "Рекомендованная мин. длина излива": "14 см",
                    "Гарантия": "2 года",
                    "Страна": "Россия",
                    "Линии форм": "Прямые",
                    "Раковина-столешница": "Нет",
                    "Со скрытым сливом": "Да",
                }
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
                dataParams: {
                    "Ширина": "60 cm",
                    "Глубина": "55 cm",
                    "Высота": "10 cm§",
                    "Габариты2": "60x55",
                    "Ширина стиральной машины": "60 cm",
                    "Глубина стиральной машины": "45 cm",
                    "Вид раковины": "-",
                    "Форма": "Прямоугольная",
                    "Расстояние от смесителя до слива": "12 см>",
                    "Рекомендованная мин. длина излива": "14 см",
                    "Гарантия": "2 года",
                    "Страна": "Россия",
                    "Линии форм": "Прямые",
                    "Раковина-столешница": "Нет",
                    "Со скрытым сливом": "Да",
                }
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
                dataParams: {
                    "Ширина": "60 cm",
                    "Глубина": "55 cm",
                    "Высота": "10 cm§",
                    "Габариты2": "60x55",
                    "Ширина стиральной машины": "60 cm",
                    "Глубина стиральной машины": "45 cm",
                    "Вид раковины": "-",
                    "Форма": "Прямоугольная",
                    "Расстояние от смесителя до слива": "12 см>",
                    "Рекомендованная мин. длина излива": "14 см",
                    "Гарантия": "2 года",
                    "Страна": "Россия",
                    "Линии форм": "Прямые",
                    "Раковина-столешница": "Нет",
                    "Со скрытым сливом": "Да",
                }
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
                dataParams: {
                    "Ширина": "60 cm",
                    "Глубина": "55 cm",
                    "Высота": "10 cm§",
                    "Габариты2": "60x55",
                    "Ширина стиральной машины": "60 cm",
                    "Глубина стиральной машины": "45 cm",
                    "Вид раковины": "-",
                    "Форма": "Прямоугольная",
                    "Расстояние от смесителя до слива": "12 см>",
                    "Рекомендованная мин. длина излива": "14 см",
                    "Гарантия": "2 года",
                    "Страна": "Россия",
                    "Линии форм": "Прямые",
                    "Раковина-столешница": "Нет",
                    "Со скрытым сливом": "Да",
                }
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
                dataParams: {
                    "Ширина": "60 cm",
                    "Глубина": "55 cm",
                    "Высота": "10 cm§",
                    "Габариты2": "60x55",
                    "Ширина стиральной машины": "60 cm",
                    "Глубина стиральной машины": "45 cm",
                    "Вид раковины": "-",
                    "Форма": "Прямоугольная",
                    "Расстояние от смесителя до слива": "12 см>",
                    "Рекомендованная мин. длина излива": "14 см",
                    "Гарантия": "2 года",
                    "Страна": "Россия",
                    "Линии форм": "Прямые",
                    "Раковина-столешница": "Нет",
                    "Со скрытым сливом": "Да",
                }
            }
        ]
        return { title, data, breadcrumbsData }
    }
}
</script>

<style lang="scss">
.s-comapre-table {
    .s-comapre-table-row {
        height: 51px;
        padding: 16px 24px;
        &:nth-of-type(odd){
            background: #F6F6F6;
        }
    }
 }
</style>