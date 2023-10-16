const express = require('express');
const connection = require('../connection');
const router = express.Router();


// Get all the album lited with the name of the artist
router.get('/getallalbums', (req, res) => {
    const query = `
        SELECT 
            albums.id, 
            albums.img, 
            albums.name, 
            artists.name AS nameart
        FROM albums
        INNER JOIN artists ON albums.id_artist = artists.id;
  `;
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
// Fetch album, artist, and songs by album ID
router.post('/:id', (req, res) => {
    const album = req.params.id;
    const query = `
    SELECT 
        songs.id, 
        songs.name AS namesong, 
        albums.img, 
        albums.name, 
        artists.name AS nameart
    FROM albums
    INNER JOIN artists ON albums.id_artist = artists.id
    INNER JOIN songs ON albums.id = songs.id_album
    WHERE albums.id = ?;
  `;
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

// Fetch song, comments, and user info by song ID
router.post('/song/:id', (req, res) => {
    const song = req.params.id;
    query = `  
        SELECT 
            comments.id, 
            comments.comment,
            comments.id_user,
            songs.id, 
            songs.name AS namesong, 
            albums.img, 
            albums.name, 
            artists.name AS nameart, 
            songs.mp3,
            users.id,
            users.name as nameuser
        FROM albums
        INNER JOIN artists ON albums.id_artist = artists.id
        INNER JOIN songs ON albums.id = songs.id_album
        INNER JOIN comments ON songs.id = comments.id_song
        INNER JOIN users ON comments.id_user = users.id
        WHERE songs.id = ?;`
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
})

module.exports = router;