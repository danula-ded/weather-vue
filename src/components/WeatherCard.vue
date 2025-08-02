<template>
  <div v-if="forecast" class="weather-card">
    <div class="card-header">
      <div class="location-info">
        <h2 class="city-name">{{ cityName }}</h2>
        <p class="city-date">{{ formatDateToDMY(forecast.hourly.time[0]) }}</p>
      </div>
      <div class="weather-summary">
        <div class="current-temp">
          <span class="temp-value">{{ Math.round(forecast.hourly.temperature_2m[0]) }}°</span>
          <span class="temp-unit">C</span>
        </div>
        <div class="temp-range">
          <span class="min-temp"
            >{{ Math.round(Math.min(...forecast.hourly.temperature_2m.slice(0, 24))) }}°</span
          >
          <span class="range-separator">/</span>
          <span class="max-temp"
            >{{ Math.round(Math.max(...forecast.hourly.temperature_2m.slice(0, 24))) }}°</span
          >
        </div>
      </div>
    </div>

    <div class="simple-chart-section">
      <h3>24-Hour Temperature Forecast</h3>
      <div class="temperature-list">
        <div
          v-for="(temp, index) in forecast.hourly.temperature_2m.slice(0, 24)"
          :key="index"
          class="temp-item"
        >
          <span class="time">{{ formatToLocalTime(forecast.hourly.time[index]) }}</span>
          <span class="temp">{{ Math.round(temp) }}°C</span>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <div class="footer-info">
        <div class="info-item">
          <span class="info-icon">📍</span>
          <span class="info-text"
            >Coordinates: {{ forecast.latitude.toFixed(2) }},
            {{ forecast.longitude.toFixed(2) }}</span
          >
        </div>
        <div class="info-item">
          <span class="info-icon">🌍</span>
          <span class="info-text">Timezone: {{ forecast.timezone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cityName: string;
  forecast: {
    hourly: {
      temperature_2m: number[];
      time: string[];
    };
    hourly_units: {
      temperature_2m: string;
      time: string;
    };
    latitude: number;
    longitude: number;
    timezone: string;
  };
}>();

function formatDateToDMY(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

function formatToLocalTime(utcString: string): string {
  return new Date(utcString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<style scoped>
.weather-card {
  background: var(--bg-glass);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  max-width: 1000px;
  width: 100%;
}

.weather-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
  border-color: rgba(255, 255, 255, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.location-info {
  flex: 1;
}

.city-name {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin: 0 0 var(--spacing-sm) 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.city-date {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin: 0;
}

.weather-summary {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-sm);
}

.current-temp {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.temp-value {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--text-primary);
}

.temp-unit {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  font-weight: 500;
}

.temp-range {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-lg);
}

.min-temp {
  color: var(--accent-color);
  font-weight: 600;
}

.range-separator {
  color: var(--text-muted);
}

.max-temp {
  color: var(--warning-color);
  font-weight: 600;
}

.chart-section {
  margin-bottom: var(--spacing-2xl);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.chart-header h3 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: var(--spacing-lg);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.legend-color {
  width: 16px;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.chart-wrapper {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.hourly-forecast {
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-lg) 0;
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.forecast-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-normal);
}

.forecast-item:hover {
  background: var(--bg-tertiary);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.1);
}

.forecast-item.current-hour {
  background: var(--bg-glass);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px rgba(102, 126, 234, 0.2);
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.time-label {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
}

.time-period {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.temp-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.temp-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: all var(--transition-normal);
}

.card-footer {
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-info {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.info-icon {
  font-size: var(--font-size-base);
}

.simple-chart-section {
  margin: var(--spacing-2xl) 0;
}

.simple-chart-section h3 {
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.temperature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--spacing-md);
  max-height: 300px;
  overflow-y: auto;
}

.temp-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.temp-item .time {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.temp-item .temp {
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--font-size-base);
}

/* Адаптивность */
@media (max-width: 768px) {
  .weather-card {
    padding: var(--spacing-xl);
    margin: 0 var(--spacing-md);
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-lg);
  }

  .weather-summary {
    text-align: left;
    align-items: flex-start;
  }

  .city-name {
    font-size: var(--font-size-2xl);
  }

  .temp-value {
    font-size: var(--font-size-3xl);
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .forecast-grid {
    grid-template-columns: 1fr;
  }

  .footer-info {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .weather-card {
    padding: var(--spacing-lg);
    margin: 0 var(--spacing-sm);
  }

  .city-name {
    font-size: var(--font-size-xl);
  }

  .temp-value {
    font-size: var(--font-size-2xl);
  }

  .chart-wrapper {
    padding: var(--spacing-md);
  }

  .forecast-item {
    padding: var(--spacing-sm);
  }

  .time-label {
    font-size: var(--font-size-sm);
  }

  .time-period {
    font-size: var(--font-size-xs);
  }
}
</style>
