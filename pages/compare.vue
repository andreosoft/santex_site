<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex justify-space-between">
            <h1>{{ title }}</h1>
            <!-- differenceInput {{ differenceInput }} 
            allParamInput {{ allParamInput }} -->
            <div>
                <v-btn @click="removeAll" outlined class="mb-5 pt-2 pb-2 clearBtn">Очистить список <img src="/icons/del_card.svg" class="del_card ms-2" /></v-btn>
            </div>
        </div>
        <v-divider class="mb-10" />
        <div>
            <div class="d-flex">
                <div style="width: 500px">
                    <div class="mb-10" style="height: 500px; border: 1px solid #DBDBDB; padding: 60px 20px 30px 20px;">
                        <div class="mb-8" style="font-size: 20px; font-weight: bold;">
                            Добавлено: {{ countCom }} шт.
                        </div>
                        <v-divider class="mb-8" />
                        <div>
                            <div><b>Список товаров</b></div>
                            <div>
                                <v-select :items="paramsCom" v-model="valueList"></v-select>
                            </div>
                        </div>
                        <div style="margin-bottom: 120px;">
                            <div :class="{'grey--text': !hasDistinction, 'mb-4': true}">
                                    <!-- <v-checkbox @click="allParamInput = false; differenceInput = true"
                                    class="checkboxCompare"
                                    v-model="differenceInput"
                                    />
                                    <v-checkbox 
                                    @click="allParamInput = true; differenceInput = false"
                                    class="checkboxCompare"
                                    v-model="allParamInput"
                                    /> -->
                                <p @click="activeDifference"><i class="fa-regular" :class="{'fa-circle-check': differenceInput, 'fa-circle': !differenceInput}"></i> Только отличия</p>
                            </div>
                            <div>
                                <p @click="activeAllParams"><i class="fa-regular" :class="{'fa-circle-check': allParamInput, 'fa-circle': !allParamInput}"></i> Все параметры</p>
                            </div>
                        </div>
                        <div>
                            <img src="/logo2.png" />
                        </div>
                    </div>
                    <div>
                        <div class="s-comapre-table">
                            <div v-for="(el, i) in dataCom?.[0]?.dataParams" class="s-comapre-table-row grey--text">
                                {{ i }}
                            </div>
                        </div>
                    </div>
                </div>
                <div style="overflow: auto">
                    <div>
                        <div v-if="!visibleArrItems[0]" class="d-flex">
                            <div style="width: 300px" v-for="(el, i) in dataCom" :key="i">
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
                        <div v-else class="d-flex">
                            <div style="width: 300px" v-for="(item, ind) in visibleArrItems" :key="ind">
                                <div class="mb-10">
                                <catalog-item-list-compare style="height: 500px;" :el="item" />
                                </div>
                                <div class="s-comapre-table">
                                    <div v-for="(param, index) in item.dataParams" class="s-comapre-table-row">
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
// console.log(dataCom);


import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            hasDistinction: false,
            differenceInput: false,
            allParamInput: true,
            valueList: "Все товары",
            visibleArrItems: [],
        }
    },
    computed: {
        ...mapGetters({
            dataCom: 'compare/compareData',
            countCom: 'compare/countItems'
        }),
        paramsCom(){
            let arr = [];
            arr[0] = "Все товары";
            this.dataCom?.map((obj) => {arr.push(obj.name);})
            return arr;
        },
        visibleItems(){
            this.visibleArrItems = [];
            if(this.valueList !== "Все товары") this.visibleArrItems.push(this.dataCom.find(el => el.name == this.valueList));
            // let arr = [val];
            return this.visibleArrItems;
        },
        activeClassDifference: function(){
            return {
                'fa-circle-check': this.differenceInput,
                'fa-circle': !this.allParamInput
            }
        },
        activeClassAllParam: function(){
            return {
                'fa-circle-check': this.allParamInput,
                'fa-circle': !this.differenceInput
            }
        }
    },
    methods: {
        activeAllParams(){
            if(this.allParamInput) {
                this.allParamInput = false;
                this.differenceInput = true;
            } else{
                this.allParamInput = true;
                this.differenceInput = false;
            }
        },
        activeDifference(){
            if(this.differenceInput) {
                this.differenceInput = false;
                this.allParamInput = true;
            } else{
                this.differenceInput = true;
                this.allParamInput = false;
            }
        },
        removeAll(){
            this.$store.commit('compare/removeAll');
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
        // const data = [
        //     {
        //         id: 100,
        //         name: "Название товара",
        //         image: ["/img/favorite/1.png"],
        //         code: "4554545",
        //         price: 1540,
        //         old_price: 8220,
        //         brend_name: "Название бренда",
        //         size: "44 x 75 x 20",
        //         available: 1,
        //         dataParams: {
        //             "Ширина": "60 cm",
        //             "Глубина": "55 cm",
        //             "Высота": "10 cm§",
        //             "Габариты2": "60x55",
        //             "Ширина стиральной машины": "60 cm",
        //             "Глубина стиральной машины": "45 cm",
        //             "Вид раковины": "-",
        //             "Форма": "Прямоугольная",
        //             "Расстояние от смесителя до слива": "12 см>",
        //             "Рекомендованная мин. длина излива": "14 см",
        //             "Гарантия": "2 года",
        //             "Страна": "Россия",
        //             "Линии форм": "Прямые",
        //             "Раковина-столешница": "Нет",
        //             "Со скрытым сливом": "Да",
        //         }
        //     },
        //     {
        //         id: 100,
        //         name: "Название товара",
        //         image: ["/img/favorite/3.png"],
        //         code: "4554545",
        //         price: 1540,
        //         old_price: 8220,
        //         brend_name: "Название бренда",
        //         size: "44 x 75 x 20",
        //         available: 1,
        //         dataParams: {
        //             "Ширина": "60 cm",
        //             "Глубина": "55 cm",
        //             "Высота": "10 cm§",
        //             "Габариты2": "60x55",
        //             "Ширина стиральной машины": "60 cm",
        //             "Глубина стиральной машины": "45 cm",
        //             "Вид раковины": "-",
        //             "Форма": "Прямоугольная",
        //             "Расстояние от смесителя до слива": "12 см>",
        //             "Рекомендованная мин. длина излива": "14 см",
        //             "Гарантия": "2 года",
        //             "Страна": "Россия",
        //             "Линии форм": "Прямые",
        //             "Раковина-столешница": "Нет",
        //             "Со скрытым сливом": "Да",
        //         }
        //     },
        //     {
        //         id: 100,
        //         name: "Название товара",
        //         image: ["/img/favorite/4.png"],
        //         code: "4554545",
        //         price: 1540,
        //         old_price: 8220,
        //         brend_name: "Название бренда",
        //         size: "44 x 75 x 20",
        //         available: 1,
        //         dataParams: {
        //             "Ширина": "60 cm",
        //             "Глубина": "55 cm",
        //             "Высота": "10 cm§",
        //             "Габариты2": "60x55",
        //             "Ширина стиральной машины": "60 cm",
        //             "Глубина стиральной машины": "45 cm",
        //             "Вид раковины": "-",
        //             "Форма": "Прямоугольная",
        //             "Расстояние от смесителя до слива": "12 см>",
        //             "Рекомендованная мин. длина излива": "14 см",
        //             "Гарантия": "2 года",
        //             "Страна": "Россия",
        //             "Линии форм": "Прямые",
        //             "Раковина-столешница": "Нет",
        //             "Со скрытым сливом": "Да",
        //         }
        //     },
        //     {
        //         id: 100,
        //         name: "Название товара",
        //         image: ["/img/favorite/5.png"],
        //         code: "4554545",
        //         price: 1540,
        //         old_price: 8220,
        //         brend_name: "Название бренда",
        //         size: "44 x 75 x 20",
        //         available: 1,
        //         dataParams: {
        //             "Ширина": "60 cm",
        //             "Глубина": "55 cm",
        //             "Высота": "10 cm§",
        //             "Габариты2": "60x55",
        //             "Ширина стиральной машины": "60 cm",
        //             "Глубина стиральной машины": "45 cm",
        //             "Вид раковины": "-",
        //             "Форма": "Прямоугольная",
        //             "Расстояние от смесителя до слива": "12 см>",
        //             "Рекомендованная мин. длина излива": "14 см",
        //             "Гарантия": "2 года",
        //             "Страна": "Россия",
        //             "Линии форм": "Прямые",
        //             "Раковина-столешница": "Нет",
        //             "Со скрытым сливом": "Да",
        //         }
        //     },
        //     {
        //         id: 100,
        //         name: "Название товара",
        //         image: ["/img/favorite/6.png"],
        //         code: "4554545",
        //         price: 1540,
        //         old_price: 8220,
        //         brend_name: "Название бренда",
        //         size: "44 x 75 x 20",
        //         available: 1,
        //         dataParams: {
        //             "Ширина": "60 cm",
        //             "Глубина": "55 cm",
        //             "Высота": "10 cm§",
        //             "Габариты2": "60x55",
        //             "Ширина стиральной машины": "60 cm",
        //             "Глубина стиральной машины": "45 cm",
        //             "Вид раковины": "-",
        //             "Форма": "Прямоугольная",
        //             "Расстояние от смесителя до слива": "12 см>",
        //             "Рекомендованная мин. длина излива": "14 см",
        //             "Гарантия": "2 года",
        //             "Страна": "Россия",
        //             "Линии форм": "Прямые",
        //             "Раковина-столешница": "Нет",
        //             "Со скрытым сливом": "Да",
        //         }
        //     }];
                return { title, breadcrumbsData }
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
 .checkboxCompare input[type="checkbox"]{
width: 20px;
  height: 20px;
  border-radius: 50%;
  -webkit-appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;

 }
</style>