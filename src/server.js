// src/fetchData.js
const fetch = require("node-fetch");

const url = "https://api.gios.gov.pl/pjp-api/v1/rest/station/sensors/52";

async function fetchData() {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		const data = await response.json();
		return data; // Return the fetched data
	} catch (error) {
		console.error("Error fetching data:", error);
		return null; // Return null or handle the error as needed
	}
}

module.exports = fetchData; // Export the fetchData function
