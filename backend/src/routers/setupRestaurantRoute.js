const router = require("express").Router()
const multer = require("multer")

const {
  getRestaurantInfo,
  updateRestaurantInfo
} = require("../components/setup_restaurant/index")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.put("/:id", upload.single("image"), updateRestaurantInfo)
router.get("/:id", getRestaurantInfo)

module.exports = router
