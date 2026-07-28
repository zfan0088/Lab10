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
  signOut(auth).then(() => {
    console.log("Logout Successful!")
    console.log("Current User after logout:", auth.currentUser) // 打印 null
    localStorage.removeItem('isAuthenticated')
    isAuthenticated.value = false
    router.push('/FireLogin')
  }).catch((error) => {
    console.log(error.code)
  })
}
</script>

<template>
  <div class="container">
    <header class="mt-4 mb-4">
      <nav class="text-center">
        <RouterLink to="/" class="me-3">Home</RouterLink>
        <RouterLink to="/about" class="me-3">About (Members Only)</RouterLink>
        <RouterLink to="/FireRegister" class="me-3">Firebase Register</RouterLink>
        <RouterLink to="/FireLogin" class="me-3">Firebase Login</RouterLink>
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
  font-size: 1.2rem;
  color: #275fda;
  font-weight: bold;
}
nav a.router-link-exact-active {
  color: #000;
  text-decoration: underline;
}
</style>