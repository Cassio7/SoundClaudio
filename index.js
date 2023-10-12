// Cross-Origin Resource Sharing ... specifies which domains access your resources
var cors = require('cors');

//web application framework that provides features for web applications
const express = require('express');

// execute the connection
const connection = require('./connection');

const usersRoute = require('./routes/users');
const musicRoute = require('./routes/music')

//create an instance of the Express, allowing to define and handle routes
const app = express();

// get the response of this localhost server
app.use(cors());

// parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({extended: true}));

// parses incoming requests with JSON payloads
app.use(express.json());

//middleware functions to incoming HTTP requests liked with the file js
app.use('/users', usersRoute);
app.use('/music', musicRoute);

module.exports = app;