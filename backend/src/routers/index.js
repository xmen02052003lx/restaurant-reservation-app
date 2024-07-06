const router = require("express").Router()
// const userRoute = require('./user')
const authRoute = require("./authRoute")

const bookingRoute = require("./bookingRoute")
const menuRoute = require("./menu")
const restaurantRoute = require("./restaurantRoute")
const setupRestaurant = require('./setupRestaurantRoute')
//  router.use('/auth', userRoute);
router.use("/user", authRoute)
router.use("/booking", bookingRoute)
router.use("/menu", menuRoute)
router.use("/restaurant", restaurantRoute)
router.use("/admin/setup-restaurant", setupRestaurant);
module.exports = router
