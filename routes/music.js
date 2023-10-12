const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.get('/getallalbums', (req, res) => {
    query = "select albums.id, albums.name, artists.name as nameart from albums inner join artists on albums.id_artist = artists.id;"
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

module.exports = router;