import { render, screen } from '@testing-library/vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { describe, it, expect } from 'vitest';

const mockForecast = {
  hourly: {
    temperature_2m: Array.from({ length: 24 }, (_, i) => 15 + i), // [15, 16, ...]
    time: Array.from({ length: 24 }, (_, i) => {
      const date = new Date();
      date.setHours(i, 0, 0, 0);
      return date.toISOString();
    }),
  },
  hourly_units: {
    temperature_2m: '°C',
    time: 'iso8601',
  },
  latitude: 55.75,
  longitude: 37.62,
  timezone: 'Europe/Moscow',
};

describe('WeatherCard.vue', () => {
  it('renders city name and forecast list correctly', () => {
    render(WeatherCard, {
      props: {
        cityName: 'Moscow',
        forecast: mockForecast,
      },
      global: {
        stubs: {
          ForecastChart: {
            template: '<div data-testid="chart"></div>',
          },
        },
      },
    });

    expect(screen.getByText('Moscow')).toBeInTheDocument();

    const tempItems = screen.getAllByText(/°C$/);
    expect(tempItems.length).toBe(24);

    const timeRegex = /^\d{1,2}:\d{2}(?:\s?[AP]M)?$/i;
    const timeSpans = screen.getAllByText((content) => timeRegex.test(content));
    expect(timeSpans.length).toBe(24);
  });
});
