// routes/contract1.js
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const Contract1 = require("../../../../../models/contract1"); // ปรับ path ตามจริง
const Contract4 = require("../../../../../models/contract4"); // ปรับ path ตามจริง
const User = require("../../../../../models/user"); // ปรับ path ตามจริง

//เเสดงคำขออนุมัติสัญญา
router.get("/get-user-contract4/:id", async (req, res) => {
    const id = req.params.id.trim(); // ✅ ตัด \n ออก

  try {
    const userData = await Contract4.findById(id);
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
const sendApprovalEmail = async (contract4) => {
  try {
    // ดึง contract_id จาก Contract2
    const contract_id = contract4.contract_id;

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

      สัญญาหมายเลข ${contract4.contract_id}
      ขั้นตอนที่2 ได้รับการอนุมัติเรียบร้อยแล้ว
      ท่านสามารถทำรายการขั้นตอนถัดไปได้`,
    };

    await transporter.sendMail(mailOptions);
    console.log("ส่งอีเมลสำเร็จ");
  } catch (error) {
    console.error("ไม่สามารถส่งอีเมลอนุมัติ:", error);
  }
};

  
// API อนุมัติ
router.put("/:id/approve-contract4", async (req, res) => {
    try {
      const { id } = req.params;
      const { approvedBy } = req.body; // รับโครงสร้างแบบใหม่
  
      if (!approvedBy || !approvedBy.id_card_number || !approvedBy.position) {
        return res.status(400).json({ 
          success: false,
          error: "ต้องระบุเลขบัตรประชาชนและตำแหน่งผู้อนุมัติในรูปแบบที่ถูกต้อง"
        });
      }
  
      const updated = await Contract4.findByIdAndUpdate(
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

      await sendApprovalEmail(updated); // 🔔 เรียกส่งอีเมล
      res.json({
        success: true,
        message: "อนุมัติสัญญาสำเร็จ",
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



//ส่งเมลเมื่อไม่อนุมัติ
const sendRejectionEmail = async (contract4, reason = "") => {
  try {
    // ดึง contract_id จาก Contract2
    const contract_id = contract4.contract_id;

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

      สัญญาหมายเลข ${contract4.contract_id}
      ขั้นตอนที่4 ไม่ได้รับการอนุมัติ
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
router.put("/:id/reject-contract4", async (req, res) => {
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
  
      const updated = await Contract4.findByIdAndUpdate(
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
