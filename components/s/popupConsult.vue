<template>
    <div>
        <v-dialog v-model="value" persistent :overlay="false" max-width="810px" transition="dialog-transition">
            <div class="s-popup">
                <div>
                    <div class="text-right">
                        <v-btn icon @click="$emit('input')"><img src="/icons/close_menu.svg" /></v-btn>
                    </div>
                </div>
                <div style="margin: 10px 64px 10px 64px;">
                    <h2>Запись на консультацию онлайн</h2>
                    <v-divider class="mb-8" />
                    <div v-if="view == 1">
                        <div>
                            <div>
                                <div class="mb-2"><b>Менеджер</b></div>
                                <div>
                                    <v-select :items="dataManager" outlined placeholder="Введите менеджера" />
                                </div>
                            </div>
                            <div>
                                <div class="mb-2"><b>Ваше ФИО</b></div>
                                <div>
                                    <v-text-field outlined placeholder="Введите ФИО" />
                                </div>
                            </div>
                            <v-row>
                                <v-col cols="6">
                                    <div>
                                        <div class="mb-2"><b>Ваш e-mail</b></div>
                                        <div>
                                            <v-text-field outlined placeholder="Введите e-mail" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="mb-2"><b>Желаемая дата звонка</b></div>
                                        <div>
                                            <v-menu ref="menu1" v-model="menuDate" :close-on-content-click="false"
                                                transition="scale-transition" offset-y max-width="290px"
                                                min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="data.date_request" placeholder="Выбрать дату"
                                                        outlined v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker locale="ru" v-model="data.date_request" no-title
                                                    @input="menuDate = false">
                                                </v-date-picker>
                                            </v-menu>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="mb-2"><b>Метод общения</b></div>
                                        <div>
                                            <v-select v-model="data.method" :items="dataMethod" outlined
                                                placeholder="Введите менеджера" />
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="6">
                                    <div>
                                        <div class="mb-2"><b>Контактный телефон</b></div>
                                        <div>
                                            <v-text-field outlined placeholder="Введите телефон" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="mb-2"><b>Желаемое время звонка</b></div>
                                        <div>
                                            <v-menu ref="menu1" v-model="menuTime" :close-on-content-click="false"
                                                transition="scale-transition" offset-y max-width="360px"
                                                min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="data.time_request"
                                                        placeholder="Выбрать время" outlined v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <s-time-picker v-model="data.time_request" @input="menuTime = false">
                                                </s-time-picker>
                                            </v-menu>
                                        </div>
                                    </div>
                                    <div style="padding-top: 32px;">
                                        <v-btn class="s-btn-text" dark style="width:100%; height: 56px;" large @click="view = 2">Заказать
                                            консультацию
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="gray" style="font-size: 14px;">
                                Нажимая «Заказать консультацию » вы соглашаетесь с условиями предоставления услуг
                                и <a class="underlined">политикой хранения персональных данных</a>.

                            </div>
                        </div>
                    </div>
                    <div v-else-if="view == 2">
                        <p>Благодарим за обращение, менеджер свяжется с вами в указанное время</p>
                        <p>Приготовьте ваши вопросы и проект.</p>
                        <div class="mt-8 mb-8">
                            <div class="d-flex justify-space-between">
                                <v-btn class="s-btn-text" dark style="padding: 0 40px; height: 56px;" large @click="$emit('input'); view = 1">Закрыть окно</v-btn>
                                <div>
                                    <img src="/logo2.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        value: Boolean,
    },
    data() {
        return {
            view: 1,
            dialog: false,
            menuDate: false,
            menuTime: false,
            data: {
                date_request: null,
                time_request: null,
                method: "Телефон"
            },
            dataManager: [
                "Смирнов Сергей Петрович",
                "Смирнов1 Сергей Петрович",
                "Смирнов2 Сергей Петрович",
                "Смирнов3 Сергей Петрович"
            ],
            dataMethod: [
                "Телефон",
            ]
        }
    }
}
</script>