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
  edit_product(state, { obj_prod }) {
    const { id, pego, preco, quantidade } = obj_prod
    const indexProd = state.products.findIndex((prod) => prod.id === id)
    if (indexProd < 0) return
    state.products[indexProd].pego = pego
    state.products[indexProd].preco = preco
    state.products[indexProd].quantidade = quantidade
    state.products[indexProd].valortotal = (preco * quantidade).toFixed(2)
  },
  removeProd(state, {id_prod}){
    const indexProd = state.products.findIndex((prod) => prod.id === id)
    if (indexProd < 0) return
    state.products.splice(indexProd, 1)
  }
}

export const actions = {
}