// loads modules
const mysql = require('mysql');
require('dotenv').config();

// get the info from the env file and save them
var connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// check connections error with DB
connection.connect((err) =>{
    if (!err) {
        console.log("Connected");
    }
    else{
        console.log(err);
    }
})

// export
module.exports = connection;