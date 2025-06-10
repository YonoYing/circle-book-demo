<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderBar from '../../components/HeaderBar.vue'

const route = useRoute()
const book = ref(null)
const googleBook = ref(null)
const googleBookResponse = ref(false)

const coverUrl = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1yg_rIUE_FzrkgJGIrpCu_e45OFLXH5GByg&s')

const fetchBook = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/books/${route.params.id}`)
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
  googleBookResponse.value = true
}

watch(book, (newBook) => {
  if (newBook?.isbn) {
    fetchGoogleBook(newBook.isbn)
  }
})

onMounted(fetchBook)

const handleBuyButtonClick = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/books/${route.params.id}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId: book.id,  
      }),
    })
    
    if (response.ok) {
      const data = await response.json()
      book.value = data.book
    } else {
      alert('There was an error processing your purchase.')
    }
  } catch (error) {
    console.error('Error with the POST request:', error)
    alert('There was an error processing your purchase.')
  }
}
</script>

<template>
  <HeaderBar/>

  <div v-if="book && googleBookResponse" class="book-container">
    <div class="left-half">
      <img
        v-if="googleBook && (googleBook.imageLinks?.large || googleBook.imageLinks?.thumbnail)"
        :src="googleBook.imageLinks.large || googleBook.imageLinks.thumbnail"
        alt="coverUrl"
      />
      <img
        v-else
        :src="coverUrl"
      />
    </div>

    <div class="right-half">
      <h1 class="book-title">{{ book.title }}</h1>
      <p class="book-author"><strong>{{ book.author }}</strong> | {{ googleBook.publishedDate || 'Unknown' }}</p>
      <p class="blurb">{{ googleBook?.description || 'No description available.' }}</p>
      <p class="book-price"><strong>Price:</strong> ${{ book.price?.toFixed(2) || 'N/A' }}</p>
      <button 
        v-if="book.availableStock > 0"
        @click="handleBuyButtonClick" 
        class="buy-button">
        Buy Now
      </button>
      <button 
        v-else
        disabled
        class="out-of-stock-button">
        Out of Stock
      </button>
    </div>
  </div>

  <div v-else>
    Loading book data...
  </div>
</template>

<style scoped>
.book-container {
  display: flex;
  width: 200%;              
  margin: 100px auto 20px; 
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
  height: 400px;       
  width: auto;        
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 0; 
}

.right-half {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.book-author {
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.782);
}

.blurb {
  margin: 20px 0;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.782);
}

.book-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.782);
  margin-bottom: 20px;
}

.book-title {
  font-size: 2rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.782);
}

.buy-button {
  background-color: #2c3e50;
  color: rgba(255, 255, 255, 0.782);
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 200px;
}

.out-of-stock-button {
  background-color: #5b5b5bc2;
  color: rgba(255, 255, 255, 0.782);
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 6px;
  max-width: 200px;
}

.buy-button:hover {
  background-color: #23313f;
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
    height: auto;    
  }

  .right-half {
    margin-top: 20px;
  }
}
</style>
