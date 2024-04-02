<template>
  <v-container class="mb-10">
      <v-divider class="mb-8" />
      <common-beadcrumbs class="mb-4" :value="breadcrumbsData()" />
      <h1>{{ subcat.name ? subcat.name : 'Не указано' }}</h1>
      <v-row class="s-row d-flex justify-center mb-5 mt-5">
        <div>
          <!-- <img v-if="categoriesData.images" :src="$config.baseImageURL + categoriesData.images[0]" alt="banner"> -->
          <img src="/banners/banner1.png" alt="banner">
        </div>
      </v-row>
      <v-row class="s-row">
          <v-col cols="4" v-for="(el, i) in subcat?.content" :key="i">
            <s-guide-style-items-el :subcat="true" :el="el" />
          </v-col>
      </v-row>
    </v-container>
</template>

<script>
import BaseCatalog from "@/components/catalog/base-catalog.vue";
import { mapGetters } from "vuex";
async function getData({route, $axios, $config}){

  const category_id = route.params.id;
  const loading = false
return {loading, category_id};
}

export default {
  components: {
      BaseCatalog
  },
  computed: {
      ...mapGetters ({allCategories: 'getCategories'}),
      subcat(){
        return this.allCategories.find(item => item.id == this.category_id)
    }
  },
  methods: {
    breadcrumbsData(){
      let breadcrumbsData = [
            {
              url: "/allcategories",
              title: "Каталог",
            }, 
            {
              url: "/allcategories/" + this.$route.params.id,
              title: this.subcat?.name ? this.subcat?.name : 'Не указано',
            }
          ]
          return breadcrumbsData
    }
  },
  data () {
      return {
          loading: true,
      }
  },
  async asyncData({ route, $axios, $config }) {
      return await getData({ route, $axios, $config});
},
}
</script>