const mongoose = require('mongoose');

const mange_coinbonus = new mongoose.Schema({
  payment_date: {
    type: String, // หากใช้ date picker ควรใช้ type: Date
    required: true,
  },
  device_type: {
    type: String,
    enum: ['iphone', 'ipad'],
    required: true,
  },
  device_model: {
    type: String,
    required: true,
  },
  device_storage: {
    type: String, 
    enum: ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'],
    required: false,
  },
  battery_health: {
    type: String,
    enum: ['มากกว่า80', 'น้อยกว่า80'],
    required: true,
  },
  provinces: {
    type: [String], // multiple select
    required: true,
  },
  occupation: {
    type: String,
    enum: ['ทั้งหมด', 'นักศึกษา', 'ราชการ', 'พนักงานเงินเดือน', 'ฟรีแลนซ์', 'ธุรกิจส่วนตัว'],
    required: true,
  },
  max_free_coins: {
    type: String,
    enum: [
      '500', '1000', '1500', '2000',
      '2500', '3000', '3500', '4000',
      '4500', '5000', '5500', '6000',
      '6500', '7000', '7500', '8000',
      '8500', '9000', '9500', '10000'
    ],
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('mange_coinbonus', mange_coinbonus);
