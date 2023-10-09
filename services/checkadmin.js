function checkadmin(req, res, next) {
    if (res.locals.admin == 0)
        res.sendStatus(401)
    else
        next()
}

module.exports = { checkadmin: checkadmin }