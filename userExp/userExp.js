const mongoose = require("mongoose");

const userExpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    currEmp: String,
    destination: String,
    currJobDesc: Boolean,
    currExpMonths: String,
    prevEmp: String,
    prevJobDesc: String,
    prevExpMonths: String,
    timeCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Userexp', userExpSchema);
