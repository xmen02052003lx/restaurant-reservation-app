
const router = require("express").Router();
const {checkin} = require('../components/checkin')
router.get('/:checkinUrl', checkin);

module.exports = router;