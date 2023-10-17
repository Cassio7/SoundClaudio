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

// Get all the info for song page
router.post('/song/:id', (req, res) => {
    const song = req.params.id;
    // Get info for a song
    query = `  
        SELECT 
            songs.id, 
            songs.name AS namesong, 
            albums.img, 
            albums.name, 
            artists.name AS nameart, 
            songs.mp3
        FROM albums
        INNER JOIN artists ON albums.id_artist = artists.id
        INNER JOIN songs ON albums.id = songs.id_album
        WHERE songs.id = ?;`;
    connection.query(query, [song], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            if (results.length > 0) {
                // Get all the comments for that tune
                query = `  
                SELECT 
                    comments.id as commentid,
                    comments.comment,
                    users.name as username
                FROM comments
                INNER JOIN songs ON comments.id_song = songs.id
                INNER JOIN users ON users.id = comments.id_user
                WHERE songs.id = ?;`;
                connection.query(query, [song], (err, comments) => {
                    if (err)
                        return res.status(400).json(err);
                    else {
                        if (comments.length > 0) {
                            // Merge 2 querys
                            const mix = [...results, ...comments];
                            return res.status(200).json(mix);
                        }
                        // If no comments just the song
                        else
                            return res.status(200).json(results);
                    }
                })
            }
            else
                return res.status(400).json({ message: "Nothing found" });
        }
    })
})

module.exports = router;