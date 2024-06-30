const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type: String
    },
    phone : {
        type: String
    },
    email : {
        type: String
    },
    date : {
        type: String
    },
    time : {
        type: String
    },
    numberOfGuests : {
        type: String
    },
});

module.exports = mongoose.model('Booking', UserSchema);