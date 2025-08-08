require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_ID)
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.log('MongoDB connection error:', err));

// Basic health check route
app.get('/', (req, res) => {
  res.send('API is running.');
});

// Routes
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// NOTE: Do NOT use app.listen() for Vercel deployment
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
