const mongoose = require("mongoose");

// สร้าง Schema สำหรับรุ่นอุปกรณ์
const apple = new mongoose.Schema({
  deviceType: {
    type: String,
    required: true, // ประเภทอุปกรณ์ต้องไม่เป็นค่าว่าง
    enum: ["iphone", "ipad"], // ตัวเลือกสำหรับประเภทอุปกรณ์
  },
  name: {
    type: String,
    required: true, // ชื่อรุ่นต้องไม่เป็นค่าว่าง
    unique: true, // ชื่อรุ่นต้องไม่ซ้ำ
    trim: true, // ลบช่องว่างข้างหน้าข้างหลัง
  },
  createdAt: {
    type: Date,
    default: Date.now, // เวลาเมื่อบันทึก
  },
});

// Export โมเดล
module.exports = mongoose.model("apple", apple);
