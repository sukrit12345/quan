// routes/contract6.js
const express = require("express");
const router = express.Router();
const Payment  = require("../../../../models/payment");


//เเสดงข้อมูลตามid
router.get('/payment/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const payment = await Payment.findById(id); // ค้นหาด้วย _id
  
      if (!payment) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลการชำระเงินตาม _id นี้' });
      }
  
      res.status(200).json(payment);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
});
  
  


// API อนุมัติ
router.put("/:id/approve-payment", async (req, res) => {
    try {
      const { id } = req.params;
      const { approvedBy } = req.body; // รับโครงสร้างแบบใหม่
  
      if (!approvedBy || !approvedBy.id_card_number || !approvedBy.position) {
        return res.status(400).json({ 
          success: false,
          error: "ต้องระบุเลขบัตรประชาชนและตำแหน่งผู้อนุมัติในรูปแบบที่ถูกต้อง"
        });
      }
  
      const updated = await Payment.findByIdAndUpdate(
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



// API ไม่อนุมัติ
router.put("/:id/reject-payment", async (req, res) => {
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
  
      const updated = await Payment.findByIdAndUpdate(
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
