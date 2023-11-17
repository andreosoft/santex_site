<template>
    <v-container v-if="value.limit > 0">
        <!-- {{ page }} / {{ length }}
        {{ value }} -->
        <!-- <v-pagination v-if="page && length" :value="page" @input="onPage($event)" :length="length" circle></v-pagination> -->
        <div v-if="page && length && value.count>30" class="d-flex flex-row justify-center">
            <div>
                <ul class="s-pagination">
                    <li>
                        <button @click="onPage($event)" type="button" class="s-pagination__navigation" :value="page - 1">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    </li>
                        <li v-if="page > 3">
                            <button @click="onPage($event)" type="button" class="s-pagination__item" :value="1">1</button>
                        </li>
                        <li v-if="page > 4">
                            <button type="button" class="v-pagination__more"><span>...</span></button>
                        </li>
                        <li v-if="page - 2 > 0">
                            <button @click="onPage($event)" type="button" class="s-pagination__item" :value="page-2">{{ page-2 }}</button>
                        </li>
                        <li v-if="page - 1 > 0">
                            <button @click="onPage($event)" type="button" class="s-pagination__item" :value="page-1"> {{ page-1 }} </button>
                        </li>
                        <li>
                            <button @click="onPage($event)" type="button" class="s-pagination__item s-pagination__item--active" :value="page">{{ page }}</button>
                        </li>
                        <li v-if="page + 1 < length">
                            <button @click="onPage($event)" type="button" class="s-pagination__item" :value="page + 1">{{page + 1}}</button>
                        </li>
                        <li v-if="page + 2 <= length">
                            <button @click="onPage($event)" type="button" class="s-pagination__item" :value="page + 2">{{page + 2}}</button>
                        </li>
                        <li v-if="length - page !== 3 && length !== page">
                            <button type="button" class="s-pagination__more"><span>...</span>
                            </button>
                        </li>
                        <li v-if="page < 3">
                            <button @click="onPage($event)" type="button" class="s-pagination__item" :value="length-2">{{ length-2 }}</button>
                        </li>
                        <li v-if="page < 3">
                            <button @click="onPage($event)" type="button" class="s-pagination__item" :value="length-1">{{ length-1 }}</button>
                        </li>
                        <li v-if="length - page !== 2 && length !== page">
                            <button @click="onPage($event)" type="button" class="s-pagination__item" :value="length">{{ length }}</button>
                        </li>
                    <li>
                        <button @click="onPage($event)" type="button" class="s-pagination__navigation" :value="page+1">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
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
        page: {
            get(){
                return Number(this.value.page) + 1
            },
            set(v){
                // console.log(v);
                return v;
            }
            
        }
    },
    methods: {
        onPage(e) {
            // console.log(e.target.value);
            if(e.target.classList.contains('fas')){
                const actualvalue = +e.target.closest('.s-pagination__navigation').value;
                const page = actualvalue - 1;
                if(page>0 && page < this.length - 1){
                    this.$router.push({ query: Object.assign({}, this.$route.query, { page: page }) })
                    this.$emit('input', Object.assign(this.value, { page: page }));
                    window.scrollTo(0, 0);                
                }
            } else{
                const page = +e.target.value - 1;
                if(page >= 0 && page < this.length){
                    this.$router.push({ query: Object.assign({}, this.$route.query, { page: page }) })
                    this.$emit('input', Object.assign(this.value, { page: page }));
                    window.scrollTo(0, 0);
                }
            }
        }
    }
}
</script>