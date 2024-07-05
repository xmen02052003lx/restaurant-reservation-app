const { createBooking, listBooking } = require("../components/booking")

const router = require("express").Router()
router.post("/create", createBooking)
router.get("/list", listBooking)

module.exports = router
