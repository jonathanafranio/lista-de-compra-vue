
const routes = [
  {
    path: '/',
    component: () => import('src/App.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/App.vue')
  }
]

export default routes
