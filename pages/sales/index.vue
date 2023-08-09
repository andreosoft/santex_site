<template>
    <v-container class="mb-10">
        <v-divider class="mb-8" />
        <common-beadcrumbs class="mb-4" :value="breadcrumbsData" />
        <h1>Распродажа</h1>
        <v-divider class="mb-8" />
        <div>
            <img src="https://top-santehnika.ru/upload/webp/resize_cache/186/1440_550_1/7bsk7lw5oitacxw8bcsx16p9ek3ugqrq.webp" alt="">
        </div>
        <v-divider class="mb-8" />
        <h2>Жирные скидки -20%</h2>
        <!-- <v-divider class="mb-8" /> -->
        <p>Текстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блокТекстовый блок</p>
        <v-divider class="mb-8" />
        <!-- <catalog-base-catalog :data="data" :loading="loading" :dataFilters="dataFilters" :valueFilters="valueFilters" :pager="pager" :sort="sort" @update-data="valueFilters = $event"/> -->
    <div class="text-center mt-10 ">
      <!-- <common-pagination :value="pager" /> -->
    </div>
      </v-container>
</template>

<script>


export default {
    async asyncData(params) {
    const breadcrumbsData = [
      {
        url: "/sales",
        title: "Распродажа",
      }
    ];
    return { breadcrumbsData }
  }
}
</script>