<template>
    <v-container style="max-width: 400px;" v-if="value.limit > 0">
        <v-pagination v-if="length" :value="page" @input="onPage($event)" :length="length" circle></v-pagination>
    </v-container>
</template>

<script>

export default {
    props: {
        value: Object
    },
    data() {
        return {
        }
    },
    computed: {
        length() {
            if (this.value.limit > 0) return Math.ceil(this.value.count / this.value.limit);
        },
        page() {
            return Number(this.value.page) + 1
        }
    },
    methods: {
        onPage(e) {
            const page = e - 1;
            this.$router.push({ query: Object.assign({}, this.$route.query, { page: page }) })
            this.$emit('input', Object.assign(this.value, { page: page }));
            window.scrollTo(0, 0);
        }
    }
}
</script>