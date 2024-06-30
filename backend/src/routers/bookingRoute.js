const { createBooking, listBooking } = require("../components/booking");

 const router = require("express").Router();
 router.post('/create', createBooking);
 router.post('/list', listBooking);

 module.exports = router