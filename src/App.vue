<template>
  <div id="app">
    <div class="image-bg">
      <img src="~assets/mercado.jpg" alt="Lista de compras">
    </div>
    <ListaProdutos />
  </div>
</template>
<script>
import ListaProdutos from 'components/ListaProdutos.vue'

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    ListaProdutos
  }
})
</script>
