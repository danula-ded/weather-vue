// Тестирование API
async function testGeocoding() {
  try {
    console.log('Testing Geocoding API...');
    const response = await fetch(
      'https://geocoding-api.open-meteo.com/v1/search?name=London&count=1&language=en&format=json'
    );
    const data = await response.json();
    console.log('Geocoding API Response:', data);
    return data;
  } catch (error) {
    console.error('Geocoding API Error:', error);
    return null;
  }
}

async function testWeather() {
  try {
    console.log('Testing Weather API...');
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const url = `https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&hourly=temperature_2m&start_date=${today}&end_date=${tomorrow}`;
    console.log('Weather API URL:', url);

    const response = await fetch(url);
    const data = await response.json();
    console.log('Weather API Response:', data);
    return data;
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
}

// Запуск тестов
async function runTests() {
  console.log('=== API Tests ===');

  const geocodingResult = await testGeocoding();
  if (geocodingResult && geocodingResult.results && geocodingResult.results.length > 0) {
    console.log('✅ Geocoding API работает');
    console.log('City found:', geocodingResult.results[0]);
  } else {
    console.log('❌ Geocoding API не работает');
  }

  const weatherResult = await testWeather();
  if (weatherResult && weatherResult.hourly && weatherResult.hourly.temperature_2m) {
    console.log('✅ Weather API работает');
    console.log('Temperature data points:', weatherResult.hourly.temperature_2m.length);
  } else {
    console.log('❌ Weather API не работает');
  }
}

// Если запускаем в Node.js
if (typeof window === 'undefined') {
  runTests();
} else {
  // Если в браузере, добавляем кнопку
  window.runApiTests = runTests;
}
