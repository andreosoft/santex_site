<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <h1>Поиск</h1>
        <div class="mb-10">
            <p><b>Вы искали:</b> <span class="underlined">название искомово</span> , найдено 0 шт.</p>
        </div>
        <v-divider class="mb-10" />
        <div>
            <div class="mb-10" style="font-weight: bold;">К сожалению по вашему запросу ничего не найдено.</br>
                Попробуйте изменить ключевые слова поиска.</div>
            <div style="width: 724px;">
                <v-text-field single-line outlined dense label="Я хочу найти">
                    <template v-slot:append>
                        <img @click="$router.push({ path: '/catalog/search/1' })" src="/icons/Search.svg" />
                    </template>
                </v-text-field>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            carouselModel: 0,
            filter: {
                price: {},
            },
        };
    },
    async asyncData(params) {
        console.log(params);
        const title = "Аксессуары";
        const breadcrumbsData = [
            {
                url: "",
                title: "Каталог",
            },
            {
                url: "",
                title: title,
            },
        ];
        return { title, breadcrumbsData };
    },
};
</script>