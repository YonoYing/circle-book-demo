<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  book: Object
})

const router = useRouter()
function goToBook() {
  router.push({ name: 'BookView', params: { id: props.book.id } })
}

const coverUrl = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1yg_rIUE_FzrkgJGIrpCu_e45OFLXH5GByg&s')

// Google Books cover fetch based on ISBN
watchEffect(async () => {
  if (!props.book?.isbn) return
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${props.book.isbn}`
    )
    const data = await response.json()
    const image = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail
    if (image) {
      coverUrl.value = image
    }
  } catch (error) {
    console.error('Google Books API error:', error)
  }
})
</script>

<template>
  <div class="book-card" @click="goToBook" style="cursor:pointer;">
    <div class="image-container">
      <img :src="coverUrl" alt="Book cover" class="book-cover" />
      <div class="overlay">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author">by {{ book.author }}</p>
        <p class="book-stock">In stock: {{ book.availableStock }}</p>
        <p class="book-price">$ {{ book.price.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  width: 100%;
  height: 300px; /* or auto with min-height */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}
.image-container {
  position: relative;
  flex-grow: 1;
}
.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.3s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* dim effect */
  color: white;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transition: opacity 0.3s ease;
  text-align: center;
}

.image-container:hover .book-cover {
  filter: brightness(50%);
}

.image-container:hover .overlay {
  opacity: 1;
}

.book-title {
  font-weight: 700;
  color: white;
  margin: 8px 0 4px;
  
  font-size: clamp(1rem, 2vw, 1.3rem);
  max-width: 100%;
  word-wrap: break-word; /* allow breaking if necessary */
}

.book-author {
  font-size: 1rem;
  color: #777;
  margin-bottom: 6px;
  font-style: italic;
}

.book-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: white; /* a nice bright blue */
}

.book-stock {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 6px;
}
</style>
