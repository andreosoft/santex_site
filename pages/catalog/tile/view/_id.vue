<template>
    <v-container class="mb-14">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <h1>{{ data.name }}</h1>
        <v-row class="mt-4">
            <v-col cols="6">
                <div>
                    <v-card class="ma-2">
                        <v-img :src="data.image[0]" />
                    </v-card>
                    <div>
                        <div class="d-flex">
                            <v-card v-for="(el, i) in data.image" :key="i" class="ma-2 s-catalog-gallery"
                                :class="{ active: galleryModel == i }" @click="galleryModel = i">
                                <v-img width="100" :src="el" />
                            </v-card>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col cols="6">
                <div class="d-flex justify-space-between">
                    <div>
                        <catalog-available :value="data.available" />
                    </div>
                    <div style="font-size: 14px;" class="grey--text"><span>Код товара: </span><span>{{ data.code
                    }}</span></div>
                </div>
                <div class="my-3">{{ data.decription }}</div>
                <v-divider />
                <div class="my-3 d-flex justify-space-between align-center">
                    <div>
                        <span style="font-size: 36px; font-weight: bold;">
                            <number :value="data.price" /> <span style="font-weight: normal;">₽/м<sup>2</sup></span>
                        </span>
                        <span class="ml-4 grey--text" style="
                display: inline-block;
                font-size: 36px;
                font-weight: bold;
              ">
                            <number :value="data.price_up" /> ₽/м<sup>2</sup>
                        </span>
                    </div>
                    <div><a>
                            <v-img :src="data.brend_logo" contain height="100" />
                        </a></div>
                </div>
                <div>
                    <div style="max-width: 200px">
                        <div class="mb-2 d-flex justify-space-between">
                            <v-btn class="s-btn-tail-select" dark>м<sup>2</sup></v-btn>
                            <v-btn class="s-btn-tail-select">шт</v-btn>
                            <v-btn class="s-btn-tail-select">упак</v-btn>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div style="max-width: 200px">
                            <v-text-field hide-details class="s-input-text-center" outlined dense v-model="data.count">
                                <div @click="el.count = data.count + 1" style="margin-top: 3px;" slot="append" icon><i
                                        class="fas fa-plus"></i></div>
                                <div @click="el.count >= 1 ? el.count = data.count - 1 : 0" style="margin-top: 3px;"
                                    slot="prepend-inner" icon><i class="fa-solid fa-minus"></i></div>
                            </v-text-field>
                        </div>
                        <div class="ml-14 mt-2">1.58 м2 = 9 шт = 1 упак</div>
                    </div>
                </div>
                <div class="my-4">
                    <table>
                        <tr>
                            <td style="width: 50%"><b>Доставка:</b></td>
                            <td>Послезавтра (700 ₽ )</td>
                        </tr>
                        <tr>
                            <td><b>Самовывоз:</b></td>
                            <td>Завтра (бесплатно )</td>
                        </tr>
                    </table>
                </div>
                <v-divider />
                <div class="my-8">
                    <div class="d-flex justify-space-between align-center">
                        <div>
                            <span>
                                <v-btn style="width: 200px;" class="s-btn-cart s-btn-text" dark>Купить</v-btn>
                            </span><span class="ml-4">
                                <v-btn style="width: 200px;" class="s-btn-cart s-btn-text"
                                    @click="showBuyeoneclick = true">Купить в 1 клик</v-btn>
                            </span>
                            <s-popup-buyoneclick v-model="showBuyeoneclick" />
                        </div>
                        <div>
                            <v-btn plain small><img src="/icon-similar.png" alt="" /></v-btn>
                            <v-btn plain small><img src="/icon-like.png" alt="" /></v-btn>
                        </div>
                    </div>
                </div>
                <div class="my-4">
                    <div class="mb-4">
                        <v-simple-table dense>
                            <tbody>
                                <tr v-for="(el, i) in data.params_info" :key="i">
                                    <td>
                                        <b>{{ el.name }}</b>
                                    </td>
                                    <td>{{ el.value }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                    <div>
                        <a class="grey--text underlined">Все характеристики</a>
                        <a class="grey--text underlined ml-8">Все товары Gracia Ceramica</a>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-divider class="my-4 mb-14" />
        <div class="mb-8">
            <v-tabs class=" mb-14" style="border-bottom: 1px solid #ddd" v-model="tabModel">
                <v-tab>Описание и характеристики</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabModel">
                <v-tab-item>
                    <div class="mb-6" v-html="data.fullDecription" />
                    <div class="mb-4">
                        <v-row>
                            <v-col :cols="6">
                                <v-simple-table dense>
                                    <tbody>
                                        <tr v-for="(el, i) in data.params_info" :key="i">
                                            <td>
                                                <b>{{ el.name }}</b>
                                            </td>
                                            <td>{{ el.value }}</td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-col>
                            <v-col :cols="6">
                                <v-simple-table dense>
                                    <tbody>
                                        <tr v-for="(el, i) in data.params_info" :key="i">
                                            <td>
                                                <b>{{ el.name }}</b>
                                            </td>
                                            <td>{{ el.value }}</td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-col>
                        </v-row>

                    </div>
                </v-tab-item>
            </v-tabs-items>
        </div>
        <v-divider class="mb-10" />
        <div class="mb-14">
            <h2 class="mb-4">Товары из этой коллекции</h2>
            <div>
                <v-row class="s-row">
                    <v-col cols="3" v-for="(el, i) in data.collection" :key="i">
                        <catalog-item-list-tail :el="el" />
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="mb-14">
            <h2 class="mb-4">Другие коллекции бренда</h2>
            <div>
                <v-row class="s-row">
                    <v-col cols="4" v-for="(el, i) in data.others_collections" :key="i">
                        <catalog-item-list-collection :el="el" />
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="mb-14">
            <h2 class="mb-4">О производителе</h2>
            <div>
                <v-row>
                    <v-col cols="3">
                        <v-img src="/img/catalog/logo3.png" />
                    </v-col>
                    <v-col cols="9">
                        <p>
                            APE Ceramica - испанская фабрика по производству керамической плитки и керамогранита. В
                            своих стремлениях успеть
                            поймать модные тенденции рынка и создать уникальный и интересный дизайн, фабрика выпустила
                            уже более четырех
                            тысяч различных наименований. И каждая из них нашла отклик у потребителя, ведь компания
                            постаралась учесть все
                            эстетические и функциональные запросы, будь то решение отделки ванной комнаты, кухни или
                            гостиной. Помимо напольной
                            и настенной плитки в ассортименте компании так же присутствует мебель для ванных комнат.
                        </p>
                        <p>
                            <a class="underlined grey--text">Все товары Gracia Ceramica</a>
                        </p>
                    </v-col>
                </v-row>
            </div>
        </div>
        <v-divider class="mb-10" />
        <div>
            <a><i class="fas fa-long-arrow-alt-left mr-4"></i>Вернуться назад</a>
        </div>
    </v-container>
</template>

<script>

export default {
    data() {
        return {
            showBuyeoneclick: false,
            tabModel: 0,
            galleryModel: 0,
            activeEl_with_buy_groups: 0
        };
    },
    async asyncData(params) {
        Number;
        console.log(params);
        const data = {
            id: 100,
            name: "Плитка APE Flat Blue 5х20",
            image: ["/img/catalog/tail/1.png"],
            decription: `Краткое описание плитки в несколько строк для сайта с пояснением
из чего состоит данная плитка и кому подойдет при покупке и определенными
параметрами.`,
            fullDecription: `Коллекция керамической плитки Gracia Ceramica Stazia – ключ к созданию респектабельного дизайна ванной комнаты. Благодаря цифровой печати производителю удалось
в точности отобразить слоистую структуру и раскрыть натуральную красоту оникса. В основе цветовой палитры лежат голубой, белый и лазурный оттенки, максимально
приближенные к природным. Винтажные нотки привнесет бордюр с золотистым напылением и декор с полосатым узором, стилизованный под старинные обои.`,
            brend_logo: "/img/catalog/logo2.png",
            code: "4554545",
            price: 1540,
            price_up: 8220,
            count: 1.2,
            brend_name: "Название бренда",
            size: "44 x 75 x 20",
            available: 1,
            params: [
            ],
            params_info: [
                {
                    name: "Производитель:",
                    value: "APE",
                },
                {
                    name: "Коллекция:",
                    value: "Three-D",
                },
                {
                    name: "Основной цвет:",
                    value: "Голубой",
                },
                {
                    name: "Поверхность:",
                    value: "Матовая",
                },
                {
                    name: "Категория:",
                    value: "Плитка",
                },
                {
                    name: "Страна:",
                    value: "Испания",
                },
                {
                    name: "Толщина (мм):",
                    value: "7",
                },
            ],
            collection: [
                {
                    id: 100,
                    name: "Название товара",
                    image: ["/img/catalog/tail/1.png"],
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
                    image: ["/img/catalog/tail/2.png"],
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
                    image: ["/img/catalog/tail/3.png"],
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
                    image: ["/img/catalog/tail/4.png"],
                    code: "4554545",
                    price: 1540,
                    old_price: 8220,
                    brend_name: "Название бренда",
                    size: "44 x 75 x 20",
                    available: 1,
                },
            ],
            others_collections: [
                {
                    id: 100,
                    name: "Название товара",
                    image: ["/img/catalog/collection/1.png"],
                    code: "4554545",
                    price: 1540,
                    brend_name: "Название бренда",
                    size: "44 x 75 x 20",
                    available: 1,
                    styles: [
                        "/img/catalog/collection/s1.png",
                        "/img/catalog/collection/s2.png",
                        "/img/catalog/collection/s3.png",
                        "/img/catalog/collection/s4.png",
                    ]
                },
                {
                    id: 100,
                    name: "Название товара",
                    image: ["/img/catalog/collection/2.png"],
                    code: "4554545",
                    price: 1540,
                    brend_name: "Название бренда",
                    size: "44 x 75 x 20",
                    available: 1,
                    styles: [
                        "/img/catalog/collection/s1.png",
                        "/img/catalog/collection/s2.png",
                        "/img/catalog/collection/s3.png",
                        "/img/catalog/collection/s4.png",
                    ]
                },
                {
                    id: 100,
                    name: "Название товара",
                    image: ["/img/catalog/collection/3.png"],
                    code: "4554545",
                    price: 1540,
                    brend_name: "Название бренда",
                    size: "44 x 75 x 20",
                    available: 1,
                    styles: [
                        "/img/catalog/collection/s1.png",
                        "/img/catalog/collection/s2.png",
                        "/img/catalog/collection/s3.png",
                        "/img/catalog/collection/s4.png",
                    ]
                },
            ]
        };
        const breadcrumbsData = [
            {
                url: "",
                title: "Каталог",
            },
            {
                url: "/catalog/1",
                title: "Аксессуары",
            },
            {
                url: "",
                title: data.name,
            },
        ];
        return { data, breadcrumbsData };
    },
};
</script>