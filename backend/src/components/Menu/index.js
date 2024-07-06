const menu = require("../../models/menu")

const createMenu = async (req, res) => {
  const { dish_code, name, category, description, unit, price, discount } =
    req.body

  const newMenu = new menu({
    dish_code,
    name,
    category,
    description,
    unit,
    price,
    discount,
    image: {
      data: req.file.buffer.toString("base64"),
      contentType: req.file.mimetype
    }
  })

  try {
    await newMenu.save()
    res.status(201).json({ message: "Món ăn đã được tạo thành công!" })
  } catch (err) {
    res.status(500).send(err)
  }
}

const menuList = async (req, res) => {
  try {
    const items = await menu.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: "Error!" })
  }
}

const menuDelete = async (req, res) => {
  try {
    await menu.findByIdAndDelete(req.params.id)
    res.send("Món ăn đã được xóa thành công!")
  } catch (err) {
    res.status(500).send(err)
  }
}

const menuUpdate = async (req, res) => {
  const { code, name, category, description, unit, price, discount } = req.body

  const updateData = {
    code,
    name,
    category,
    description,
    unit,
    price,
    discount
  }

  if (req.file) {
    updateData.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  }

  try {
    const item = await menu.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    })
    res.json(item)
  } catch (err) {
    res.status(500).send(err)
  }
}

const pickup = async (req, res) => {
  console.log(req.body)
}

module.exports = {
  createMenu,
  menuList,
  menuDelete,
  menuUpdate,
  pickup
}
