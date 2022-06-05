<template lang="pug">
div#app
  div.image-bg
    img(:src="imgMercado" alt="Lista de compras")
  ListaProdutos
  
</template>

<script>
import ListaProdutos from '@/components/ListaProdutos'

export default {
  name: 'IndexPage',
  components: {
    ListaProdutos,
  },
  data(){
    return {
      imgMercado: require('@/assets/mercado.jpg')
    }
  }
}
</script>
<style lang="sass">
//@import sass/main
</style>