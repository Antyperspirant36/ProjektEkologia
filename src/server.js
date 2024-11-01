// src/server.js

const express = require('express'); // Import express framework
const fetch = require('node-fetch'); // Import node-fetch

const app = express();
const port = 3000; // Define your port

const url = "https://api.gios.gov.pl/pjp-api/v1/rest/station/sensors/52"; // Example API URL

// Define a route to fetch data
app.get('/api/sensors', async (req, res) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        res.json(data); // Send the fetched data as JSON
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data.");
    }
});

// Serve static files from the main directory
app.use(express.static(__dirname + '/../')); // Serve files from the main directory

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
