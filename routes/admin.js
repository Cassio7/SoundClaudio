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

// Get all the users, need a token from admin
router.get('/getall', auth.auth, check.checkadmin, (req, res) => {
    query = "select * from users"
    connection.query(query, (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            else
                return res.status(404).json({ message: "No users found" });
        }
    })
})

// Delete user
router.post('/delete', auth.auth, check.checkadmin, (req, res) => {
    let id = req.body.id;
    query = "delete from users where users.id = ?"
    connection.query(query, [id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            return res.status(200).json({ message: "Deleted" });
        }
    })
})

// Promote user to admin
router.post('/promote', auth.auth, check.checkadmin, (req, res) => {
    let id = req.body.id;
    query = "update users set users.admin = 1 where users.id = ?"
    connection.query(query, [id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            return res.status(200).json({ message: "Promoted" });
        }
    })
})

// Get all the albums
router.get('/getallalbums', auth.auth, check.checkadmin, (req, res) => {
    query = "select albums.id,albums.img,artists.name,albums.name as namealb from albums inner join artists on albums.id_artist = artists.id"
    connection.query(query, (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            else
                return res.status(404).json({ message: "No albums found" });
        }
    })
})

// Delete album
router.post('/deletealbums', auth.auth, check.checkadmin, (req, res) => {
    let id = req.body.id;
    query = "delete from albums where albums.id = ?"
    connection.query(query, [id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            return res.status(200).json({ message: "Deleted" });
        }
    })
})

// Get all the songs
router.get('/getallsongs', auth.auth, check.checkadmin, (req, res) => {
    query = "select songs.id,songs.name,albums.img,albums.name as namealb, artists.name as nameart from songs inner join albums on albums.id = songs.id_album inner join artists on songs.id_artist = artists.id"
    connection.query(query, (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            else
                return res.status(404).json({ message: "No songs found" });
        }
    })
})

// Delete song
router.post('/deletesong', auth.auth, check.checkadmin, (req, res) => {
    let id = req.body.id;
    query = "delete from songs where songs.id = ?"
    connection.query(query, [id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            return res.status(200).json({ message: "Deleted" });
        }
    })
})

router.post('/updatetitle', auth.auth, check.checkadmin, (req, res) => {
    let id = req.body.id;
    let newtitle = req.body.newtitle;
    console.log(newtitle)
    query=`update songs set name = ? where songs.id = ?`;
    connection.query(query, [newtitle, id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            return res.status(200).json({ message: "Updated" });
        }
    })
})

module.exports = router;