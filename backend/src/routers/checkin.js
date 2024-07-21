const router = require("express").Router()
const { checkin } = require("../components/checkin")
router.put("/:checkinUrl", checkin)

module.exports = router
