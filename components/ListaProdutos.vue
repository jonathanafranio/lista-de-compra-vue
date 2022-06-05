<template lang="pug">
div
  .container
    IncludeItem(v-on:show-duplicity="hasDuplicity")
    //IncludeItem(v-on:add-prod="hasProd")
    hr
    .sort(v-if="$store.state.list.products.length > 1")
      .sort__select
        svg.sort__icon(viewBox="0 0 15 15")
          path(
            d="M7.36 2.988a.645.645 0 01-.02.912c-.271.26-.7.26-.972 0L4.82 2.415v10.68a.687.687 0 11-1.375 0V2.415L1.895 3.9c-.271.26-.7.26-.971 0a.645.645 0 01-.02-.912l.02-.02L3.646.36c.272-.26.7-.26.972 0L7.34 2.969zm6.875 8.413a.645.645 0 01-.02.02l-2.722 2.608c-.272.26-.7.26-.972 0L7.799 11.42a.645.645 0 010-.931c.271-.26.7-.26.972 0l1.549 1.483V1.293a.687.687 0 111.375 0v10.68l1.548-1.484c.272-.26.7-.26.972 0a.645.645 0 01.02.912z",
            fill="currentColor"
          )

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
      li(v-if="$store.state.list.products.length <= 0")
        h3 Sua lista está vazia.

      li.list__prod.list__title(v-else)
        strong.list__name-prod.mx-3 Produto:
        strong.list__qtd-prod.col.mx-2 Qtd:
        strong.list__price-uni.col.mx-3 Preço Unitário:
        strong.list__price-total.col.mx-3 Total:
        .list__remve-product.col.mx-1

      li.list__prod(
        v-for="(product, index) in produtosNaoPego",
        v-bind:key="`a-${index}`",
        v-bind:id="'produto-nao-' + index"
      )
        span.list__name-prod.list__label-prod.mx-3.sm-5.ph-2(
          v-on:click="changeStatusProd(product)"
        ) {{ product.nome }}

        .list__qtd-prod.col.mx-2.sm-1.ph-1
          input(
            type="number",
            name="quantidade",
            v-bind:id="'qtd-n-' + index",
            :data-id-product="product.id",
            :value="product.quantidade",
            @input="updateProductQtd",
            min="1",
            required
          )
        .list__price-uni.col.mx-3.sm-2.ph-1
          input(
            type="number",
            pattern="[0-9]+([,\.][0-2]+)?",
            name="price-product",
            :data-id-product="product.id",
            placeholder="Valor (R$):",
            step="0.01",
            v-bind:id="'price-n-' + index",
            :value="product.preco",
            @input="updateProductPrice"
          ) 

        .list__price-total.col.mx-3.sm-3.ph-1 {{ totalReal(product.valortotal) }}

        .list__remve-product.col.mx-1.sm-1.ph-1
          button.list__btn(
            button,
            type="button",
            name="button",
            v-on:click.prevent="removeProduct(product)",
            title="Remover"
          )
            svg(xmlns="http://www.w3.org/2000/svg", viewBox="0 0 448 512")
              path(
                fill="currentColor",
                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
              )

      li.list__prod(
        v-for="(product, index) in produtosPego",
        v-bind:key="`b-${index}`",
        v-bind:id="'produto-pego-' + index"
      )
        span.list__name-prod.list__label-prod.checked.mx-3.sm-5.ph-2(
          v-on:click="changeStatusProd(product)"
        ) {{ product.nome }}

        .list__qtd-prod.col.mx-2.sm-1.ph-1
          input(
            type="number",
            name="quantidade",
            v-bind:id="'qtd-n-' + index",
            :data-id-product="product.id",
            :value="product.quantidade",
            @input="updateProductQtd",
            min="1",
            required
          )
        .list__price-uni.col.mx-3.sm-2.ph-1
          input(
            type="number",
            pattern="[0-9]+([,\.][0-2]+)?",
            name="price-product",
            :data-id-product="product.id",
            placeholder="Valor (R$):",
            step="0.01",
            v-bind:id="'price-n-' + index",
            :value="product.preco",
            @input="updateProductPrice"
          )

        .list__price-total.col.mx-3.sm-3.ph-1 {{ totalReal(product.valortotal) }}

        .list__remve-product.col.mx-1.sm-1.ph-1
          button.list__btn(
            button,
            type="button",
            name="button",
            v-on:click.prevent="removeProduct(product)",
            title="Remover"
          )
            svg(xmlns="http://www.w3.org/2000/svg", viewBox="0 0 448 512")
              path(
                fill="currentColor",
                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
              )

    footer.footer
      p Total da compra:
        strong {{ totalvalor }}

  ModalDuplicidade(
    v-if="duplicidade",
    :duplicidade="duplicidade",
    v-on:alter-qdt="fecharModalDuplicidade",
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
    ModalDuplicidade,
  },
  data() {
    return {
      duplicidade: "",
      order: "default",
    };
  },
  created() {
    if (process.client) {
      this.$store.dispatch("list/creatIndexedDB", {});
    }
  },
  methods: {
    hasDuplicity(duplicity) {
      this.duplicidade = duplicity;
      navigator.vibrate(400);
    },
    removeProduct(product) {
      const { id } = product
      this.$store.commit("list/removeProd", { id })
      this.duplicidade = "";
    },
    updateProductQtd(e) {
      const { value, dataset } = e.target;
      const idProd = +dataset.idProduct;

      this.$store.dispatch('list/action_editQtdProd',{ 
        obj_prod: {
          id: idProd,
          quantidade: value,
        }
      })
    },
    updateProductPrice(e) {
      const { value, dataset } = e.target;
      const idProd = +dataset.idProduct;
      this.$store.dispatch('list/action_editPriceProd', {
        obj_prod: {
          id: idProd,
          preco: value
        }
      })
    },
    changeStatusProd(product) {
      const { id, pego } = product;
      const changePego = !pego;
      this.$store.commit("list/edit_productStage", {
        obj_prod: {
          id,
          pego: changePego,
        },
      });
    },
    fecharModalDuplicidade(change) {
      let newQtd = change.newQtd;
      let currentArray = change.currentArray;
      let qtdAtual = +this.$store.state.list.products[currentArray].quantidade;

      if(newQtd != qtdAtual) {
        this.$store.commit("list/edit_productQtd", {
          obj_prod: {
            id: this.$store.state.list.products[currentArray].id,
            quantidade: newQtd,
          }
        })
      }
      this.duplicidade = "";
    },
    orderByNameAsc(arrProd) {
      const prodNameAsc = arrProd.sort((a, b) => {
        const nameA = a.nome.toLowerCase();
        const nameB = b.nome.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      return prodNameAsc;
    },
    orderByNameDesc(arrProd) {
      return this.orderByNameAsc(arrProd).reverse();
    },
    orderBypriceAsc(arrProd) {
      const prodPriceAsc = arrProd.sort((a, b) => a.preco - b.preco);
      return prodPriceAsc;
    },
    orderBypriceDesc(arrProd) {
      return this.orderBypriceAsc(arrProd).reverse();
    },
    orderByQtdAsc(arrProd) {
      const prodQtdAsc = arrProd.sort((a, b) => a.quantidade - b.quantidade);
      return prodQtdAsc;
    },
    orderByQtdDesc(arrProd) {
      return this.orderByQtdAsc(arrProd).reverse();
    },
    returnOrder(arrProd) {
      switch (this.order) {
        case "nameAsc":
          return this.orderByNameAsc(arrProd);
        case "nameDesc":
          return this.orderByNameDesc(arrProd);
        case "priceAsc":
          return this.orderBypriceAsc(arrProd);
        case "priceDesc":
          return this.orderBypriceDesc(arrProd);
        case "qtdAsc":
          return this.orderByQtdAsc(arrProd);
        case "qtdDesc":
          return this.orderByQtdDesc(arrProd);
        default:
          return arrProd;
      }
    },
    totalReal(value) {
      const coin = +value;
      return coin.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    }
  },
  computed: {
    totalvalor() {
      let totalproduto = this.$store.state.list.products.map((product) => +product.valortotal)
      let total = totalproduto.length ? totalproduto.reduce((total, num) => total + num) : 0

      return total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
    produtosNaoPego() {
      const prodsNaoPegos = this.$store.state.list.products.filter((p) => !p.pego);
      return this.returnOrder(prodsNaoPegos);
    },
    produtosPego() {
      const prodsPegos = this.$store.state.list.products.filter((p) => p.pego);
      return this.returnOrder(prodsPegos);
    },
  },
  watch: {
  },
};
</script>