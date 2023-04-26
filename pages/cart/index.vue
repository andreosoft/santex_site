<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        {{ mass }}
        <h1>{{ title }}</h1>
        <v-divider class="mb-8" />
        <div>
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

            <div v-for="(el, i) in data" :key="i" class="align-center">
                <v-row>
                    <v-col cols="5">
                        <div class="d-flex">
                            <div class="mr-4 pa-2" style="border: 0.5px solid black">
                                <v-img :src="el.image[0]" />
                            </div>
                            <div>
                                <div style="font-size: 13px" class="mb-2 grey--text">Код товара: {{ el.code }}</div>
                                <div style="font-size: 16px" class="mb-2">{{ el.name }}</div>
                                <div style="font-size: 13px"><span class="grey--text mr-2">Габариты
                                        (Д.Ш.В):</span><span>{{
                                                el.size
                                        }}</span></div>
                                <div style="font-size: 13px"><span class="grey--text mr-2">Бренд:</span><span>{{
                                        el.brend_name
                                }}</span></div>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="2">
                        <div>
                            <div style="font-size: 22px">
                                <b><number :value="el.count * el.price" /> ₽</b>
                            </div>
                            <div v-if="el.old_price" style="font-size: 16px; text-decoration: line-through;"
                                class="grey--text">
                                <b><number :value="el.count * el.old_price" /> ₽</b>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="2">
                        <div style="max-width: 160px">
                            <div class="mb-2 d-flex justify-space-between" v-if="el.type == 2">
                                <v-btn class="s-btn-text" dark>м<sup>2</sup></v-btn>
                                <v-btn class="s-btn-text">упак</v-btn>
                            </div>
                            <v-text-field hide-details class="s-input-text-center" outlined dense v-model="el.count">
                                <v-btn @click="el.count = el.count + 1" style="margin-top: -6px;" slot="append" icon><i
                                        class="fa-solid fa-plus"></i></v-btn>
                                <v-btn @click="el.count >= 1 ? el.count = el.count - 1 : 0" style="margin-top: -6px;"
                                    slot="prepend-inner" icon><i class="fa-solid fa-minus"></i></v-btn>
                            </v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="2">
                        <div style="font-size: 22px">
                            <b><number :value="el.price" /> ₽</b>
                        </div>
                    </v-col>
                    <v-col cols="1">
                        <div>
                            <v-btn icon><img src="/icons/trash.png" alt="removeitem-icon"/></v-btn>
                        </div>
                    </v-col>
                </v-row>
                <v-divider class="my-8" />
            </div>
        </div>
        <div class="mb-8">
            <v-row>
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
                            <div style="font-size: 14px" class="red--text">Экономя:
                                <number :value="totalDiscont" /> ₽
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
                            <span class="green mr-2" style="color: #fff; border-radius: 50%;width: 28px;
    display: inline-block;
    height: 28px;
    text-align: center;
    padding-top: 2px;"><img src="/icons/timer.png" /></span>В рассрочку </span>
                        <span><b style="text-decoration: underline;">от 2 460 ₽/мес.</b></span>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import number from '../../components/number.vue';
export default {
    components: { number },
    data() {
        return {
            mass: []
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
        const data = [
            {
                id: 100,
                name: "Название товара",
                image: ["/img/cart/1.png"],
                code: "4554545",
                price: 1540,
                old_price: 8220,
                brend_name: "Название бренда",
                size: "44 x 75 x 20",
                available: 1,
                count: 1,
            },
            {
                id: 100,
                type: 2,
                name: "Название товара",
                image: ["/img/cart/2.png"],
                code: "4554545",
                price: 1540,
                old_price: 8220,
                brend_name: "Название бренда",
                size: "44 x 75 x 20",
                available: 1,
                count: 1.2,
            },
        ]
        return { title, data, breadcrumbsData }
    },
    computed: {
        totalPrice() {
            let r = 0;
            for (const el of this.data) {
                r = r + (el.price * el.count);
            }
            return r;
        },
        totalDiscont() {
            let r = 0;
            for (const el of this.data) {
                r = r + (el.old_price * el.count);
            }
            return r - this.totalPrice;
        }
    },
    mounted() {
        for (let key in localStorage) {
                this.mass.push(JSON.parse(localStorage.getItem(key)));
            }
    }
}

</script>


<style lang="scss">
.v-btn--icon{
    color: black !important;
}
.s-input-text-center{
    input {
        text-align: center;
    }
} 
</style>