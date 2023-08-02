const jwt = require('jsonwebtoken');

function authAdmin(req,res,next) {

    if(!req.user.isAdmin) return res.status(403).send('Access Forbidden (only for admins)');

    next();
}

module.exports = authAdmin;