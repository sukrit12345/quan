const mongoose = require("mongoose");

const contract5 = new mongoose.Schema({
  ipAddress: String,
  userAgent: String,
  status: {
    type: String,
    enum: ["รออนุมัติ", "อนุมัติ", "ไม่อนุมัติ"],
    default: "รออนุมัติ",
    required: true,
  },
  approver_id_card: String,
  approver_position: String,
  action_timestamp: Date,
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


module.exports = mongoose.model("contract5", contract5);