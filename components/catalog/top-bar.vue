<template>
    <div class="d-flex justify-space-between">
        <div class="d-flex">
            <v-select style="max-width: 200px;" dense outlined v-model="data.sort1" :items="sort1" class="mr-3" />
            <v-select style="max-width: 250px;" dense outlined :value="sort" @input="onInputSort($event)" :items="sortOrder" class="mr-3" />
        </div>
        <div>
            <span>Всего: </span>
            <b>{{ countString }}</b>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        count: Number,
        sort: Object
    },
    data() {
        return {
            data: {
                sort1: 'Популярные',
                sortOrder: { key: "price", order: "ASC" }
            },
            sort1: [
                'Популярные', "Другие"
            ],
            sortOrder: [
                {
                    text: "По возрастанию цены",
                    value: { key: "price", order: "ASC" }
                },
                {
                    text: "По убыванию цены",
                    value: { key: "price", order: "DESC" }
                }
            ],
        }
    },
    watch: {
        "data.sortOrder": {
            handler(v) {
                
            }
        }
    },
    computed: {
        countString() {
            const lastDig = this.count % 10;
            const last2Dig = this.count % 100;
            let w = "товаров";
            if (lastDig == 1) {
                w = "товар";
            } else if (lastDig > 1 && lastDig < 5) {
                w = "товара";
            } else {
                w = "товаров";
            }
            return this.count.toLocaleString('ru') + " " + w
        }
    },
    methods: {
        onInputSort(e) {
            this.$router.push({ query: Object.assign({}, this.$route.query, { sort: JSON.stringify(e), page: 0 }) });
        }
    }
}
</script>