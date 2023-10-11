// get info
require('dotenv').config();

// modules needed for running

const http = require('http');
// start the api
const app = require('./index');

// create the connection
const server = http.createServer(app);
server.listen(process.env.PORT);
console.log("server listen at "+process.env.PORT)