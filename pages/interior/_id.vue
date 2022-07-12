<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <h1>{{ title }}</h1>
        <div class="mb-14">
            <v-row class="s-row">
                <v-col cols="6" v-for="(el, i) in data.images"><img :src="el" /></v-col>
            </v-row>
        </div>
        <div>
            <h2 class="mb-8">Товары присутсвующие на фото</h2>
            <div class="mb-14">
                <v-row class="s-row">
                    <v-col cols="3" v-for="(el, i) in data.products" :key="i">
                        <catalog-item-list :el="el" />
                    </v-col>
                </v-row>
            </div>
            <v-divider class="mb-8" />
            <div class="mt-14 mb-14 text-center">
                <a class="s-btn-else"><i class="fas fa-redo"></i> Показать еще</a>
            </div>
        </div>
        <v-divider class="mb-14" />
        <div class="mb-14">
            <h2 class="mb-8">Подберите ванну правильно</h2>
            <p>Рассказываем основные моменты, на которые следует обратить внимание при выборе ванны.</p>
            <p>Многие мечтают о роскошной угловой ванной на две персоны с джакузи и встроенным радио. Но площадь
                типичной ванной комнаты составляет всего 3–6 квадратных
                метров. И на них, как правило, ещё нужно разместить раковину, стиралку и шкафчики для косметики. Поэтому
                свои спа-мечты нужно соотносить с возможностями
                помещения, где будет стоять ванна.</p>
            <p>
                1. По материалу ванны делятся на чугунные, стальные, акриловые, квариловые и керамические. В этой статье
                мы поговорим о первых трёх, так как именно они наиболее
                популярны.
            </p>
            <p>
                2. Стальные ванны изготавливают из нержавеющей или конструкционной стали. Они имеют эмалевое покрытие.
                Ванны из нержавейки слабо представлены на рынке,
                так как стоят порой дороже чугунных. А ведь главная фишка стальной ванны — бюджетность.
            </p>
            <p>
                3. Ещё один плюс — разнообразие конфигураций. Сталь довольно лёгкий и пластичный материал. Вы без труда
                найдёте стальную ванну с подлокотниками, подголовниками
                и другими красивыми изгибами. Но будьте осторожны: чем сложнее форма, тем тоньше металл.

            </p>
        </div>
        <v-divider class="mb-14" />
        <div>
            <div class="s-text-h2 mb-14 text-center">Похожие интерьеры</div>
            <s-guide-style-items :items="data.styleItems" class="mb-5" />
        </div>
    </v-container>
</template>

<script>
export default {
    async asyncData(params) {
        const title = "Название интерьера";
        const data = {
            images: [
                "/img/interior/1.png",
                "/img/interior/2.png",
            ],
            products: [
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
                    image: ["/img/favorite/1.png"],
                    code: "4554545",
                    price: 1540,
                    old_price: 8220,
                    brend_name: "Название бренда",
                    size: "44 x 75 x 20",
                    available: 1,
                },
            ],
            styleItems: [
                {
                    img: "/img/guide1.png",
                    to: "/interior/1"
                },
                {
                    img: "/img/guide2.png",
                    to: "/interior/1"
                },
                {
                    img: "/img/guide3.png",
                    to: "/interior/1"
                },
                {
                    img: "/img/guide4.png",
                    to: "/interior/1"
                },
                {
                    img: "/img/guide5.png",
                    to: "/interior/1"
                }
            ]
        }
        const breadcrumbsData = [
            {
                url: "",
                title: "Гид по стилю",
            },
            {
                url: "",
                title: title,
            },
        ];
        return { title, data, breadcrumbsData };
    }
}
</script>