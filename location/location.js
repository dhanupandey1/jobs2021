const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    city: String,
    state: String,
    pincode: String,
    country: String
});

module.exports = mongoose.model('Location', locationSchema);