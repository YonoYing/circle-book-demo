<template>
  <div class="page-container">
    <HeaderBar v-model:searchQuery="searchQuery" />

    <main class="book-grid-container">
      <div class="book-grid">
        <div v-for="book in books.books" :key="book.id">
          <BookCard :book="book" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BookCard from '../../components/BookCard.vue'
import HeaderBar from '../../components/HeaderBar.vue' // ⬅ Import the header

const books = ref([])
const searchQuery = ref('')

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
  display: flex;
  justify-content: center;
  padding: 100px 20px 20px; 
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  max-width: 50vw;
  margin: 0 auto;
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
