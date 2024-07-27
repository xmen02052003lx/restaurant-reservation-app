const router = require("express").Router()
const { saveBill, getBill } = require("../components/bills")
router.get("/bill/:tableId", getBill)
router.post("/bill/pay/:tableId", saveBill)
module.exports = router
