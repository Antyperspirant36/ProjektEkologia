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
