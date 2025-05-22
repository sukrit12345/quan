const mongoose = require("mongoose");

const company = new mongoose.Schema({
  company_registration_number: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  account_name: {
    type: String, // เพิ่มฟิลด์นี้สำหรับ "ชื่อบัญชี"
    required: true,
  },
  bank_name: {
    type: String,
    required: true,
  },
  account_number: {
    type: String, // ใช้ String แทน Number เพื่อรองรับเลขบัญชีที่ขึ้นต้นด้วย 0
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/, // ตรวจสอบรูปแบบอีเมลเบื้องต้น
  },
  phone_number: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('company', company, 'company');
