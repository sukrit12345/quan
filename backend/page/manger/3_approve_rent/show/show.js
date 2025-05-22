// routes/contract6.js
const express = require("express");
const router = express.Router();
const Contract6 = require("../../../../models/contract6"); // แก้จาก Contract1 → Contract6
const Admin = require("../../../../models/admin");


// แสดงรายการ
router.get("/apirent/contract-summary", async (req, res) => {
    try {
      const result = await Contract6.aggregate([
        {
          $lookup: {
            from: "contract1",  // ใช้ชื่อ collection ของ Contract1
            localField: "contract_id",  // field จาก Contract6 ที่ใช้เชื่อม
            foreignField: "contract_id",  // field จาก Contract1 ที่ใช้เชื่อม
            as: "contract1_info",
          },
        },
        {
          $unwind: {
            path: "$contract1_info",  // ใช้ข้อมูลจาก Contract1
            preserveNullAndEmptyArrays: true,  // ถ้าไม่มีข้อมูลก็แสดง null
          },
        },
        {
          $lookup: {
            from: "payments",
            localField: "contract_id",
            foreignField: "contractId",
            as: "payment_info",
          },
        },
        {
          $unwind: {
            path: "$payment_info",
            preserveNullAndEmptyArrays: false, // ดึงเฉพาะที่มีข้อมูล payment
          },
        },
        {
          $project: {
            createdAt: "$payment_info.createdAt",
            id_card_number: 1,
            first_name: "$contract1_info.first_name",  // ดึงจาก Contract1
            last_name: "$contract1_info.last_name",  // ดึงจาก Contract1
            contractId: "$payment_info.contractId",
            total: "$payment_info.total",
            amountPaid: "$payment_info.amountPaid",
            status: "$payment_info.status",
            approver_id_card: "$payment_info.approver_id_card",
            payment_id: "$payment_info._id",
            
          },
        },
        { $sort: { createdAt: -1 } },
      ]);
  
      res.json({ data: result });
    } catch (error) {
      console.error("Error fetching contract summary:", error);
      res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
});




//เเสดงชื่อพนักงานในdropdown
router.get('/admin-names', async (req, res) => {
try {
    const admins = await Admin.find({}, 'name'); // ดึงเฉพาะ field name
    const names = admins.map(admin => admin.name);
    res.json(names);
} catch (error) {
    console.error('Error fetching admin names:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
}
});




// แสดงชื่อพนักงานในตาราง
router.get("/approver-info/:approver_id_card", async (req, res) => {
  try {
    const { approver_id_card } = req.params;

    const adminInfo = await Admin.findOne({
      id_card_number: approver_id_card,
    }).select("name position");

    if (!adminInfo) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลผู้ดูแลระบบ",
      });
    }

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

module.exports = router;
