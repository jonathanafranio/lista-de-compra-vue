<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '@/stores/list';
import { storeToRefs } from 'pinia';
import IncludeItem from './IncludeItem.vue';
import ModalDuplicidade from './ModalDuplicidade.vue';
import type { Product, changeQtdPayload } from '@/types/product';

const duplicidade = ref<string>("");
const order = ref<'default' | 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc' | 'qtdAsc' | 'qtdDesc'>("default");

const stores = useProductStore();
const { products } = storeToRefs(stores);

const totalvalor = computed<string>(() => {
  let totalproduto = products.value.map((product) => +product.valortotal)
  let total = totalproduto.length > 0 ? totalproduto.reduce((total, num) => total + num) : 0

  return total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
})

const orderByNameAsc = (arrProd: Product[]): Product[] => {
  const prodNameAsc = arrProd.sort((a, b) => {
    const nameA = a.nome.toLowerCase();
    const nameB = b.nome.toLowerCase();
    return nameA.localeCompare(nameB);
  });
  return prodNameAsc;
}

const orderByNameDesc = (arrProd: Product[]): Product[] => {
  return orderByNameAsc(arrProd).reverse();
}

const orderBypriceAsc = (arrProd: Product[]): Product[] => {
  const prodPriceAsc = arrProd.sort((a, b) => a.preco - b.preco);
  return prodPriceAsc;
}

const orderBypriceDesc = (arrProd: Product[]): Product[] => {
  return orderBypriceAsc(arrProd).reverse();
}

const orderByQtdAsc = (arrProd: Product[]): Product[] => {
  const prodQtdAsc = arrProd.sort((a, b) => a.quantidade - b.quantidade);
  return prodQtdAsc;
}

const orderByQtdDesc = (arrProd: Product[]): Product[] => {
  return orderByQtdAsc(arrProd).reverse();
}

const returnOrder = (arrProd: Product[]): Product[] => {
  switch (order.value) {
    case "nameAsc":
      return orderByNameAsc(arrProd);
    case "nameDesc":
      return orderByNameDesc(arrProd);
    case "priceAsc":
      return orderBypriceAsc(arrProd);
    case "priceDesc":
      return orderBypriceDesc(arrProd);
    case "qtdAsc":
      return orderByQtdAsc(arrProd);
    case "qtdDesc":
      return orderByQtdDesc(arrProd);
    default:
      return arrProd;
  }
}

const produtosNaoPego = computed<Product[]>(() => {
  const naoPegos = products.value.filter((p) => !p.pego);
  return returnOrder(naoPegos);
})

const produtosPego = computed<Product[]>(() => {
  const prodsPegos = products.value.filter((p) => p.pego);
  return returnOrder(prodsPegos);
})

const totalReal = (value: number | string): string => {
  const coin = +value;
  return coin.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

const hasDuplicity = (duplicity: string) : void => {
  duplicidade.value = duplicity;
  navigator.vibrate(400);
}

const removeProduct = (product: Product): void => {
  const { id } = product
  console.log({ product })
  stores.actions_removeProd(id)
  duplicidade.value = ''
}

const updateProductQtd = ( e: Event ) : void => {
  const target = e.target as HTMLInputElement;
  const { value, dataset } = target;
  const idProd = +dataset.idProduct;

  stores.action_editQtdProd({
    id: idProd,
    quantidade: value,
  })
}

const updateProductPrice = ( e: Event ) : void => {
  const target = e.target as HTMLInputElement;
  const { value, dataset } = target;
  const idProd = +dataset.idProduct;

  stores.action_editPriceProd({
    id: idProd,
    preco: value,
  })
}

const changeStatusProd = (product : Product) : void => {
  const { id, pego } = product;
  const changePego = !pego;

  stores.action_changeStatusProd({
    id,
    pego: changePego
  })
}

const fecharModalDuplicidade = (change: changeQtdPayload) : void => {
  let newQtd = change.newQtd;
  let currentArray = change.currentArray;
  let qtdAtual = +stores.products[currentArray].quantidade;
  
  if(newQtd != qtdAtual) {
    stores.action_editQtdProd({
      id: stores.products[currentArray].id,
      quantidade: newQtd
    })
  }
  duplicidade.value = ''
}

const loadIndexedDB = async () => {
  await stores.creatIndexedDB();
}

onMounted(() => {
  loadIndexedDB();
});

</script>
<template lang="pug">
  div
    .container
      IncludeItem(v-on:show-duplicity="hasDuplicity")
      hr
      .sort(v-if="produtosNaoPego.length > 1")
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
        li(v-if="products.length < 1")
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
      @alter-qtd="fecharModalDuplicidade",
      @remove-modal="removeProduct"
    )
</template>