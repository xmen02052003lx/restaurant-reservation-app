const mongoose = require("mongoose");

const Restaurant = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  openTime: String,
  closeTime: String,
  description: String,
  images: [],
  tableCount: Number
});

module.exports = mongoose.model("Restaurant", Restaurant);
