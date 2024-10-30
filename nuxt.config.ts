// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      title: 'lista-de-compra-vue',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/icons/favicon-128x128.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
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
