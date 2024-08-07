const mongoose = require("mongoose")

const MenuSchema = new mongoose.Schema({
  dish_code: {
    type: String
  },
  name: {
    type: String
  },
  category: {
    type: String
  },
  description: {
    type: String
  },
  unit: {
    type: String
  },
  price: {
    type: Number
  },
  discount: {
    type: String
  },
  image: {
    data: String,
    contentType: String
  }
})

module.exports = mongoose.model("Menu", MenuSchema)
