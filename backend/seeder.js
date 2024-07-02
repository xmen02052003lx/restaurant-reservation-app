const mongoose = require("mongoose")
const Restaurant = require("./src/models/restaurants")

mongoose.connect(
  "mongodb+srv://minhquan02052003:63GX0pmmuFvOjb01@mindxdatbannhahang.qsv3bhn.mongodb.net/?retryWrites=true&w=majority&appName=mindXdatbannhahang",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const seedRestaurants = async () => {
  try {
    const restaurantCount = await Restaurant.countDocuments()

    if (restaurantCount === 0) {
      const restaurants = [
        {
          name: "Nhà hàng A",
          address: "Địa chỉ A",
          openTime: "08:00",
          closeTime: "22:00",
          description: "Mô tả nhà hàng A",
          images: [],
          tableCount: 5
        }
      ]

      await Restaurant.insertMany(restaurants)
      console.log("Dữ liệu mẫu đã được thêm vào database!")
    } else {
      console.log("Database đã có dữ liệu, không cần thêm dữ liệu mẫu.")
    }

    mongoose.connection.close()
  } catch (error) {
    console.error("Lỗi khi thêm dữ liệu mẫu:", error)
    mongoose.connection.close()
  }
}

seedRestaurants()
