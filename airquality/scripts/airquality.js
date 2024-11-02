fetch("http://localhost:3000/your-api-endpoint", {
	// Adjust the URL to your server
	method: "GET", // or POST, PUT, etc., based on your API
	headers: {
		"Content-Type": "application/json",
	},
})
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		return response.json();
	})
	.then((data) => {
		document.getElementById("result").textContent = JSON.stringify(data);
	})
	.catch((error) => {
		console.error("There has been a problem with your fetch operation:", error);
	});
