const Restaurant = require("../../models/restaurants")
const Table = require("../../models/tables")
const CheckIn = require("../../models/checkin")
const Order = require("../../models/orders")

const updateRestaurantInfo = async (req, res) => {
  const { name, address, openTime, closeTime, description, number_table } =
    req.body

  console.log(req.body)
  console.log(req.params)

  const updateData = {
    name,
    address,
    openTime,
    closeTime,
    description
  }

  if (req.files) {
    updateData.images = req.files.map(file => ({
      data: file.buffer,
      contentType: file.mimetype
    }))
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    const tables = []
    await Table.deleteMany({})
    for (let i = 1; i <= number_table; i++) {
      tables.push({
        tableNumber: i,
        isOccupied: "",
        checkinUrl: "",
        qrCode: "",
        status: 0
      })
    }

    await Table.insertMany(tables)
    res
      .status(201)
      .json({
        message: "Cập nhật thông tin thành công!",
        data: restaurant,
        tables
      })
  } catch (err) {
    res.status(500).send(err)
  }
}

const pickupList = async (req, res) => {
  try {
    const order = await Order.findOne({ table_id: req.params.id })
    order.totalPrice = calculateTotalPrice(order.items)
    res.json(order)
  } catch (err) {
    res.status(500).send(err)
  }
}

const calculateTotalPrice = items => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

const getRestaurantInfo = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const getTableList = async (req, res) => {
  try {
    const table = await Table.find({})
    res.json(table)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getRestaurantInfo,
  updateRestaurantInfo,
  getTableList,
  pickupList
}
