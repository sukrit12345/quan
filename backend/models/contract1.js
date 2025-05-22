const mongoose = require("mongoose");

const contract1 = new mongoose.Schema(
  {
    id_card_number: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    line: {
      type: String,
      required: true,
    },
    residence_type: {
      type: String,
      required: true,
    },
    dormitory_name: {
      type: String,
    },
    room_number: {
      type: String,
    },
    house_number: {
      type: String,
    },
    province: {
      type: String,
      required: true,
    },
    amphoe: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    workplace_name: {
      type: String,
    },
    university_name: {
      type: String,
    },
    citizen_image: {
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
    },
    contract_id: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true, // บันทึก createdAt และ updatedAt อัตโนมัติ
    toJSON: {
      transform: function (doc, ret) {
        // บวกเวลา +7 ชั่วโมงเฉพาะตอนแปลงข้อมูลส่งออก
        if (ret.createdAt) {
          ret.createdAt = new Date(
            new Date(ret.createdAt).getTime() + 7 * 60 * 60 * 1000
          );
        }
        if (ret.updatedAt) {
          ret.updatedAt = new Date(
            new Date(ret.updatedAt).getTime() + 7 * 60 * 60 * 1000
          );
        }
        return ret;
      },
    },
  }
);

// export ออกไปใช้งาน
module.exports = mongoose.model("contract1", contract1);
