<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const book = ref(null)

const fetchBook = async () => {
  try {
    const response = await fetch(`http://localhost:8000/books/${route.params.id}`)
    if (!response.ok) throw new Error('Book not found')
    book.value = await response.json()
  } catch (err) {
    console.error(err)
  }
  console.log(book)
}

onMounted(fetchBook)
</script>

<template>
  <div class="book-page" v-if="book">
    <h1>{{ book.title }}</h1>
    <p><strong>Author:</strong> {{ book.author }}</p>
    <!-- <p><strong>Price:</strong> ${{ book.price.toFixed(2) }}</p> -->
    <p><strong>Stock:</strong> {{ book.availableStock }}</p>
    <!-- Add more details as needed -->
  </div>

  <div v-else>
    Loading book data...
  </div>
</template>

<style scoped>
.book-page {
  max-width: 600px;
  margin: 100px auto 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
