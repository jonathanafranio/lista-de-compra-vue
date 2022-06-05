<template lang="pug">
  div
    .container
      IncludeItem(v-on:add-prod="hasProd")
      hr
      div.sort(v-if="products.length > 1")
        div.sort__select
          svg.sort__icon(viewBox="0 0 15 15")
            path(d="M7.36 2.988a.645.645 0 01-.02.912c-.271.26-.7.26-.972 0L4.82 2.415v10.68a.687.687 0 11-1.375 0V2.415L1.895 3.9c-.271.26-.7.26-.971 0a.645.645 0 01-.02-.912l.02-.02L3.646.36c.272-.26.7-.26.972 0L7.34 2.969zm6.875 8.413a.645.645 0 01-.02.02l-2.722 2.608c-.272.26-.7.26-.972 0L7.799 11.42a.645.645 0 010-.931c.271-.26.7-.26.972 0l1.549 1.483V1.293a.687.687 0 111.375 0v10.68l1.548-1.484c.272-.26.7-.26.972 0a.645.645 0 01.02.912z" fill="currentColor")
          
          select(v-model="order")
            option(value="default") Ordenação padrão
            option(value="nameAsc") Ordenação por Nome Crescente (A - Z)
            option(value="nameDesc") Ordenação por Nome Decrescente (Z - A)
            option(value="priceAsc") Ordenação por Preços Menores
            option(value="priceDesc") Ordenação por Preço Maiores
            option(value="qtdAsc") Ordenação por Quantidade Menor
            option(value="qtdDesc") Ordenação por Quantidade Maior

        hr
      ul.list.mx-12
        li(v-if="products.length <= 0")
          h3 Sua lista está vazia.

        li.list__prod.list__title(v-else)
          strong.list__name-prod.mx-3 Produto:
          strong.list__qtd-prod.col.mx-2 Qtd:
          strong.list__price-uni.col.mx-3 Preço Unitário:
          strong.list__price-total.col.mx-3 Total:
          div.list__remve-product.col.mx-1

        li.list__prod(
          v-for="(product, index) in produtosNaoPego" 
          v-bind:key="`a-${index}`" 
          v-bind:id="'produto-nao-'+index"
        )
          span.list__name-prod.list__label-prod.mx-3.sm-5.ph-2(v-on:click="changeStatusProd(product)") {{ product.nome }}

          div.list__qtd-prod.col.mx-2.sm-1.ph-1
            input(
              type="number" 
              v-bind:id="'qtd-n-'+index" 
              v-model="product.quantidade" 
              v-on:keyup="incluirPreco(product)" 
              v-on:blur="requireQtd(product)" 
              min="1" 
              required
            )
          div.list__price-uni.col.mx-3.sm-2.ph-1
            input(
              type="number" 
              pattern="[0-9]+([,\.][0-2]+)?" 
              name="price-product" 
              placeholder="Valor (R$):" 
              step="0.01" 
              v-bind:id="'price-n-'+index" 
              v-on:keyup="incluirPreco(product)" 
              v-model="product.preco"
            )
              

          div.list__price-total.col.mx-3.sm-3.ph-1 {{ product.valortotal }}

          div.list__remve-product.col.mx-1.sm-1.ph-1
            button.list__btn(
              button type="button" 
              name="button" 
              v-on:click.prevent="removeProduct(product)" 
              title="Remover"
            )
              svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512")
                path(
                  fill="currentColor" 
                  d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z")

        li.list__prod(
          v-for="(product, index) in produtosPego" 
          v-bind:key="`b-${index}`" 
          v-bind:id="'produto-pego-'+index"
        )
          span.list__name-prod.list__label-prod.checked.mx-3.sm-5.ph-2(v-on:click="changeStatusProd(product)") {{ product.nome }}

          div.list__qtd-prod.col.mx-2.sm-1.ph-1
            input(
              type="number" 
              v-bind:id="'qtd'+index" 
              v-model="product.quantidade" 
              v-on:keyup="incluirPreco(product)" 
              v-on:blur="requireQtd(product)" 
              min="1" 
              required
            )
          div.list__price-uni.col.mx-3.sm-2.ph-1
            input(
              type="number" 
              pattern="[0-9]+([,\.][0-2]+)?" 
              name="price-product" 
              placeholder="Valor (R$):" 
              step="0.01" 
              v-bind:id="'price-'+index" 
              v-on:keyup="incluirPreco(product)" 
              v-model="product.preco"
            )
              

          div.list__price-total.col.mx-3.sm-3.ph-1 {{ product.valortotal }}

          div.list__remve-product.col.mx-1.sm-1.ph-1
            button.list__btn(
              button type="button" 
              name="button" 
              v-on:click.prevent="removeProduct(product)" 
              title="Remover"
            )
              svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512")
                path(
                  fill="currentColor" 
                  d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z")
        
      footer.footer
        p Total da compra: 
          strong {{ totalvalor }}

    ModalDuplicidade(
      v-if="duplicidade" 
      :duplicidade="duplicidade" 
      v-on:alter-qdt="fecharModalDuplicidade" 
      v-on:remove-modal="removeProduct"
    )

</template>

<script>
//import LOCAL_STORAGE from '@/utils/window.localStorage.js'

import IncludeItem from "@/components/IncludeItem";
import ModalDuplicidade from "@/components/ModalDuplicidade";
export default {
  components: {
    IncludeItem,
    ModalDuplicidade
  },
  data() {
    return {
      products: [],
      duplicidade: "",
      order: "default",
    };
  },
  created() {
    //if (localStorage.getItem("productsList") != null) {
    //  const localStorageProd = JSON.parse(localStorage.getItem("productsList"));
    //  let produtos = localStorageProd.map((p, i) => {
    //    p.id == undefined ? (p.id = i + 1) : p.id;
    //    p.pego == undefined ? (p.pego = false) : p.pego;
    //    return p;
    //  });
    //  this.products = produtos;
    //  this.orderDefault();
    //}
  },
  methods: {
    hasProd(product) {
      const nameNewProd = product.nome.toLowerCase();
      const hastThisProd = this.products.findIndex(
        (prod) => prod.nome.toLowerCase() === nameNewProd
      );

      if (hastThisProd < 0) {
        const newId = this.products.length + 1;
        product.id = newId;
        this.addProduct(product);
      } else {
        this.duplicidade = {
          currentArray: hastThisProd,
          prodNome: this.products[hastThisProd].nome,
          prodQtd: +this.products[hastThisProd].quantidade,
        };
        navigator.vibrate(400);
      }
    },
    addProduct(product) {
      this.products.push(product);
    },
    removeProduct(product) {
      const index = this.products.indexOf(product);
      this.products.splice(index, 1);
      this.duplicidade = "";
    },
    requireQtd(product) {
      const index = this.products.indexOf(product);
      console.log({ index, product })
      const qdtValue = this.products[index].quantidade;
      const regexValid = /\d/gi.test(qdtValue);
      !regexValid ? this.products[index].quantidade = 1 : this.products[index].quantidade;

      qdtValue === "" ? this.products[index].quantidade = 1 : qdtValue;
      qdtValue < 1 ? this.products[index].quantidade = 1 : qdtValue;

      this.incluirPreco(product);
    },
    incluirPreco(product) {
      const index = this.products.indexOf(product);
      let precoUnitario = this.products[index].preco;
      let precoTotal = (
        precoUnitario * this.products[index].quantidade
      ).toFixed(2);

      this.products[index].valortotal = precoTotal;
    },
    changeStatusProd(product) {
      const index = this.products.indexOf(product);
      this.products[index].pego = !this.products[index].pego;
    },
    fecharModalDuplicidade(change) {
      let newQtd = change.newQtd;
      let currentArray = change.currentArray;
      let qtdAtual = +this.products[currentArray].quantidade;

      if (newQtd != qtdAtual) {
        this.products[currentArray].quantidade = newQtd;
        this.requireQtd(this.products[currentArray]);
      }
      this.duplicidade = "";
    },
    orderDefault() {
      const prodIdOrder = this.products.sort((a, b) => a.id - b.id);
      return prodIdOrder;
    },
    orderByNameAsc() {
      const prodNameAsc = this.products.sort((a, b) => {
        const nameA = a.nome.toLowerCase();
        const nameB = b.nome.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      return prodNameAsc;
    },
    orderByNameDesc() {
      return this.orderByNameAsc().reverse();
    },
    orderBypriceAsc() {
      const prodPriceAsc = this.products.sort((a, b) => a.preco - b.preco);
      return prodPriceAsc;
    },
    orderBypriceDesc() {
      return this.orderBypriceAsc().reverse();
    },
    orderByQtdAsc() {
      const prodQtdAsc = this.products.sort(
        (a, b) => a.quantidade - b.quantidade
      );
      return prodQtdAsc;
    },
    orderByQtdDesc() {
      return this.orderByQtdAsc().reverse();
    },
  },
  computed: {
    totalvalor() {
      let totalproduto = this.products.map((product) => +product.valortotal);
      let total = this.products.length
        ? totalproduto.reduce((total, num) => total + num)
        : 0;

      return total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
    produtosNaoPego() {
      return this.products.filter((p) => !p.pego);
    },
    produtosPego() {
      return this.products.filter((p) => p.pego);
    },
  },
  watch: {
    order() {
      switch (this.order) {
        case "nameAsc":
          this.products = this.orderByNameAsc();
          break;
        case "nameDesc":
          this.products = this.orderByNameDesc();
          break;
        case "priceAsc":
          this.products = this.orderBypriceAsc();
          break;
        case "priceDesc":
          this.products = this.orderBypriceDesc();
          break;
        case "qtdAsc":
          this.products = this.orderByQtdAsc();
          break;
        case "qtdDesc":
          this.products = this.orderByQtdDesc();
          break;
        default:
          this.products = this.orderDefault();
      }
    },
    products: {
      handler: function () {
        this.products.length
          ? window.localStorage.setItem("productsList", JSON.stringify(this.products))
          : window.localStorage.clear();
      },
      deep: true,
    },
  },
};
</script>