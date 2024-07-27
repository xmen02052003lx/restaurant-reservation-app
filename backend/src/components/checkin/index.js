const CheckIn = require("../../models/checkin")
const Table = require("../../models/tables")
const crypto = require("crypto")
const QRCode = require("qrcode")

const checkin = async (req, res) => {
  try {
    console.log("req.params.id: ", req.params.checkinUrl)
    const table = await Table.findById(req.params.checkinUrl)
    if (!table) {
      return res.status(404).send("Table not found")
    }

    if (table.status == 1) {
      return res.status(400).send("Table is already occupied")
    }

    const checkinUrl = crypto.randomBytes(16).toString("hex")
    const qrUrl = `http://localhost:5000/pickup/${checkinUrl}`

    const qrCode = await QRCode.toDataURL(qrUrl)
    table.checkinUrl = checkinUrl
    table.isOccupied = true
    table.qrCode = qrCode
    table.status = 1
    await table.save()

    res.send({ table, checkinUrl })
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = { checkin }
