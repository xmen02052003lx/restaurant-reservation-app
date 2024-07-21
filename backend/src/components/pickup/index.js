const menu = require("../../models/menu")
const Table = require("../../models/tables")
const Order = require("../../models/orders")
const menuList = async (req, res) => {
  try {
    const items = await menu.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: "Error!" })
  }
}

const pickupDish = async (req, res) => {
  try {
    const table = await Table.findById(req.params.checkinUrl)
    const { table_id, item } = req.body

    let order = await Order.findOne({ table_id })

    if (!order) {
      order = new Order({ table_id, items: [{ ...item, quantity: 1 }] })
    } else {
      const existingItemIndex = order.items.findIndex(
        i => i.item_id.toString() === item.item_id
      )
      if (existingItemIndex !== -1) {
        order.items[existingItemIndex].quantity += 1
      } else {
        order.items.push({ ...item, quantity: 1 })
      }
    }
    order.totalPrice = calculateTotalPrice(order.items)
    await order.save()
    res.send(order)
  } catch (err) {
    res.status(500).send(err)
  }
}

const deleteDish = async (req, res) => {
  try {
    const { tableId, itemId } = req.body

    const order = await Order.findOne({ tableId })
    if (!order) {
      return res.status(404).send("Không tìm thấy đơn hàng")
    }

    const itemIndex = order.items.findIndex(i => i.itemId.toString() === itemId)
    if (itemIndex === -1) {
      return res.status(404).send("Không tìm thấy món ăn")
    }

    order.items.splice(itemIndex, 1)
    await order.save()

    res.send(order)
  } catch (err) {
    res.status(500).send(err)
  }
}

const calculateTotalPrice = items => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

module.exports = {
  menuList,
  pickupDish,
  deleteDish
}
