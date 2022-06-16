require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const userRoutes = require('./routes/user.routes');

/*
 * Configure database connection
 */
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('✔ Connected to database !'))
  .catch(() => console.log('⚠ Database connection failure !'));

/*
 * Parses incoming JSON requests and puts the parsed data in req.body
 */
app.use(express.json());

/*
 * Allows cross-origin requests
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/api/user', userRoutes);

module.exports = app;
