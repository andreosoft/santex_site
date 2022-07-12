<template>
    <div>
        <v-dialog v-model="value" persistent :overlay="false" max-width="421px" transition="dialog-transition">
            <div class="s-popup">
                <div>
                    <div class="text-right">
                        <v-btn icon @click="$emit('input')"><img src="/icons/close_menu.svg" /></v-btn>
                    </div>
                </div>
                <div style="margin: 10px 50px 10px 50px;">
                    <h2>Купить в 1 клик</h2>
                    <p>Для оформления введите ваш телефон</p>
                    <div>
                        <div>
                            <div class="mb-2"><b>Номер телефона</b></div>
                            <div>
                                <v-text-field outlined placeholder="Введите телефон" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-6">
                        <v-btn class="s-btn-text" dark style="width:100%; height: 56px;" large @click="$emit('input')">Оформить заказ
                        </v-btn>
                    </div>
                    <div class="gray" style="font-size: 14px;">
                        Отправляя данные вы соглашаетесь
                        с <a class="underlined">пользовательским соглашением</a>.

                    </div>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        value: Boolean
    }
}
</script>