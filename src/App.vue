<template>
  <div id="app">
    <div class="image-bg">
        <img src="./assets/mercado.jpg" alt="Lista de compras">
    </div>
    <ListaProdutos />
  </div>
</template>

<script>
import ListaProdutos from './components/ListaProdutos.vue'

export default {
  name: 'App',
  components: {
    ListaProdutos,
  }
}
</script>

<style>
</style>
