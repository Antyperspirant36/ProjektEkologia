const apiKey = "6f8c6c7c361c24c67487eafa3c9fd48d";
let components;
/**
 * Retrieves city data and fetches its coordinates.
 * Clears the input field and stores the city name in local storage.
 */
function getData() {
	// Get the city name from the input field
	const cityNotEdited = document.getElementById("cityInput").value;
	const city = cityNotEdited[0].toUpperCase() + cityNotEdited.substring(1);
	// Clear the input field
	document.getElementById("cityInput").value = "";
	
	// Store the city name in local storage
	localStorage.setItem("lastCity", city);
	
	// Fetch the coordinates for the specified city
	getCityCoordinates(city);
}

/**
 * Pobiera współrzędne geograficzne miasta
 * @param {string} cityName - nazwa miasta
 * @param {string} [stateCode=""] - kod stanu
 * @param {string} [countryCode=""] - kod państwa
 * @param {number} [limit=""] - liczba wyników
 */
async function getCityCoordinates(
	cityName,
	stateCode = "",
	countryCode = "",
	limit = ""
) {
	const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;

	try {
		const response = await fetch(geoURL);

		if (!response.ok)
			throw new Error(`HTTP error! status: ${response.status}`);

		const data = await response.json();
		console.log("Pełna odpowiedź z API (współrzędne miasta):", data);

		if (data.length === 0) {
			console.log(`Brak wyników dla lokalizacji: ${cityName}`);
			return;
		}

		const lat = Math.round(data[0].lat);
		const lon = Math.round(data[0].lon);
		console.log(`Zaokrąglone współrzędne miasta ${cityName}:`);
		console.log(`Szerokość geograficzna: ${lat}`);
		console.log(`Długość geograficzna: ${lon}`);

		// Pobiera dane o zanieczyszczeniu powietrza
		getAirPollutionData(lat, lon, cityName);
	} catch (error) {
		console.log("Błąd w pobieraniu współrzędnych miasta:", error);
	}
}

/**
 * Pobiera dane o zanieczyszczeniu powietrza w danym mieście
 * @param {number} lat - szerokość geograficzna
 * @param {number} lon - długość geograficzna
 * @param {string} cityName - nazwa miasta
 */
async function getAirPollutionData(lat, lon, cityName) {
	const airURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	try {
		const response = await fetch(airURL);
		if (!response.ok)
			throw new Error(`HTTP error! status: ${response.status}`);

		const data = await response.json();
		const airQualityIndex = data.list[0].main.aqi;
		components = data.list[0].components;

		/**
		 * Mapa zanieczyszczenia powietrza
		 * @typedef {Object} AirQuality
		 * @property {number} [1] - Bardzo dobra
		 * @property {number} [2] - Dobra
		 * @property {number} [3] - Umiarkowana
		 * @property {number} [4] - Zła
		 * @property {number} [5] - Bardzo zła
		 */
		const airQualityText = {
			1: "1 - Bardzo dobra",
			2: "2 - Dobra",
			3: "3 - Umiarkowana",
			4: "4 - Zła",
			5: "5 - Bardzo zła",
		};
		const airQualityImage = {
			1: "images/VeryHappy.png",
			2: "images/Happy.png",
			3: "images/Neutral.png",
			4: "images/Sad.png",
			5: "images/Angry.png",
		};
		const airQualityTitle = {
			1: "Very Happy",
			2: "Happy",
			3: "Neutral",
			4: "Sad",
			5: "Angry",
		};
		const buttonClasses = {
			1: "btn btn-success",
			2: "btn btn-success",
			3: "btn btn-warning",
			4: "btn btn-danger",
			5: "btn btn-danger",
		}
		const airQualityBackground = {
			1: "linear-gradient(33deg, rgba(34,195,63,1) 12%, rgba(172,227,13,1) 100%)",
			2: "linear-gradient(33deg, rgba(129,195,34,1) 12%, rgba(204,227,13,1) 100%)",
			3: "linear-gradient(33deg, rgba(195,177,34,1) 12%, rgba(227,135,13,1) 100%)",
			4: "linear-gradient(33deg, rgba(195,101,34,1) 12%, rgba(227,174,13,1) 100%)",
			5: "linear-gradient(33deg, rgba(195,77,34,1) 12%, rgba(227,13,13,1) 100%)",
		};

		document.getElementById("cityDisplay").innerHTML = cityName;
		document.getElementById("airDisplay").innerHTML = 
            `Jakość powietrza: <strong>${airQualityText[airQualityIndex]}</strong>`;
		document.getElementById("PM25").innerHTML = 
            `Zanieczyszczenie PM 2.5: <strong>${components.pm2_5}</strong>`;
		document.getElementById("PM10").innerHTML = 
            `Zanieczyszczenie PM 10: <strong>${components.pm10}</strong>`;
		document.getElementById("icon").src = airQualityImage[airQualityIndex];
		document.getElementById("icon").title =
			airQualityTitle[airQualityIndex];
		document.getElementById("icon").alt = airQualityTitle[airQualityIndex];
		document.getElementById('btnAdvanced').className = buttonClasses[airQualityIndex];

		document.querySelector(".card1").style.background = 
            airQualityBackground[airQualityIndex];
		document.querySelector(".card1").style.display = "flex";
		document.querySelector(".card2").style.display = "flex";
		// Update the advanced pollution data
		document.getElementById("carbon").innerHTML = 
            `Zanieczyszczenie CO₂: <strong>${components.co}</strong>`;
		document.getElementById("no2").innerHTML = 
            `Zanieczyszczenie NO₂: <strong>${components.no2}</strong>`;
		document.getElementById("ozone").innerHTML = 
            `Zanieczyszczenie O₃: <strong>${components.o3}</strong>`;
		document.getElementById("so2").innerHTML = 
            `Zanieczyszczenie SO₂: <strong>${components.so2}</strong>`;
		document.getElementById("amonia").innerHTML = 
            `Zanieczyszczenie NH₃: <strong>${components.nh3}</strong>`;
	} catch (error) {
		console.log("Błąd w pobieraniu danych o jakości powietrza:", error);
	}
}


/**
 * Toggles the visibility of the advanced section
 */
function displayAdvanced() {
	// Get elements
	const advancedSection = document.getElementById("Advanced");
	const button = document.getElementById("btnAdvanced");

	// Toggle visibility of the advanced section
	if (
		// Check if the section is currently hidden
		advancedSection.style.display === "none" ||
		advancedSection.style.display === ""
	) {
		// Show the section
		advancedSection.style.display = "flex";
		advancedSection.style.flexDirection = "column";
		// Update the button text
		button.textContent = "Ukryj szczegóły";
	} else {
		// Hide the section
		advancedSection.style.display = "none";
		// Update the button text
		button.textContent = "Pokaż szczegóły";
	}
}

//This function is called when the page is loaded, it gets the city coordinates from local storage and displays data for this city
window.onload = getCityCoordinates(localStorage.getItem("lastCity"));
