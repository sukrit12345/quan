// adminRouter.js
const express = require('express');
const router = express.Router();
const Admin = require('../../../../models/admin'); // นำเข้า Mongoose Model สำหรับ Admin

//เเสดงพนักงาน
router.get('/all', async (req, res) => {
    try {
      const admins = await Admin.find();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ message: 'ไม่สามารถโหลดข้อมูลได้' });
    }
});



// ลบข้อมูลพนักงาน
router.delete('/api/admin/:id', async (req, res) => {
    const { id } = req.params; // ดึง id จาก URL parameter
  
    try {
      // ค้นหาพนักงานที่ต้องการลบในฐานข้อมูล
      const admin = await Admin.findById(id);
      
      if (!admin) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลพนักงานที่ต้องการลบ' });
      }
  
      // ลบข้อมูลพนักงาน
      await Admin.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'ลบข้อมูลพนักงานเรียบร้อยแล้ว' });
    } catch (err) {
      console.error('เกิดข้อผิดพลาดในการลบ:', err);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูล' });
    }
  });
  
  
  
module.exports = router;
