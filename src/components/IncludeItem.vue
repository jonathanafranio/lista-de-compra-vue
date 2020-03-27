<template>
    <div>
        <header class="header">
            <h1>Lista de compras</h1>
        </header>
        <form class="form-include" v-on:submit.prevent="addProduct">
            <div class="mx-6 sm-4 ph-2 form-include__box">
                <label class="form-include__label" for="item-name">Item:</label>
                <input type="text" name="item-name" placeholder="Ex.: Sabonete" v-model="nome" required>
            </div>
            <div class="mx-3 sm-2 ph-2 form-include__box">
                <label class="form-include__label" for="item-quantidade">Quantidade:</label>
                <input type="number" name="item-quantidade" min="1" v-model="quantidade" required>
            </div>
            <div class="mx-3 sm-6 ph-2 form-include__box">
                <button type="submit">Adicionar</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            nome: '',
            quantidade: 1
        }
    },
    methods: {
        addProduct(){
            if(this.nome.trim()==='') {
                return;
            }

            this.$emit('add-prod', {
                nome: this.nome,
                quantidade: this.quantidade
            });

            this.nome = '';
            this.quantidade = 1;
        }
    }
}
</script>
