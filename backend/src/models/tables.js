const mongoose = require("mongoose")

const MenuSchema = new mongoose.Schema({
  tableNumber: {
    type: String
  },
  status: {
    type: String
  },
  checkinUrl: {
    type: String
  },
  qrCode: {
    type: String
  },
  isOccupied: {
    type: String
  }
})

module.exports = mongoose.model("tables", MenuSchema)
