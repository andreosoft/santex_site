<template>
    <div>
        <v-dialog v-model="value" persistent :overlay="false" max-width="810px" transition="dialog-transition">
            <div class="s-popup">
                <div>
                    <div class="text-right">
                        <v-btn icon @click="$emit('closePopUp')"><img src="/icons/close_menu.svg" /></v-btn>
                    </div>
                </div>
                <div style="margin: 10px 64px 10px 64px;">
                    <h2>Запись на консультацию в салоне</h2>
                    <v-divider class="mb-8" />
                    <div v-if="view == 1">
                        <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit, validate }">
                        <div ref="formConsult">
                            <div>
                                <div class="mb-2"><b>Менеджер</b></div>
                                <div>
                                    <v-select :items="dataManager" v-model="valueManager" outlined placeholder="Введите менеджера" />
                                </div>
                            </div>
                            <div>
                                <div class="mb-2"><b>Ваше ФИО</b></div>
                                <div>
                                    <ValidationProvider name="fullName" rules="required|min:3" v-slot="{ errors, valid }">
                                        <v-text-field
                                        name="fullName"
                                        required
                                        :error-messages="errors"
                                        :success="valid"
                                        outlined
                                        placeholder="Введите ФИО"
                                        v-model="fullName"
                                        />
                                        </ValidationProvider>
                                </div>
                            </div>
                            <v-row>
                                <v-col cols="6">
                                    <div>
                                        <div class="mb-2"><b>Ваш e-mail</b></div>
                                        <div>
                                            <ValidationProvider name="email" rules="required|email" v-slot="{ errors, valid }">
                                            <v-text-field
                                            name="email"
                                            required 
                                            :error-messages="errors"
                                            :success="valid"
                                            type="email"
                                            outlined 
                                            placeholder="Введите e-mail"
                                            v-model="email"
                                            />
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="mb-2"><b>Дата посещения</b></div>
                                        <div>
                                            <v-menu
                                            ref="menuDate" 
                                            v-model="menuDate" 
                                            :close-on-content-click="false"
                                            :return-value.sync="data.date_request"
                                            transition="scale-transition" 
                                            offset-y 
                                            max-width="290px"
                                            min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field  
                                                    readonly                                                  
                                                    v-model="data.date_request"
                                                    placeholder="Выбрать дату"
                                                    outlined 
                                                    v-on="on"
                                                    v-bind="attrs"
                                                    >
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker
                                                v-model="data.date_request"
                                                locale="ru"
                                                no-title
                                                @input="datePicker"
                                                >
                                                </v-date-picker>
                                            </v-menu>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="6">
                                    <div>
                                        <div class="mb-2"><b>Контактный телефон</b></div>
                                        <div>
                                            <ValidationProvider name="phone" rules="length:18" v-slot="{ errors }">
                                            <v-text-field
                                            name="phone" 
                                            :error-messages="errors"
                                            type="text"
                                            outlined 
                                            placeholder="+7("
                                            v-mask="phoneNumberMask.mask"
                                            v-model="phone"
                                            />
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="mb-2"><b>Время посещения</b></div>
                                        <div>
                                            <v-menu 
                                            ref="menuTime" 
                                            v-model="menuTime" 
                                            :close-on-content-click="false"
                                            transition="scale-transition" 
                                            offset-y 
                                            max-width="360px"
                                            min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field 
                                                    readonly
                                                    v-model="data.time_request"
                                                    placeholder="Выбрать время" 
                                                    outlined 
                                                    v-on="on"
                                                    >
                                                    </v-text-field>
                                                </template>
                                                <s-time-picker v-model="data.time_request" @input="menuTime = false">
                                                </s-time-picker>
                                            </v-menu>
                                        </div>
                                    </div>
                                    <div style="padding-top: 32px;">
                                        <v-btn class="s-btn-text" dark style="width:100%; height: 56px;" large @click="handleSubmit(orderСonsult)">Заказать
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
                        </ValidationObserver>
                    </div>
                    <div v-else-if="view == 2">
                        <p>Благодарим за обращение, ждем Вас.</p>
                        <p>Приготовьте ваши вопросы и проект.</p>
                        <div class="mt-8 mb-8">
                            <div class="d-flex justify-space-between">
                                <v-btn class="s-btn-text" dark style="padding: 0 40px; height: 56px;" large @click="$emit('closePopUp'); view = 1">Закрыть окно</v-btn>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
    components: {
    ValidationProvider,
    ValidationObserver
    },
    props: {
        value: Boolean,
        managerId: {
            type: Number,
            default: 0
        },
        dataManager: Array
    },
    data() {
        return {
            dataOrderConsult: {},
            valueManager: '',
            fullName: '',
            email: '',
            phone: '',
            view: 1,
            dialog: false,
            menuDate: false,
            menuTime: false,
            data: {
                date_request: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                time_request: null,
                method: "Телефон",
            },
            // dataManager: [
            //     "Смирнов Сергей Петрович",
            //     "Смирнов1 Сергей Петрович",
            //     "Смирнов2 Сергей Петрович",
            //     "Смирнов3 Сергей Петрович"
            // ],
            dataMethod: [
                "Телефон",
            ],
            phoneNumberMask: {
                mask: '+7 (###) ###-##-##',
            }
        }
    },
    methods: {
        closePopUp(){
            return false
        },
        datePicker() {
            this.$refs.menuDate.save(this.data.date_request);
            this.menuDate = false;
        },
        async orderСonsult(){
            try {
                        const resp = await this.$axios.post(this.$config.baseURL + '/api/shop/consulting', {
                                data: {
                                    type_order: 1
                                },
                                name: this.fullName,
                                email: this.email,
                                phone: this.phone,
                                manager_name: this.valueManager,
                                date_call: new Date(this.data.date_request + ' ' + this.data.time_request).getTime(),
                                type: this.data.method == 'Телефон' ? 1 : 2
                                });
                                    let resData = resp.data;
                                    console.log(resData);
                                    this.dataOrderConsult = resp.data.data;
                                    this.view = 2;
                                    this.valueManager = ''; 
                                    this.fullName = '';
                                    this.email = '';
                                    this.phone = '';
                                    this.data.method = 'Телефон';
                                } catch (error) {
                                        console.error(error);
                                    }            
        }
    }
}
</script>