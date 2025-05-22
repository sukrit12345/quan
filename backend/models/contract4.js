const mongoose = require("mongoose");

const contract4 = new mongoose.Schema({
  status: {
    type: String,
    enum: ["รออนุมัติ", "อนุมัติ", "ไม่อนุมัติ"],
    default: "รออนุมัติ",
    required: true,
  },
  // เพิ่ม 3 ฟิลด์ใหม่แบบง่าย
  approver_id_card: {
    // เลขบัตรประชาชนผู้อนุมัติ
    type: String,
  },
  approver_position: {
    // ตำแหน่งผู้อนุมัติ
    type: String,
  },
  action_timestamp: {
    // เวลาที่ดำเนินการ
    type: Date,
  },
  contract_id: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("contract4", contract4);


