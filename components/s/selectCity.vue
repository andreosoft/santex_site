<template>
    <div class="d-inline">
        <span style="cursor: pointer" @click="dialog = true">
            <span>{{ citys[value] }}</span>
            <img src="/icons/arrow_down_city.svg" />

        </span>

        <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="730px"
            transition="dialog-transition">
            <div class="s-popup">
                <div>
                    <div class="text-right">
                        <v-btn icon @click="dialog = false"><img src="/icons/close_menu.svg" /></v-btn>
                    </div>
                </div>
                <div style="margin: 10px 64px 100px 64px;">
                    <div class="d-flex">
                        <h2>Выбрать город</h2>
                        <v-spacer></v-spacer>
                        <div style="cursor: pointer; margin-top: 6px;" class="grey--text">Определить автоматически</div>
                    </div>
                    <div>
                        <v-text-field single-line outlined label="Найти город" background-color="#EFF1F5">
                            <template v-slot:append>
                                <img src="/icons/Search.svg" />
                            </template>
                        </v-text-field>
                    </div>
                    <div>
                        <v-row>
                            <v-col cols="4" v-for="(el, i) in citys" :key="i">
                                <a @click="dialog = false; $emit('input', i)" class="underlined-onhover">{{ el }}</a>
                            </v-col>
                        </v-row>
                    </div>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        value: String,
    },
    data() {
        return {
            dialog: false,
            citys: {
                "moscow": "Москва",
                "ek": "Екатеринбург",
                "kr": "Краснодар",
                "nn": "Нижний Новгород",
                "nov": "Новосибирск",
                "rost": "Ростов-на-Дону",
                "sam": "Самара",
                "spb": "Санкт-Петербург",
                "ufa": "Уфа",
                "chel": "Челябинск"
            },
        }
    }
}
</script>