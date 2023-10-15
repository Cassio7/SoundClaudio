const express = require('express');
const connection = require('../connection');
const router = express.Router();


// Get all the album lited with the name of the artist
router.get('/getallalbums', (req, res) => {
    query = "select albums.id, albums.img ,albums.name, artists.name as nameart from albums inner join artists on albums.id_artist = artists.id;"
    connection.query(query, (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            else
                return res.status(400).json({ message: "No users found" });
        }
    })
})

router.post('/:id', (req, res) => {
    const album = req.params.id;
    query = "select songs.id,songs.name as namesong,albums.img ,albums.name, artists.name as nameart from albums inner join artists on albums.id_artist = artists.id inner join songs on albums.id = songs.id_album where albums.id = ?;"
    connection.query(query, [album], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            else
                return res.status(400).json({ message: "Nothing found" });
        }
    })
})

router.post('/song/:id', (req,res) =>{
    const song = req.params.id;
    query = "select * from songs where songs.id = ?"
    connection.query(query, [song], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            else
                return res.status(400).json({ message: "Nothing found" });
        }
    })
} )

module.exports = router;