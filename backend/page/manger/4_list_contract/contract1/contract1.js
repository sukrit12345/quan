// routes/contract6.js
const express = require("express");
const router = express.Router();
const Contract1 = require("../../../../models/contract1"); // แก้จาก Contract1 → Contract6



// GET /api/contract1/:id
router.get("/detailcontract1/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const contract = await Contract1.findById(id);
  
      if (!contract) {
        return res.status(404).json({ message: "ไม่พบข้อมูลสัญญา" });
      }
  
      res.status(200).json({ success: true, data: contract });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสัญญา:", error);
      res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
    }
});

module.exports = router;
