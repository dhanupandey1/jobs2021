const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    createdTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', adminSchema);