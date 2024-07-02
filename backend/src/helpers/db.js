const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://minhquan02052003:63GX0pmmuFvOjb01@mindxdatbannhahang.qsv3bhn.mongodb.net/?retryWrites=true&w=majority&appName=mindXdatbannhahang",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log("Đã kết nối")
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = connectDB
// mongodb+srv://minhquan02052003:63GX0pmmuFvOjb01@mindxdatbannhahang.qsv3bhn.mongodb.net/?retryWrites=true&w=majority&appName=mindXdatbannhahang
