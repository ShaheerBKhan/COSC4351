const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    userId: String,
    fullName: String,
    phone: String,
    email: String,
    tableNumber: String,
    tableSize: String,
    date: String,
    time: String,
    combineNeeded: Boolean,
    guestCount: Number,
    cardName: String,
    cardNumber: String,
    cardExp: String,
    cardCvc: String
})

const ReservationCollection = mongoose.model('Reservations', reservationSchema);

module.exports = ReservationCollection;