fetch("https://cors-anywhere.herokuapp.com/https://api.gios.gov.pl/pjp-api/rest/station/findAll")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error fetching data: ", error));
