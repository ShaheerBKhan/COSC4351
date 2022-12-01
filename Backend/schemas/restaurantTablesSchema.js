const mongoose = require("mongoose");

const restaurantTablesSchema = mongoose.Schema({
    number: Number,
    size: Number,
    occupiedTimings: [{ startTime: String, endTime: String, date: String}]
}).index({number: 1}, {unique: true})

const RestaurantTablesCollection = mongoose.model('restaurant-tables', restaurantTablesSchema);

module.exports = RestaurantTablesCollection;