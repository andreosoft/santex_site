<template>
    <div>
        <v-container class="mb-10">
            <v-divider class="mb-8" />
            <common-beadcrumbs :value="breadcrumbsData" />
            <v-row class="mt-2">
                <v-col cols="2" class="s-catalog-links">
                    <nuxt-link v-for="(el, i) in leftMenu" :key="i" class="s-catalog-links-el" :class="{
                        active: el.url == activeEl.url
                    }" :to="el.url"> <b>{{ el.title }}</b>
                    </nuxt-link>
                </v-col>
                <v-col cols="10" class="pl-16">
                    <component :is="'pages-' + activeEl.component" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    async asyncData(params) {
        console.log(params);
        const leftMenu = [
            {
                title: "О компании",
                url: "/pages/about",
                component: "about"
            },
            {
                title: "Контакты",
                url: "/pages/contacts",
                component: "contacts"
            },
            {
                title: "Доставка",
                url: "/pages/delivery",
                component: "delivery"
            },
            {
                title: "Оплата",
                url: "/pages/payment",
                component: "payment"
            },
            {
                title: "Гарантия и возвраты",
                url: "/pages/garanty",
                component: "garanty"
            }
        ]

        const activeEl = leftMenu.find(el => el.url == params.route.path);
        const breadcrumbsData = [
            {
                url: "",
                title: activeEl.title,
            }
        ];
        const data = [
            {
                title: "О компании",
                url: "/pages/about",
                content: `
                <h1>О компании</h1>
                `
            }
        ]
        return { data, breadcrumbsData, leftMenu, activeEl }
    }
}
</script>