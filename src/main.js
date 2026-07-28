import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


import { initializeApp } from 'firebase/app'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

const firebaseConfig = {
  apiKey: "AIzaSyBf4ReLBk2WlWvW7-XsUWXI2sZsmvjrm-o",
  authDomain: "zfan-library.firebaseapp.com",
  projectId: "zfan-library",
  storageBucket: "zfan-library.firebasestorage.app",
  messagingSenderId: "753409196341",
  appId: "1:753409196341:web:1674799e5a0e77e3890c7c"
};

initializeApp(firebaseConfig);