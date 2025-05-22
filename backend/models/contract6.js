const mongoose = require("mongoose");

const contract6 = new mongoose.Schema(
  {
    id_card_number: {
      type: String,
      required: true,
    },
    contract_id: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: [
        "อยู่ในสัญญา",
        "เลยสัญญา",
        "อายัด",
        "นัดวันชำระ",
        "ครบสัญญา",
        "ส่งผู้ติดตาม",
        "เเบล็คลิสต์",
        "ชำระครบ",
      ],
      default: "อยู่ในสัญญา", // เพิ่มค่าเริ่มต้น
      required: true,
    },
    device_type: String,
    model: String,
    start_date: Date,
    rental_duration: Number,
    end_date: Date,
    total_rent: Number,

    overdue_rent: {
      type: Number,
      default: 0,
    },
    tracking_fee: {
      type: Number,
      default: 0,
    },
    legal_fee: {
      type: Number,
      default: 0,
    },
    total_payment_due: Number,

    approver_id_card: String, // เพิ่มใหม่
    approver_position: String, // เพิ่มใหม่
    action_timestamp: Date, // เพิ่มใหม่
  },
  { timestamps: true }
);

module.exports = mongoose.model("contract6", contract6);
