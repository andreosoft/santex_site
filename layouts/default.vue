<template>
  <!-- <v-app style="background: no-repeat  url('/Товар_Характеристики.png'); opacity: 1;"> -->
  <v-app>
    <common-header :catalogMenuItems="$store.state.categories" />
    <v-main>
      <nuxt />
    </v-main>
    <common-footer />
  </v-app>
</template>

<script>
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(97871715, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
<noscript>
  <div>
      <img src="https://mc.yandex.ru/watch/97871715" style="position:absolute; left:-9999px;" alt="" />
  </div>
  </noscript>
</script>