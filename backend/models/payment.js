const mongoose = require('mongoose');

// สร้าง Schema สำหรับข้อมูลการชำระเงิน
const payment = new mongoose.Schema({
  contractId: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  proofImage: {
    type: String,
    required: true,
  },
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
  }
}, { timestamps: true }); // เพิ่ม timestamps ที่นี่

module.exports = mongoose.model('payment', payment);
