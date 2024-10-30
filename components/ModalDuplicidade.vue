<script setup>
import { ref, toRefs } from 'vue'
import { useProductStore } from '~/stores/list'
import { storeToRefs } from 'pinia';


const props = defineProps({
  duplicidade: {
    type: Object,
    default: () => ({})
  }
})


const emit = defineEmits(['alter-qtd', 'remove-modal'])
const store = useProductStore();
const { products } = storeToRefs(store);

// Inicializando o valor de newQtd
const { duplicidade } = toRefs(props)
const newQtd = ref(duplicidade.value.prodQtd || 1)

// Funções para manipulação de quantidade
const acrescentar = () => {
  newQtd.value += 1
}

const reduzir = () => {
  if (newQtd.value > 1) newQtd.value -= 1
}

const min = () => {
  if (newQtd.value < 1) newQtd.value = 1
}

// Função para salvar quantidade
const salvar = () => {
  emit('alter-qtd', {
    newQtd: newQtd.value,
    prodQtd: duplicidade.value.prodQtd,
    currentArray: duplicidade.value.currentArray
  })
}

// Função para remover produto
const remover = () => {
  const indexProd = duplicidade.value.currentArray
  const product = products.value[indexProd]
  console.log({ product, indexProd })
  emit('remove-modal', product)
}

</script>
<template lang="pug">
  div.modal.-show
    div.modal__content
      header.modal__header
        span.modal__title PRODUTO DUPLICADO!
      
      div.modal__body
        h3 Já tem {{ duplicidade.prodNome }} na sua lista.
        br
        label Deseja alterar a quantidade?
        fieldset.modal__qtd
          button.modal__qtd-btn(v-on:click="reduzir" :disabled="newQtd < 2 ? true : false") - 
          input.modal__qtd-ipt(type="number" min="1" v-on:blur="min" v-model="newQtd" required)
          button.modal__qtd-btn(v-on:click="acrescentar") + 
      
      footer.modal__footer
        button(v-on:click="salvar") {{ newQtd === duplicidade.prodQtd ? 'Fechar' : 'Salvar' }}
        button.modal__delete(v-on:click="remover") Excluir
</template>