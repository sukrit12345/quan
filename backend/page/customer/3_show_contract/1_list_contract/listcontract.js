const express = require("express");
const router = express.Router();
const Contract6 = require("../../../../models/contract6");




// API แสดงข้อมูล Contract6 โดยใช้ id_card_number (แบบ array)
router.get('/contract6/id-card/:id_card_number', async (req, res) => {
  try {
    const { id_card_number } = req.params;

    // ค้นหาข้อมูลทั้งหมดที่มี id_card_number ตรงกัน
    const contract6List = await Contract6.find({ id_card_number });

    // ถ้าไม่พบข้อมูล
    if (contract6List.length === 0) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูล Contract6 สำหรับ id_card_number นี้",
      });
    }

    // ถ้าพบข้อมูล ส่งกลับเป็น array
    res.json({
      data: contract6List
    });
  } catch (error) {
    console.error("Error fetching contract6:", error);
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล Contract6",
      error: error.message,
    });
  }
});


module.exports = router;
