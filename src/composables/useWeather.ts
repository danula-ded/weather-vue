import type { WeatherForecast } from '@/types/weather';
import { ref } from 'vue';

export function getDailyForecast() {
  const forecast = ref<WeatherForecast | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  async function fetchWeather(
    latitude: number,
    longitude: number,
    startDate: string
  ): Promise<WeatherForecast | null> {
    error.value = null;
    isLoading.value = true;

    // Проверяем, что дата не в прошлом
    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      console.log('Date is in the past, using today instead');
      startDate = today.toISOString().split('T')[0];
    }

    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const endDate = end.toISOString().split('T')[0];

    // Добавляем логирование для отладки
    console.log('Weather API Request:', {
      latitude,
      longitude,
      startDate,
      endDate,
      url: `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${startDate}&end_date=${endDate}`,
    });

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${startDate}&end_date=${endDate}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.reason || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Weather API Response:', data);

      forecast.value = data;
      return data;
    } catch (err) {
      forecast.value = null;
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Unexpected error';
      }
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  return { forecast, fetchWeather, error, isLoading };
}
