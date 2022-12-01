const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    userId: String,
    username: String,
    password: String
}).index({username: 1}, {unique: true})

const AccountsCollection = mongoose.model('Accounts', accountSchema);

module.exports = AccountsCollection;