const express = require('express');
const connection = require('../connection');
const router = express.Router();

// module for hashing the password
const bcrypt = require('bcrypt');

// module for auth for the user
const jwt = require("jsonwebtoken")
require('dotenv').config();

// link 2 needed functions
const auth = require('../services/auth');
const check = require('../services/checkadmin');

// signup anon function, create new user and return token
router.post('/signup', (req, res) => {
    let users = req.body;
    // lowercase email
    users.email = users.email.toLowerCase();
    // query for check email already exists, ? wait a input 
    query = "select email from users where email=?"
    // send the query and replace
    connection.query(query, [users.email], (err, results) => {
        if (err) 
            return res.status(500).json(err);
        else {
            if (results.length <= 0) {
                const saltRounds = 10;
                bcrypt.hash(users.password, saltRounds).then(function (hash) {
                    query = "insert into users(name, email, password ,admin) values(?,?,?,0)";
                    connection.query(query, [users.name, users.email, hash], (err, results) => {
                        if (!err) {
                            const response = { email: users.email, admin: 0 }
                            const token = jwt.sign(response, process.env.TOKEN_KEY, { expiresIn: '2h' });
                            return res.status(400).json(token);
                        }
                        else 
                            return res.status(500).json(err);
                    })
                });
            }
            else 
                return res.status(400).json({ message: "Email Already Exist. " });
        }
    })
})

// login users, return token
router.post('/login', (req, res) => {
    let users = req.body;
    // email lower case
    users.email = users.email.toLowerCase();
    query = "select id, email, password, admin from users where email=?"
    connection.query(query, [users.email], (err, results) => {
        if (err)
            return res.status(500).json(err);
        else {
            if (results.length > 0) {
                // Load hash from the db, which was preivously stored 
                bcrypt.compare(users.password, results[0].password, function (err, ress) {
                    // if res == true, password matched
                    if (ress == true) {
                        const response = { email: results[0].email, admin: results[0].admin }
                        const token = jwt.sign(response, process.env.TOKEN_KEY, { expiresIn: '2h' });
                        return res.status(400).json(token);
                    }
                    else
                        return res.status(400).json({ message: "Password do not match" });
                });
            }
            else
                return res.status(400).json({ message: "This Email do not exist" });
        }
    })
})

// get all the users, need a token from admin
router.get('/getall', auth.auth, check.checkadmin, (req, res) => {
    query = "select * from users"
    connection.query(query, (err, results) => {
        if (err)
            return res.status(500).json(err);
        else {
            if (results.length > 0) {
                return res.status(400).json(results);
            }
            else
                return res.status(400).json({ message: "No users found" });
        }
    })
})

module.exports = router;