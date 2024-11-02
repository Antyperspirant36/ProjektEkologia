fetch("", {
    method: 'GET', // or 'POST' depending on what you're doing
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Handle the data received from the backend
  })
  .catch(error => {
    console.error('Error:', error);
  });