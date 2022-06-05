export const state = () => ({
  products: [],
  db: '',
  dbName: 'myListProductsDB',
  storeName: 'products'
})

export const mutations = {
  update_state(state, values) {
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
  removeProd(state, { id }) {
    const indexProd = state.products.findIndex((prod) => prod.id === id)
    if (indexProd < 0) return
    state.products.splice(indexProd, 1)
  }
}

export const actions = {
  creatIndexedDB({ dispatch, commit, state }, { }) {
    let db;
    //const dbName = 'myListProductsDB',
    //  storeName = 'products';
    const dbName = state.dbName
    const storeName = state.storeName
    if (window.indexedDB) {
      const request = window.indexedDB.open(dbName, 1)

      request.onsuccess = (e) => {
        db = request.result
        commit('update_state', { db })
        dispatch('loadProds', { db })
      }

      request.onerror = (e) => {
        console.log('on error', e)
      }

      request.onupgradeneeded = (e) => {
        db = request.result
        commit('update_state', { db })

        const objectStoreLocation = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true
        })
        objectStoreLocation.createIndex('nome', 'nome', { unique: false })
        objectStoreLocation.createIndex('pego', 'pego', { unique: false })
        objectStoreLocation.createIndex('preco', 'preco', { unique: false })
        objectStoreLocation.createIndex('quantidade', 'quantidade', { unique: false })
        objectStoreLocation.createIndex('valortotal', 'valortotal', { unique: false })

        console.log('on upgraded', e)
      }
    } else {
      console.log('não suporta indexedDB')
    }
  },
  loadProds({ commit, state }, { db }) {
    const storeName = state.storeName
    let objectStore = db.transaction(storeName).objectStore(storeName)
    objectStore.openCursor().onsuccess = (e) => {
      let products = []
      const cursor = e.target.result
      
      if(cursor) {
        const obj_prod = cursor.value
        commit('add_product', { obj_prod })
        cursor.continue()
      }
    }
  },
  action_addProduct({ commit, state }, { obj_prod }) {
    const db = state.db
    const storeName = state.storeName

    const transactionAdd = db.transaction([storeName], 'readwrite')
    const objectStore = transactionAdd.objectStore(storeName)
    const request = objectStore.add(obj_prod)

    transactionAdd.oncomplete = (e) => {
      commit('add_product', { obj_prod })
    }
    transactionAdd.onerror = (e) => {
      console.log('transação falhou', e)
    }
  }
}