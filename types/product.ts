export interface Product {
  id?: number
  nome: string
  quantidade: number
  preco: number
  valortotal: number
  pego: boolean
}

export interface ProductsState {
  products: Product[]
  db: IDBDatabase | string
  dbName: string
  storeName: string
}

export interface EditQtdPayload {
  id: number
  quantidade: number
  valortotal?: number | string
}

export interface EditPricePayload {
  id: number
  preco: number
  valortotal?: number | string
}

export interface EditStagePayload {
  id: number
  pego: boolean
}

export interface changeQtdPayload {
  newQtd: number
  currentArray: number
}

export interface DuplicidadeData {
  currentArray: number
  prodNome: string
  prodQtd: number
}

export interface AlterQtdPayload {
  newQtd: number
  prodQtd: number
  currentArray: number
}

export interface showDuplicidadePayload {
  currentArray: number
  prodNome: string
  prodQtd: number
}