const express = require('express'),
    router = express.Router(),
    Admin = require('../admin/admin'),
    User = require("../user/user"),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    saltRounds = 10;
key = require("../key/key");
//Auth Routes
router.post("/admin", function (req, res) {
    if (req.body.email == undefined)
        var username = { mobile: req.body.mobile };
    else
        var username = { email: req.body.email };
    Admin.findOne(username, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: err });
        }
        else {
            if (!user) {
                res.status(200).send({ msg: "User Not Found." });
            } else {
                var result = bcrypt.compareSync(req.body.password, user.password);
                if (result === true) {
                    var token = jwt.sign({ userId: user._id, name: user.name }, key.tokenKey, { expiresIn: '12h', issuer: 'Amaan' });
                    var decoded = jwt.decode(token);
                    res.status(200).send({ token: token, user: user });
                }
                else {
                    res.status(200).send({ msg: "Email or Password Didn't Match" });
                }
            }
        }
    })
});

router.post("/user", function (req, res) {
    if (req.body.email == undefined)
        var username = { mobile: req.body.mobile };
    else
        var username = { email: req.body.email };
    User.findOne(username, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: err });
        }
        else {
            if (!user) {
                res.status(200).send({ msg: "User Not Found." });
            } else {
                var result = bcrypt.compareSync(req.body.password, user.password);
                if (result === true) {
                    var token = jwt.sign({ userId: user._id, name: user.name }, key.tokenKey, { expiresIn: '12h', issuer: 'Amaan' });
                    var decoded = jwt.decode(token);
                    res.status(200).send({ token: token, user: user });
                }
                else {
                    res.status(200).send({ msg: "Email or Password Didn't Match" });
                }
            }
        }
    })
});

module.exports = router;
