// backend/app.js
const express = require('express');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors()); 
app.use(express.json({ extended: false }));


// Routes
app.use('/api/example', require('./routes/exampleRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/resume', require('./routes/fileRoutes'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
