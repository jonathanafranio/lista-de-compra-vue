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

<script>
export default {
  data() {
    return {
      nome: "",
      quantidade: 1,
      listProdutcts: [
        "Absorvente",
        "Água oxigenada",
        "Água Sanitária",
        "Álcool em gel",
        "Algodão",
        "Amaciante",
        "Arroz",
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
      ],
    };
  },
  methods: {
    addProduct() {
      if (this.nome.trim() === "") {
        return
      }
      let prodAdd = {
        nome: this.nome,
        quantidade: +this.quantidade,
        preco: 0,
        valortotal: 0,
        pego: false,
      }
      const nameNewProd = prodAdd.nome.toLowerCase()
      const productsList = this.$store.state.list.products
      const hastThisProd = productsList.findIndex((prod) => prod.nome.toLowerCase() === nameNewProd)

      if (hastThisProd < 0) {
        const newId = productsList.length + 1
        prodAdd.id = newId

        this.$store.dispatch("list/action_addProduct", { obj_prod: prodAdd });

        this.nome = ''
        this.quantidade = 1

      } else {
        this.$emit('show-duplicity', {
          currentArray: hastThisProd,
          prodNome: productsList[hastThisProd].nome,
          prodQtd: +productsList[hastThisProd].quantidade
        })
      }
    }
  },
};
</script>