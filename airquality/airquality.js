const apiUrl = "https://api.gios.gov.pl/pjp-api/v1/rest/aqindex/getIndex/52";
const xhr = new XMLHttpRequest();
//Naprawić XD albo zrobic całe (narazie nic nie dziala)
xhr.open("GET", apiUrl, true);

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        console.log("Received JSON:", JSON.parse(xhr.responseText));
        console.log("Received text:", xhr.responseText);
    } else {
        console.error("HTTP error! status:", xhr.status);
    }
};

