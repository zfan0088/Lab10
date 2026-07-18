<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

// 监听路由变化，实时更新导航栏的登录状态
router.beforeEach((to, from, next) => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  next()
})

const logout = () => {
  // 清除登录状态
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
  // 注销后跳回登录页或首页
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <header class="mt-4 mb-4">
      <nav class="text-center">
        <RouterLink to="/" class="me-3">Home</RouterLink>
        <RouterLink to="/about" class="me-3">About (Members Only)</RouterLink>
        
        <!-- 条件渲染：未登录显示 Login，已登录显示 Logout -->
        <RouterLink v-if="!isAuthenticated" to="/login" class="me-3">Login</RouterLink>
        <button v-if="isAuthenticated" @click="logout" class="btn btn-sm btn-outline-danger">Logout</button>
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