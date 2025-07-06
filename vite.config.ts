import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Importando o plugin Vue
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [vue()], // Adicionando o plugin Vue aqui
  test: {
    globals: true, // Permite usar funções globais como `describe` e `it`
    environment: 'jsdom', // Configura o ambiente de testes para simular um navegador
    setupFiles: ['./vitest.setup.ts']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)), // Ajuste o caminho conforme necessário
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
