require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Placeholder for authentication middleware
const authenticate = (req, res, next) => {
    // Here you would verify the Firebase ID token from the request header
    // For now, we'll just call next()
    console.log('Authentication middleware placeholder');
    next();
};

// API routes
app.use('/api/chat', authenticate, require('./routes/api/chat'));
app.use('/api/payments', authenticate, require('./routes/api/payments'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
