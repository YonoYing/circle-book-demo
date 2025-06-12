import { createRouter, createWebHistory } from 'vue-router'
import BookList from './pages/books/BookList.vue'
import BookShow from './pages/books/BookView.vue'

const routes = [
  { path: '/', component: BookList },
  { path: '/books/:id', component: BookShow, name: 'BookView' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
