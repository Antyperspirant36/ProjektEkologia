const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies for POST requests
app.use(express.json());

// Sample API endpoint
app.get('/your-api-endpoint', (req, res) => {
    const sampleData = {
        message: "Hello from the server!",
        timestamp: new Date()
    };
    res.json(sampleData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
