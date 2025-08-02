export async function searchLocation(name: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    name
  )}&count=1&language=en&format=json`;

  console.log('Geocoding API Request:', { name, url });

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    console.log('Geocoding API Response:', data);

    if (!data.results || data.results.length === 0) {
      throw new Error(`City "${name}" not found`);
    }

    return data.results[0];
  } catch (error) {
    console.error('Geocoding API Error:', error);

    // Попробуем без заголовков
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.log('Trying without headers...');
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        console.log('Geocoding API Response (no headers):', data);

        if (!data.results || data.results.length === 0) {
          throw new Error(`City "${name}" not found`);
        }

        return data.results[0];
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        throw new Error(
          'Network error: Unable to connect to geocoding service. Please check your internet connection.'
        );
      }
    }

    throw error;
  }
}
