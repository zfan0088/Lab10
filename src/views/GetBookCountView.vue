<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref(null)
const functionUrl = import.meta.env.VITE_COUNT_BOOKS_URL || 'https://us-central1-zfan-library.cloudfunctions.net/countBooks'

const getBookCount = async () => {
  try {
    const response = await axios.get(functionUrl)
    count.value = response.data.count
    error.value = null
  } catch (err) {
    error.value = 'Error fetching book count'
    count.value = null
  }
}
</script>

<template>
  <div class="book-counter">
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.book-counter {
  text-align: center;
}
</style>
