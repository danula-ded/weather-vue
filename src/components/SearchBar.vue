<template>
  <div class="search-container">
    <form class="search-form" @submit.prevent="handleSubmit">
      <div class="search-input-group">
        <div class="input-wrapper">
          <div class="input-icon">📍</div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Enter city name..."
            class="search-input"
            :class="{ 'has-error': showError }"
            @input="clearError"
          />
        </div>

        <div class="input-wrapper">
          <div class="input-icon">📅</div>
          <input
            v-model="startDate"
            type="date"
            class="date-input"
            :class="{ 'has-error': showError }"
            @change="clearError"
          />
        </div>

        <button type="submit" class="search-button" :disabled="!isValid">
          <span class="button-text">Search</span>
          <div class="button-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      <div v-if="showError" class="error-message">
        <span class="error-icon">⚠️</span>
        <span>Please fill in both fields</span>
      </div>
    </form>

    <div class="quick-suggestions">
      <p class="suggestions-title">Popular cities:</p>
      <div class="suggestions-list">
        <button
          v-for="city in popularCities"
          :key="city"
          class="suggestion-button"
          @click="selectCity(city)"
        >
          {{ city }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const emit = defineEmits<{
  (e: 'search', searchQuery: string, startDate: string): void;
}>();

const searchQuery = ref('');
const startDate = ref(new Date().toISOString().split('T')[0]);
const showError = ref(false);

const popularCities = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Moscow',
  'Berlin',
  'Rome',
  'Madrid',
];

const isValid = computed(() => {
  return searchQuery.value.trim() && startDate.value;
});

// Загружаем сохраненные значения из localStorage при монтировании
onMounted(() => {
  const savedCity = localStorage.getItem('last_city');
  const savedDate = localStorage.getItem('last_date');

  if (savedCity) {
    searchQuery.value = savedCity;
  }

  if (savedDate) {
    startDate.value = savedDate;
  }
});

function handleSubmit() {
  if (!isValid.value) {
    showError.value = true;
    return;
  }

  // Сохраняем значения в localStorage
  localStorage.setItem('last_city', searchQuery.value.trim());
  localStorage.setItem('last_date', startDate.value);

  emit('search', searchQuery.value.trim(), startDate.value);
}

function selectCity(city: string) {
  searchQuery.value = city;
  startDate.value = new Date().toISOString().split('T')[0];
  handleSubmit();
}

function clearError() {
  showError.value = false;
}
</script>

<style scoped>
.search-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.search-input-group {
  display: flex;
  gap: var(--spacing-md);
  align-items: stretch;
}

.input-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: var(--spacing-md);
  z-index: 2;
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input,
.date-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md)
    calc(var(--spacing-md) * 2 + 1.5rem);
  font-size: var(--font-size-base);
  background: var(--bg-glass);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
}

.search-input:focus,
.date-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: var(--bg-card);
}

.search-input.has-error,
.date-input.has-error {
  border-color: var(--error-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.date-input {
  min-width: 140px;
  cursor: pointer;
}

.date-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

.search-button {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--font-size-base);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  min-width: 120px;
  justify-content: center;
}

.search-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

.search-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon svg {
  width: 100%;
  height: 100%;
}

.error-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--error-color);
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255, 107, 107, 0.1);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 107, 107, 0.2);
}

.error-icon {
  font-size: var(--font-size-base);
}

.quick-suggestions {
  margin-top: var(--spacing-xl);
  text-align: center;
}

.suggestions-title {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.suggestion-button {
  background: var(--bg-glass);
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
}

.suggestion-button:hover {
  background: var(--bg-card);
  color: var(--text-primary);
  border-color: var(--primary-color);
  transform: translateY(-1px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .search-input-group {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .search-button {
    width: 100%;
    padding: var(--spacing-lg);
  }

  .suggestions-list {
    gap: var(--spacing-xs);
  }

  .suggestion-button {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
  }
}

@media (max-width: 480px) {
  .search-container {
    padding: 0 var(--spacing-sm);
  }

  .search-input,
  .date-input {
    padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm)
      calc(var(--spacing-sm) * 2 + 1.2rem);
    font-size: var(--font-size-sm);
  }

  .input-icon {
    font-size: var(--font-size-base);
    left: var(--spacing-sm);
  }

  .suggestions-list {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xs);
  }
}
</style>
