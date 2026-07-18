<template>
  <div class="container mt-5 text-center">
    <h2>Login Page</h2>
    <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <div v-if="error" class="text-danger mt-3">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = () => {
  // 硬编码的账号密码验证
  if (username.value === 'admin' && password.value === '123456') {
    // 登录成功，将状态保存到 localStorage
    localStorage.setItem('isAuthenticated', 'true')
    // 重定向到 About 页面
    router.push('/about')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>