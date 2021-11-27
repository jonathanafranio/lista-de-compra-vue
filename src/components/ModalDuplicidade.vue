<template>
    <div class="modal -show">
        <div class="modal__content">
            <header class="modal__header">
                <span class="modal__title">PRODUTO DUPLICADO!</span>
                <!--<button class="modal__close" aria-label="delete"></button>-->
            </header>
            <div class="modal__body">
                <h3>Já tem {{ duplicidade.prodNome }} na sua lista.</h3>
                <br>
                <label>Deseja alterar a quantidade?</label>
                <fieldset class="modal__qtd"> 
                    <button class="modal__qtd-btn" v-on:click="reduzir" :disabled="newQtd < 2 ? true : false">-</button>
                    <input class="modal__qtd-ipt" type="number" min="1" v-on:blur="min" v-model="newQtd" required>
                    <button class="modal__qtd-btn" v-on:click="acrescentar">+</button>
                </fieldset>
            </div>
            <footer class="modal__footer">
                <button v-on:click="salvar">
                    {{ newQtd === duplicidade.prodQtd ? 'Fechar' : 'Salvar' }}
                </button>
                <button v-on:click="remover" class="modal__delete">
                    Excluir
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ModalDuplicidade',
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
            this.$emit('remove-modal', this.duplicidade.currentArray)
        },
        min(){
            this.newQtd < 1 ? this.newQtd = 1 : this.newQtd
        }
    }
})
</script>