const mongoose = require("mongoose");

const contract3 = new mongoose.Schema(
  {
    bonus_coins: {
      type: String,
      required: true, // เช่น 'coins500'
    },
    start_date: {
      type: Date,
      required: String,
    },
    rental_duration: {
      type: Number, // จำนวนวัน เช่น 5, 10, 15
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    daily_rent: {
      type: Number, // บาทต่อวัน
      required: true,
    },
    total_rent: {
      type: Number, // คำนวณ = daily_rent * rental_duration
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
    },
    contract_id: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("contract3", contract3);
