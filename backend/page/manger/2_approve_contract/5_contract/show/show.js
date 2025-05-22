// routes/contract1.js
const express = require("express");
const router = express.Router();
const Contract1 = require("../../../../../models/contract1"); // ปรับ path ตามจริง
const Contract5 = require("../../../../../models/contract5"); // ปรับ path ตามจริง
const Admin = require("../../../../../models/admin"); // import model

//เเสดงรายการ
router.get("/api/contract5-summary", async (req, res) => {
  try {
    const result = await Contract1.aggregate([
      {
        $match: {
          status: "อนุมัติ",
        },
      },
      {
        $lookup: {
          from: "contract5", // ชื่อคอลเลกชันของ contract2 ใน MongoDB
          localField: "contract_id",
          foreignField: "contract_id",
          as: "contract5_info",
        },
      },
      {
        $unwind: "$contract5_info",
      },
      {
        $project: {
          id_card_number: 1,
          first_name: 1,
          last_name: 1,
          province: 1,
          contract_id: 1,
          createdAt: "$contract5_info.createdAt",
          status: "$contract5_info.status",
          approver_id_card: "$contract5_info.approver_id_card",
          contract2_id: "$contract5_info._id",
        },
      },
      {
        $sort: { createdAt: -1 }, // เรียงตามวันที่ล่าสุด
      },
    ]);

    res.json({ data: result });
  } catch (error) {
    console.error("Error fetching contract summary:", error);
    res
      .status(500)
      .json({ success: false, message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});


//เเสดงชื่อพนักงานในตาราง
router.get("/approver-info5/:approver_id_card", async (req, res) => {
  try {
    const { approver_id_card } = req.params;

    // 1. ค้นหาข้อมูลผู้ดูแลระบบจากเลขบัตรประชาชน
    const adminInfo = await Admin.findOne({
      id_card_number: approver_id_card,
    }).select("name position"); // เลือกเฉพาะฟิลด์ที่ต้องการ

    if (!adminInfo) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลผู้ดูแลระบบ",
      });
    }

    // 2. ส่งข้อมูลกลับ
    res.json({
      success: true,
      data: {
        approver_name: adminInfo.name,
        approver_position: adminInfo.position,
      },
    });
  } catch (error) {
    console.error("Error fetching approver info:", error);
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      error: error.message,
    });
  }
});

// ลบข้อมูลตาม id
router.delete("/contract5/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContract = await Contract5.findByIdAndDelete(id);

    if (!deletedContract) {
      return res.status(404).json({ message: "ไม่พบข้อมูลสัญญาที่ต้องการลบ" });
    }

    res.json({ message: "ลบสัญญาเรียบร้อยแล้ว" });
  } catch (err) {
    console.error("ลบข้อมูลล้มเหลว:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
});

module.exports = router;
