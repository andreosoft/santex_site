<template>
    <div>
        <h1>Контакты</h1>
        <v-row>
            <v-col cols="8">
                <p class="grey--text"><b>АДРЕС</b></p>
                <p style="font-size: 22px">
                    г. Москва, Волгоградский проспект, д. 32, корпус 25,<br />
                    ТЦ «Метр квадратный», 2 этаж, пав. № 66-67-96
                </p>
            </v-col>
            <v-col cols="4">
                <p class="grey--text">
                    <b>Режим работы</b>
                </p>
                <p style="font-size: 22px">Ежедневно с 10:00 до 20:00</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8">
                <v-row>
                    <v-col cols="6">
                        <h4 class="pb-2">
                            <p class="grey--text"><b>ТЕЛЕФОНЫ</b></p>
                            <a href="tel://88007759985">8 (800) 775-99-85</a>
                        </h4>
                        <p>Звонок по России бесплатный</p>
                    </v-col>
                    <v-col cols="6">
                        <p class="grey--text" style="font-size: 20px">
                            <b>САНТЕХНИКА</b>
                        </p>
                        <h4 class="pb-2">
                            <a href="tel://84952256285">8 (495) 225 62 85</a>
                        </h4>
                        <p>Ежедневно с 10:00 до 20:00</p>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4">
                <p class="grey--text" style="font-size: 20px">
                    <b>ПЛИТКА</b>
                </p>
                <h4 class="pb-2">
                    <a href="tel://79055368559">+7 (905) 536-85-59</a>
                </h4>
                <p>Ежедневно с 10:00 до 20:00</p>
            </v-col>
        </v-row>
        <v-row class="mb-4">
            <v-col cols="4">
                <a
                    href="https://www.instagram.com/santehkomfort?igsh=MTN6OWVmaTNlcHMwcQ=="
                    class="d-flex align-center mb-6"
                >
                    <div class="pa-1 pr-4">
                        <img src="/icons/contact/inst.png" />
                    </div>
                    <div>
                        <div class="grey--text"><b>Instagram</b></div>
                        <div><b>santehkomfort</b></div>
                    </div>
                </a>
                <a
                    href="https://instagram.com/tanya_prodesign"
                    class="d-flex align-center"
                >
                    <div class="pa-1 pr-4">
                        <img src="/icons/contact/inst.png" />
                    </div>
                    <div>
                        <div class="grey--text"><b>Instagram</b></div>
                        <div><b>tanya_prodesign</b></div>
                    </div>
                </a>
            </v-col>
            <v-col cols="4">
                <a
                    href="https://api.whatsapp.com/send/?phone=79672823107"
                    class="d-flex align-center mb-6"
                >
                    <div class="pa-1 pr-4">
                        <img src="/icons/contact/whatsapp.png" />
                    </div>
                    <div>
                        <div class="grey--text"><b>Сантехника</b></div>
                        <div><b>+7 (967) 282-31-07</b></div>
                    </div>
                </a>
                <a
                    href="https://api.whatsapp.com/send/?phone=79055368559"
                    class="d-flex align-center"
                >
                    <div class="pa-1 pr-4">
                        <img src="/icons/contact/whatsapp.png" />
                    </div>
                    <div>
                        <div class="grey--text"><b>Плитка</b></div>
                        <div><b>+7 (905) 536-85-59</b></div>
                    </div>
                </a>
            </v-col>
            <v-col cols="4">
                <p class="grey--text mb-0">
                    <b>E-mail</b>
                </p>
                <h4><a href="mailto:info@santax.ru">info@santax.ru</a></h4>
                <a
                    href="https://youtube.com/@tanyaprodesign"
                    class="d-flex align-center mb-6"
                >
                    <div class="pa-1 pr-4">
                        <img src="/icons/contact/youtube.png" />
                    </div>
                    <div>
                        <div class="grey--text"><b>Youtube</b></div>
                        <div><b>Tanya PROdesign</b></div>
                    </div>
                </a>
            </v-col>
        </v-row>
        <div class="mb-8">
            <v-img src="/img/about/6.png" />
        </div>
        <div class="mb-8">
            <common-video fullWidth :item="videoItem" />
        </div>
        <div class="">
            <div>
                <div class="d-flex mb-4">
                    <div class="mr-6"><i class="fas fa-check-circle"></i></div>
                    <div>
                        В навигаторе «МЕТР КВАДРАТНЫЙ» ПАРКОВКА НА ТЕРРИТОРИИ
                        БЕСПЛАТНАЯ.
                    </div>
                </div>
                <div class="d-flex mb-4">
                    <div class="mr-6"><i class="fas fa-check-circle"></i></div>
                    <div>
                        От метро «Волгоградский проспект», первый вагон из
                        центра, после турникетов налево, идти прямо 700 метров.
                        Проходите СБЕРБАНК И ЗА НИМ «ТЦ Метр квадратный».
                    </div>
                </div>
                <div class="d-flex mb-4">
                    <div class="mr-6"><i class="fas fa-check-circle"></i></div>
                    <div>
                        От МЦК «Угрешская» , после турникетов направо в сторону
                        Волгоградского проспекта пройти 400 метров до «ТЦ Метр
                        квадратный».
                    </div>
                </div>
                <div class="d-flex mb-4">
                    <div class="mr-6"><i class="fas fa-check-circle"></i></div>
                    <div>
                        Как нас найти в ТЦ «Метр Квадратный»: Центральный вход.
                        В УЗКОМ ПРОЕЗДЕ. (в офисный центр НЕ НАДО) Заходите в
                        СРЕДНЮЮ ДВЕРЬ вход с КРАСНЫМ козырьком, поднимаетесь на
                        2-й этаж (самый верхний) на лифте или на эскалаторе. С
                        эскалатора направо - линия Ж, наклейки с номерами
                        павильонов на полу Из лифта прямо - линия Ж, наклейки с
                        номерами павильонов на полу. За домом обоев, наш самый
                        большой павильон с сантехникой и плиткой.
                    </div>
                </div>
            </div>
        </div>
        <common-divider1 />
        <div class="mb-8">
            <h2 class="text-center">Фотографии салона</h2>
            <div>
                <div class="mb-4">
                    <v-img src="/img/contact/2.png" />
                </div>
                <div class="d-flex justify-center">
                    <div class="d-flex">
                        <div class="ma-4" style="max-width: 200px">
                            <v-img src="/img/contact/3.png" />
                        </div>
                        <div class="ma-4" style="max-width: 200px">
                            <v-img src="/img/contact/4.png" />
                        </div>
                        <div class="ma-4" style="max-width: 200px">
                            <v-img src="/img/contact/5.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showPopupConsult: false,
            videoItem: {
                video: "https://www.youtube.com/embed/nOKam63GgzQ",
            },
        };
    },
};
</script>
