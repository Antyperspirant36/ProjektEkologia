// Ustawienie klucza API
const apiKey = '6f8c6c7c361c24c67487eafa3c9fd48d';

// Funkcja do pobrania danych o jakości powietrza z API
async function getAirPollutionData(lat, lon) {
  // Tworzenie URL na podstawie podanych współrzędnych
  const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
  try {
    const response = await fetch(airPollutionUrl);

    // Sprawdzanie, czy odpowiedź jest prawidłowa
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    // Parsowanie odpowiedzi do formatu JSON
    const data = await response.json();
    console.log('Pełna odpowiedź z API (jakość powietrza):', data);

    // Przetwarzanie i wyświetlanie danych o jakości powietrza
    const airQualityIndex = data.list[0].main.aqi;
    const components = data.list[0].components;

    console.log(`Air Quality Index (AQI): ${airQualityIndex}`);
    console.log(`CO (Carbon monoxide): ${components.co} µg/m³`);
    console.log(`NO (Nitrogen monoxide): ${components.no} µg/m³`);
    console.log(`NO₂ (Nitrogen dioxide): ${components.no2} µg/m³`);
    console.log(`O₃ (Ozone): ${components.o3} µg/m³`);
    console.log(`SO₂ (Sulphur dioxide): ${components.so2} µg/m³`);
    console.log(`PM₂.₅ (Fine particles): ${components.pm2_5} µg/m³`);
    console.log(`PM₁₀ (Coarse particulate matter): ${components.pm10} µg/m³`);
    console.log(`NH₃ (Ammonia): ${components.nh3} µg/m³`);

  } catch (error) {
    console.error('Błąd w pobieraniu danych o jakości powietrza:', error);
  }
}

// Funkcja do pobrania współrzędnych geograficznych miasta z API
async function getCityCoordinates(cityName, stateCode = '', countryCode = '', limit = '') {
  // Tworzenie URL na podstawie nazwy miasta i kodu kraju
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;

  try {
    const response = await fetch(geoUrl);

    // Sprawdzanie, czy odpowiedź jest prawidłowa
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    // Parsowanie odpowiedzi do formatu JSON
    const data = await response.json();
    console.log('Pełna odpowiedź z API (współrzędne miasta):', data);

    // Sprawdzenie, czy otrzymano jakieś wyniki
    if (data.length === 0) {
      console.log(`Brak wyników dla lokalizacji: ${cityName}`);
      return;
    }

    // Wyciąganie współrzędnych i zaokrąglanie do liczby całkowitej
    const lat = Math.round(data[0].lat);
    const lon = Math.round(data[0].lon);
    console.log(`Zaokrąglone współrzędne miasta ${cityName}:`);
    console.log(`Szerokość geograficzna: ${lat}`);
    console.log(`Długość geograficzna: ${lon}`);

    // Wywołanie funkcji getAirPollutionData z zaokrąglonymi współrzędnymi
    getAirPollutionData(lat, lon);

  } catch (error) {
    console.error('Błąd w pobieraniu współrzędnych miasta:', error);
  }
}

// Wywołanie funkcji do pobrania współrzędnych miasta i jakości powietrza
getCityCoordinates('Berlin', '', '');
