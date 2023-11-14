<template>
    <v-container class="mb-10">
        <s-header title="Наши дизайнеры" :breadcrumbsData="breadcrumbsData" />
        <h3>Здесь представлены наши дизайнеры и архитекторы, с которыми
            мы реализовали много проектов. </h3>
        <h4 class="mb-16">Вы можете с ними познакомиться и заказать дизайн проект.</h4>
        <div>
            <div class="my-8" v-for="(el, i) in data" :key="i">
                <div v-if="!(i % 2)">
                    <v-row>
                        <v-col cols="5">
                            <v-img :src="$config.baseImageURL + el.images[0]" />
                        </v-col>
                        <v-col cols="7">
                            <div class="pl-6">
                                <v-divider />
                                <div>
                                    <h2 class="my-4 pt-10 text-uppercase">{{ el.name }}</h2>
                                    <div class="mb-6" v-html="el.content"></div>
                                    <div>
                                        <v-btn class="s-btn-main s-btn-text" :href="el.params ? el.params.url : ''">Перейти на сайт дизайнера</v-btn>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div v-else>
                    <v-row>
                        <v-col cols="7">
                            <div class="pr-6">
                                <v-divider />
                                <div>
                                    <h2 class="my-4 pt-10 text-uppercase">{{ el.name }}</h2>
                                    <div class="mb-6" v-html="el.content"></div>
                                    <div>
                                        <v-btn class="s-btn-main s-btn-text" :href="el.params ? el.params.url : ''">Перейти на сайт дизайнера</v-btn>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="5">
                            <v-img :src="$config.baseImageURL + el.images[0]" />
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
        <div>
            <div class="mt-16 text-center">
                <a @click="data.length == 4 ?  data = dataDesigners.slice(0, dataDesigners.length) : data = dataDesigners.slice(0, 4)" class="s-btn-else"><i class="fas fa-redo"></i> {{ data.length == 4 ? 'Показать все' : 'Скрыть' }}</a>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    async asyncData({$config, $axios}) {
        const breadcrumbsData = [
            {
                url: "",
                title: "Наши дизайнеры",
            }
        ];
        let dataDesigners, data;
        try {
            dataDesigners = (await $axios.get($config.baseURL + '/api/site/content', {
                params: {
                    filters: { parent_id: 43, status: 1 },
                }
            })).data.data;
            data = dataDesigners.slice(0, 4);
            console.log(data.length);
        } catch (error) {
            console.error(error)
        }
        return { breadcrumbsData, data, dataDesigners }
    }
}
</script>