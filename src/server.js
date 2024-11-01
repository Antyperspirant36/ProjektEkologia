<<<<<<< HEAD:src/server.js
// Fetching data using the built-in http module
const http = require('http');

const options = {
    hostname: 'api.gios.gov.pl',
    path: '/pjp-api/rest/station/findAll',
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';

    // Listen for data
    res.on('data', (chunk) => {
        data += chunk;
    });

    // On end of response
    res.on('end', () => {
        console.log(JSON.parse(data)); // Parse and log the JSON data
    });
});

// Handle request errors
req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

// End the request
req.end();
=======
// Replace with your deployed proxy server URL
const url = 'https://your-proxy-server.com/api/station/findAll';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Sensor Data:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
>>>>>>> a34871573c6f6942c7ecfe1b06275eaf422f7d62:server.js
