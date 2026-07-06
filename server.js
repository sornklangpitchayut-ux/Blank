const express = require('express');
const app = express();

// Use Render's dynamic port environment variable, fallback to 3000 for local development
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON request bodies
app.use(express.json());

// Basic GET route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to your local server!" });
});

// Basic POST route
app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    res.status(201).json({
        status: "success",
        received: receivedData
    });
});

// Start the server (binding to '0.0.0.0' is required for cloud hosting)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
