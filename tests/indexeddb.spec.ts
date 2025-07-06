import { openDB, IDBPDatabase } from 'idb';
import 'fake-indexeddb/auto'; // Importa o mock do IndexedDB

// O resto do seu código de teste aqui
import { describe, it, expect } from 'vitest';
import type { Product } from '@/types/product'; // já criamos esse tipo

interface DBSchema extends IDBDatabase {
  products: Product;
}

// Exemplo de teste
describe('Teste de IndexedDB', () => {
  it('deve adicionar um item ao IndexedDB', async () => {
    // Aqui você pode usar a API IndexedDB normalmente
    const db = await openDB('myListProductsDB', 1, {
        upgrade(db) {
            db.createObjectStore('products');
        },
    });

    const newProduct: Product = {
        id: 1, 
        nome: "Fósforo",
        quantidade: 10,
        preco: 0.5,
        valortotal: 5.00,
        pego: false
    }

    // Adiciona um item
    await db.put('products', newProduct, 1);

    // Verifica se o item foi adicionado
    const produto = await db.get('products', 1);  
      
    expect(produto).toBeDefined();
    expect(produto?.nome).toEqual('Fósforo');
    expect(produto?.quantidade).toBe(10);
    expect(produto?.valortotal).toBe(5.00);
  });
});
