<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />

        <!-- Сравнение -->
        <v-snackbar v-model="snackbarCom">{{ dataResultCom }} <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbarCom = false">
              Закрыть
            </v-btn>
          </template>
          </v-snackbar>
<!-- Избранное -->
<v-snackbar v-model="snackbarFav">{{ dataResultFav }} <template v-slot:action="{ attrs }">
    <v-btn color="pink" text v-bind="attrs" @click="snackbarFav = false">
      Закрыть
    </v-btn>
  </template>
  </v-snackbar>
  <!-- Корзина -->
          <v-snackbar v-model="snackbarCart">{{ dataResultCart }} <template v-slot:action="{ attrs }">
    <v-btn color="pink" text v-bind="attrs" @click="snackbarCart = false">
      Закрыть
    </v-btn>
  </template>
  </v-snackbar>
  
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex justify-space-between">
            <h1>{{ title }}</h1>
            <div>
                <v-btn v-show="dataCom.length !== 0" @click="removeAll" outlined class="mb-5 pt-2 pb-2 clearBtn">Очистить список <img src="/icons/del_card.svg" class="del_card ms-2" /></v-btn>
            </div>
        </div>
        <v-divider class="mb-10" />
        <div v-show="dataCom.length == 0" style="padding: 120px 0;" class="text-center">
            <div style="font-weight: bold; font-size: 46px;">В сравнении товаров пусто</div>
            <div style="font-size: 20px; margin: 5px 0 30px 0;">Перейдите в каталог</div>
            <div>
              <v-btn dark to="/catalog/156">В каталог</v-btn>
            </div>
        </div>
        <div v-show="dataCom.length !== 0">
            <div class="d-flex">
                <div>
                    <div class="mb-10" style="height: 547.5px; border: 1px solid #DBDBDB; padding: 60px 20px 30px 20px;">
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
                            <div :class="noDifference">
                                <p @click="activeDifference"><i class="fa-regular" :class="hasDistinction"></i> Только отличия</p>
                            </div>
                            <div class="triggerInput">
                                <p @click="activeAllParams"><i class="fa-regular" :class="{'fa-circle-check': allParamInput, 'fa-circle': !allParamInput}"></i> Все параметры</p>
                            </div>
                        </div>
                        <div>
                            <img src="/logo2.png" />
                        </div>
                    </div>
                    <div>
                        <div v-if="differenceInput" class="s-comapre-table">
                            <div v-for="(parametr, i) in differenceItems" class="s-comapre-table-row grey--text">
                                <div>
                                    {{ parametr }}
                                </div>
                            </div>
                        </div>
                        <div v-else class="s-comapre-table">
                            <div v-for="(parametr, i) in dataParameters" class="s-comapre-table-row grey--text">
                                <div>
                                    {{ parametr }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="overflow: auto">
                    <div>
                        <div class="d-flex">
                            <div style="width: 300px" v-for="(item, ind) in visibleItems" :key="ind">
                                <div class="mb-10">
                                <catalog-item-list-compare :el="item" @removeItemCom="removeItem" @addItemFav="addItemFav" @addItemCart="addItemCart" />
                                </div>
                                <div v-if="differenceInput" class="s-comapre-table">
                                    <div v-for="(param, index, i) in differenceItems" class="s-comapre-table-row">
                                    <div>
                                        {{ item.dataParams[param] ? item.dataParams[param] : '–' }}
                                    </div>
                                    </div>
                                </div>
                                <div v-else class="s-comapre-table">
                                    <div v-for="(param, index, i) in dataParameters" class="s-comapre-table-row">
                                    <div>
                                        {{ item.dataParams[param] ? item.dataParams[param] : '–' }}
                                    </div>
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
import { mapGetters } from 'vuex';
import { uniq } from 'lodash';
export default {
    data() {
        return {
            differenceInput: false,
            allParamInput: true,
            valueList: "Все товары",
            visibleArrItems: [],
            dataFilters: [],
            dataDifFilters: [],
            snackbarCom: false,
            snackbarFav: false,
            snackbarCart: false
        }
    },
    watch: {
        differenceInput(){
         this.allParamInput = !this.differenceInput
        },
        allParamInput(){
        // this.differenceItems?.length == 0
         this.differenceInput = !this.allParamInput
        },
        dataDifFilters(){
        if(this.dataDifFilters?.length == 0){
            this.allParamInput = true
            this.differenceInput = false
        }
        }
    },
    computed: {
        ...mapGetters({
            dataCom: 'compare/compareData',
            countCom: 'compare/countItems',
            dataResultCom: 'compare/dataResult',
            dataResultCart: 'cart/dataResult',
            dataResultFav: 'favorite/dataResult',
            categoriesParent: 'getCategories'
        }),
        hasDifference() {
            if(this.dataDifFilters?.length == 0){
                return false
            } else {
                return true
            }
        },
        hasDistinction: function(){
            return {
                'fa-circle-check': (this.differenceInput) && (this.dataDifFilters.length > 0),
                'fa-circle': (!this.differenceInput) || (this.dataDifFilters.length == 0)
            }
        },
        paramsCom(){
            const arr = ["Все товары"];
            this.dataCom?.map((obj) => {arr.push(obj.category_id);})
            arr.forEach((item, i) => {
                if(i>0){
                    this.categoriesParent.forEach(el => {
                        el.content.forEach(el_sub => {
                            if(el_sub.id == item){
                                    arr[i] = el_sub.name
                            }
                        })
                    })
                }
            })
            return uniq(arr);
        },
        visibleItems(){
            this.visibleArrItems = [];
            if(this.valueList !== "Все товары"){
                this.categoriesParent.forEach(el => {
                        el.content.forEach(el_sub => {
                            if(el_sub.name == this.valueList){
                                this.dataCom.forEach(el => {
                                    if(el.category_id == el_sub.id){
                                        this.visibleArrItems.push(el);
                                    }
                                })
                            }
                        })
                    })
            } 
            else{
                this.visibleArrItems = this.dataCom;
            }
            // let arr = [val];
            return this.visibleArrItems;
        },
        dataParameters(){
            if(this.differenceInput == false && this.visibleArrItems.length !== 0) {
                this.dataFilters = [];
                this.visibleArrItems.forEach(el => {
                    Object.keys(el.dataParams).forEach(key => {
                        if(!this.dataFilters.includes(key)){
                            this.dataFilters.push(key);
                        }
                    })
                })
                this.dataFilters = this.dataFilters.flat();
                this.dataFilters.sort();         
                return this.dataFilters;
            }
        },
        differenceItems(){
            if(this.visibleArrItems.length !== 0) {
                this.dataDifFilters = [];
                 this.dataFilters.forEach(param => {
                    for(let i = 0; i < this.visibleArrItems.length; i++){
                        for(let j = i + 1; j < this.visibleArrItems.length; j++){
                            if(this.visibleArrItems[i].dataParams[param] !== this.visibleArrItems[j].dataParams[param]){
                                if(!this.dataDifFilters.includes(param)){
                                this.dataDifFilters.push(param);
                            }
                                this.dataDifFilters.sort();
                            }
                        }
                    }
                    });
                    return this.dataDifFilters;
                };
            },
        noDifference: function () {
                return{
                    // true: this.dataDifFilters?.length !== 0 && this.valueList == "Все товары",
                    // false: this.dataDifFilters?.length === 0 && this.valueList !== "Все товары",
                    'grey--text': (this.differenceItems?.length == 0),
                    'mb-4': true,
                    'triggerInput': true
                }
            }
    },
    methods: {
        otherLength(param){
            return this.dataCom.filter(el => el.category_id == this.subCategory(param)).length
        },
        subCategory(param){
            let ret;
            if(typeof param == 'number'){
                this.categoriesParent.forEach(el => {
                            el.content.forEach(el_sub => {
                                if(el_sub.id == param){
                                        ret = el_sub.name
                                }
                            })
                        })
            } else{
                this.categoriesParent.forEach(el => {
                            el.content.forEach(el_sub => {
                                if(el_sub.name == param){
                                        ret = el_sub.id
                                }
                            })
                        })
            }
            return ret
        },
        removeItem(val){
            this.snackbarCart = false;
            this.snackbarFav = false;
            this.snackbarCom = val;
        },
        addItemCart(el){
            this.snackbarCom = false;
            this.snackbarFav = false;
            this.snackbarCart = el
        },
        addItemFav(el){
            this.snackbarCart = false;
            this.snackbarCom = false;
            this.snackbarFav = el
        },
        activeAllParams(){
            if(!this.allParamInput) {
                this.allParamInput = true;
                this.differenceInput = false;
            }
        },
        activeDifference(){
            if((!this.differenceInput) && (this.differenceItems.length !== 0)){
                this.differenceInput = true;
                this.allParamInput = false;
            } else {
                this.differenceInput = false;
            }
        },
        removeAll(){
            this.$store.commit('compare/removeAll');
            this.snackbarCom = true;
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

        return { title, breadcrumbsData }
    }
}
</script>

<style lang="scss">
.s-comapre-table {
    .s-comapre-table-row {
        display: flex;
        align-items: center;
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
 .triggerInput:hover{
    cursor: pointer;
}
</style>