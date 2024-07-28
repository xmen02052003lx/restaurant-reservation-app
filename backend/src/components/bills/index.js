const Order = require("../../models/orders")
const Bill = require("../../models/bills")

const getBills = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("table_id", "id qrCode")
    res.json(orders)
  } catch (error) {
    res.send(err)
  }
}

const getBill = async (req, res) => {
  try {
    console.log("first test !!!!")
    const order = await Order.findById(req.params.orderId)
      .populate("table_id", "id qrCode")
      .populate("items.item_id", "image")
    if (!order) {
      return res.status(404).send("Order not found")
    }

    res.json(order)
  } catch (err) {
    res.status(500).send(err)
  }
}

const saveBill = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
    if (!order) {
      return res.status(404).send("Order not found")
    }

    // Đánh dấu đơn hàng là đã thanh toán
    order.paid = true
    order.paidAt = Date.now()
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } catch (err) {
    res.status(500).send(err)
  }
}

const calculateTotalPrice = items => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

module.exports = {
  saveBill,
  getBill,
  getBills
}
