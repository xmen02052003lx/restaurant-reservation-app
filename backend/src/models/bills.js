const mongoose = require("mongoose")

const billSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tables",
    required: true
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menus",
        required: true
      },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  paidAt: { type: Date, default: Date.now }
})

const Bill = mongoose.model("Bill", billSchema)

module.exports = Bill
