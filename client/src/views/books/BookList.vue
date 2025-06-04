<template>
  <div class="page-container">
    <HeaderBar v-model:searchQuery="searchQuery" />

    <aside class="genre-filter">
      <h2 class="genre-title"><strong>Genres</strong></h2>
      <ul class="genre-list">
        <li v-for="genre in genres" :key="genre" class="genre-item">
          <a href="#">{{ genre }}</a>
        </li>
      </ul>
    </aside>
    
  <main class="content-wrapper">
    <div  class="book-grid-container">
      <div class="book-grid">
        <div v-for="book in books.books" :key="book.id">
          <BookCard :book="book" />
        </div>
      </div>
    </div >
  </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BookCard from '../../components/BookCard.vue'
import HeaderBar from '../../components/HeaderBar.vue'

const books = ref([])
const searchQuery = ref('')

const genres = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'Fantasy',
  'Romance',
  'Mystery',
  'Biography',
  'History'
]

const fetchBooks = async () => {
  try {
    const response = await fetch('http://localhost:8000/books')
    const data = await response.json()
    books.value = data
  } catch (error) {
    console.error('Failed to fetch books:', error)
  }
}

onMounted(fetchBooks)

const filteredBooks = computed(() => {
  return books.value.filter(book =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
.book-grid-container {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 100px 20px 20px;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  max-width: 1200px; 
  width: 100%;
  margin: 0 auto;
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: stretch; 
  gap: 80px;
  padding: 100px 20px 20px;
  width: 100%;
  box-sizing: border-box;
}

.genre-filter {
  width: 220px;
  background-color: rgba(241, 247, 255, 0.842);
  padding: 20px;
  margin-top: 100px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.247);
  font-family: 'Segoe UI', sans-serif;
  height: max-content;
  border-radius: 0; 
  position: fixed;
  top: 100px;
  left: 100px;
}

.genre-title {
  font-size: 1.3rem;
  font-weight: 100;
  margin-bottom: 16px;
  color: black;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.genre-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.genre-item {
  margin-bottom: 12px;
}

.genre-item a {
  display: inline-block;
  width: 100%;
  padding: 6px 10px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  transition: background-color 0.2s ease;
}

.genre-item a:hover {
  background-color: #ecf0f1;
}

@media (max-width: 768px) {
  .book-grid {
    max-width: 50vw;
  }
}
</style>
