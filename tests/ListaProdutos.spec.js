import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest'; 
import { createPinia, setActivePinia } from 'pinia';
import ListaProdutos from '@/components/ListaProdutos.vue';
import { useProductStore } from '~/stores/list';
import 'fake-indexeddb/auto'; // Importa o mock do IndexedDB
import { openDB } from 'idb'; // Importa a função openDB da biblioteca idb

describe('ListaProdutos.vue', () => {
    beforeEach(async () => {
        const pinia = createPinia();
        setActivePinia(pinia);

        // Configuração do IndexedDB para o teste
        const db = await openDB('myListProductsDB', 1, {
            upgrade(db) {
                db.createObjectStore('products');
            },
        });

        const fosforo = {
            id: 1,
            nome: "Fósforo",
            quantidade: 10,
            preco: 0.5,
            valortotal: 5.00,
            pego: false
        }

        const caderno = {
            id: 1,
            nome: "Caderno",
            quantidade: 1,
            preco: 11.50,
            valortotal: 11.50,
            pego: false
        }


        // Adiciona produtos ao banco de dados simulado
        await db.add('products', fosforo, 1);
        await db.add('products', caderno, 2);

        // Carrega produtos na store
        const productStore = useProductStore();
        productStore.$patch({ products: [fosforo, caderno] });
    });

    it('renderizar lista de produtos', async () => {
        const wrapper = mount(ListaProdutos);

        // Aguarda a renderização completa, caso use async/await dentro do componente
        await wrapper.vm.$nextTick();
        

        expect(wrapper.find('ul').text()).toContain('Produto:Qtd:Preço');

        // Verifica se os produtos foram renderizados
        const produtos = wrapper.findAll('.list__name-prod:not(strong)'); // Supondo que você tenha uma classe .produto para os itens
        expect(produtos).toHaveLength(2); // Espera que dois produtos sejam renderizados

        // Verifica se os nomes dos produtos estão corretos
        expect(produtos[0].text()).toContain('Fósforo');
        expect(produtos[1].text()).toContain('Caderno');

    });
});
