const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {getRestaurantInfo, updateRestaurantInfo} = require('../components/setup_restaurant/index')
router.get('/:id', getRestaurantInfo);
router.put('/:id',upload.single('image') ,updateRestaurantInfo)

module.exports = router;