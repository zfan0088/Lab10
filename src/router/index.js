import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue' // 引入登录页

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    // 添加 meta 字段，标记此路由需要验证
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由导航守卫 (Navigation Guard)
router.beforeEach((to, from, next) => {
  // 检查是否已登录
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  // 如果目标路由需要验证，且用户未登录
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // 重定向到登录页
  } else {
    next() // 允许放行
  }
})

export default router