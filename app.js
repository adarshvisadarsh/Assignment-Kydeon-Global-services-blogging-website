const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database host: ${DB_HOST}`);
  console.log(`Database user: ${DB_USER}`);
  console.log(`Database name: ${DB_NAME}`);
});
