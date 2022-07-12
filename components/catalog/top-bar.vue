<template>
    <div class="d-flex justify-space-between">
        <div class="d-flex">
            <v-select style="max-width: 200px;" dense outlined v-model="data.sort1" :items="sort1" class="mr-3"/>
            <v-select style="max-width: 250px;" dense outlined v-model="data.sort2" :items="sort2" class="mr-3"/>
        </div>
        <div>
            <span>Всего: </span>
            <b>{{count}} товаров</b>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {
                sort1: 'Популярные',
                sort2: "По возрастанию цены"
            },
            sort1: [
                'Популярные', "Другие"
            ],
            sort2: [
                "По возрастанию цены", "По убываню цены"
            ],
            count: "1 260"
        }
    }
}
</script>