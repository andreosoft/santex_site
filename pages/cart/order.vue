<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex justify-space-between">
            <h1>{{ title }}</h1>
            <div>
                <v-btn v-show="DataCart.length !== 0 || send == true" outlined class="mb-5 pt-2 pb-2 clearBtn" @click="toCatalog">Вернуться к покупкам</v-btn>
            </div>
        </div>
        <v-divider class="mb-8" />
        <div v-show="DataCart.length == 0 && send == false" style="padding: 120px 0;" class="text-center">
            <div style="font-weight: bold; font-size: 46px;">Ваша корзина пуста</div>
            <div style="font-size: 20px; margin: 5px 0 30px 0;">Перейдите в каталог</div>
            <div>
                <v-btn dark to="/allcategories">В каталог</v-btn>
            </div>
        </div>
        <div v-show="DataCart.length !== 0 || send == true">
                <div v-if="send == true">
                    <h3 class="mb-4">Ваш заказ отправлен</h3>
                    <div class="d-flex flex-row mb-4" style="font-size: 20px;">
                            <div class="mb-2">Номер вашего заказа: </div>
                            <div class="ms-2"><b> {{ dataOrder.id }}</b></div>
                    </div>
                    <v-row class="mb-4">
                        <v-col cols="3">
                            <div class="mb-2"><b>Ваше ФИО</b></div>
                            <div>
                                {{ dataOrder.name }}
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="mb-2"><b>Электронная почта</b></div>
                            <div>
                                {{ dataOrder.email }}
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="mb-2"><b>Контактный телефон</b></div>
                            <div>
                                {{ dataOrder.phone }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mb-4">
                        <v-col cols="3">
                            <div class="mb-2"><b>Способ доставки</b></div>
                            <div v-if="dataOrder.delivery_data.type == 'courier'">
                                Курьер
                            </div>
                            <div v-else-if="dataOrder.delivery_data.type == 'pickup'">
                                Самовывоз
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="mb-2"><b>Адрес</b></div>
                            <div v-if="dataOrder.delivery_data.type == 'courier'">
                                <div class="d-flex flex-row">
                                    <div>Город:</div>
                                    <div class="ms-2">
                                        {{ dataOrder.delivery_data.address.city }}
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div>Улица:</div>
                                    <div class="ms-2">
                                        {{ dataOrder.delivery_data.address.street }}
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div>Индекс:</div>
                                    <div class="ms-2">
                                        {{ dataOrder.delivery_data.address.indexHouse }}
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div>Дом:</div>
                                    <div class="ms-2">
                                        {{ dataOrder.delivery_data.address.house }}
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div>Квартира:</div>
                                    <div class="ms-2">
                                        {{ dataOrder.delivery_data.address.flat }}
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div>Подъезд:</div>
                                    <div class="ms-2">
                                        {{ dataOrder.delivery_data.address.entrance }}
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div>Этаж:</div>
                                    <div class="ms-2">
                                        {{ dataOrder.delivery_data.address.floor }}
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div>Домофон:</div>
                                    <div class="ms-2">
                                        {{ dataOrder.delivery_data.address.intercom }}
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="dataOrder.delivery_data.type == 'pickup'">
                                <span style="word-break: break-word;">
                                    г. Москва, Волгоградский проспект, д. 32, корпус 25, ТЦ «Метр квадратный», 2 этаж, пав. № 66-67-96
                                </span>
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="mb-2"><b>Способ оплаты</b></div>
                            <div v-if="dataOrder.payment_data.type == 'online'">
                                Онлайн
                            </div>
                            <div v-else-if="dataOrder.payment_data.type == 'totheCourier'">
                                Курьеру при доставке
                            </div>
                        </v-col>
                    </v-row>
                    <div class="mb-4"><span>Общая сумма: </span><b>{{ dataTotalPrice }} ₽ </b></div>
                    <v-divider class="mb-8" />
                    <h3 class="mb-4">Данные о заказе</h3>
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
        
                    <div v-for="(el, i) in cartData" :key="i" class="align-center">
                        <v-row>
                            <v-col cols="5">
                                <div class="d-flex">
                                    <div class="mr-4 pa-2" style="border: 0.5px solid black">
                                        <v-img style="width: 100px; height: 100px;" :src="$config.baseImageURL+el.img+'?width=270&height=270'" />
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
                                <div style="max-width: 160px">
                                    <div class="mb-2 d-flex justify-space-between" v-if="el.type == 2">
                                        <v-btn class="s-btn-text" dark>м<sup>2</sup></v-btn>
                                        <v-btn class="s-btn-text">упак</v-btn>
                                    </div>
                                    <v-text-field disabled hide-details class="s-input-text-center" outlined dense v-model="el.count">
                                        <!-- <v-btn @click="countPlus(el)" style="margin-top: -6px;" slot="append" icon><i
                                                class="fa-solid fa-plus"></i></v-btn>
                                        <v-btn @click="countMinus(el)" style="margin-top: -6px;"
                                            slot="prepend-inner" icon><i class="fa-solid fa-minus"></i></v-btn> -->
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
                            </v-col>
                        </v-row>
                        <v-divider class="my-8" />
                    </div>
                </div>
                <div v-else>
                    <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit, validate }">
                    <div ref="form">
                    <div>                
                        <h3 class="mb-4">Персональные данные</h3>
                        <v-row>
                            <v-col cols="3">
                                <div class="mb-2"><b>Ваше ФИО</b></div>
                                <div>
                                    <ValidationProvider name="fullName" rules="required|min:3" v-slot="{ errors, valid }">
                                    <v-text-field
                                    name="fullName"
                                    required
                                    :error-messages="errors"
                                    :success="valid"
                                    outlined
                                    placeholder="Введите ФИО"
                                    v-model="fullName"
                                    @change="updateDataClient('fullName', fullName)"
                                    />
                                    </ValidationProvider>
                                </div>
                            </v-col>
                            <v-col cols="3">
                                <div class="mb-2"><b>Электронная почта</b></div>
                                <div>
                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors, valid }">
                                    <v-text-field
                                    name="email"
                                    required 
                                    :error-messages="errors"
                                    :success="valid"
                                    type="email"
                                    outlined 
                                    placeholder="Введите e-mail"
                                    v-model="email"
                                    @change="updateDataClient('email', email)"/>
                                    </ValidationProvider>
                                </div>
                            </v-col>
                            <v-col cols="3">
                                <div class="mb-2"><b>Контактный телефон</b></div>
                                <div>
                                    <ValidationProvider name="phone" rules="required|length:18" v-slot="{ errors, valid }">
                                    <v-text-field
                                    name="phone"
                                    required 
                                    :error-messages="errors"
                                    :success="valid"
                                    type="text"
                                    outlined 
                                    placeholder="+7("
                                    v-mask="phoneNumberMask.mask"
                                    v-model="phone"
                                    @change="updateDataClient('phone', phone)"/>
                                    </ValidationProvider>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <v-divider class="mb-8" />
                    <div class="mb-8 d-flex flex-row align-center">
                        <div>
                            <h3 class="mb-4">Способ доставки</h3>
                            <div class="mb-4">
                                <v-btn-toggle class="orderToggle" v-model="toggleData" mandatory>
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
                        <div v-if="delivery.type == 'courier'">
                            <v-row>
                                <v-col cols="4">
                                    <div class="mb-2"><b>Город</b></div>
                                    <div>
                                        <ValidationProvider name="city" rules="required" v-slot="{ errors, valid }">
                                        <v-text-field 
                                        name="city" 
                                        required 
                                        :error-messages="errors"
                                        :success="valid"
                                        outlined 
                                        placeholder="Ваш город" 
                                        v-model="address.city" 
                                        @change="updateDataClient('address', address.city, 'city')"/>
                                        </ValidationProvider>
                                    </div>
                                </v-col>
                                <v-col cols="4">
                                    <div class="mb-2"><b>Улица</b></div>
                                    <div>
                                        <ValidationProvider name="street" rules="required" v-slot="{ errors, valid }">
                                        <v-text-field 
                                        name="street" 
                                        outlined 
                                        :error-messages="errors"
                                        :success="valid"
                                        required
                                        placeholder="Укажите улицу" 
                                        v-model="address.street" 
                                        @change="updateDataClient('address', address.street, 'street')"/>
                                        </ValidationProvider>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="8">
                                    <v-row>
                                        <v-col cols="2">
                                            <v-text-field name="indexHouse" outlined label="Индекс" v-model="address.indexHouse" @change="updateDataClient('address', address.indexHouse, 'indexHouse')"/>
                                        </v-col>
                                        <v-col cols="2">
                                            <ValidationProvider name="house" rules="required" v-slot="{ errors, valid }">
                                            <v-text-field 
                                            name="house" 
                                            :error-messages="errors"
                                            :success="valid"
                                            required
                                            outlined 
                                            label="Дом" 
                                            v-model="address.house" 
                                            @change="updateDataClient('address', address.house, 'house')"/>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field name="flat" outlined label="Квартира/офис" v-model="address.flat" @change="updateDataClient('address', address.flat, 'flat')"/>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field name="entrance" outlined label="Подъезд" v-model="address.entrance" @change="updateDataClient('address', address.entrance, 'entrance')"/>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field name="floor" outlined label="Этаж" v-model="address.floor" @change="updateDataClient('address', address.floor, 'floor')"/>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field name="intercom" outlined label="Домофон" v-model="address.intercom" @change="updateDataClient('address', address.intercom, 'intercom')"/>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <div class="mb-4">
                                <span>Стоимость доставки составит: </span>
                                <b v-if="delivery.type == 'courier'">1 480 ₽ </b>
                                <b v-else>0 ₽ </b>
                            </div>
                            <div class="mb-4"><a href="/" class="grey--text underlined">Подробнее о доставке</a></div>
                        </div>
                        <div v-else>
                            <div class="d-flex flex-column justify-center">
                                <span>г. Москва, Волгоградский проспект, д. 32, корпус 25,
                                    ТЦ «Метр квадратный», 2 этаж, пав. № 66-67-96</span>
                                <span style="text-decoration: underline;">Посмотреть на карте</span>
                            </div>
                        </div>
                    </div>
                    <v-divider class="mb-8" />
                    <div class="mb-8">
                        <h3 class="mb-4">Оплата</h3>
                        <div class="d-flex">
                            <v-btn-toggle class="mr-8 orderToggle" v-model="toggleData2" mandatory>
                                <v-btn 
                                @click="updateDataClient('payment', payment.type = 'online', 'type')" 
                                class="s-btn-text" 
                                :dark="payment.type == 'online'"
                                width="240px">
                                Онлайн
                                </v-btn>
                                <v-btn 
                                v-if="delivery.type == 'courier'"
                                @click="updateDataClient('payment', payment.type = 'totheCourier', 'type')" 
                                class="s-btn-text" 
                                width="240px">
                                Курьеру при доставке
                                </v-btn>
                            </v-btn-toggle>
                            
                            <!-- <v-btn class="mr-8" large><img src="/icons/order/1.png" /></v-btn>
                            <v-btn class="mr-8" large><img src="/icons/order/2.png" /></v-btn>
                            <v-btn class="mr-8" large><img src="/icons/order/3.png" /></v-btn> -->
                        </div>
                    </div>
                    <v-divider class="mb-8" />
                    <div>
                        <table class="mb-8">
                            <tbody>
                                <tr class="white">
                                    <td style="width: 70%">Стоимость товаров:</td>
                                    <td>{{ totalPrice }} ₽</td>
                                </tr>
                                <tr  class="white">
                                    <td>Экономия:</td>
                                    <td>{{ totalDicount ? totalDicount : 0 }} ₽</td>
                                </tr>
                                <tr  class="white">
                                    <td>Доставка:</td>
                                    <td v-if="delivery.type == 'courier'">1 480 ₽</td>
                                    <td v-else>0 ₽</td>
                                </tr>
                                <tr  class="white">
                                    <td><b>Общая стоимоcть:</b>
                                    </td>
                                    <td><span style="font-size: 28px">{{ totalCost }} ₽</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <v-row>
                                <v-col cols="3">
                                    <!-- <v-btn @click="validate()">Validate</v-btn> -->
                                    <v-btn @click="handleSubmit(toDataBase)" class="s-btn-text" dark style="width:100%" large>Оплатить заказ</v-btn>
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
                    </ValidationObserver>
                    </div>
        </div>
        </v-container>
    </template>
    
    <script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'
export default {
    components: {
    ValidationProvider,
    ValidationObserver
    },
    computed: {
        ...mapGetters({
            totalPrice: 'cart/totalPrice',
            totalDicount: 'cart/totalDiscount',
            dataClient: 'cart/dataClient',
            DataCart: 'cart/cart'
        }),
        totalCost(){
            if(this.delivery.type == 'courier'){
                return this.totalPrice + 1480
            } else {
                return this.totalPrice
            }
        },
        dataTotalPrice(){
            let price = 0;
            this.dataOrder.cartData.forEach((item) => {price += item.value})
            return price
        }
    },
    data() {
        return {
            cartData: [],
            dataOrder: {},
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
                type: 'online'
            },
            phoneNumberMask: {
                mask: '+7 (###) ###-##-##',
            },
            send: false
        }
    },
    watch: {
      'delivery.type':{
        handler () {
            if(this.delivery.type == 'pickup'){
                this.payment.type = 'online';
                this.address = 'г. Москва, Волгоградский проспект, д. 32, корпус 25, ТЦ «Метр квадратный», 2 этаж, пав. № 66-67-96';
            }
        }
      },
      deep: true
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
        return { title, breadcrumbsData }
    },
    methods: {
        toCatalog(){
            this.$router.push({path: '/allcategories'})
        },
        updateDataClient(name1, value, name2){
            name2 ? this.$store.commit('cart/updateDataClient', {name1, value, name2}) : this.$store.commit('cart/updateDataClient', {name1, value});
        },
        toItem(el){
            this.$router.push({path: '/catalog/view/' + el.code})
        },
        async toDataBase() {
    // if(this.fullName.trim() && this.email.trim() && this.phone.trim()){
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
                                        cartData: this.DataCart
                                    });
                                    let resData = resp.data;
                                    console.log(resData);
                                    this.dataOrder = resp.data.data;
                                    this.send = true;
                                    this.cartData = this.$store.getters['cart/cart']
                                    this.$store.commit('cart/removeAll');
                                } catch (error) {
                                        console.error(error);
                                    }
            } 
            // else {
            //     this.errorMessages = 'Заполните обязательные поля'
            // }
    },
}
</script>

<style lang="scss">
    .orderToggle .v-item--active {
        background-color: rgb(39, 39, 39) !important;
        color: white !important;
    }
    .s-input-text-center{
        input {
            text-align: center;
        }
    } 
    .toItemblock:hover{
            cursor: pointer;
    }
</style>