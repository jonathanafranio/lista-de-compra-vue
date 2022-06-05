export const state = () => ({
  products: [
    {
      id: 1,
      nome: "Fósforo",
      pego: false,
      preco: 1.40,
      quantidade: 3,
      valortotal: 4.20
    },
    {
      id: 2,
      nome: "Açúcar",
      pego: false,
      preco: 1.45,
      quantidade: 2,
      valortotal: 3.98
    },
  ],
})

export const mutations = {
  update_state(state, values){
    Object.keys(values).forEach(key => {
      state[key] = values[key]
    })
  },
  add_product(state, { obj_prod }) {
    state.products.push(obj_prod)
  },
  edit_productQtd(state, { obj_prod }) {
    const { id, quantidade } = obj_prod
    const indexProd = state.products.findIndex((prod) => prod.id === id)
    if (indexProd < 0) return
    const price = state.products[indexProd].preco
    state.products[indexProd].quantidade = quantidade
    state.products[indexProd].valortotal = (price * quantidade).toFixed(2)
  },
  edit_productPrice(state, { obj_prod }) {
    const { id, preco } = obj_prod
    const indexProd = state.products.findIndex((prod) => prod.id === id)
    if (indexProd < 0) return
    const quantidade = state.products[indexProd].quantidade
    state.products[indexProd].preco = preco
    state.products[indexProd].valortotal = (preco * quantidade).toFixed(2)
  },
  edit_productStage(state, { obj_prod }) {
    const { id, pego } = obj_prod
    const indexProd = state.products.findIndex((prod) => prod.id === id)
    if (indexProd < 0) return
    state.products[indexProd].pego = pego
  },
  removeProd(state, {id}){
    const indexProd = state.products.findIndex((prod) => prod.id === id)
    if (indexProd < 0) return
    state.products.splice(indexProd, 1)
  }
}

export const actions = {
}