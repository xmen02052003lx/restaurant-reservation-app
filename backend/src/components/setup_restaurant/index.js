const Restaurant = require('../../models/restaurants');
const updateRestaurantInfo = async (req, res) => {
    const { name, address, openTime, closeTime, description } = req.body;
  
    const updateData = {
      name,
      address,
      openTime,
      closeTime,
      description
    };
  
    if (req.files) {
      updateData.images = req.files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype
      }));
    }
  
    try {
      const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.status(201).json({ message: "Cập nhật thông tin thành công!", data: restaurant })
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
 const getRestaurantInfo = async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      res.json(restaurant);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports = {
    getRestaurantInfo, updateRestaurantInfo
  }