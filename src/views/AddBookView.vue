<template>
  <div class="container mt-5 text-center">
    <h1>Add Book</h1>
    
    <div class="row justify-content-center mt-4">
      <div class="col-md-6">
        <form @submit.prevent="addBook" class="text-start">
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN:</label>
            <input type="text" class="form-control" v-model="isbn" id="isbn" required />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" v-model="name" id="name" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Add Book</button>
        </form>
      </div>
    </div>

    <hr class="mt-5 mb-5" />

    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue' 

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)

    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    })
    
    alert('Book added successfully!')

    isbn.value = ''
    name.value = ''
    
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}
</script>