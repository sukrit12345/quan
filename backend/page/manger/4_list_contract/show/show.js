// routes/contract6.js
const express = require("express");
const router = express.Router();
const Contract6 = require("../../../../models/contract6"); // แก้จาก Contract1 → Contract6
const Admin = require("../../../../models/admin");
const FollowUp = require("../../../../models/status_follow");      // model จาก statusFollowUp
const Appointment = require("../../../../models/status_set"); // model จาก statusset




// แสดงรายการ
router.get("/contract/contract-summary", async (req, res) => {
  try {
    // ดึงข้อมูลสัญญา พร้อม join contract1 และ payments เหมือนเดิม
    const result = await Contract6.aggregate([
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
      {
        $lookup: {
          from: "payments",
          localField: "contract_id",
          foreignField: "contractId",
          as: "payment_info",
        },
      },
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
      { $sort: { start_date: -1 } },
    ]);

    // ดึงสถานะล่าสุดจาก FollowUp และ Appointment ของทุก contractId ที่ได้
    // สร้าง map เก็บสถานะล่าสุดของแต่ละ contractId
    const statusMap = {};

    // ดึง contractId ทั้งหมด
    const contractIds = result.map(item => item.contract_id);

    // ดึง latest FollowUp ของแต่ละ contractId
    const latestFollowUps = await FollowUp.aggregate([
      { $match: { contractId: { $in: contractIds } } },
      { $sort: { contractId: 1, createdAt: -1 } },
      {
        $group: {
          _id: "$contractId",
          latestFollowUp: { $first: "$$ROOT" },
        },
      },
    ]);

    // ดึง latest Appointment ของแต่ละ contractId
    const latestAppointments = await Appointment.aggregate([
      { $match: { contractId: { $in: contractIds } } },
      { $sort: { contractId: 1, createdAt: -1 } },
      {
        $group: {
          _id: "$contractId",
          latestAppointment: { $first: "$$ROOT" },
        },
      },
    ]);

    // รวมข้อมูลสถานะล่าสุดทั้ง 2 collection
    contractIds.forEach(contractId => {
      const followUp = latestFollowUps.find(f => f._id === contractId)?.latestFollowUp;
      const appointment = latestAppointments.find(a => a._id === contractId)?.latestAppointment;

      if (followUp && appointment) {
        // ถ้ามีทั้งคู่ ให้เลือกอันที่ createdAt ล่าสุด
        statusMap[contractId] =
          new Date(followUp.createdAt) > new Date(appointment.createdAt)
            ? followUp.status
            : appointment.status;
      } else if (followUp) {
        statusMap[contractId] = followUp.status;
      } else if (appointment) {
        statusMap[contractId] = appointment.status;
      } else {
        statusMap[contractId] = null;
      }
    });

    // ผนวกสถานะล่าสุดกลับเข้าไปใน result
    const finalResult = result.map(item => ({
      ...item,
      latestStatus: statusMap[item.contract_id] || "-",
    }));

    res.json({ data: finalResult });
  } catch (error) {
    console.error("Error fetching contract summary with latest status:", error);
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
