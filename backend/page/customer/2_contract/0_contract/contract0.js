// routes/contract.js
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const cron = require('node-cron');
const contract0 = require("../../../../models/contract0");


//สร้างรายการสัญญา
router.post("/contracts", async (req, res) => {
  try {
    const newContract = new contract0({
      id: Date.now().toString(),
    });
    const saved = await newContract.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "ไม่สามารถสร้างสัญญาได้" });
  }
});

// เเสดงสถานะสัญญา1-5
router.get("/contracts/with-all-statuses", async (req, res) => {
    try {
      console.log("เริ่มดึงข้อมูลสัญญา...");
  
      // ตรวจสอบการเชื่อมต่อ MongoDB
      if (mongoose.connection.readyState !== 1) {
        throw new Error("ไม่สามารถเชื่อมต่อกับฐานข้อมูล");
      }
  
      // สร้าง Aggregation Pipeline
      const pipeline = [
        // Lookup Contract1
        {
          $lookup: {
            from: "contract1", // ใช้ชื่อ collection โดยตรง
            localField: "id",
            foreignField: "contract_id",
            as: "contract1_data",
          },
        },
        // Lookup Contract2
        {
          $lookup: {
            from: "contract2",
            localField: "id",
            foreignField: "contract_id",
            as: "contract2_data",
          },
        },
        // Lookup Contract3
        {
          $lookup: {
            from: "contract3",
            localField: "id",
            foreignField: "contract_id",
            as: "contract3_data",
          },
        },
        // Lookup Contract4
        {
          $lookup: {
            from: "contract4",
            localField: "id",
            foreignField: "contract_id",
            as: "contract4_data",
          },
        },
        // Lookup Contract5
        {
          $lookup: {
            from: "contract5",
            localField: "id",
            foreignField: "contract_id",
            as: "contract5_data",
          },
        },
        // Unwind ข้อมูลทั้งหมด (อนุญาตให้เป็น null)
        { $unwind: { path: "$contract1_data", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$contract2_data", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$contract3_data", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$contract4_data", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$contract5_data", preserveNullAndEmptyArrays: true } },
        // Project ข้อมูลที่ต้องการ
        {
          $project: {
            id: 1,
            identity_status: { $ifNull: ["$contract1_data.status", "รอดำเนินการ"] },
            collateral_status: { $ifNull: ["$contract2_data.status", "รอดำเนินการ"] },
            rental_status: { $ifNull: ["$contract3_data.status", "รอดำเนินการ"] },
            delivery_status: { $ifNull: ["$contract4_data.status", "รอดำเนินการ"] },
            completion_status: { $ifNull: ["$contract5_data.status", "รอดำเนินการ"] },
            createdAt: 1,
            updatedAt: 1,
          },
        },
        // เรียงลำดับตามวันที่สร้าง
        { $sort: { createdAt: -1 } },
      ];
  
      console.log("กำลังดำเนินการ aggregate...");
      const contracts = await contract0.aggregate(pipeline);
  
      if (!contracts || contracts.length === 0) {
        console.log("ไม่พบข้อมูลสัญญา");
        return res.status(404).json({
          success: false,
          message: "ไม่พบข้อมูลสัญญา",
        });
      }
  
      console.log(`ดึงข้อมูลสัญญาได้ ${contracts.length} รายการ`);
      res.json({
        success: true,
        count: contracts.length,
        data: contracts,
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสัญญา:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
});



// ตั้งเวลาให้ลบทุก ๆ 5 วัน
cron.schedule('0 0 0 */5 * *', async () => {
  console.log("กำลังรัน cron ลบข้อมูล...");

  const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
  console.log("เงื่อนไขเวลา:", fiveDaysAgo.toISOString());

  try {
    const result = await contract0.deleteMany({ createdAt: { $lt: fiveDaysAgo } });
    console.log("ลบแล้ว", result.deletedCount, "รายการ");
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
  }
});



module.exports = router;
