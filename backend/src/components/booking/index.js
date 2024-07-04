const Booking = require("../../models/bookings")

const listBooking = async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.json(bookings)
  } catch (err) {
    res.status(500).send(err)
  }
}

const createBooking = async (req, res) => {
  const { name, phone, email, date, time, numberOfGuests } = req.body

  const newBooking = new Booking({
    name,
    phone,
    email,
    date,
    time,
    numberOfGuests
  })

  try {
    await newBooking.save()
    res.status(201).json({ message: "Đặt bàn đã được tạo thành công!" })
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = { createBooking, listBooking }
