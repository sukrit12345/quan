const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema({
  contractId: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: String,
    required: true,
  },
  followerName: {
    type: String,
    required: true,
  },
  followDuration: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  followCost: {
    type: Number,
    required: true,
  },
  proofImage: {
    type: String, // เก็บ path หรือ URL ของรูปภาพ
    required: false,
  },
  status: {
    type: String,
    default: "ส่งผู้ติดตาม",
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
});

const FollowUp = mongoose.model("statusFollowUp", followUpSchema);

module.exports = FollowUp;
