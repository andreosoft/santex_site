<template>
    <div>
        <v-divider class="mb-4" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <h1>{{title}}</h1>
        <v-divider class="mb-4" />
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        breadcrumbsData: Array
    }
}
</script>