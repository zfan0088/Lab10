<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const router = useRouter()
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

router.beforeEach((to, from, next) => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  next()
})

const logout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      console.log('Firebase Sign-out successful.')
      console.log('Current User after logout:', auth.currentUser)
      localStorage.removeItem('isAuthenticated')
      isAuthenticated.value = false
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.error('Logout Error:', error)
    })
}
</script>

<template>
  <div class="container">
    <header class="mt-4 mb-4">
      <nav class="text-center">
        <RouterLink to="/" class="me-3">Home</RouterLink> |
        <RouterLink to="/about" class="me-3">About</RouterLink> |
        <RouterLink to="/addbook" class="me-3 text-success">Add Book</RouterLink> |
        <RouterLink to="/WeatherCheck" class="me-3">Get Weather</RouterLink> |
        <RouterLink to="/CountBookAPI" class="me-3">Count Book API</RouterLink> |
        <RouterLink to="/FireLogin" class="me-3">Firebase Login</RouterLink> |
        <RouterLink to="/FireRegister" class="me-3">Firebase Register</RouterLink>

        <button v-if="isAuthenticated" @click="logout" class="btn btn-sm btn-outline-danger ms-2">Logout</button>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
nav a {
  text-decoration: none;
  font-size: 1.1rem;
  color: #275fda;
  margin: 0 8px;
}

nav a.router-link-exact-active {
  color: #000;
  font-weight: bold;
}
</style>
