const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Admin = require("./admin"),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    verifyToken = require("../auth/verifyToken");

// create an admin 
router.post("/", (req, res, next) => {
    var password = req.body.password;
    var hash = bcrypt.hashSync(password, saltRounds);
    const admin = new Admin({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: hash,
        email: req.body.email,
        mobile: req.body.mobile
    });
    admin
        .save()
        .then(result => {
            res.status(200).send({
                message: "Admin details stored"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

// getting all admin details
router.get("/", verifyToken, (req, res, next) => {
    var page = parseInt(req.query.page);
    var size = req.query.size;
    if (size === undefined)
        size = 10;
    else
        size = parseInt(req.query.size);
    if (page < 0 || page === 0) {
        response = {
            "error": true,
            "message": "invalid page number, should start with 1"
        };
        res.send(response);
    }
    var skip = size * (page - 1);
    var limit = size;
    Admin.find({}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
        .exec()
        .then(docs => {
            res.status(200).send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
});

//getting details by admin Id
router.get("/:adminId", verifyToken, (req, res, next) => {
    const id = req.params.adminId;
    Admin.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).send(doc);
            } else {
                res.status(404).send({ message: "No valid entry found for provided Id" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});


// updating admin details
router.put("/:adminId", verifyToken, (req, res, next) => {

    const id = req.params.adminId;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    Admin.findByIdAndUpdate(id, req.body)
        .exec()
        .then(result => {
            res.status(200).send({ msg: "Updated successfully" });

        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                msg: err
            });
        });
});

module.exports = router;