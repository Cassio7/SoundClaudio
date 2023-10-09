const express = require('express');
const connection = require('../connection');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require('dotenv').config();

router.post('/signup', (req, res) => {
    let users = req.body;
    users.email = users.email.toLowerCase(); 
    query = "select email from users where email=?"
    connection.query(query, [users.email], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            if (results.length <= 0) {
                const saltRounds = 10;
                bcrypt.hash(users.password, saltRounds).then(function (hash) {
                    query = "insert into users(name, email, password ,admin) values(?,?,?,0)";
                    connection.query(query, [users.name, users.email, hash], (err, results) => {
                        if (!err) {
                            const response = {email: users.email, admin: 0}
                            const token = jwt.sign(response, process.env.TOKEN_KEY,{ expiresIn: '2h' });
                            return res.status(400).json(token);
                        }
                        else {
                            return res.status(500).json(err);
                        }
                    })
                });
            }
            else {
                console.log("esisteeee");
                return res.status(400).json({ message: "Email Already Exist. " });
            }
        }
    })
})

router.post('/login', (req, res) => {
    let users = req.body;
    // email lower case
    users.email = users.email.toLowerCase(); 
    query = "select id, email, password,admin from users where email=?"
    connection.query(query, [users.email], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            if (results.length > 0) {
                // Load hash from the db, which was preivously stored 
                bcrypt.compare(users.password, results[0].password, function (err, ress) {
                    // if res == true, password matched
                    if (ress == true){
                        const response = {email: results[0].email, admin: results[0].admin}
                        const token = jwt.sign(response, process.env.TOKEN_KEY,{ expiresIn: '2h' });
                        return res.status(400).json(token);
                    }
                    else{
                        return res.status(400).json({ message: "Password do not match" });
                    }
                });
            }
            else {
                return res.status(400).json({ message: "This Email do not exist" });
            }
        }
    })
})

module.exports = router;