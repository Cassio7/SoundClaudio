const express = require('express');
const connection = require('../connection');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require('dotenv').config();

router.post('/signup', (req, res) => {
    let users = req.body;
    users.email = users.email.toLowerCase(); 
    query = "select id,email from users where email=?"
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
                            const token = jwt.sign({user : users.id}, process.env.TOKEN_KEY,{ expiresIn: '1800s' });
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
    query = "select id, email, password from users where email=?"
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
                        const token = jwt.sign({user : users.id}, process.env.TOKEN_KEY,{ expiresIn: '1800s' });
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