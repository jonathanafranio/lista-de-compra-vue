// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: [
    '@/assets/scss/main.scss',
  ],
  vite: {
    plugins: [
      {
        name: 'pug',
        transform(src, id) {
          if (/\.pug$/.test(id)) {
            const pug = require('pug')
            return {
              code: pug.render(src),
              map: null
            }
          }
        }
      }
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // ou "modern"
        }
      }
    }
  },
})
