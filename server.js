const express = require('express');
const app = express();

// Root endpoint - Provides information about the service
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to the Timestamp Microservice. Use /api/:date? for timestamp conversion.",
    });
});

// API endpoint for timestamp conversion
app.get('/api/:date?', (req, res) => {
    const dateParam = req.params.date;

    let date;
    // Check if dateParam is empty
    if (!dateParam) {
        date = new Date();
    } else {
        // Check if dateParam is a timestamp
        if (!isNaN(dateParam)) {
            date = new Date(parseInt(dateParam));
        } else {
            date = new Date(dateParam);
        }
    }

    // Check if the date is valid
    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    // Respond with the timestamp
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
