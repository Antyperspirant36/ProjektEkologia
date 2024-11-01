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
