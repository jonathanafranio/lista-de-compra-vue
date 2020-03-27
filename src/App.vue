<template>
  <div id="app">
    <BgImagem></BgImagem>
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <ListaProdutos></ListaProdutos>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->

  </div>
</template>

<script>
import BgImagem from './components/BgImagem.vue'
import ListaProdutos from './components/ListaProdutos.vue'
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    BgImagem,
    ListaProdutos,
    //HelloWorld,
  }
}
</script>

<style>
</style>
