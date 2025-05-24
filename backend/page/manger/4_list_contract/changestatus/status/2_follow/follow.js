// routes/contract6.js
const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const FollowUp  = require("../../../../../../models/status_follow"); // แก้จาก Contract1 → Contract6
const Contract6 = require("../../../../../../models/contract6");


// ตั้งค่า storage ของ multer (เก็บไฟล์ที่ /uploads)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // โฟลเดอร์เก็บไฟล์
    },
    filename: function (req, file, cb) {
      // ตั้งชื่อไฟล์แบบ unique เช่น proof-เวลาปัจจุบัน-ชื่อไฟล์ต้นฉบับ
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, 'หลักฐานการโอนค่าติดตามทวง' + uniqueSuffix + ext);
    }
});
  
const upload = multer({ storage: storage });
  
//บันทึก

router.post('/followup/:contractId', upload.single('proofImage'), async (req, res) => {
  try {
    const { contractId } = req.params;

    const {
      transactionDate,
      followerName,
      followDuration,
      dueDate,
      followCost,
      status,
      approver_id_card,
      approver_position,
      action_timestamp,
    } = req.body;

    const proofImagePath = req.file ? req.file.filename : null;

    const newFollowUp = new FollowUp({
      contractId,
      transactionDate,
      followerName,
      followDuration,
      dueDate,
      followCost,
      proofImage: proofImagePath,
      status,
      approver_id_card,
      approver_position,
      action_timestamp,
    });

    const savedFollowUp = await newFollowUp.save();

    // ✅ อัปเดต tracking_fee ใน contract6 โดยแทนค่าทับของเดิม
    const updatedContract = await Contract6.findOneAndUpdate(
      { contract_id: contractId },
      { $set: { tracking_fee: parseFloat(followCost) || 0 } },
      { new: true }
    );

    res.status(201).json({
      message: 'บันทึกข้อมูลเรียบร้อย และอัปเดต tracking_fee แล้ว',
      followUp: savedFollowUp,
      updatedContract,
    });

  } catch (error) {
    console.error('Error saving follow up:', error);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
      error: error.message,
    });
  }
});




module.exports = router;