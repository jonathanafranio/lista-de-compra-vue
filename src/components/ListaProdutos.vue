<template>
    <div class="container">
        <IncludeItem v-on:add-prod="addProduct"></IncludeItem>
        <hr>
        <ul class="list mx-12">
            <li v-if="produts.length <= 0">
                <h3>Sua lista está vazia.</h3>
            </li>
            <li v-else>
                <div class="list__name-prod col mx-6">
                    Produto:
                </div>

                <div class="list__qtd-prod col mx-1">
                    Qtd:
                </div>

                <div class="list__price-uni col mx-2">
                    Valor Un.
                </div>

                <div class="list__price-total col mx-3">
                    Valor Total:
                </div>

            </li>
            <li v-for="(product, index) in produts" v-bind:key="index">
                <div class="list__checkboxs col mx-1">
                    <input type="checkbox" name="pego">
                </div>

                <div class="list__name-prod col mx-5">
                    {{ product.nome }}
                </div>

                <div class="list__qtd-prod col mx-1">
                    {{ product.quantidade }}
                </div>

                <div class="list__price-uni col mx-2">
                    Preço unitario:
                </div>

                <div class="list__price-total col mx-3">
                    Preço Total:
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import IncludeItem from './IncludeItem'
export default {
    components: {
        IncludeItem
    },
    data(){
        return {
            produts: [],
        }
    },
    methods: {
        addProduct(product){
            this.produts.push(product);
        }
    }
}
</script>
