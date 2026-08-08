<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const city = ref('')
const weatherData = ref(null)
const temperature = computed(() => {
  return weatherData.value ? Math.round(weatherData.value.main.temp - 273.15) : null
})
const error = ref('')

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || '0d39fa682fb77815307e2aa87c12ee8f'

const iconUrl = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

const fetchWeather = async (params) => {
  error.value = ''
  weatherData.value = null

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        ...params,
        appid: apiKey
      }
    })
    weatherData.value = response.data
  } catch (err) {
    error.value = 'Unable to retrieve weather data.'
  }
}

const getCurrentWeather = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by this browser.'
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeather({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    },
    () => {
      error.value = 'Unable to access current location.'
    }
  )
}

const searchByCity = () => {
  if (city.value.trim()) {
    fetchWeather({ q: city.value.trim() })
  }
}

onMounted(() => {
  getCurrentWeather()
})
</script>

<template>
  <main>
    <div class="container">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
          @keyup.enter="searchByCity"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>

      <p v-if="error" class="text-danger">{{ error }}</p>

      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img
            :src="iconUrl(weatherData.weather[0].icon)"
            :alt="weatherData.weather[0].description"
          />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  text-align: center;
}

.search-bar {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 180px;
}
</style>
