const express = require('express');
const router = express.Router();
const DeviceForm = require('../../../../models/mange_coinbonus'); // path ไปที่ model ของคุณ

//เเสดง
router.get('/get-device-form', async (req, res) => {
    try {
      const allForms = await DeviceForm.find().sort({ payment_date: -1 }); // เรียงจากวันล่าสุด
      res.status(200).json(allForms);
    } catch (err) {
      console.error('เกิดข้อผิดพลาด:', err);
      res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
    }
});

//ลบ
router.delete('/device-form/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DeviceForm.findByIdAndDelete(id); // ใช้ DeviceForm แทน MangeCoinBonus

    if (!result) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลที่ต้องการลบ' });
    }

    res.status(200).json({ message: 'ลบข้อมูลสำเร็จ' });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบ:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
  }
});

module.exports = router;
