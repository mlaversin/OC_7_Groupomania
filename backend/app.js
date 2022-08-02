require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
