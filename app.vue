<template lang="pug">
  div#app
    div.image-bg
      img(:src="imgMercado" alt="Lista de compras")
    ListaProdutos
</template>
  
<script setup lang="js">
  import ListaProdutos from '~/components/ListaProdutos.vue'
  import imgMercado from '~/assets/mercado.jpg'
</script>
  