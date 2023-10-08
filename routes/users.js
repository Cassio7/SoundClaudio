const express = require('express');
const connection = require('../connection');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    let users = req.body;
    query = "select email from users where email=?"
    connection.query(query, [users.email], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            if (results.length <= 0) {
                const saltRounds = 10;
                bcrypt.hash(users.password, saltRounds).then(function (hash) {
                    query = "insert into users(name, email, salt, password ,admin) values(?,?,?,?,0)";
                    connection.query(query, [users.name, users.email, saltRounds, hash], (err, results) => {
                        if (!err) {
                            return res.status(200).json({ message: "Successfully Registred" });
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
    query = "select email, password from users where email=?"
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
                        return res.status(400).json({ message: "Password matched" });
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