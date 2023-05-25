<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex justify-space-between">
            <!-- {{ dataClient }} -->
            <h1>{{ title }}</h1>
            <div>
                <v-btn class="s-btn-text" @click="toCatalog">Вернуться к покупкам</v-btn>
            </div>
        </div>
        <v-divider class="mb-8" />
        <div>
            <div>
                <h3 class="mb-4">Персональные данные</h3>
                <v-row>
                    <v-col cols="3">
                        <div class="mb-2"><b>Ваше ФИО</b></div>
                        <div>
                            <v-text-field outlined placeholder="Введите ФИО" v-model="fullName" @change="updateDataClient('fullName', fullName)"/>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="mb-2"><b>Электронная почта</b></div>
                        <div>
                            <v-text-field email outlined placeholder="Введите e-mail" v-model="email" @change="updateDataClient('email', email)"/>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="mb-2"><b>Контактный телефон</b></div>
                        <div>
                            <v-text-field outlined placeholder="+7(" v-model="phone" @change="updateDataClient('phone', phone)"/>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <v-divider class="mb-8" />
            <div class="mb-8 d-flex flex-row align-center">
                <div>
                    <h3 class="mb-4">Способ доставки</h3>
                    <div class="mb-4">
                        <v-btn-toggle class="orderToggle" v-model="toggleData">
                            <v-btn @click="updateDataClient('delivery', delivery.type = 'courier', 'type')" class="s-btn-text" width="240px" >Курьер</v-btn>
                            <v-btn @click="updateDataClient('delivery', delivery.type = 'pickup', 'type')" width="240px">Самовывоз</v-btn>
                        </v-btn-toggle>
                    </div>
                    <div v-if="delivery.type == 'courier'" class="mb-4">
                        <span>Доставка возможна: </span>
                        <span><b>завтра 27 декабря + 1480 руб.</b></span>
                    </div>
                    <div v-else class="mb-4">
                        <span>Самовывоз возможен: </span>
                        <span><b>завтра 27 декабря</b></span>
                    </div>
                </div>
                <div class="d-flex flex-column justify-center ms-8" style="margin-top: 38px;" v-if="delivery.type == 'pickup'">
                    <span>г. Москва, Волгоградский проспект, ТЦ «Метр квадратный:</span>
                    <span style="text-decoration: underline;">Посмотреть на карте</span>
                </div>
            </div>
            <v-divider class="mb-8" />
            <div class="mb-8">
                <h3 class="mb-4">Адрес доставки</h3>
                <v-row>
                    <v-col cols="4">
                        <div class="mb-2"><b>Город</b></div>
                        <div>
                            <v-text-field outlined placeholder="Ваш город" v-model="address.city" @change="updateDataClient('address', address.city, 'city')"/>
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="mb-2"><b>Улица</b></div>
                        <div>
                            <v-text-field outlined placeholder="Укажите улицу" v-model="address.street" @change="updateDataClient('address', address.street, 'street')"/>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="8">
                        <v-row>
                            <v-col cols="2">
                                <v-text-field outlined label="Индекс" v-model="address.indexHouse" @change="updateDataClient('address', address.indexHouse, 'indexHouse')"/>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Дом" v-model="address.house" @change="updateDataClient('address', address.house, 'house')"/>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Квартира/офис" v-model="address.flat" @change="updateDataClient('address', address.flat, 'flat')"/>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Подъезд" v-model="address.entrance" @change="updateDataClient('address', address.entrance, 'entrance')"/>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Этаж" v-model="address.floor" @change="updateDataClient('address', address.floor, 'floor')"/>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Домофон" v-model="address.intercom" @change="updateDataClient('address', address.intercom, 'intercom')"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <div class="mb-4"><span>Стоимость доставки составит: </span><b>1 480 ₽ </b></div>
                <div class="mb-4"><a href="/" class="grey--text underlined">Подробнее о доставке</a></div>
            </div>
            <v-divider class="mb-8" />
            <div class="mb-8">
                <h3 class="mb-4">Подробнее о доставке</h3>
                <div class="d-flex">
                    <v-btn-toggle class="mr-8 orderToggle" v-model="toggleData2">
                        <v-btn @click="updateDataClient('payment', payment.type = 'online', 'type')" class="s-btn-text" width="240px">Онлайн</v-btn>
                        <v-btn @click="updateDataClient('payment', payment.type = 'totheCourier', 'type')" class="s-btn-text" width="240px">Курьеру при доставке</v-btn>
                    </v-btn-toggle>
                    
                    <!-- <v-btn class="mr-8" large><img src="/icons/order/1.png" /></v-btn>
                    <v-btn class="mr-8" large><img src="/icons/order/2.png" /></v-btn>
                    <v-btn class="mr-8" large><img src="/icons/order/3.png" /></v-btn> -->
                </div>
            </div>
            <v-divider class="mb-8" />
            <div>
                <table class="mb-8">
                    <tr>
                        <td style="width: 70%">Стоимость товаров:</td>
                        <td>{{ totalPrice }} ₽</td>
                    </tr>
                    <tr>
                        <td>Экономия:</td>
                        <td>{{ totalDicount }}</td>
                    </tr>
                    <tr>
                        <td>Доставка:</td>
                        <td>1 480 ₽</td>
                    </tr>
                    <tr>
                        <td><b>Общая стоимоcть:</b>
                        </td>
                        <td><span style="font-size: 28px">{{ totalCost }} ₽</span></td>
                    </tr>
                </table>
                <div>
                    <v-row>
                        <v-col cols="3">
                            <v-btn @click="toDataBase()" class="s-btn-text" dark style="width:100%" large>Оплатить заказ</v-btn>
                        </v-col>
                        <v-col cols="9">
                            <div class="grey--text">Нажимая «Оплатить онлайн» вы соглашаетесь с условиями предоставления
                                услуг и политикой хранения персональных данных.
                                Далее вы будете перенаправлены в защищенную платежную систему, где сможете произвести
                                оплату заказа.</div>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
    </v-container>
</template>
        
        <script>

import { mapGetters } from 'vuex'
export default {

    data() {
        return {
            toggleData: 0,
            toggleData2: 0,
            fullName: '',
            email: '',
            phone: '',
            delivery: {
                type: 'courier'
            },
            address: {
                city: '',
                street: '',
                indexHouse: '',
                house: '',
                flat: '',
                entrance: '',
                floor: '',
                intercom: ''
            },
            payment: {
                type: ''
            }
        }
    },
    async asyncData(params) {
        const title = "Оформление заказа"
        const breadcrumbsData = [
            {
                url: "/cart",
                title: "Корзина",
            },
            {
                url: "",
                title: title,
            }
        ];
        const data = [

        ]
        return { title, data, breadcrumbsData }
    },
    methods: {
        toCatalog(){
            this.$router.push({path: '/'})
        },
        updateDataClient(name1, value, name2){
            name2 ? this.$store.commit('cart/updateDataClient', {name1, value, name2}) : this.$store.commit('cart/updateDataClient', {name1, value});
        },
        // updateDataClientAddress(name, value){
        //     this.$store.commit('cart/updateDataClientAddress', {name, value});
        // },
        async toDataBase() {
            try {
                const resp = await this.$axios.post(this.$config.baseURL + '/api/shop/cart', {
                    name: this.fullName,
                    email: this.email,
                    phone: this.phone,
                    delivery_data: {
                        address: this.address,
                        type: this.delivery.type
                    },
                    payment_data: {
                        type: this.payment.type
                    },
                    cartData: this.$store.state.cart
                });
                let resData = resp.data;
                console.log(resData);
            } catch (error) {
                console.error(error);
            }
            
        }
    },
    computed: {
        ...mapGetters({
            totalPrice: 'cart/totalPrice',
            totalDicount: 'cart/totalDiscount',
            dataClient: 'cart/dataClient'
        }),
        totalCost(){
            return this.totalPrice + 1480
        }
    }
}
</script>

<style lang="scss">
    .orderToggle .v-item--active {
        background-color: rgb(39, 39, 39) !important;
        color: white !important;
    }
</style>