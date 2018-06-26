const express = require('express');
const morgan = require('morgan');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('./db/models');

db.sequelize.sync();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/authors', require('./db/routes/Authors.js'));
app.use('/api/blogs', require('./db/routes/Blogs.js'));

app.get('/', (req, res) => {
    res.status(200).send('success');
});

app.get('/api/blogs/featured', (req, res) => {
    res.status(200).send('featured, reporting in as ordered');
});

module.exports = app;
