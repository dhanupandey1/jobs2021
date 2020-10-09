const express = require("express"),
    app = express(),
    jwt = require("jsonwebtoken"),
    mongoose = require("mongoose"),
    verifyToken = require("./auth/verifyToken"),
    key = require("./key/key"),
    bodyParser = require("body-parser");

require('dotenv').config();
var cors = require('cors')



// mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
mongoose.connect("mongodb://localhost:27017/Jobs2020",{useNewUrlParser : true});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/",(req, res) => {
    res.send("Hello, World");
})

const adminRoutes = require("./admin/adminController"),
    authRoutes = require("./auth/authController"),
    userRoutes = require("./user/userController"),
    locationRoutes = require("./location/locationController"),
    jobRoutes = require("./jobPosts/jobPostsController"),
    jobSavedRoutes = require("./jobSaved/jobSavedController"),
    jobAppliedRoutes = require("./jobApplied/jobAppliedController");

app.use("/admin", adminRoutes);
app.use("/login", authRoutes);
app.use("/user",  userRoutes);
app.use("/location", verifyToken, locationRoutes);
app.use("/jobs",  jobRoutes);
app.use("/savedjobs", verifyToken, jobSavedRoutes);
app.use("/appliedjobs", verifyToken, jobAppliedRoutes);


app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Server Started!!!");
});
