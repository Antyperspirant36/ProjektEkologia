// Ustawienie parametrów API
const apiKey = '6f8c6c7c361c24c67487eafa3c9fd48d';
const lat = 50;
const lon = 50;
const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// Funkcja do pobrania danych z API
async function getAirPollutionData() {
  try {
    // Wysyłanie zapytania
    const response = await fetch(url);
    
    // Sprawdzanie odpowiedzi
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parsowanie odpowiedzi do formatu JSON
    const data = await response.json();
    
    // Wyświetlanie całych danych w konsoli (opcjonalnie)
    console.log('Pełna odpowiedź z API:', data);
    
    // Przetwarzanie danych
    const airQualityIndex = data.list[0].main.aqi;
    const components = data.list[0].components;

    // Wyświetlanie wartości AQI
    console.log(`Air Quality Index (AQI): ${airQualityIndex}`);
    
    // Wyświetlanie poszczególnych komponentów
    console.log(`CO (Carbon monoxide): ${components.co} µg/m³`);
    console.log(`NO (Nitrogen monoxide): ${components.no} µg/m³`);
    console.log(`NO₂ (Nitrogen dioxide): ${components.no2} µg/m³`);
    console.log(`O₃ (Ozone): ${components.o3} µg/m³`);
    console.log(`SO₂ (Sulphur dioxide): ${components.so2} µg/m³`);
    console.log(`PM₂.₅ (Fine particles): ${components.pm2_5} µg/m³`);
    console.log(`PM₁₀ (Coarse particulate matter): ${components.pm10} µg/m³`);
    console.log(`NH₃ (Ammonia): ${components.nh3} µg/m³`);

  } catch (error) {
    console.error('Błąd w pobieraniu danych z API:', error);
  }
}

// Wywołanie funkcji
getAirPollutionData();
