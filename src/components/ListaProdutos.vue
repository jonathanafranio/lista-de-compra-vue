<template>
    <div>
        <div class="container">
            <IncludeItem v-on:add-prod="hasProd"></IncludeItem>
            <hr>
            <ul class="list mx-12">
                <li v-if="products.length <= 0">
                    <h3>Sua lista está vazia.</h3>
                </li>
                <li class="list__prod list__title" v-else>
                    <strong class="list__name-prod mx-3">
                        Produto:
                    </strong>

                    <strong class="list__qtd-prod col mx-2">
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
                <li class="list__prod" v-for="(product, index) in produtosNaoPego" v-bind:key="`a-${index}`" v-bind:id="'produto-nao-'+index">
                    <span class="list__name-prod list__label-prod mx-3 sm-5 ph-2" v-on:click="changeStatusProd(product)">
                        {{ product.nome }}
                    </span>

                    <div class="list__qtd-prod col mx-2 sm-1 ph-1">
                        <input type="number" v-bind:id="'qtd-n-'+index" v-model="product.quantidade" v-on:keyup="incluirPreco(product)" v-on:blur="requireQtd(product)" min="1" required>
                    </div>

                    <div class="list__price-uni col mx-3 sm-2 ph-1">
                        <input type="number" pattern="[0-9]+([,\.][0-2]+)?" name="price-product" placeholder="Valor (R$):" step="0.01" v-bind:id="'price-n-'+index" v-on:keyup="incluirPreco(product)" v-model="product.preco">
                    </div>

                    <div class="list__price-total col mx-3 sm-3 ph-1">
                        {{ product.valortotal }}
                    </div>

                    <div class="list__remve-product col mx-1 sm-1 ph-1">
                        <button type="button" name="button" class="list__btn" v-on:click.prevent="removeProduct(product)" title="Remover">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                            </svg>
                        </button>
                    </div>
                </li>

                <li class="list__prod" v-for="(product, index) in produtosPego" v-bind:key="`b-${index}`" v-bind:id="'produto-pego-'+index">
                    <span class="list__name-prod list__label-prod checked mx-3 sm-5 ph-2" v-on:click="changeStatusProd(product)">
                        {{ product.nome }}
                    </span>

                    <div class="list__qtd-prod col mx-2 sm-1 ph-1">
                        <input type="number" v-bind:id="'qtd'+index" v-model="product.quantidade" v-on:keyup="incluirPreco(product)" v-on:blur="requireQtd(product)" min="1" required>
                    </div>

                    <div class="list__price-uni col mx-3 sm-2 ph-1">
                        <input type="number" pattern="[0-9]+([,\.][0-2]+)?" name="price-product" placeholder="Valor (R$):" step="0.01" v-bind:id="'price-'+index" v-on:keyup="incluirPreco(product)" v-model="product.preco">
                    </div>

                    <div class="list__price-total col mx-3 sm-3 ph-1">
                        {{ product.valortotal }}
                    </div>

                    <div class="list__remve-product col mx-1 sm-1 ph-1">
                        <button type="button" name="button" class="list__btn" v-on:click.prevent="removeProduct(product)" title="Remover">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                            </svg>
                        </button>
                    </div>
                </li>
                
            </ul>

            <footer class="footer">
                <p>Total da compra: <strong>{{ totalvalor }}</strong></p>
            </footer>
        </div>
        <ModalDuplicidade 
         v-if="duplicidade" 
         :duplicidade="duplicidade" 
         v-on:alter-qdt="fecharModalDuplicidade" 
         v-on:remove-modal="removeProduct" />
    </div>
</template>

<script>
import IncludeItem from './IncludeItem'
import ModalDuplicidade from './ModalDuplicidade'
export default {
    components: {
        IncludeItem,
        ModalDuplicidade
    },
    data(){
        return {
            products: [],
            duplicidade: ''
        }
    },
    created(){
        if(localStorage.getItem('productsList')!=null) {
            const localStorageProd = JSON.parse(localStorage.getItem('productsList'));

            let produtos = localStorageProd.map((p) => {
                p.pego == undefined ? p.pego = false : p.pego;
                return p;
            });
            this.products = produtos;
        }
    },
    methods: {
        hasProd(product){
            const nameNewProd = product.nome.toLowerCase();
            
            const hastThisProd = this.products.findIndex((prod)=> prod.nome.toLowerCase() === nameNewProd);

            if(hastThisProd < 0) {
                this.addProduct(product);
            } else {
                this.duplicidade = {
                    currentArray: hastThisProd,
                    prodNome: this.products[hastThisProd].nome,
                    prodQtd: +this.products[hastThisProd].quantidade,
                }
                navigator.vibrate(400)
            }
        },
        addProduct(product){
            this.products.push(product);
            localStorage.setItem('productsList', JSON.stringify(this.products));
        },
        removeProduct(product){
            const index = this.products.indexOf(product);
            this.products.splice(index, 1);
            this.duplicidade = ''

            this.products.length ? localStorage.setItem('productsList', JSON.stringify(this.products)) : localStorage.clear();
        },
        requireQtd(product){
            const index = this.products.indexOf(product);
            const qdtValue = this.products[index].quantidade;
            const regexValid = /\d/ig.test(qdtValue);
            ! regexValid ? this.products[index].quantidade = 1 : this.products[index].quantidade;

            qdtValue === '' ? this.products[index].quantidade = 1 : qdtValue;
            qdtValue < 1 ? this.products[index].quantidade = 1 : qdtValue;

            this.incluirPreco(product);
        },
        incluirPreco(product){
            const index = this.products.indexOf(product);
            let precoUnitario = this.products[index].preco;
            let precoTotal = (precoUnitario * this.products[index].quantidade).toFixed(2);
            
            this.products[index].valortotal = precoTotal;

            localStorage.setItem('productsList', JSON.stringify(this.products));
        },
        changeStatusProd(product){
            const index = this.products.indexOf(product);
            this.products[index].pego = !this.products[index].pego
            localStorage.setItem('productsList', JSON.stringify(this.products));
        },
        fecharModalDuplicidade(change){
            let newQtd = change.newQtd
            let currentArray = change.currentArray
            let qtdAtual = +this.products[currentArray].quantidade

            if(newQtd != qtdAtual) {
                this.products[currentArray].quantidade = newQtd

                this.requireQtd(currentArray)
            }

            this.duplicidade = ''
        }
    },
    computed: {
        totalvalor(){
            let totalproduto = this.products.map((product) => +product.valortotal);
            let total = this.products.length ? totalproduto.reduce((total,num) => total + num) : 0;

            return total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },
        produtosNaoPego(){
            return this.products.filter((p) => ! p.pego)
        },
        produtosPego(){
            return this.products.filter((p) => p.pego)
        }
    },
    watch: {
        //products(product){
        //    console.log('product', product);
        //},
    },
    mounted () {
        console.log('mounted')
    }
}
</script>
