var mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
    jobId: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    jobTitle: {
        type: String
    },
    postedDate: Date,
    role: String,
    responsibility: String,
    companyName: String,
    experience: String,
    salary: String,
    noOfPositions: String,
    // location: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Location"
    // }], 
    skills: String,
    degree: String,
    companyInfo: String,
    employmentType: String,
    industryType: String,
    searchKeyword: String,
    jobDescription: String,
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Job", jobSchema);
