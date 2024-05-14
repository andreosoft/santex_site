<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />

        <v-snackbar v-model="snackbarCart">{{ dataResultCart }} <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbarCart = false">
            Закрыть
            </v-btn>
        </template>
        </v-snackbar>

        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex flex-row justify-space-between align-center">
            <h1>{{ title }}</h1>
            <v-btn v-show="cart.length > 0" @click="removeAll" outlined class="mb-5 pt-2 pb-2 clearBtn">Очистить корзину <img src="/icons/del_card.svg" class="del_card ms-2" /></v-btn>
        </div>
        <v-divider class="mb-8" />
        <div v-show="cart.length == 0" style="padding: 120px 0;" class="text-center">
            <div style="font-weight: bold; font-size: 46px;">Ваша корзина пуста</div>
            <div style="font-size: 20px; margin: 5px 0 30px 0;">Перейдите в каталог</div>
            <div>
                <v-btn dark to="/allcategories">В каталог</v-btn>
            </div>
        </div>
        <div v-show="cart.length > 0">
                    <v-row>
                        <v-col cols="5">
                            <div class="grey--text">Товар</div>
                        </v-col>
                        <v-col cols="2">
                            <div class="grey--text">Стоимость</div>
                        </v-col>
                        <v-col cols="2">
                            <div class="grey--text">Количество</div>
                        </v-col>
                        <v-col cols="2">
                            <div class="grey--text">Цена</div>
                        </v-col>
                        <v-col cols="1">
                            <div class="grey--text"></div>
                        </v-col>
                    </v-row>
                    <div>
                        <div v-for="(el, i) in cart" :key="i" class="align-center">
                            <v-row>
                                <v-col cols="5">
                                    <div class="d-flex">
                                        <div class="mr-4 pa-2" style="border: 0.5px solid black">
                                            <v-img contain style="width: 100px; height: 100px;" :src="$config.baseImageURL+el.img+'?width=270&height=270'" />
                                        </div>
                                        <div>
                                            <div style="font-size: 13px" class="mb-2 grey--text">Код товара: {{ el.code }}</div>
                                            <div @click="toItem(el)" style="font-size: 16px; word-break: break-word" class="mb-2 toItemblock">{{ el.name }}</div>
                                            <div style="font-size: 13px">
                                                <span class="grey--text mr-2">Бренд:</span>
                                                <span>{{ el.brand }}</span>
                                            </div>
                                            <div style="font-size: 13px" v-if="el.height && el.width && el.length">
                                                <span class="grey--text mr-2">Габариты (Д.Ш.В): </span>
                                                <span>{{`${el.length} x ${el.width} x ${el.height}` }}</span>
                                            </div>
                                            <div style="font-size: 13px" v-else-if="!el.length && el.width && el.height">
                                                <span class="grey--text mr-2">Габариты (Ш.В): </span>
                                                <span>{{`${el.width} ${' x ' + el.height}` }}</span>
                                            </div>
                                            <div style="font-size: 13px" v-else-if="!el.width && el.length && el.height">
                                                <span class="grey--text mr-2">Габариты (Д.В): </span>
                                                <span>{{`${el.length}${' x ' + el.height}` }}</span>
                                            </div>
                                            <div style="font-size: 13px" v-else-if="!el.height && el.length && el.width">
                                                <span class="grey--text mr-2">Габариты (Д.Ш): </span>
                                                <span>{{`${el.length} x ${el.width}` }}</span>
                                            </div>
                                            <div style="font-size: 13px" v-else>
                                                <span class="grey--text mr-2">Габариты (Д.Ш.В): </span>
                                                <span>Не указаны</span>
                                            </div>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="2">
                                    <div v-if="el.price" style="font-size: 22px">
                                        <b><number :value="el.price" /> ₽</b>
                                    </div>
                                    <div v-else style="font-size: 22px">
                                        <b>Цена не указана</b>
                                    </div>
                                </v-col>
                                <v-col cols="2">
                                    <div style="max-width: 160px" class="cart-count">
                                        <div v-show="el.type == 2" class="mb-2 justify-space-between" :class="{ 'd-flex': el.type == 2 }">
                                            <v-btn class="s-btn-text" dark>м<sup>2</sup></v-btn>
                                            <v-btn class="s-btn-text">упак</v-btn>
                                        </div>
                                        <v-text-field
                                        type="number" 
                                        @blur="preventZero($event.target.value, el.code)" 
                                        hide-details 
                                        class="s-input-text-center" 
                                        outlined 
                                        dense 
                                        :value="el.count"
                                        >
                                            <v-btn @click="countPlus(el)" style="margin-top: -6px;" slot="append" icon>
                                                <i class="fa-solid fa-plus"></i>
                                            </v-btn>
                                            <v-btn @click="countMinus(el)" style="margin-top: -6px;" slot="prepend-inner" icon>
                                                <i class="fa-solid fa-minus"></i>
                                            </v-btn>
                                        </v-text-field>
                                    </div>
                                </v-col>
                                <v-col cols="2">
                                    <div>
                                        <div v-if="el.price" style="font-size: 22px">
                                            <b><number :value="el.count * el.price" /> ₽</b>
                                        </div>
                                        <div v-else style="font-size: 22px">
                                            <b>Цена не указана</b>
                                        </div>
                                        <div v-show="el.old_price" style="font-size: 16px; text-decoration: line-through;"
                                            class="grey--text">
                                            <b><number :value="el.count * el.old_price" /> ₽</b>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="1">
                                    <div>
                                        <v-btn icon><img @click="deleteItem(el)" src="/icons/trash.png" alt="removeitem-icon"/></v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-divider class="my-8" />
                        </div>
            </div>
        </div>
        <div class="mb-8">
            <v-row v-show="cart.length !== 0">
                <v-col cols="3">
                    <v-text-field outlined hide-details placeholder="Введите промо-код">
                        <v-btn style="margin-top: -8px;" slot="append" fab dark small><i
                                class="fa-solid fa-arrow-right"></i>
                        </v-btn>
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <div class="d-flex justify-end">
                        <div class="mt-2 mr-5"><b>Общая стоимость:</b></div>
                        <div>
                            <div style="font-size: 28px">
                                <b><number :value="totalPrice" /> ₽</b>
                            </div>
                            <div v-show="totalDiscount && totalDiscount !== 0" style="font-size: 14px" class="red--text">Экономия:
                                <number :value="totalDiscount" /> ₽
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="3">
                    <div class="mb-4">
                        <nuxt-link to="/cart/order"><v-btn class="s-btn-text" style="width: 100%" dark>Оформить заказ</v-btn></nuxt-link>
                    </div>
                    <div>
                        <span class="green--text">
                            <span class="green mr-2" 
                            style="color: #fff; border-radius: 50%;width: 28px;
                                    display: inline-block;
                                    height: 28px;
                                    text-align: center;
                                    padding-top: 2px;">
                                <img src="/icons/timer.png" />
                            </span>В рассрочку </span>
                        <span><b style="text-decoration: underline;">от 2 460 ₽/мес.</b></span>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import number from '../../components/number.vue';
import { mapGetters } from 'vuex'
export default {
    components: { number },
    data() {
        return {
            mass: [],
            snackbarCart: false
        }
    },
    async asyncData(params) {
        const title = "Корзина"
        const breadcrumbsData = [
            {
                url: "",
                title: title,
            }
        ];
        return { title, breadcrumbsData }
    },
    computed: {
        ...mapGetters ({
        totalPrice: 'cart/totalPrice',
        totalDiscount: 'cart/totalDiscount',
        cart: 'cart/cart',
        dataResultCart: 'cart/dataResult',
    }),
    },
    methods: {
        preventZero(event, code){
            if(event == 0){
                event == 1
                this.$store.commit('cart/updateCount', {event, code});
            } else {
                this.$store.commit('cart/updateCount', {event, code});
            }
            // if (e.target.value === 0) e.target.value = 1
        },
        deleteItem(el){
            this.$store.commit('cart/remove', el)
            this.snackbarCart = true
        },
        toItem(el){
            this.$router.push({path: '/catalog/view/' + el.code})
        },
        removeAll(){
            this.$store.commit('cart/removeAll');
            this.snackbarCart = true
        },
        countPlus(el){
            this.$store.commit('cart/countPlus', el.code)
        },
        countMinus(el){
            this.$store.commit('cart/countMinus', el.code)
        }
    }
}

</script>


<style lang="scss">
.cart-count{
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none; 
    }
    input[type="number"] { 
        -moz-appearance: textfield; 
    }
}
.v-btn--icon{
    color: black !important;
}
.s-input-text-center{
    input {
        text-align: center;
    }
} 
.toItemblock:hover{
        cursor: pointer;
}
.clearBtn{
    background-color: rgb(243, 243, 243);
    border: unset;
    .v-btn__content{
        text-transform: none;
        letter-spacing: 0px;
    }
}
.del_card{
    width: 16px;
    height: 16px;
}
</style>