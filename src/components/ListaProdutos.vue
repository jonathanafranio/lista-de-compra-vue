<template>
    <div class="container">
        <IncludeItem v-on:add-prod="addProduct"></IncludeItem>
        <hr>
        <ul class="list mx-12">
            <li v-if="produts.length <= 0">
                <h3>Sua lista está vazia.</h3>
            </li>
            <li v-for="(product, index) in produts" v-bind:key="index">Produto: {{ product.nome }}</li>
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
