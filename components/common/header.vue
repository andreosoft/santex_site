<template>
  <div>
    <common-top />
    <v-container>
      <div class="py-4 mb-6">
        <div class="d-flex justify-space-between">
          <div>
            <a class="s-header-phones pr-3" href="tel://88007759985">8 800 775 99 85</a>
            <a class="s-header-phones pr-3" href="tel://84952256285">8 495 225 62 85</a>
            <span><img src="/icons/whats_small.svg" alt="" /></span>
          </div>
          <div class="s-header-actions-block">
            <nuxt-link to="/"><img src="/icons/profile.svg" alt="" /></nuxt-link>
            <nuxt-link class="ml-6" to="/favorite"><img src="/icons/like.svg" alt="" /></nuxt-link>
            <nuxt-link class="ml-6" to="/compare"><img src="/icons/compare.svg" alt="" /></nuxt-link>
            <div style="width: 70px;" class="ml-6 d-inline-block">
              <nuxt-link to="/cart"><img src="/icons/basket.svg" alt="" /></nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="s-header-main-logo">
        <nuxt-link to="/"><img src="/icons/logo.svg" /></nuxt-link>
      </div>
      <div>
        <div class="d-flex justify-space-between">
          <div>
            <div class="s-header-menu-btn" @click="showCatalogMenu = !showCatalogMenu">
              <i v-if="showCatalogMenu" class="fa fa-times pr-2"></i>
              <i v-else class="fa fa-bars pr-2"></i> Каталог
              товаров
            </div>
          </div>
          <div class="s-header-menu-links pt-2">
            <nuxt-link to="/brends">Бренды</nuxt-link>
            <nuxt-link to="/blog">Блог</nuxt-link>
            <nuxt-link to="/designers">Наши дизайнеры</nuxt-link>
            <nuxt-link to="/consulting">Запись на консультацию</nuxt-link>
            <nuxt-link to="/"><img src="/icon-discont.png" class="pr-1" />Распродажа</nuxt-link>
          </div>
          <div class="s-header-menu-search">
            <v-text-field single-line outlined dense label="Я хочу найти">
              <template v-slot:append>
                <img @click="$router.push({path: '/catalog/search/1'})" src="/icons/Search.svg" />
              </template>
            </v-text-field>
          </div>
        </div>
      </div>
    </v-container>
    <common-catalog-menu v-model="showCatalogMenu" :items="catalogMenuItems" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCatalogMenu: false,
      catalogMenuItems: [
        {
          title: "Мебель для ванной комнаты",
          icon: "/icons/catalog/1.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/catalog/1"
            },
            {
              title: "Мыльницы",
              url: "/catalog/1"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/catalog/1"
            },
            {
              title: "Дозаторы мыла",
              url: "/catalog/1"
            },
            {
              title: "Ершики для унитазов",
              url: "/catalog/1"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "Agape",
              url: "/"
            },
            {
              title: "Bette",
              url: "/"
            },
            {
              title: "Cisal",
              url: "/"
            },
            {
              title: "ARTCREAM",
              url: "/"
            },
            {
              title: "Burgbad",
              url: "/"
            },
            {
              title: "Devon",
              url: "/"
            },
          ]
        },
        {
          title: "Сантехника",
          icon: "/icons/catalog/2.svg",
          content: [
            {
              title: "Другие",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        },
        {
          title: "Аксессуары для ванной комнаты",
          icon: "/icons/catalog/2.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        },
        {
          title: "Полотенцесушители",
          icon: "/icons/catalog/4.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        },
        {
          title: "Кухонная сантехника",
          icon: "/icons/catalog/5.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        },
        {
          title: "Плитка и керамогранит",
          icon: "/icons/catalog/6.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        },
        {
          title: "Мозаика",
          icon: "/icons/catalog/7.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        },
        {
          title: "Отопление",
          icon: "/icons/catalog/8.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        },
        {
          title: "Системы фильтрации",
          icon: "/icons/catalog/9.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        },
        {
          title: "Инженерная сантехника",
          icon: "/icons/catalog/10.svg",
          content: [
            {
              title: "Держатели полотенец",
              url: "/"
            },
            {
              title: "Мыльницы",
              url: "/"
            },
            {
              title: "Держатели туалетной бумаги",
              url: "/"
            },
            {
              title: "Дозаторы мыла",
              url: "/"
            },
            {
              title: "Ершики для унитазов",
              url: "/"
            },
            {
              title: "Напольные стойки",
              url: "/"
            },
            {
              title: "Наборы аксессуаров",
              url: "/"
            },
            {
              title: "Карнизы для ванной",
              url: "/"
            },
            {
              title: "Аксессуары для кухни",
              url: "/"
            },
            {
              title: "Аксессуары для общественных зон",
              url: "/"
            },
            {
              title: "Комплектующие",
              url: "/"
            },
          ],
          ads: {
            img: "/img/ads1.png",
            title: "Название для рекламного блока в этом разделе",
            url: "/"
          },
          brands: [
            {
              title: "",
              url: "/"
            }
          ]
        }
      ]
    }
  }
}
</script>

 

 
 
 
 

<style lang="scss">
.s-header-main-logo {
  height: 0;
  top: -66px;
  position: relative;
  text-align: center;

  a {
    // position: absolute;
  }
}

.s-header-phones {
  font-size: 16px;
  font-weight: bold;
}

.s-header-menu-links {
  margin-left: 80px;

  a {
    padding: 0 20px;
    font-size: 16px;
    font-weight: bold;
  }
}

.s-header-actions-block a {
  padding-left: 20px;
}

.s-header-menu-btn {
  vertical-align: middle;
  cursor: pointer;
  color: #fff !important;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: bold;
  background: #272727;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  i {
    width: 18px;
  }
}

.s-header-menu-search {
  min-width: 260px;
}
</style>