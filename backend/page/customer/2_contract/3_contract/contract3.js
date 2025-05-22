const express = require("express");
const router = express.Router();
const Contract1 = require("../../../../models/contract1");
const Contract2 = require("../../../../models/contract2");
const Contract3 = require("../../../../models/contract3");
const MangeCoinBonus = require("../../../../models/mange_coinbonus");

// เเสดงเหรียญสูงสุด
router.get("/get-bonus-coins/:contract_id", async (req, res) => {
  const contractId = req.params.contract_id;

  try {
    // ดึงข้อมูลจาก contract1
    const contract1 = await Contract1.findOne({ contract_id: contractId });
    if (!contract1)
      return res.status(404).json({ message: "ไม่พบข้อมูล contract1" });

    // ดึงข้อมูลจาก contract2
    const contract2 = await Contract2.findOne({ contract_id: contractId });
    if (!contract2)
      return res.status(404).json({ message: "ไม่พบข้อมูล contract2" });

    // ดึงข้อมูลจาก mange_coinbonus ตามเงื่อนไขที่กำหนด
    const matchingBonuses = await MangeCoinBonus.find({
      device_type: contract2.deviceType,
      device_model: contract2.model,
      device_storage: contract2.storage,
      battery_health: contract2.batteryHealth,
      $and: [
        {
          $or: [
            { provinces: "ทั่วประเทศ" },
            { provinces: contract1.province },
          ],
        },
        {
          $or: [
            { occupation: "ทั้งหมด" },
            { occupation: contract1.occupation },
          ],
        },
      ],
    });
    

    // ดึงค่า max_free_coins ที่ไม่ซ้ำ
    const bonusOptions = [
      ...new Set(matchingBonuses.map((b) => b.max_free_coins)),
    ];

    res.json({ bonusOptions });
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการดึงโบนัส:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
});

// POST route เพื่อบันทึกข้อมูลสัญญาเช่า
router.post("/contract3/:contract_id", async (req, res) => {
  const { contract_id } = req.params; // Get contract_id from URL
  try {
    const {
      bonus_coins,
      start_date,
      rental_duration,
      end_date,
      daily_rent,
      total_rent,
    } = req.body;

    const newContract = new Contract3({
      bonus_coins,
      start_date,
      rental_duration,
      end_date,
      daily_rent,
      total_rent,
      contract_id,
      status: "รออนุมัติ",
    });

    await newContract.save(); // Save contract to DB

    res
      .status(201)
      .json({ message: "สัญญาถูกบันทึกแล้ว", contract: newContract });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึกสัญญา" });
  }
});

module.exports = router;
