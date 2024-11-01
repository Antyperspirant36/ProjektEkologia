// airquality/scripts/airquality.js

async function fetchData() {
    try {
        const response = await fetch('/api/sensors'); // Call the API endpoint
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        displayData(data); // Call function to display the fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("output").textContent = "Error fetching data.";
    }
}

function displayData(data) {
    const outputDiv = document.getElementById("output");
    
    // Check if data is an array and process it
    if (Array.isArray(data)) {
        data.forEach(sensor => {
            const sensorInfo = document.createElement("p");
            sensorInfo.textContent = `Sensor ID: ${sensor.id}, Sensor Name: ${sensor.name}`;
            outputDiv.appendChild(sensorInfo);
        });
    } else {
        outputDiv.textContent = "No sensor data found.";
    }
}

// Call fetchData when the script loads
fetchData();
