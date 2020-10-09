const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Job = require("./jobPosts"),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    verifyToken = require("../auth/verifyToken");

// create an admin
router.post("/",  (req, res, next) => {
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        admin: req.body.admin,
        jobTitle: req.body.jobTitle,
        postedDate: req.body.postedDate,
        role: req.body.role,
        responsibility: req.body.responsibility,
        companyName: req.body.companyName,
        experience: req.body.experience,
        salary: req.body.salary,
        noOfPositions: req.body.noOfPositions,
        location: req.body.location,
        skills: req.body.skills,
        degree: req.body.degree,
        companyInfo: req.body.companyInfo,
        employmentType: req.body.employmentType,
        industryType: req.body.industryType,
        searchKeyword: req.body.searchKeyword,
        jobDescription: req.body.jobDescription
    });
    job
        .save()
        .then(result => {
          console.log(result)
            res.status(200).send({
                message: "Job details stored"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

// getting all admin posted jobposts details
router.get("/admin/:adminId", verifyToken, (req, res, next) => {
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
    Job.find({ "admin": req.params.adminId }, {}, { skip: skip, limit: limit }).sort({ id: -1 })
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

// show all jobs
router.get("/",  (req, res, next) => {
    var page = parseInt(req.query.page);
    var size = req.query.size;
    if (size === undefined)
        size = 10;

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
    Job.find({}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
        .exec()
        .then(docs => {
          console.log(docs);
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
router.get("/:jobId", verifyToken, (req, res, next) => {
    const id = req.params.jobId;
    Job.findById(id)
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
router.put("/:jobId", verifyToken, (req, res, next) => {

    const id = req.params.jobId;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    Job.findByIdAndUpdate(id, req.body)
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
