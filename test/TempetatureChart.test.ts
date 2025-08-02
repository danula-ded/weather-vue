import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import TemperatureChart from '@/components/TemperatureChart.vue';

describe('TemperatureChart.vue', () => {
  it('renders canvas element', () => {
    const { getByRole } = render(TemperatureChart, {
      props: {
        labels: ['10:00', '11:00', '12:00'],
        temperatures: [21, 22, 23],
      },
    });

    const canvas = getByRole('img');
    expect(canvas).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { container } = render(TemperatureChart, {
      props: {
        labels: ['13:00', '14:00', '15:00'],
        temperatures: [25, 26, 27],
      },
    });

    expect(container).toMatchSnapshot();
  });
});
