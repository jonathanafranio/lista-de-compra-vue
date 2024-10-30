import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    db: '',
    dbName: 'myListProductsDB',
    storeName: 'products'
  }),
  actions: {
    // era as mutations
    add_product( obj_prod ) {
      this.products.push(obj_prod)
    },
    edit_productQtd( obj ) {
      const { id, quantidade, valortotal } = obj
      const indexProd = this.products.findIndex((prod) => prod.id === id)
      if (indexProd < 0) return
      //const price = this.products[indexProd].preco
      this.products[indexProd].quantidade = quantidade
      this.products[indexProd].valortotal = valortotal
    },
    edit_productPrice( obj ) {
      const { id, preco, valortotal } = obj
      const indexProd = this.products.findIndex((prod) => prod.id === id)
      if (indexProd < 0) return
      //const quantidade = this.products[indexProd].quantidade
      this.products[indexProd].preco = preco
      this.products[indexProd].valortotal = valortotal
    },
    edit_productStage( obj ) {
      const { id, pego } = obj
      const indexProd = this.products.findIndex((prod) => prod.id === id)
      if (indexProd < 0) return
      this.products[indexProd].pego = pego
    },
    removeProd(id) {
      const indexProd = this.products.findIndex((prod) => prod.id === id)
      if (indexProd < 0) return
      this.products.splice(indexProd, 1)
    },

    // os actions:
    creatIndexedDB() {
      let db;
      const dbName = this.dbName
      const storeName = this.storeName
      if (window.indexedDB) {
        const request = window.indexedDB.open(dbName, 1);

        request.onsuccess = (e) => {
          db = request.result
          this.db = db
          this.loadProds( db );
        }

        request.onerror = (e) => {
          console.log('on error', e)
        }

        request.onupgradeneeded = (e) => {
          db = request.result
          this.db = db

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
    loadProds( db ) {
      const { storeName, products } = this
      let objectStore = db.transaction(storeName).objectStore(storeName)
      objectStore.openCursor().onsuccess = (e) => {
        const cursor = e.target.result
        if(cursor) {
          const obj_prod = cursor.value
          const { id } =  obj_prod
          const hasProd = products.filter((p) => p.id === id)
          if(hasProd.length < 1) {
            this.add_product( obj_prod )
          }
          cursor.continue()
        }
      }
    },
    action_addProduct( obj_prod ) {
      const db = this.db
      const storeName = this.storeName

      const transactionAdd = db.transaction([storeName], 'readwrite')
      const objectStore = transactionAdd.objectStore(storeName)
      const request = objectStore.add(obj_prod)

      transactionAdd.oncomplete = (e) => {
        this.add_product( obj_prod )
      }
      transactionAdd.onerror = (e) => {
        console.log('transação falhou', e)
      }
    },
    action_editQtdProd( obj_prod ) {
      const db = this.db
      const storeName = this.storeName
      const { id, quantidade } = obj_prod
      const _this = this

      const transactionEdit = db.transaction([storeName], "readwrite");
      const objectStore = transactionEdit.objectStore(storeName)
      const request = objectStore.get(id)

      request.onerror = function (event) {
        console.log('Ocorreu um erro ao buscar o contato.');
      }
      request.onsuccess = function (event) {
        let prod = event.target.result
        prod.quantidade = quantidade
        const { preco } = prod
        const total = (preco * quantidade).toFixed(2)
        prod.valortotal = total
        const productObj = {
          id: id,
          quantidade: quantidade,
          valortotal: total
        }
        const requestUpdate = objectStore.put(prod)

        requestUpdate.onsuccess = function (event) {
          //commit('edit_productQtd', { obj: productObj })
          _this.edit_productQtd( productObj );
          console.log('produto editado', event)
        }
        requestUpdate.onerror = function (event) {
          console.log('Ocorreu um erro ao salvar o contato.', event);
        }
      }
    },
    action_editPriceProd( obj_prod ) {
      const db = this.db
      const storeName = this.storeName
      const { id, preco } = obj_prod

      const transactionEdit = db.transaction([storeName], "readwrite");
      const objectStore = transactionEdit.objectStore(storeName)
      const request = objectStore.get(id)

      const _this = this

      request.onerror = function (event) {
        console.log('Ocorreu um erro ao buscar o contato.');
      }
      request.onsuccess = function (event) {
        let prod = event.target.result
        prod.preco = preco
        const { quantidade } = prod
        const total = (preco * quantidade).toFixed(2)
        prod.valortotal = total
        const productObj = {
          id: id,
          preco: preco,
          valortotal: total
        }
        const requestUpdate = objectStore.put(prod)
  
        requestUpdate.onsuccess = function (event) {
          _this.edit_productPrice(productObj)
          //commit('edit_productPrice', { obj: productObj })
          console.log('produto editado', event)
        }
        requestUpdate.onerror = function (event) {
          console.log('Ocorreu um erro ao salvar o contato.', event);
        }
      }
    },
    action_changeStatusProd( obj_prod ) {
      const db = this.db
      const storeName = this.storeName
      const { id, pego } = obj_prod

      const _this = this

      const transactionEdit = db.transaction([storeName], "readwrite");
      const objectStore = transactionEdit.objectStore(storeName)
      const request = objectStore.get(id)

      request.onerror = function (event) {
        console.log('Ocorreu um erro ao buscar o contato.');
      }
      request.onsuccess = function (event) {
        let prod = event.target.result
        prod.pego = pego
        const productObj = {
          id: id,
          pego: pego
        }
        const requestUpdate = objectStore.put(prod)

        requestUpdate.onsuccess = function (event) {
          _this.edit_productStage(productObj);
          //commit('edit_productStage', { obj: productObj })
          console.log('produto editado', event)
        }
        requestUpdate.onerror = function (event) {
          console.log('Ocorreu um erro ao salvar o contato.', event);
        }
      }
    },
    actions_removeProd( id ) {
      const db = this.db
      const storeName = this.storeName
      const transactionRmm = db.transaction([storeName], 'readwrite')
      const objectStore = transactionRmm.objectStore(storeName)
      const request = objectStore.delete(id)
      const _this = this
      transactionRmm.oncomplete = (e) => {
        _this.removeProd(id)
      }
    }
  }, 
})