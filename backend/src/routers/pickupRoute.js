const router = require("express").Router()
const { menuList, pickupDish, deleteDish } = require("../components/pickup")
router.get("/:id", menuList)
router.post("/", pickupDish)
router.delete("/", deleteDish)
module.exports = router
