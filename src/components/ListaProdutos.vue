<template>
    <div class="container">
        <IncludeItem v-on:add-prod="addProduct"></IncludeItem>
        <hr>
        <ul class="list mx-12">
            <li v-if="products.length <= 0">
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
                    Preço Unitário:
                </strong>

                <strong class="list__price-total col mx-3">
                    Total:
                </strong>

                <div class="list__remve-product col mx-1"></div>
            </li>
            <li class="list__prod" v-for="(product, index) in allProducts" v-bind:key="index" v-bind:id="'product-'+index">
                <input type="checkbox" class="list__checkbox" v-bind:id="index">
                <label class="list__name-prod list__label-prod mx-4 sm-5 ph-2" v-bind:for="index">
                    {{ product.nome }}
                </label>

                <div class="list__qtd-prod col mx-1 sm-1 ph-1">
                    {{ product.quantidade }}
                </div>

                <div class="list__price-uni col mx-3 sm-2 ph-1">
                    <input type="number" pattern="[0-9]+([,\.][0-2]+)?" name="price-product" placeholder="Valor (R$):" step="0.01" v-bind:id="'price-'+index" v-on:keyup="incluirPreco(index)" v-model="product.preco">
                </div>

                <div class="list__price-total col mx-3 sm-3 ph-1">
                    {{ product.valortotal }}
                </div>

                <div class="list__remve-product col mx-1 sm-1 ph-1">
                    <button type="button" name="button" class="list__btn" v-on:click.prevent="removeProduct(index)" title="Remover">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                        </svg>
                    </button>
                </div>
            </li>
        </ul>

        <footer class="footer">
            <p>Total da compra: <strong>R${{ totalvalor }}</strong></p>
        </footer>
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
            products: [],
            totalprecos: [],
            totalvalor: 0
        }
    },
    created(){
        if(localStorage.getItem('productsList')!=null) {
            this.products = JSON.parse(localStorage.getItem('productsList'));

            let precototais = this.products.map((prod) => +prod.valortotal);
            this.totalprecos = precototais;
        }

        if(localStorage.getItem('totalvalor')!=null) {
            this.totalvalor = localStorage.getItem('totalvalor');
        }
    },
    methods: {
        addProduct(product){
            this.products.push(product);
            localStorage.setItem('productsList', JSON.stringify(this.products));
        },
        removeProduct(index){
            this.products.splice(index, 1);
            this.totalprecos.splice(index, 1);

            if(this.products.length) {
                //alert('ainda tem produto(s)');
                localStorage.setItem('productsList', JSON.stringify(this.products));
                this.totalvalor = this.totalprecos.reduce((total,num) => total + num).toFixed(2);

                localStorage.setItem('totalvalor', this.totalvalor);
            } else {
                this.totalvalor = 0;
                //alert('NAO TEM PRODUTOS!!!');
                localStorage.clear();
            }
        },
        incluirPreco(index){
            let precoUnitario = document.querySelector('#price-'+index).value.replace(',','.');
            let precoTotal = (precoUnitario * this.products[index].quantidade).toFixed(2);
            //console.log('preço:', precoUnitario);
            //console.log('preco total:', precoTotal);

            this.products[index].preco = precoUnitario;
            this.products[index].valortotal = precoTotal;

            let totalproduto = this.products.map((product) => +product.valortotal);

            this.totalprecos = totalproduto;

            let total = totalproduto.reduce((total,num) => total + num);

            this.totalvalor = total.toFixed(2);

            localStorage.setItem('productsList', JSON.stringify(this.products));
            localStorage.setItem('totalvalor', this.totalvalor);
        }
    },
    computed: {
        allProducts(){
            return this.products;
        }
    },
    watch: {
        products(product){
            console.log('product', product);
        }
    }
}
</script>
