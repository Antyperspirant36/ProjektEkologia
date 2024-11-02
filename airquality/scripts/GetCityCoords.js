// Ustawienie parametrów API
const apiKey = '6f8c6c7c361c24c67487eafa3c9fd48d';
const cityName = 'Warsaw'; // Przykładowe miasto
const stateCode = ''; // Kod stanu (opcjonalnie)
const countryCode = 'PL'; // Kod kraju (PL = Polska)
const limit = ''; // Maksymalna liczba wyników
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;

// Funkcja do pobrania współrzędnych geograficznych miasta z API
async function getCityCoordinates() {
  try {
    // Wysyłanie zapytania
    const response = await fetch(url);
    
    // Sprawdzanie odpowiedzi
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parsowanie odpowiedzi do formatu JSON
    const data = await response.json();
    
    // Sprawdzenie, czy otrzymano jakieś dane
    if (data.length === 0) {
      console.log('Brak wyników dla podanej lokalizacji.');
      return;
    }
    
    // Pobieranie szerokości i długości geograficznej
    const { lat, lon } = data[0];
    console.log(`Współrzędne miasta ${cityName}:`);
    console.log(`Szerokość geograficzna: ${lat}`);
    console.log(`Długość geograficzna: ${lon}`);
    
  } catch (error) {
    console.error('Błąd w pobieraniu danych z API:', error);
  }
}

// Wywołanie funkcji
getCityCoordinates();
