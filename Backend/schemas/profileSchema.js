const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    mailingAddress1: String,
    mailingAddress2: String,
    mailingCity: String,
    mailingState: String,
    mailingZip: String,
    billingAddress1: String,
    billingAddress2: String,
    billingCity: String,
    billingState: String,
    billingZip: String,
    paymentMethod: String,
    dinerNumber: Number,
    earnedPoints: Number,
    billingCheckbox: Boolean
}).index({userId: 1}, {unique: true})

const ProfilesCollection = mongoose.model('Profiles', profileSchema);

module.exports = ProfilesCollection;