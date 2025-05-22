// routes/contract1.js
const express = require('express');
const router = express.Router();
const Contract1 = require('../../../../../models/contract1'); // ปรับ path ตามจริง
const Admin = require('../../../../../models/admin'); // import model

//เเสดงรายการ
router.get('/contracts', async (req, res) => {
  try {
    const contracts = await Contract1.find().sort({ createdAt: -1 });
    res.json(contracts);
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
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



//เเสดงชื่อพนักงานในตาราง
router.get('/approver-info/:approver_id_card', async (req, res) => {
    try {
      const { approver_id_card } = req.params;
  
      // 1. ค้นหาข้อมูลผู้ดูแลระบบจากเลขบัตรประชาชน
      const adminInfo = await Admin.findOne({ 
        id_card_number: approver_id_card 
      }).select('name position'); // เลือกเฉพาะฟิลด์ที่ต้องการ
  
      if (!adminInfo) {
        return res.status(404).json({
          success: false,
          message: 'ไม่พบข้อมูลผู้ดูแลระบบ'
        });
      }
  
      // 2. ส่งข้อมูลกลับ
      res.json({
        success: true,
        data: {
          approver_name: adminInfo.name,
          approver_position: adminInfo.position
        }
      });
  
    } catch (error) {
      console.error('Error fetching approver info:', error);
      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
        error: error.message
      });
    }
});




// ลบข้อมูลตาม id
router.delete('/contract1/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContract = await Contract1.findByIdAndDelete(id);
  
      if (!deletedContract) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลสัญญาที่ต้องการลบ' });
      }
  
      res.json({ message: 'ลบสัญญาเรียบร้อยแล้ว' });
    } catch (err) {
      console.error('ลบข้อมูลล้มเหลว:', err);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
    }
});
  


module.exports = router;
