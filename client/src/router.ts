import { createRouter, createWebHistory } from 'vue-router'
import BookList from './views/books/BookList.vue'
import BookShow from './views/books/BookView.vue'

const routes = [
  { path: '/', component: BookList },
  { path: '/books/:id', component: BookShow, name: 'BookView' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
