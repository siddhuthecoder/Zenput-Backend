const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
