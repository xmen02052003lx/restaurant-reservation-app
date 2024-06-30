const router = require("express").Router();
const multer = require('multer');

const {getRestaurantInfo, updateRestaurantInfo} = require('../components/setup_restaurant')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.put('/:id', upload.array('images', 10), updateRestaurantInfo);
router.get('/:id', getRestaurantInfo);

module.exports= router;