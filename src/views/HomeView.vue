<template>
  <div class="home-container">
    <div class="header-section fade-in">
      <div class="logo-container">
        <div class="weather-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: var(--primary-color)" />
                <stop offset="100%" style="stop-color: var(--secondary-color)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 class="app-title">Weather Forecast</h1>
        <p class="app-subtitle">Discover the weather patterns with precision</p>
      </div>
    </div>

    <div class="search-section slide-in">
      <SearchBar @search="handleSearch" />
    </div>

    <!-- Временная кнопка для тестирования -->
    <div style="text-align: center; margin: 20px">
      <button
        @click="testData"
        style="
          background: #667eea;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
        "
      >
        Test Data Display
      </button>
    </div>

    <div v-if="isLoading" class="loading-section">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading weather data...</p>
      </div>
    </div>

    <div v-if="error" class="error-section fade-in">
      <div class="error-card">
        <div class="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{{ error }}</p>
        <button class="btn-primary" @click="retrySearch">Try Again</button>
      </div>
    </div>

    <div v-if="city && forecast" class="weather-section fade-in">
      <WeatherCard :forecast="forecast" :city-name="city.name" :key="city.name" />
    </div>

    <!-- Отладочная информация -->
    <div
      v-if="city || forecast"
      class="debug-info"
      style="
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        font-size: 12px;
      "
    >
      <p>Debug Info:</p>
      <p>City: {{ city ? 'Set' : 'Not set' }}</p>
      <p>Forecast: {{ forecast ? 'Set' : 'Not set' }}</p>
      <p>City name: {{ city?.name }}</p>
      <p>Forecast hourly: {{ forecast?.hourly ? 'Has data' : 'No data' }}</p>
      <p>Temperature count: {{ forecast?.hourly?.temperature_2m?.length || 0 }}</p>
    </div>

    <div v-if="!city && !isLoading && !error" class="welcome-section fade-in">
      <div class="welcome-card">
        <div class="welcome-icon">🌤️</div>
        <h2>Welcome to Weather Forecast</h2>
        <p>Enter a city name and date to get detailed weather information</p>
        <div class="features">
          <div class="feature">
            <span class="feature-icon">📊</span>
            <span>Hourly forecasts</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🌡️</span>
            <span>Temperature charts</span>
          </div>
          <div class="feature">
            <span class="feature-icon">📍</span>
            <span>Global coverage</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { searchLocation } from '@/composables/useGeocoding';
import { getDailyForecast } from '@/composables/useWeather';
import type { City, WeatherForecast } from '@/types/weather';

const city = ref<City | null>(null);
const lastSearchQuery = ref<string>('');
const lastSearchDate = ref<string>('');

const forecast = ref<WeatherForecast | null>(null);
const { fetchWeather, isLoading, error } = getDailyForecast();

async function handleSearch(name: string, startDate: string) {
  console.log('Starting search for:', name, 'on date:', startDate);
  error.value = null;
  forecast.value = null;
  lastSearchQuery.value = name;
  lastSearchDate.value = startDate;

  try {
    const location = await searchLocation(name);
    console.log('Location result:', location);

    if (!location) {
      error.value = 'City not found. Please check the spelling and try again.';
      return;
    }
    city.value = location;
    console.log('City set to:', city.value);

    const data = await fetchWeather(location.latitude, location.longitude, startDate);
    console.log('Weather data received:', data);

    if (data) {
      forecast.value = data;
      console.log('Forecast set to:', forecast.value);
      console.log('Forecast has hourly data:', !!forecast.value?.hourly);
      console.log('Hourly temperatures count:', forecast.value?.hourly?.temperature_2m?.length);
    } else {
      console.error('No weather data received');
      error.value = 'Failed to fetch weather data';
    }
  } catch (err) {
    console.error('Search error:', err);
    error.value =
      err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
  }
}

function retrySearch() {
  if (lastSearchQuery.value && lastSearchDate.value) {
    handleSearch(lastSearchQuery.value, lastSearchDate.value);
  }
}

function testData() {
  console.log('Testing data display...');
  console.log('Current city:', city.value);
  console.log('Current forecast:', forecast.value);

  // Создаем тестовые данные
  const testCity = {
    id: 2643743,
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    elevation: 25,
    feature_code: 'PPLC',
    country_code: 'GB',
    admin1_id: 6269131,
    admin2_id: 2648110,
    timezone: 'Europe/London',
    population: 8961989,
    country_id: 2635167,
    country: 'United Kingdom',
    admin1: 'England',
    admin2: 'Greater London',
  };

  const testForecast = {
    latitude: 51.5,
    longitude: -0.120000124,
    timezone: 'GMT',
    hourly: {
      time: [
        '2023-10-26T00:00',
        '2023-10-26T01:00',
        '2023-10-26T02:00',
        '2023-10-26T03:00',
        '2023-10-26T04:00',
        '2023-10-26T05:00',
        '2023-10-26T06:00',
        '2023-10-26T07:00',
        '2023-10-26T08:00',
        '2023-10-26T09:00',
        '2023-10-26T10:00',
        '2023-10-26T11:00',
        '2023-10-26T12:00',
        '2023-10-26T13:00',
        '2023-10-26T14:00',
        '2023-10-26T15:00',
        '2023-10-26T16:00',
        '2023-10-26T17:00',
        '2023-10-26T18:00',
        '2023-10-26T19:00',
        '2023-10-26T20:00',
        '2023-10-26T21:00',
        '2023-10-26T22:00',
        '2023-10-26T23:00',
      ],
      temperature_2m: [
        15.5, 14.9, 14.4, 13.8, 13.3, 13.1, 13.4, 14.2, 15.4, 16.7, 17.6, 18.7, 19.1, 20.1, 19.6,
        20.7, 20.6, 21.1, 21.3, 21.1, 20.7, 19.8, 18.9, 17.9,
      ],
    },
    hourly_units: {
      temperature_2m: '°C',
      time: 'iso8601',
    },
  };

  city.value = testCity;
  forecast.value = testForecast;
  error.value = null;

  console.log('Test data set:', { city: city.value, forecast: forecast.value });
}
</script>

<style scoped>
.home-container {
  max-width: var(--max-width-xl);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.header-section {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.weather-icon {
  width: 80px;
  height: 80px;
  animation: pulse 3s infinite;
}

.weather-icon svg {
  width: 100%;
  height: 100%;
}

.app-title {
  margin: 0;
  font-size: var(--font-size-4xl);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.app-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin: 0;
  max-width: 400px;
}

.search-section {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--bg-glass);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-section {
  display: flex;
  justify-content: center;
}

.error-card {
  background: var(--bg-glass);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  text-align: center;
  max-width: 500px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
}

.error-card h3 {
  color: var(--error-color);
  margin-bottom: var(--spacing-md);
}

.error-card p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.weather-section {
  display: flex;
  justify-content: center;
}

.welcome-section {
  display: flex;
  justify-content: center;
}

.welcome-card {
  background: var(--bg-glass);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  text-align: center;
  max-width: 600px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.welcome-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.welcome-card h2 {
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.welcome-card p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-lg);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

.feature:hover {
  transform: translateY(-2px);
  background: var(--bg-tertiary);
}

.feature-icon {
  font-size: 2rem;
}

.feature span:last-child {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* Адаптивность */
@media (max-width: 768px) {
  .home-container {
    gap: var(--spacing-xl);
  }

  .app-title {
    font-size: var(--font-size-3xl);
  }

  .app-subtitle {
    font-size: var(--font-size-base);
  }

  .weather-icon {
    width: 60px;
    height: 60px;
  }

  .error-card,
  .welcome-card {
    padding: var(--spacing-xl);
    margin: 0 var(--spacing-md);
  }

  .features {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .welcome-icon {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .home-container {
    gap: var(--spacing-lg);
  }

  .app-title {
    font-size: var(--font-size-2xl);
  }

  .weather-icon {
    width: 50px;
    height: 50px;
  }

  .error-card,
  .welcome-card {
    padding: var(--spacing-lg);
  }

  .welcome-icon {
    font-size: 2.5rem;
  }

  .feature {
    padding: var(--spacing-md);
  }
}
</style>
