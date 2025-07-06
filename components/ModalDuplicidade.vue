<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { useProductStore } from '~/stores/list'
import { storeToRefs } from 'pinia';
import type { Product, DuplicidadeData, AlterQtdPayload } from '@/types/product'


const props = defineProps<{
  duplicidade: DuplicidadeData
}>()


//const emit = defineEmits(['alter-qtd', 'remove-modal'])
const emit = defineEmits<{
  (e: 'alter-qtd', payload: AlterQtdPayload): void
  (e: 'remove-modal', product: Product): void
}>()
const store = useProductStore();
const { products } = storeToRefs(store);

// Inicializando o valor de newQtd
const { duplicidade } = toRefs(props)
const newQtd = ref<number>(duplicidade.value.prodQtd || 1)

// Funções para manipulação de quantidade
const acrescentar = (): void => {
  newQtd.value += 1
}

const reduzir = (): void => {
  if (newQtd.value > 1) newQtd.value -= 1
}

const min = () : void => {
  if (newQtd.value < 1) newQtd.value = 1
}

// Função para salvar quantidade
const salvar = () : void => {
  emit('alter-qtd', {
    newQtd: newQtd.value,
    prodQtd: duplicidade.value.prodQtd,
    currentArray: duplicidade.value.currentArray
  })
}

// Função para remover produto
const remover = () : void => {
  const indexProd = duplicidade.value.currentArray
  const product = products.value[indexProd]
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