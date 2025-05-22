const express = require("express");
const router = express.Router();
const contract4 = require("../../../../models/contract4");

//บันทึก
router.post("/contract4", async (req, res) => {
  try {
    const { contract_id } =
      req.body;

    // ตรวจสอบว่า contract_id มีอยู่แล้วหรือยัง
    const existing = await contract4.findOne({ contract_id });
    if (existing) {
      return res
        .status(400)
        .json({ message: "มี contract_id นี้อยู่แล้วในระบบ" });
    }

    // สร้าง object contract ใหม่
    const contract = new contract4({
      contract_id,
    });

    // บันทึกข้อมูลลงฐานข้อมูล
    await contract.save();

    // ส่ง response กลับ
    res.status(201).json({ message: "บันทึกสำเร็จ", data: contract });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึก:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึก", error });
  }
});

module.exports = router;
