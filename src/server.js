// Import node-fetch
const fetch = require('node-fetch');

// Your URL to fetch
const url = 'https://example.com'; // Replace with your desired URL

// Fetch the URL
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Or response.text() if expecting plain text
  })
  .then(data => {
    console.log(data); // Handle the response data
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
