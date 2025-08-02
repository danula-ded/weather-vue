# Weather Vue App

A modern weather forecast application built with Vue 3, TypeScript, and Chart.js.

## Features

- Search weather forecast by city
- Select custom forecast date
- Hourly temperature chart (powered by Chart.js)
- Responsive and adaptive layout
- Data persistence using cookies (remembers last searched city)
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

src/
├── assets/ # Static assets
├── components/ # Reusable UI components (SearchBar, WeatherCard, etc.)
├── composables/ # Custom logic (e.g., useWeather, useGeocoding)
├── types/ # TypeScript interfaces/types
├── views/ # Page-level views (currently HomeView)
├── App.vue
├── main.ts
test/ # Vitest unit tests

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
