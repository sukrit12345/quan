const express = require('express');
const router = express.Router();
const User = require('../../../../models/user'); // ปรับ path ให้ตรงกับที่คุณเก็บ model

//เเสดงเหรียญทั้งหมด
router.get('/user-coin', async (req, res) => {
    const id_card_number = req.query.id_card_number?.trim();
  
    try {
      const user = await User.findOne({ id_card_number });
  
      return res.json({
        coin: user.coin
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการค้นหา:', error);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
    }
});



//ใช้เหรียญ
router.post('/use-coin', async (req, res) => {
    try {
      let id_card_number = req.query.id_card_number?.trim();
      let coinToUse = req.body.amount; // กำหนดค่าจาก request body
  
  
      const user = await User.findOne({ id_card_number });

      if (user.coin < coinToUse) {
        return res.status(400).json({ error: 'จำนวนเหรียญไม่เพียงพอ' });
      }
  
      user.coin -= coinToUse;
      await user.save();
  
      return res.json({coin: user.coin });
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการใช้เหรียญ:', error);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
    }
});
  
  
  

module.exports = router;
