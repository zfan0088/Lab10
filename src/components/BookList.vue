<template>
  <div class="mt-5 text-start">
    <h2>Books List (ISBN > 1000, Ordered, Limit 5)</h2>
    <ul class="list-group">
      <li v-for="book in books" :key="book.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span v-if="editingId !== book.id">
          <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
        </span>

        <span v-else class="d-flex gap-2">
          <input type="text" v-model="editName" class="form-control form-control-sm" placeholder="New Name" />
          <button @click="updateBook(book.id)" class="btn btn-sm btn-success">Save</button>
          <button @click="editingId = null" class="btn btn-sm btn-secondary">Cancel</button>
        </span>

        <div v-if="editingId !== book.id">
          <button @click="startEdit(book)" class="btn btn-sm btn-warning me-2">Edit</button>
          <button @click="deleteBook(book.id)" class="btn btn-sm btn-danger">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const books = ref([])
const editingId = ref(null)
const editName = ref('')

const fetchBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),     
      orderBy('isbn', 'asc'),       
      limit(5)                     
    )
    
    const querySnapshot = await getDocs(q)
    const booksArray = []
    
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    
    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

const deleteBook = async (id) => {
  try {
    await deleteDoc(doc(db, 'books', id))
    alert('Book deleted successfully!')
    fetchBooks() 
  } catch (error) {
    console.error('Error deleting book: ', error)
  }
}

const startEdit = (book) => {
  editingId.value = book.id
  editName.value = book.name
}

const updateBook = async (id) => {
  try {
    const bookRef = doc(db, 'books', id)
    await updateDoc(bookRef, {
      name: editName.value 
    })
    alert('Book updated successfully!')
    editingId.value = null 
    fetchBooks() 
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>