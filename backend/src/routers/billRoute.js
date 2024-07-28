const router = require("express").Router()
const { saveBill, getBill, getBills } = require("../components/bills")

router.get("/:orderId", getBill)
router.get("/", getBills)
router.put("/pay/:orderId", saveBill)
module.exports = router
