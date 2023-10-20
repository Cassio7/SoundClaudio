const express = require('express');
const connection = require('../connection');
const router = express.Router();

// Add song to your library
router.post('/likesong', (req, res) => {
    const idsong = req.body.idsong;
    const id = req.body.id;
    // Check if it's already in it
    query = "select songs.name from songs inner join libraries on songs.id = libraries.id_song where libraries.id_song = ? and libraries.id_user = ?"
    connection.query(query, [idsong,id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            // If the result is 0 this is meaning that the song is not in there
            if (results.length <= 0) {
                // Put the new song to library in db
                query = "insert into libraries(id_user, id_song) value(?,?);"
                connection.query(query, [id,idsong], (err, result) => {
                    if (!err) {
                        return res.status(200).json({message: "Song added to like: "+ results[0].name});
                    }
                })
            }
            // The song is already inside
            else
                return res.status(404).json({ message: "This song is already in your library: "+ results[0].name });
        }
    })

}
)

// Delete song from your library
router.post('/deletesong', (req, res) => {
    const idsong = req.body.idsong;
    const id = req.body.id;
    // Check if it's already in it
    query = "select songs.name from songs inner join libraries on songs.id = libraries.id_song where libraries.id_song = ? and libraries.id_user = ?"
    connection.query(query, [idsong,id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            // If the result is greater than 0 continue to delete
            if (results.length > 0) {
                // Delet the song to library in db
                query = "delete from libraries where libraries.id_song = ? and libraries.id_user = ?"
                connection.query(query, [idsong,id], (err, result) => {
                    if (!err) {
                        return res.status(200).json({message: "Song removed from library: "+ results[0].name});
                    }
                })
            }
            // The song is not inside
            else
                return res.status(404).json({ message: "This song is not in your library: "});
        }
    })

}
)

// Get all the liked songs from a specific user
router.post('/getlikes', (req, res) => {
    const id = req.body.id;
    console.log(id)
    query = "select songs.name, songs.id from libraries inner join songs on songs.id = libraries.id_song where libraries.id_user = ?";
    connection.query(query, [id], (err, results) => {
        if (err)
            return res.status(400).json(err);
        else {
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            else
                return res.status(404).json({ message: "Nothing found" });
        }
    })
}
)

module.exports = router;