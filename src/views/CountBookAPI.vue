<script setup>
import { computed } from 'vue'
import authors from '../assets/json/authors.json'

const authorsCount = computed(() => authors.length)
const totalBooks = computed(() => {
  return authors.reduce((total, author) => total + author.famousWorks.length, 0)
})
const apiResponse = computed(() => {
  return {
    success: true,
    data: {
      authorsCount: authorsCount.value,
      totalBooks: totalBooks.value,
      authors: authors.map((author) => ({
        name: author.name,
        bookCount: author.famousWorks.length,
        books: author.famousWorks
      }))
    },
    timestamp: new Date().toISOString()
  }
})
</script>

<template>
  <div v-if="apiResponse" class="api-response">
    <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
  </div>
</template>
