const Restaurant = require('../../models/restaurants');
const Table = require('../../models/tables')
const updateRestaurantInfo = async (req, res) => {
    const { name, address, openTime, closeTime, description, tableCount } = req.body;
  
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
      const tables = [];
      await Table.deleteMany({});
      for (let i = 1; i <= tableCount; i++) {
        tables.push({
          tableNumber: i,
          isOccupied: '',
          checkinUrl: '',
          qrCode: '',
          status: 0
        });
      }
      console.log(tables);
      await Table.insertMany(tables);
      res.status(201).json({ message: "Cập nhật thông tin thành công!", data: restaurant, tables })
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

  const getTableList = async (req, res) => {
    try {
      const table = await Table.find({});
      res.json(table);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  module.exports = {
    getRestaurantInfo, updateRestaurantInfo, getTableList
  }