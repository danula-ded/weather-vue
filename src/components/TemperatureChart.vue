<script setup lang="ts">
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { computed } from 'vue';
import type { TemperatureChartProps } from '@/types/chart';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const props = defineProps<TemperatureChartProps>();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Temperature (°C)',
      data: props.temperatures,
      borderColor: 'var(--primary-color)',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'var(--primary-color)',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'var(--secondary-color)',
      pointHoverBorderColor: '#ffffff',
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'var(--bg-glass)',
      titleColor: 'var(--text-primary)',
      bodyColor: 'var(--text-secondary)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      titleFont: {
        size: 14,
        weight: '600',
      },
      bodyFont: {
        size: 13,
      },
      padding: 12,
      callbacks: {
        title: (context: any) => {
          return `Time: ${context[0].label}`;
        },
        label: (context: any) => {
          return `Temperature: ${context.parsed.y}°C`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
        drawBorder: false,
      },
      ticks: {
        color: 'var(--text-secondary)',
        font: {
          size: 12,
        },
        maxRotation: 45,
      },
      border: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
        drawBorder: false,
      },
      ticks: {
        color: 'var(--text-secondary)',
        font: {
          size: 12,
        },
        callback: (value: any) => `${value}°C`,
      },
      border: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  elements: {
    point: {
      hoverRadius: 8,
    },
  },
};
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    height: 200px;
  }
}
</style>
