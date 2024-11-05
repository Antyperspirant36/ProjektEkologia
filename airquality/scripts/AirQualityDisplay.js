const apiKey = '6f8c6c7c361c24c67487eafa3c9fd48d';

function getData() {
    const city = document.getElementById('cityInput').value;
    document.getElementById('cityInput').value = '';
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
        const airQualityImage = {
            1: "images/VeryHappy.png",
            2: "images/Happy.png",
            3: "images/Neutral.png",
            4: "images/Sad.png",
            5: "images/Angry.png"
        };
        const airQualityTitle = {
            1: "Very Happy",
            2: "Happy",
            3: "Neutral",
            4: "Sad",
            5: "Angry"
        };
        const airQualityBackground = {
            1: "linear-gradient(33deg, rgba(34,195,63,1) 12%, rgba(172,227,13,1) 100%)", // very happy
            2: "linear-gradient(33deg, rgba(129,195,34,1) 12%, rgba(204,227,13,1) 100%)", // happy
            3: "linear-gradient(33deg, rgba(195,177,34,1) 12%, rgba(227,135,13,1) 100%)", // neutral
            4: "linear-gradient(33deg, rgba(195,101,34,1) 12%, rgba(227,174,13,1) 100%)",  // sad
            5: "linear-gradient(33deg, rgba(195,77,34,1) 12%, rgba(227,13,13,1) 100%)"    // angry
        };

        // Update the HTML with the city name, air quality index, and pollution levels
        document.getElementById('cityDisplay').innerHTML = cityName;
        document.getElementById('airDisplay').innerHTML = `Jakość powietrza: <strong>${airQualityText[airQualityIndex]}</strong>`;
        document.getElementById('PM25').innerHTML = `Zanieczyszczenie PM 2.5: <strong>${components.pm2_5}</strong>`;
        document.getElementById('PM10').innerHTML = `Zanieczyszczenie PM 10: <strong>${components.pm10}</strong>`;
        document.getElementById('icon').src = airQualityImage[airQualityIndex];
        document.getElementById('icon').title = airQualityTitle[airQualityIndex];
        document.getElementById('icon').alt = airQualityTitle[airQualityIndex];

        // Set the gradient background based on the air quality
        document.querySelector('.card1').style.background = airQualityBackground[airQualityIndex];

        // Make the .card element visible
        document.querySelector('.card1').style.display = 'flex';
        document.querySelector('.card2').style.display = 'flex';
        document.querySelector('card2').style.flextDirection = 'column';
    } catch (error) {
        console.log('Błąd w pobieraniu danych o jakości powietrza:', error);
    }
}
