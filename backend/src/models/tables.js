const mongoose = require("mongoose")

const MenuSchema = new mongoose.Schema({
  table_number: {
    type: String
  },
  status: {
    type: String
  },
})

module.exports = mongoose.model("tables", MenuSchema)
