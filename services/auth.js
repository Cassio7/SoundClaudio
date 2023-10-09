require('dotenv').config();
const jwt = require('jsonwebtoken');

function authToken(res, req, next) {
    console.log(req.body)
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.spit(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_KEY, (err, response) => {
        if (err)
            return res.sendStatus(403);
        res.locals = response
        next()
    })
}

module.exports = { auth: authToken }