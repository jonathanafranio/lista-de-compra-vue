<template lang="pug">
  div
    header.header
      h1 Lista de compras

    form.form-include(v-on:submit.prevent="addProduct")
      div.mx-6.sm-4.ph-2.form-include__box
        label.form-include__label(for="item-name") Item:
        input(type="text" name="item-name" placeholder="Ex.: Sabonete" v-model="nome" list="produtos" required)
        datalist#produtos
          option(
            v-for="(item, i) in listProdutcts" 
            v-bind:value="item" 
            v-bind:key="i"
          ) {{item}}

      div.mx-3.sm-2.ph-2.form-include__box
        label.form-include__label(for="item-quantidade") Quantidade:
        input(type="number" name="item-quantidade" min="1" v-model="quantidade" required)

      div.mx-3.sm-6.ph-2.form-include__box
        button(type="submit") Adicionar
</template>
<script setup>
import { ref } from 'vue';
import { useProductStore } from '~/stores/list';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['show-duplicity']);

const stores = useProductStore();

const nome = ref('');
const quantidade = ref(1);

const listProdutcts = ref([
  "Absorvente",
  "Água oxigenada",
  "Água Sanitária",
  "Álcool em gel",
  "Algodão",
  "Amaciante",
  "Arroz",
  "Alho",
  "Açúcar",
  "Barbeador descartável",
  "Biscoitos",
  "Bom Bril",
  "Café",
  "Carne bolvina",
  "Carne suina",
  "Chá",
  "Condicionador",
  "Creme dental",
  "Curativos",
  "Desinfetante",
  "Desodorante",
  "Detergente",
  "Escova de dente",
  "Esparadrapo",
  "Esponja de aço",
  "Esponja de pia",
  "Extrato de tomate",
  "Farinha de mandioca",
  "Farinha de milho",
  "Farinha de trigo",
  "Feijão",
  "Fermento",
  "Fio dental",
  "Flanela",
  "Fósforo",
  "Gaze",
  "Guardanapo de papel",
  "Hastes flexíveis",
  "Cotonete",
  "Hortaliças",
  "Inseticida",
  "Iogurte",
  "Lâmpada",
  "Limão",
  "Laranja",
  "Leite",
  "Lustra-móveis",
  "Luvas plásticas",
  "Macarrão",
  "Margarina",
  "Manteiga",
  "Milho",
  "Molho de tomate",
  "Óleo de soja",
  "Ovos",
  "Pães",
  "Papel Alumínio",
  "Papel Filme",
  "Papel higiênico",
  "Papel toalha",
  "Peixe",
  "Picanha",
  "Queijo ralado",
  "Sabão em barra",
  "Sabão em pó",
  "Sabonete",
  "Sacos de lixo",
  "Sal",
  "Shampoo",
  "Tempero",
  "Tomate",
  "Abóbora",
  "Alface",
  "Bacon",
  "Banana",
  "Berinjela",
  "Beterraba",
  "Brócolis",
  "Cebola",
  "Cenoura",
  "Chuchu",
  "Couve",
  "Ervilha",
  "Feijão carioca",
  "Feijão preto",
  "Frango",
  "Frutas cristalizadas",
  "Guaraná em pó",
  "Iogurte grego",
  "Jornal",
  "Maçã",
  "Mandioca",
  "Manga",
  "Maracujá",
  "Mel",
  "Menta",
  "Musse",
  "Nescau",
  "Néctar",
  "Nozes",
  "Ovo de codorna",
  "Picanha de cordeiro",
  "Pimentão",
  "Pipoca",
  "Refrigerante",
  "Salsicha",
  "Sardinha",
  "Sementes",
  "Sorvete",
  "Tapioca",
  "Tempero pronto",
  "Uva",
  "Vinagre",
  "Yogurte natural"
]);

const addProduct = () => {
  let prodAdd = {
    nome: nome.value,
    quantidade: +quantidade.value,
    preco: 0,
    valortotal: 0,
    pego: false,
  }

  const nameNewProd = prodAdd.nome.toLowerCase()
  const productsList = stores.products
  const hastThisProd = productsList.findIndex((prod) => prod.nome.toLowerCase() === nameNewProd)

  nome.value = ''
  quantidade.value = 1

  if (hastThisProd < 0) {
    const newId = productsList.length + 1
    prodAdd.id = newId
    stores.action_addProduct( prodAdd )
    
  } else {
    handleDuplicity(hastThisProd, productsList[hastThisProd].nome, +productsList[hastThisProd].quantidade)
  }

}

const handleDuplicity = (currentArray, prodNome, prodQtd) => {
  emit('show-duplicity', {
    currentArray,
    prodNome,
    prodQtd
  });
}
</script>