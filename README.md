# Weather Vue App

A modern weather forecast application built with Vue 3, TypeScript, and Chart.js.

## 🌐 Live Demo

**[View the live application here](https://danula-ded.github.io/weather-vue/)**

## Features

- Search weather forecast by city
- Select custom forecast date
- Hourly temperature chart (powered by Chart.js)
- Responsive and adaptive layout
- Data persistence using localStorage (remembers last searched city)
- Unit tests using Vitest & Testing Library
- Composition API + script setup

## Tech Stack

- **Vue 3**
- **TypeScript**
- **Chart.js**
- **Vitest**
- **JSDOM**
- **Vite**

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components (SearchBar, WeatherCard, etc.)
├── composables/     # Custom logic (e.g., useWeather, useGeocoding)
├── types/          # TypeScript interfaces/types
├── views/          # Page-level views (currently HomeView)
├── App.vue
└── main.ts
test/               # Vitest unit tests
```

## Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Run development server**

```bash
npm run dev
```

3. **Run unit tests**

```bash
npm run test
```

4. **Preview production build**

```bash
npm run build && npm run preview
```

## Deployment

This project is automatically deployed to GitHub Pages on every push to the `main` branch.

- **Live URL**: https://danula-ded.github.io/weather-vue/
- **Build Status**: ![Deploy to GitHub Pages](https://github.com/danula-ded/weather-vue/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

## API

The application uses the following APIs:

- **Geocoding API**: https://geocoding-api.open-meteo.com/
- **Weather API**: https://api.open-meteo.com/

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
