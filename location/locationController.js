const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Location = require("./location");
var verifyToken = require("../auth/verifyToken");
// Get details of all locations with pagination to get limited records or all records
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
    Location.find({}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
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

// admin creates the location which required to be filled by the user, employer or the consultant
router.post("/", verifyToken, (req, res, next) => {
    const location = new Location({
        _id: new mongoose.Types.ObjectId(),
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        country: req.body.country
    });
    location
        .save()
        .then(result => {
            res.status(200).send({
                message: "New location saved"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

//  getting location details by a specific location id
router.get("/:locationId", (req, res, next) => {
    const id = req.params.locationId;
    Location.findById(id).
        exec()
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

// updating location details
router.put("/:locationId", verifyToken, (req, res, next) => {

    const id = req.params.locationId;
    Location.findByIdAndUpdate(id, req.body)
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
    Location.countDocuments().exec((err, result) => {
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