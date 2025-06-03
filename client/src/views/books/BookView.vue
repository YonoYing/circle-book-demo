<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderBar from '../../components/HeaderBar.vue' // ⬅ Import the header

const route = useRoute()
const book = ref(null)
const googleBook = ref(null)
const searchQuery = ref('')

const fetchBook = async () => {
  try {
    const response = await fetch(`http://localhost:8000/books/${route.params.id}`)
    if (!response.ok) throw new Error('Book not found')
    const data = await response.json()
    book.value = data.book
  } catch (err) {
    console.error(err)
  }
}

const fetchGoogleBook = async (isbn) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    const data = await response.json()
    if (data.totalItems > 0) {
      googleBook.value = data.items[0].volumeInfo
    }
  } catch (err) {
    console.error('Error fetching from Google Books API:', err)
  }
}

// Watch for when book.value is set, then fetch Google Books data
watch(book, (newBook) => {
  if (newBook?.isbn) {
    fetchGoogleBook(newBook.isbn)
  }
})

onMounted(fetchBook)
</script>

<template>
  <HeaderBar/>

  <div v-if="book && googleBook" class="book-container">
    <div class="left-half">
      <img
        v-if="googleBook.imageLinks?.large || googleBook.imageLinks?.thumbnail"
        :src="googleBook.imageLinks.large || googleBook.imageLinks.thumbnail"
        alt="Book Cover"
      />
    </div>

    <div class="right-half">
      <h1>{{ book.title }}</h1>
      <p><strong>{{ book.author }}</strong> | {{ googleBook.publishedDate || 'Unknown' }}</p>
      <p class="blurb">{{ googleBook.description || 'No description available.' }}</p>
      <p class="book-price"><strong>Price:</strong> ${{ book.price?.toFixed(2) || 'N/A' }}</p>
      <button class="buy-button">Buy Now</button>
    </div>
  </div>

  <div v-else>
    Loading book data...
  </div>
</template>

<style scoped>
.book-container {
  display: flex;
  width: 200%;              /* Only take up 75% of the screen */
  margin: 100px auto 20px; /* Center it horizontally */
  gap: 40px;
  align-items: stretch;
}

.left-half {
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-half {
  flex: 1;
}

.left-half img {
  height: 400px;       /* Fixed height */
  width: auto;         /* Maintain aspect ratio */
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.right-half {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.blurb {
  margin: 20px 0;
  line-height: 1.6;
}

.book-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
}

.buy-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 200px;
}

.buy-button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .book-container {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }

  .left-half,
  .right-half {
    width: 100%;
  }

  .left-half img {
    width: 100%;
    height: auto;     /* Overrides the fixed desktop height */
  }

  .right-half {
    margin-top: 20px;
  }
}
</style>
