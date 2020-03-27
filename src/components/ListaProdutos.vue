<template>
    <div class="container">
        <IncludeItem v-on:add-prod="addProduct"></IncludeItem>
        <hr>
        <ul class="list mx-12">
            <li v-if="produts.length <= 0">
                <h3>Sua lista está vazia.</h3>
            </li>
            <li class="list__prod list__title" v-else>
                <strong class="list__name-prod mx-4">
                    Produto:
                </strong>

                <strong class="list__qtd-prod col mx-1">
                    Qtd:
                </strong>

                <strong class="list__price-uni col mx-3">
                    Preço:
                </strong>

                <strong class="list__price-total col mx-3">
                    Total:
                </strong>

                <div class="list__remve-product col mx-1"></div>
            </li>
            <li class="list__prod" v-for="(product, index) in produts" v-bind:key="index">
                <input type="checkbox" class="list__checkbox" v-bind:id="index">
                <label class="list__name-prod list__label-prod mx-4 sm-5 ph-2" v-bind:for="index">
                    {{ product.nome }}
                </label>

                <div class="list__qtd-prod col mx-1 sm-1 ph-1">
                    {{ product.quantidade }}
                </div>

                <div class="list__price-uni col mx-3 sm-2 ph-1">
                    <input type="number" name="price-product" placeholder="Valor">
                </div>

                <div class="list__price-total col mx-3 sm-3 ph-1">
                    <input type="text" name="total-product" disabled>
                </div>

                <div class="list__remve-product col mx-1 sm-1 ph-1">
                    <button type="button" name="button" class="list__btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                        </svg>
                    </button>
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
        },
        expReg() {
            //value.value != '' ? value.value.replace(value.value, '^\d*[0-9](\,\d*[0-2])?$)' : ''
        }
    },
    watch: {
        //console.log(this.produts);
    }
}
</script>
