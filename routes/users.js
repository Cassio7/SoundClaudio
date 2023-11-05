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
    const users = req.body;
    // lowercase email
    users.email = users.email.toLowerCase();
    // query for check email already exists, ? wait a input 
    query = "select email from users where email=?"
    // send the query and replace with users.email send from the body
    connection.query(query, [users.email], (err, results) => {
        if (err) // error query
            return res.status(400).json(err);
        else {
            // if the query has content we can procede
            if (results.length <= 0) {
                // the cost factor controls how much time is needed to calculate a single BCrypt hash
                const saltRounds = 10;
                // used to securely hash and salt a password and return to hash
                bcrypt.hash(users.password, saltRounds).then(function (hash) {
                    // insert new user to the DB
                    query = "insert into users(name, email, password , admin) values(?,?,?,0)";
                    connection.query(query, [users.name, users.email, hash], (err, results) => {
                        if (!err) {
                            // Repeat to get the id
                            query = "select * from users where email=?"
                            connection.query(query, [users.email], (err, data) => {
                                // return JWT token for auth
                                const response = { id: data[0].id, name: data[0].name, email: data[0].email ,admin: data[0].admin }
                                const token = jwt.sign(response, process.env.TOKEN_KEY, { expiresIn: '2h' });
                                console.log("registrato")
                                return res.status(200).json(token);
                            })
                        }
                        else {
                            console.log("err random")
                            return res.status(500).json(err);
                        }

                    })
                });
            }
            else {
                console.log("email esiste no registrazione")
                return res.status(400).json({ message: "Email Already Exist. " });
            }

        }
    })
})

// login users, return token
router.post('/login', (req, res) => {
    const users = req.body;
    // email lower case
    users.email = users.email.toLowerCase();
    query = "select id, name, email, password, admin from users where email=?"
    connection.query(query, [users.email], (err, results) => {
        if (err)
            return res.status(500).json(err);
        else {
            if (results.length > 0) {
                // Load hash from the db, which was preivously stored 
                bcrypt.compare(users.password, results[0].password, function (err, ress) {
                    // if res == true, password matched
                    if (ress == true) {
                        const response = { id: results[0].id, name: results[0].name, email: results[0].email ,admin: results[0].admin }
                        const token = jwt.sign(response, process.env.TOKEN_KEY, { expiresIn: '2h' });
                        return res.status(200).json(token);
                    }
                    else {
                        return res.status(400).json({ message: "Password do not match" });
                    }

                });
            }
            else {
                console.log("email non trovata");
                return res.status(400).json({ message: "This Email do not exist" });
            }

        }
    })
})

// For save the mp3 file 
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'frontend/src/assets/mp3/More/',
    filename: function (req, file, cb) {
        cb(null, req.body.title + '.mp3')
    }
})

const upload = multer({ storage: storage })

// Upload mp3 file
router.post('/upload',upload.single('mp3'), (req, res) => {
    const title = req.body.title;
    const scr = '../assets/mp3/More/'+title+ '.mp3'
    query = "insert into songs(name,id_user,id_artist,id_album,mp3) value(?,?,3,3,?);";
    connection.query(query, [title, req.body.id,scr], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else
            return res.status(200).json({ message: "Uploaded" });
    })
})

router.post('/myupload',(req, res) =>{
    query = 'select songs.id,songs.name,users.name as nameart from songs inner join users on songs.id_user = users.id where users.id = ?'
    connection.query(query, [req.body.id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else
            return res.status(200).json(results);
    })
})

module.exports = router;