<template>
    <div>
        <h1>О компании</h1>
        <div>
            <common-video fullWidth :item="videoItem" />
        </div>
        <p></p>
        <p>
            <b>ГК "SantehKomfort Elite" – это группа компаний в сфере проектых продаж и дистрибуции сантехники,
                мебели, керамической плитки и других отделочных материалов. Наш бизнес на рынке с 2007 года. </b>
        </p>
        <p>Путь Компании был интересным, иногда не простым. Мы продолжаем развиваться и улучшать ассортимент и сервис. В
            нашем ассортименте
            более 100 000 наименований продукции от ванны и унитаза до мебели, гипсовых проектов и мозаичных панно на
            заказ. В индивидуальных
            проектах мы работаем с профессиональными художниками -реставраторами, столярами- краснодеревщиками и
            обработчиками камня,
            скульпторами.</p>

        <div>
            <v-row>
                <v-col cols="6">
                    <div class="s-timeline-wrapper">
                        <div class="s-timeline-line"></div>
                        <div class="s-timeline">
                            <div class="s-timeline-item">
                                <div class="s-timeline-item-icon">
                                    <span class="white--text">2007</span>
                                </div>
                                <div class="s-timeline-item-text">Создание интернет магазина SantehKomfort</div>
                            </div>
                            <div class="s-timeline-item">
                                <div class="s-timeline-item-icon">
                                    <span class="white--text">2008</span>
                                </div>
                                <div class="s-timeline-item-text">Открытие шоурума в ТЦ «Метр квадратный»</div>
                            </div>
                            <div class="s-timeline-item">
                                <div class="s-timeline-item-icon">
                                    <span class="white--text">2012</span>
                                </div>
                                <div>Заключили прямые контракты с производителями
                                    на поставку Итальянской и Испанской плиткой
                                    и керамогранита</div>
                            </div>
                            <div class="s-timeline-item">
                                <div class="s-timeline-item-icon">
                                    <span class="white--text">2014</span>
                                </div>
                                <div class="s-timeline-item-text">Расширили шоурум до 200 метров </div>
                            </div>
                            <div class="s-timeline-item">
                                <div class="s-timeline-item-icon">
                                    <span class="white--text">2015</span>
                                </div>
                                <div class="s-timeline-item-text">Открытие отдела керамической плитки
                                    (Италия, Испания, Россия, Германия)
                                </div>
                            </div>
                            <div class="s-timeline-item">
                                <div class="s-timeline-item-icon">
                                    <span class="white--text">2020</span>
                                </div>
                                <div class="s-timeline-item-text">Участи в международной строительно-интерьерной
                                    выставки BATIMAT (г. Москва)

                                </div>
                            </div>
                            <div class="s-timeline-item">
                                <div class="s-timeline-item-icon">
                                    <span class="white--text">2021</span>
                                </div>
                                <div class="s-timeline-item-text">Увеличение шоурума до 450м2, ОТКРЫТИЕ
                                    представительства фабрики PAA (Латвия)
                                    и Shop – in –Shop фабрик SIMAS (Италия) и REMER
                                    (Италия)</div>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="6">
                    <v-img src="/img/main-block1.png" />
                    <div class="mt-16 text-center">
                        <v-btn dark class="s-btn-main s-btn-text" @click="showPopupConsult = true">Заказать консультацию</v-btn>
                    </div>
                </v-col>
            </v-row>
        </div>
        <common-divider1 />
        <h2>Наша команда</h2>
        <div>
            <div v-for="(el, i) in aboutCommand" :key="i">
                <v-row>
                    <v-col cols="4" class="mb-16">
                        <v-img :src="$config.baseImageURL + el.images[0]" />
                    </v-col>
                    <v-col cols="8" class="mb-16">
                        <h3><b>{{ el.name }}</b></h3>
                        <div v-html="el.content" />
                        <p class="mt-3"><b>E-mail:</b> {{ el.params.email }} </p>
                        <p><b>Тел:</b> {{el.params.phone}}</p>
                        <div>
                            <v-btn dark class="s-btn-main s-btn-text" @click="showPopupConsult = true, valueManager = el.name">Заказать консультацию</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
        <s-popup-consult :dataManager="dataManager" :NameManager="valueManager" v-model="showPopupConsult" @closePopUp="showPopupConsult = false"></s-popup-consult>
    </div>
</template>


<script>
export default {
    data() {
        return {
            valueManager: '',
            showPopupConsult: false,
            videoItem: {
                img: "/img/coll1.png",
                video: "https://www.youtube.com/embed/nOKam63GgzQ"
            },
            aboutCommand: [],
            dataManager: []
//                 {
//                     content: `<h3><b>АЛЕКСЕЙ КРУТОВ</b></h3><p></p>
//                     <p><b>TOP менеджер по работе с элитной сантехникой</b></p>
//                     <p>Опыт работы в компании SantehKomfort Elite с 2010 года
// Обучался на фабриках Италии и Германии, Латвии, Эстонии</p>
// <p><b>Скомплектовал более 3000 санузлов</b></p>`,
//                     image: ["/img/about/1.png"]
//                 },
//                 {
//                     content: `<h3><b>Екатерина Буданова </b></h3><p></p>
//                     <p><b>TOP менеджер по работе с элитной сантехникой</b></p>
//                     <p>Опыт работы в компании SantehKomfort Elite с 2010 года
// Обучался на фабриках Италии и Германии, Латвии, Эстонии</p>
// <p><b>Скомплектовал более 3000 санузлов</b></p>`,
//                     image: ["/img/about/2.png"]
//                 },
//                 {
//                     content: `<h3><b>Александр Егоров </b></h3><p></p>
//                     <p><b>TOP менеджер по работе с элитной сантехникой</b></p>
//                     <p>Опыт работы в компании SantehKomfort Elite с 2010 года
// Обучался на фабриках Италии и Германии, Латвии, Эстонии</p>
// <p><b>Скомплектовал более 3000 санузлов</b></p>`,
//                     image: ["/img/about/3.png"]
//                 }
//             ]
        }
    },
    async fetch() {
        const response = (await this.$axios.$get(this.$config.baseURL + '/api/site/content',
            {
                params: {
                    filters: {parent_id: 30, status: 1},
                    sort: {"key": "id", "order": "ASC"}
                }
            }
        )).data;
        this.aboutCommand = response;
        this.aboutCommand.forEach(el => {this.dataManager.push(el.name)})
    }
}
</script>

<style lang="scss">
.s-timeline-wrapper {
    position: relative;
    .s-timeline-line {
        position: absolute;
        left: 30px;
        top: 30px;
        bottom: 30px;
        border-left: 2px solid #ddd;
    }
    .s-timeline {
        .s-timeline-item {
            display: flex;
            align-items: center;
            flex-grow: 0;
            .s-timeline-item-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10;
                background: #030303;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                margin: 20px 20px 20px 0;
                font-weight: bold;
                flex: 0 0 60px;
            }
        }
    }
}
</style>