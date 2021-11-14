<template>
  <div id="app">
    <BgImagem></BgImagem>
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <ListaProdutos></ListaProdutos>
  </div>
</template>

<script>
import BgImagem from './components/BgImagem.vue'
import ListaProdutos from './components/ListaProdutos.vue'

export default {
  name: 'App',
  components: {
    BgImagem,
    ListaProdutos,
  }
}
</script>

<style>
</style>
