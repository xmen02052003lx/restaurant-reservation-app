const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/restaurant', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Đã kết nối');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = connectDB;
