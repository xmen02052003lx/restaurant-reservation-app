const multer = require("multer")
const storage = multer.memoryStorage()

const upload = multer({ storage: storage })
const router = require("express").Router()
const {
  createMenu,
  menuList,
  menuUpdate,
  menuDelete
} = require("../components/Menu")
router.post("/create", upload.single("image"), createMenu)
router.put("/update/:id", upload.single("image"), menuUpdate)
router.delete("/delete/:id", menuDelete)
router.get("/", menuList)

module.exports = router
