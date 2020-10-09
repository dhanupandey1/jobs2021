var mongoose = require("mongoose");
const jobAppliedSchema = mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});
module.exports = mongoose.model("JobApplied", jobAppliedSchema);