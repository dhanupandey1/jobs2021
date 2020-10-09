const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Userexp = require("./userExp"),
    User = require("../user/User"),
    verifyToken = require("../auth/verifyToken");

//  getting users education details with pagination
router.get("/", (req, res, next) => {
    var page = parseInt(req.query.page);
    var size = req.query.size;
    console.log(size);
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
    Userexp.find({}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
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

// user creating his education details
router.post("/", (req, res, next) => {
    const userExp = new Userexp({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        currEmp: req.body.currEmp,
        destination: req.body.destination,
        currJobDesc: req.body.currJobDesc,
        currExpMonths: req.body.currExpMonths,
        prevEmp: req.body.prevEmp,
        prevJobDesc: req.body.prevJobDesc,
        prevExpMonths: req.body.prevExpMonths
    });
    userExp.save()
        .then(result => {
            res.status(200).send({
                message: "user edu details stored"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});


// getting user education based on specific user id
router.get("/user/:userId", (req, res, next) => {
    const id = req.params.userId;
    Userexp.find({ user: id })
        .exec()
        .then(doc => {
            console.log(doc);
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





// getting user education info by his user education id
router.get("/:userExpId", (req, res, next) => {
    const id = req.params.userEduId;
    Userexp.findById(id).
        exec()
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

// updating user education details
router.put("/:userExpId", verifyToken, (req, res, next) => {

    const id = req.params.userEduId;
    Userexp.findByIdAndUpdate(id, req.body)
        .exec()
        .then(result => {
            msg: "Updated successfully"
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                msg: err
            });
        });
});

router.get("/pages/count", function (req, res) {
    Userexp.countDocuments().exec((err, result) => {
        if (err) {
            res.status(404).send({ msg: err });
        } else {
            var page = Math.ceil(result / 10);
            res.status(200).send({
                pages: page,
                count: result
            });
        }
    });
});

module.exports = router;
