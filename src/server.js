// src/server.js
const fetch = require("node-fetch"); // Import node-fetch

const url = "https://api.gios.gov.pl/pjp-api/v1/rest/station/sensors/52"; // Example URL

fetch(url)
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		return response.json();
	})
	.then((data) => {
		console.log(data); // Handle the response data
	})
	.catch((error) => {
		console.error("Error fetching data:", error);
	});
