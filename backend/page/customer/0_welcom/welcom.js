const express = require("express");
const router = express.Router();
const Contract6 = require("../../../models/contract6");


//เปิดไปหน้าเกม
router.get("/check-contract", async (req, res) => {
    const { id_card_number } = req.query;
    console.log("ตรวจสอบเลขบัตร:", id_card_number);
  
    if (!id_card_number) {
      return res.status(400).json({ error: "กรุณาระบุ id_card_number" });
    }
  
    try {
      // ค้นหา contract ที่มี id_card_number ตรง และ status ในกลุ่มที่อนุญาต
      const allowedStatuses = [
        "อยู่ในสัญญา",
        "เลยสัญญา",
        "นัดวันชำระ",
        "ครบสัญญา",
        "ส่งผู้ติดตาม",
      ];
  
      const contract = await Contract6.findOne({
        id_card_number: id_card_number.trim(),
        status: { $in: allowedStatuses },
      });
  
      console.log("ผลลัพธ์การค้นหา:", contract);
  
      if (contract) {
        return res.json({ allowed: true });
      } else {
        return res.json({ allowed: false });
      }
    } catch (error) {
      console.error("Error in /api/check-contract:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
  
  
module.exports = router;
