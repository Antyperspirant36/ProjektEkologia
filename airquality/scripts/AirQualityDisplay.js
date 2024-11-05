const apiKey = '6f8c6c7c361c24c67487eafa3c9fd48d';

function getData() {
    const city = document.getElementById('cityInput').value;
    getCityCoordinates(city);
}

async function getCityCoordinates(cityName, stateCode = '', countryCode = '', limit = '') {
    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;

    try {
        const response = await fetch(geoURL);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log('Pełna odpowiedź z API (współrzędne miasta):', data);

        if (data.length === 0) {
            console.log(`Brak wyników dla lokalizacji: ${cityName}`);
            return;
        }

        const lat = Math.round(data[0].lat);
        const lon = Math.round(data[0].lon);
        console.log(`Zaokrąglone współrzędne miasta ${cityName}:`);
        console.log(`Szerokość geograficzna: ${lat}`);
        console.log(`Długość geograficzna: ${lon}`);

        getAirPollutionData(lat, lon, cityName); // Pass cityName to display it
    } catch (error) {
        console.log('Błąd w pobieraniu współrzędnych miasta:', error);
    }
}

async function getAirPollutionData(lat, lon, cityName) {
    const airURL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await fetch(airURL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const airQualityIndex = data.list[0].main.aqi;
        const components = data.list[0].components;

        // Display air quality information based on the AQI
        const airQualityText = {
            1: "1 - Bardzo dobra",
            2: "2 - Dobra",
            3: "3 - Umiarkowana",
            4: "4 - Zła",
            5: "5 - Bardzo zła"
        };

        // Update the HTML with the city name, air quality index, and CO2 level
        document.getElementById('cityDisplay').innerHTML = cityName;
        document.getElementById('airDisplay').innerHTML = `Jakość powietrza: <strong>${airQualityText[airQualityIndex]}</strong>`;
        document.getElementById('carbon').innerHTML = `Zawartość dwutlenku węgla: ${components.co} µg/m³`;

        // Make the .card element visible
        document.querySelector('.card').style.display = 'block';
    } catch (error) {
        console.log('Błąd w pobieraniu danych o jakości powietrza:', error);
    }
}
/******  774a0fe0-9f96-41cc-a4b9-21ef8f0b38d6  *******/
