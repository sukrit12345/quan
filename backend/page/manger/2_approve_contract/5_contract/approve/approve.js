// routes/contract1.js
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const Contract1 = require("../../../../../models/contract1"); // ปรับ path ตามจริง
const Contract2 = require("../../../../../models/contract2"); // ปรับ path ตามจริง
const Contract3 = require("../../../../../models/contract3"); // ปรับ path ตามจริง
const Contract4 = require("../../../../../models/contract4"); // ปรับ path ตามจริง
const Contract5 = require("../../../../../models/contract5"); // ปรับ path ตามจริง
const Contract6 = require("../../../../../models/contract6"); // ปรับ path ตามจริง
const User = require("../../../../../models/user"); // ปรับ path ตามจริง

//เเสดงคำขออนุมัติสัญญา
router.get("/get-user-contract5/:id", async (req, res) => {
    const id = req.params.id.trim(); // ✅ ตัด \n ออก

  try {
    const userData = await Contract5.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err.message });
  }
});



// ตั้งค่า transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sukrit.chosri@gmail.com",
    pass: "ndvb oowv vxgq rhqr",
  },
});

// ส่งอีเมลเมื่ออนุมัติ
const sendApprovalEmail = async (contract5) => {
  try {
    // ดึง contract_id จาก Contract2
    const contract_id = contract5.contract_id;

    // ไปค้นหา Contract1 เพื่อเอา id_card_number
    const contract1 = await Contract1.findOne({ contract_id });

    if (!contract1 || !contract1.id_card_number) {
      console.error("ไม่พบ Contract1 หรือไม่มี id_card_number");
      return;
    }

    // เอา id_card_number ไปหา user
    const user = await User.findOne({ id_card_number: contract1.id_card_number });

    if (!user || !user.email) {
      console.error("ไม่พบผู้ใช้งานหรือไม่มีอีเมล");
      return;
    }

    const mailOptions = {
      from: "sukrit.chosri@gmail.com",
      to: user.email,
      subject: "แจ้งผลการอนุมัติสัญญา",
      text: `เรียนคุณ ${contract1.first_name} ${contract1.last_name},

      สัญญาหมายเลข ${contract5.contract_id}
      ขั้นตอนที่5 ได้รับการอนุมัติเรียบร้อยแล้ว
      คุณทำสัญญาเช่าเสร็จเรียบร้อยเเล้ว`,
    };

    await transporter.sendMail(mailOptions);
    console.log("ส่งอีเมลสำเร็จ");
  } catch (error) {
    console.error("ไม่สามารถส่งอีเมลอนุมัติ:", error);
  }
};
  

// API อนุมัติ
router.put("/:id/approve-contract5", async (req, res) => {
  try {
    const { id } = req.params;
    const { approvedBy } = req.body; // รับโครงสร้างแบบใหม่

    if (!approvedBy || !approvedBy.id_card_number || !approvedBy.position) {
      return res.status(400).json({ 
        success: false,
        error: "ต้องระบุเลขบัตรประชาชนและตำแหน่งผู้อนุมัติในรูปแบบที่ถูกต้อง"
      });
    }

    // อัปเดตสถานะใน Contract5
    const updated = await Contract5.findByIdAndUpdate(
      id,
      {
        status: "อนุมัติ",
        approver_id_card: approvedBy.id_card_number,
        approver_position: approvedBy.position,
        action_timestamp: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ 
        success: false,
        error: "ไม่พบสัญญาที่ต้องการอนุมัติ" 
      });
    }

    // เรียกฟังก์ชันสร้าง Contract6 หากสถานะเป็น "อนุมัติ"
    await createContract6IfApproved(updated.contract_id);
    await sendApprovalEmail(updated); // 🔔 เรียกส่งอีเมล

    res.json({
      success: true,
      message: "อนุมัติสัญญาสำเร็จ และสร้าง Contract6 สำเร็จ",
      data: updated,
    });
  } catch (error) {
    console.error("Error approving contract:", error);
    res.status(500).json({ 
      success: false,
      error: "เกิดข้อผิดพลาดในการอนุมัติสัญญา",
      details: error.message 
    });
  }
});

// ฟังก์ชันที่ใช้ในการสร้าง Contract6
async function createContract6IfApproved(contract_id) {
  const existing = await Contract6.findOne({ contract_id });
  if (existing) {
    console.log("Contract6 นี้ถูกสร้างไว้แล้ว");
    return; // ❌ ไม่ต้องสร้างใหม่
  }

  const [c1, c2, c3, c4, c5] = await Promise.all([
    Contract1.findOne({ contract_id }),
    Contract2.findOne({ contract_id }),
    Contract3.findOne({ contract_id }),
    Contract4.findOne({ contract_id }),
    Contract5.findOne({ contract_id, status: "อนุมัติ" }), // ตรวจสอบสถานะ "อนุมัติ"
  ]);

  if (!c1 || !c2 || !c3 || !c4 || !c5) {
    console.error("ไม่พบข้อมูล contract1 - contract4 หรือ contract5 ยังไม่อนุมัติ");
    throw new Error("ไม่พบข้อมูล contract1 - contract4 ที่ตรงกันทั้งหมด หรือ contract5 ยังไม่อนุมัติ");
  }

  const newContract6 = new Contract6({
    id_card_number: c1.id_card_number,
    contract_id: contract_id,
    device_type: c2.deviceType,
    model: c2.model,
    start_date: c3.start_date,
    rental_duration: c3.rental_duration,
    end_date: c3.end_date,
    total_rent: c3.total_rent,
    overdue_rent: 0,
    tracking_fee: 0,
    legal_fee: 0,
    total_payment_due: c3.total_rent,
    approver_id_card: c5.approver_id_card,
    approver_position: c5.approver_position,
    action_timestamp: c5.action_timestamp,
    // status: ไม่ใส่ เพราะ schema มี default เป็น "อยู่ในสัญญา"
  });

  await newContract6.save();
  console.log("สร้าง contract6 สำเร็จ");
}



//ส่งเมลเมื่อไม่อนุมัติ
const sendRejectionEmail = async (contract5, reason = "") => {
  try {
    // ดึง contract_id จาก Contract2
    const contract_id = contract5.contract_id;

    // หา Contract1 ด้วย contract_id เพื่อนำ id_card_number
    const contract1 = await Contract1.findOne({ contract_id });

    if (!contract1 || !contract1.id_card_number) {
      console.error("ไม่พบ Contract1 หรือไม่มี id_card_number");
      return;
    }

    // หา user ตามเลขบัตรประชาชนจาก Contract1
    const user = await User.findOne({ id_card_number: contract1.id_card_number });

    if (!user || !user.email) {
      console.error("ไม่พบผู้ใช้งานหรือไม่มีอีเมล");
      return;
    }

    const mailOptions = {
      from: "sukrit.chosri@gmail.com",
      to: user.email,
      subject: "แจ้งผลการไม่อนุมัติสัญญา",
      text: `เรียนคุณ ${contract1.first_name} ${contract1.last_name},

      สัญญาหมายเลข ${contract5.contract_id}
      ขั้นตอนที่5 ไม่ได้รับการอนุมัติ
      เหตุผล: ${reason || "ไม่ได้ระบุ"}
      หากมีข้อสงสัยกรุณาติดต่อเจ้าหน้าที่`
    };

    await transporter.sendMail(mailOptions);
    console.log("ส่งอีเมลแจ้งไม่อนุมัติสำเร็จ");
  } catch (error) {
    console.error("ไม่สามารถส่งอีเมลไม่อนุมัติ:", error);
  }
};


// API ไม่อนุมัติ
router.put("/:id/reject-contract5", async (req, res) => {
    try {
      const { id } = req.params;
      const { rejectedBy, reason } = req.body; // รับโครงสร้างแบบใหม่
  
      if (!rejectedBy || !rejectedBy.id_card_number || !rejectedBy.position) {
        return res.status(400).json({ 
          success: false,
          error: "ต้องระบุเลขบัตรประชาชนและตำแหน่งผู้ไม่อนุมัติในรูปแบบที่ถูกต้อง"
        });
      }
  
      const updateData = {
        status: "ไม่อนุมัติ",
        approver_id_card: rejectedBy.id_card_number,
        approver_position: rejectedBy.position,
        action_timestamp: new Date()
      };
  
      if (reason) {
        updateData.rejection_reason = reason;
      }
  
      const updated = await Contract5.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ 
          success: false,
          error: "ไม่พบสัญญาที่ต้องการไม่อนุมัติ" 
        });
      }
      await sendRejectionEmail(updated, reason); // 🔔 เรียกส่งอีเมล
      res.json({
        success: true,
        message: "ไม่อนุมัติสัญญาสำเร็จ",
        data: updated
      });
    } catch (error) {
      console.error("Error rejecting contract:", error);
      res.status(500).json({ 
        success: false,
        error: "เกิดข้อผิดพลาดในการไม่อนุมัติสัญญา",
        details: error.message 
      });
    }
});

module.exports = router;
