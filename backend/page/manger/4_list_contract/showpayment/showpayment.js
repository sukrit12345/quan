// routes/contract6.js
const express = require("express");
const router = express.Router();
const Payment = require("../../../../models/payment"); // แก้จาก Contract1 → Contract6


//เเสดงชำระตามid
router.get('/showpayments/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      /* 2) ค้นหาโดย _id  ----------------------------------- */
      const payment = await Payment.findById(id).select({
        contractId: 1,
        total: 1,
        paymentDate: 1,
        amountPaid: 1,
        accountName: 1,
        bankName: 1,
        accountNumber: 1,
        proofImage: 1,
        status: 1,
        approver_id_card: 1,
        approver_position: 1,
        action_timestamp: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 0                      // ไม่จำเป็นต้องส่ง _id ไปหน้าเว็บ
      }).lean();                    // .lean() คืน JS object

      return res.status(200).json(payment);
  
    } catch (err) {
      console.error('ดึงข้อมูล payment ผิดพลาด:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' });
    }
});
  

module.exports = router;
