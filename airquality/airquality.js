fetch("https://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/52", {
    method: 'GET',
    mode: 'no-cors'
})
.then(response => {
    console.log(response); // Note: response will be opaque and limited
})
.catch(error => {
    console.error('Error:', error);
});
