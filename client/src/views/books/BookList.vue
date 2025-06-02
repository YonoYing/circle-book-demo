<template>
  <div class="page-container">
    <header class="taskbar">
      <div class="left-section">
        <img src="./assets/logo.png" alt="Logo" class="logo" />
        <h1 class="title">BookStore</h1>
      </div>
      <div class="center-section">
        <input
          type="text"
          placeholder="Search books..."
          v-model="searchQuery"
          class="search-bar"
        />
      </div>
    </header>

    <main class="book-grid-container">
      <div class="book-grid">
        <div v-for="book in books.books">
          <BookCard
            :key="book.id"
            :book="book"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BookCard from '../../components/BookCard.vue'

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
.taskbar {
  position: fixed; /* ⬅ Stick to the top */
  top: 0;
  left: 0;
  width: 100%;     /* ⬅ Full width */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 1.5rem;
}

.center-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-bar {
  width: 50%;
  padding: 6px;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
}

.book-grid-container {
  display: flex;
  justify-content: center;
  padding: 100px 20px 20px; 
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  max-width: 75vw;
  margin: 0 auto;
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
