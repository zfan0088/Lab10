<script setup>
import { ref } from 'vue'
import axios from 'axios'

const books = ref([])
const total = ref(0)
const error = ref(null)
const functionUrl = import.meta.env.VITE_BOOK_STORE_URL || 'https://us-central1-zfan-library.cloudfunctions.net/bookStore'

const loadBooks = async () => {
  try {
    const response = await axios.get(functionUrl)
    if (!Array.isArray(response.data.books)) {
      throw new Error('Invalid book store response')
    }
    books.value = response.data.books
    total.value = response.data.total
    error.value = null
  } catch (err) {
    error.value = 'Error loading book store'
    books.value = []
    total.value = 0
  }
}
</script>

<template>
  <div class="book-store">
    <h1>NoMash Library Book Store</h1>
    <button @click="loadBooks" class="btn btn-primary mb-4">Load Books for Sale</button>
    <p v-if="total">Available books: {{ total }}</p>
    <p v-if="error" class="text-danger">{{ error }}</p>

    <div class="book-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <h2>{{ book.name }}</h2>
        <p>ISBN: {{ book.isbn }}</p>
        <p class="price">${{ book.price }}</p>
        <p>{{ book.message }}</p>
        <button class="btn btn-success">Buy Book</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-store {
  text-align: center;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.book-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: left;
}

.book-card h2 {
  font-size: 1.25rem;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #198754;
}
</style>
