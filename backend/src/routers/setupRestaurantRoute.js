const router = require("express").Router()
const multer = require("multer")

const {
  getRestaurantInfo,
  updateRestaurantInfo,
  getTableList,
  pickupList
} = require("../components/setup_restaurant/index")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.put("/:id", upload.single("image"), updateRestaurantInfo)
router.get("/:id", getRestaurantInfo)
router.get("/pickuk-list/:id", pickupList)
router.get("/table/:id", getTableList)

module.exports = router
