// routes/contract6.js
const express = require("express");
const router = express.Router();
const Contract6 = require("../../../../models/contract6"); // แก้จาก Contract1 → Contract6
const Admin = require("../../../../models/admin");




// แสดงรายการ
router.get("/contract/contract-summary", async (req, res) => {
    try {
      const result = await Contract6.aggregate([
        // 1) Join Contract1 เพื่อเอาชื่อ
        {
          $lookup: {
            from: "contract1",
            localField: "contract_id",
            foreignField: "contract_id",
            as: "contract1_info",
          },
        },
        {
          $unwind: {
            path: "$contract1_info",
            preserveNullAndEmptyArrays: true,
          },
        },
  
        // 2) Join กับ payments
        {
          $lookup: {
            from: "payments",
            localField: "contract_id",
            foreignField: "contractId",
            as: "payment_info",
          },
        },
  
        // 3) รวมยอด amountPaid จาก payments ที่ join มา
        {
          $addFields: {
            totalAmountPaid: {
              $sum: {
                $map: {
                  input: "$payment_info",
                  as: "payment",
                  in: "$$payment.amountPaid",
                },
              },
            },
          },
        },
  
        // 4) แสดงเฉพาะ field ที่ต้องการ
        {
          $project: {
            start_date: 1,
            contract_id: 1,
            id_card_number: 1,
            first_name: "$contract1_info.first_name",
            last_name: "$contract1_info.last_name",
            province: "$contract1_info.province",
            end_date: 1,
            total_payment_due: 1,
            amountPaid: "$totalAmountPaid",
            status: 1,
            id: "$contract1_info._id",
            _id: 1,
          },
        },
  
        // 5) เรียงตามวันที่
        { $sort: { start_date: -1 } },
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
