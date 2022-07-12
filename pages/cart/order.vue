<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <div class="d-flex justify-space-between">
            <h1>{{ title }}</h1>
            <div>
                <v-btn class="s-btn-text">Вернуться к покупкам</v-btn>
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
                            <v-text-field outlined placeholder="Введите ФИО" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="mb-2"><b>Электронная почта</b></div>
                        <div>
                            <v-text-field outlined placeholder="Введите e-mail" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="mb-2"><b>Контактный телефон</b></div>
                        <div>
                            <v-text-field outlined placeholder="+7(" />
                        </div>
                    </v-col>
                </v-row>
            </div>
            <v-divider class="mb-8" />
            <div class="mb-8">
                <h3 class="mb-4">Способ доставки</h3>
                <div class="mb-4">
                    <v-btn-toggle>
                        <v-btn class="s-btn-text" width="240px" dark>Курьер</v-btn>
                        <v-btn class="s-btn-text" width="240px">Самовывоз</v-btn>
                    </v-btn-toggle>
                </div>
                <div class="mb-4">
                    <span>Доставка возможна: </span>
                    <span><b>завтра 27 декабря + 1480 руб.</b></span>
                </div>
            </div>
            <v-divider class="mb-8" />
            <div class="mb-8">
                <h3 class="mb-4">Адрес доставки</h3>
                <v-row>
                    <v-col cols="4">
                        <div class="mb-2"><b>Город</b></div>
                        <div>
                            <v-text-field outlined placeholder="Ваш город" />
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="mb-2"><b>Улица</b></div>
                        <div>
                            <v-text-field outlined placeholder="Укажите улицу" />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="8">
                        <v-row>
                            <v-col cols="2">
                                <v-text-field outlined label="Индекс" />
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Дом" />
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Квартира/офис" />
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Подъезд" />
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Этаж" />
                            </v-col>
                            <v-col cols="2">
                                <v-text-field outlined label="Домофон" />
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
                    <v-btn-toggle class="mr-8">
                        <v-btn class="s-btn-text" width="240px" dark>Онлайн</v-btn>
                        <v-btn class="s-btn-text" width="240px">Курьеру при доставке</v-btn>
                    </v-btn-toggle>
                    
                    <v-btn class="mr-8" large><img src="/icons/order/1.png" /></v-btn>
                    <v-btn class="mr-8" large><img src="/icons/order/2.png" /></v-btn>
                    <v-btn class="mr-8" large><img src="/icons/order/3.png" /></v-btn>
                </div>
            </div>
            <v-divider class="mb-8" />
            <div>
                <table class="mb-8">
                    <tr>
                        <td style="width: 70%">Стоимость товаров:</td>
                        <td>76 540 ₽</td>
                    </tr>
                    <tr>
                        <td>Экономия:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Доставка:</td>
                        <td>1 480 ₽</td>
                    </tr>
                    <tr>
                        <td><b>Общая стоимоcть:</b>
                        </td>
                        <td><span style="font-size: 28px">940 ₽</span></td>
                    </tr>
                </table>
                <div>
                    <v-row>
                        <v-col cols="3">
                            <v-btn class="s-btn-text" dark style="width:100%" large>Оплатить заказ</v-btn>
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

export default {

    data() {
        return {
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
}
</script>