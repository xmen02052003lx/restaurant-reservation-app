const mongoose = require("mongoose")

const MenuSchema = new mongoose.Schema({
  table_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tables",
    required: true
  },
  items: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menus",
        required: true
      },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("orders", MenuSchema)
