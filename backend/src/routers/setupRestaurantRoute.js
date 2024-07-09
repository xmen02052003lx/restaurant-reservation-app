const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {getRestaurantInfo, updateRestaurantInfo, getTableList, pickupList} = require('../components/setup_restaurant/index')
router.get('/:id', getRestaurantInfo);
router.get('/table/:id', getTableList);
router.put('/:id',upload.single('image') ,updateRestaurantInfo)
router.get('/pickuk-list/:id', pickupList)
module.exports = router;