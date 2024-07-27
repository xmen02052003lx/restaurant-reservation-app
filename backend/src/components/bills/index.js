const Order = require("../../models/orders")
const Bill = require("../../models/bills")

const getBill = async (req, res) => {
  try {
    const { tableId } = req.params

    const order = await Order.findOne({ tableId, paid: false })
    if (!order) {
      return res.status(404).send("Order not found")
    }

    order.totalPrice = calculateTotalPrice(order.items)

    res.send({
      tableId: order.tableId,
      items: order.items,
      totalPrice: order.totalPrice
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

const saveBill = async (req, res) => {
  try {
    const { tableId } = req.params

    const order = await Order.findOne({ tableId, paid: false })
    if (!order) {
      return res.status(404).send("Order not found")
    }

    // Lưu thông tin hóa đơn vào bảng hóa đơn
    const bill = new Bill({
      tableId: order.tableId,
      items: order.items,
      totalPrice: order.totalPrice
    })
    await bill.save()

    // Đánh dấu đơn hàng là đã thanh toán
    order.paid = true
    await order.save()

    res.send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

const calculateTotalPrice = items => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

module.export = {
  saveBill,
  getBill
}
