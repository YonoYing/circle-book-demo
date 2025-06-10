<template>
  <div class="page-container">
    <HeaderBar v-model:searchQuery="searchQuery" />

    <div class="layout-container">
      <GenreList />
      <main class="content-wrapper">
        <div  class="book-grid-container">
          <div class="book-grid">
            <div v-for="book in filteredBooks" :key="book.id" class="grid-item">
              <BookCard :book="book" />
            </div>
          </div>
        </div >
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BookCard from '../../components/BookCard.vue'
import HeaderBar from '../../components/HeaderBar.vue'
import GenreList from '../../components/GenreList.vue'

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

watch(searchQuery, (newVal) => {
  console.log('Search query changed:', newVal)
})

const filteredBooks = computed(() => {
  const booksArray = books.value?.books || [];
  const searchTerm = searchQuery.value.trim().toLowerCase(); 
  
  if (!searchTerm) return books.value.books;

  const filterResult = booksArray.filter(book => {
    const title = book?.title?.toLowerCase() || '';
    return title.includes(searchTerm);
  })

  return filterResult
})
</script>

<style scoped>
.book-grid-container {
  flex: 1;
  display: flex;
  justify-content: left;
  padding: 100px 20px 20px;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px; 
  width: 100%;
  margin: 0;
  box-sizing: border-box; 
  overflow-x: hidden; 
  justify-content: center;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 2 / 3;
  max-width: 250px; 
  min-width: 150px; 
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
  flex: 1;
  width: 80%;
  position: fixed;
  left: 20%;
  top: 0px;
}

.layout-container {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 100px 20px 20px;
  align-items: flex-start;
}

@media (max-width: 1000px) {
  .layout-container {
    flex-direction: column;
    align-items: center;
  }

  .content-wrapper {
    padding: 0;
    width: 100%;
    position: static;
  }
  .book-grid-container {
    justify-content: center;
  }
  .book-grid {
    max-width: 50vw;
    grid-template-columns: 1fr;
  }
}
</style>
