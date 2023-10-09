
var cors = require('cors');

const express = require('express');

const connection = require('./connection');
const usersRoute = require('./routes/users');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', usersRoute);

module.exports = app;