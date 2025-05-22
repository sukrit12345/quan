const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  contractId: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  appointmentDetails: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "นัดวันชำระ",
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

const Appointment = mongoose.model("statusset", appointmentSchema);

module.exports = Appointment;
