var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var key = require("../key/key");
function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    // console.log(token);
    // console.log(bearerHeader);
    if (!token)
        return res.status(200).send({ auth: false, message: 'No token provided.' });

    // verifies secret and checks exp
    jwt.verify(token, key.tokenKey, function (err, decoded) {
        if (err) {
            console.log(err);
            return res.status(200).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.auth = true;
        req.userId = decoded.userId;
        req.username = decoded.name;
        //user who got token for email verification
        req.id = decoded.id;
        next();
    });

}

module.exports = verifyToken;