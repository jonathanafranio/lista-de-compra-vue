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

<script>
export default {
  props: {
    duplicidade: {
      type: Object,
      default: () => {}
    },
  },
  data(){
    return {
        newQtd: this.duplicidade.prodQtd ? this.duplicidade.prodQtd : 1
    }
  },
  methods: {
    acrescentar(){
        this.newQtd = this.newQtd + 1
    },
    reduzir(){
        this.newQtd > 1 ? this.newQtd = this.newQtd - 1 : this.newQtd
    },
    salvar(){
      this.$emit('alter-qdt', {
        newQtd: this.newQtd,
        prodQtd: this.duplicidade.prodQtd,
        currentArray: this.duplicidade.currentArray
      })
    },
    remover(){
      const indexProd = this.duplicidade.currentArray
      const product = this.$store.state.list.products[indexProd]
      this.$emit('remove-modal', product)
    },
    min(){
      this.newQtd < 1 ? this.newQtd = 1 : this.newQtd
    }
  }
}
</script>