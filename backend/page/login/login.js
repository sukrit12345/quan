const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/user'); // เรียกใช้โมเดลผู้ใช้
const Admin = require('../../models/admin'); // เรียกใช้โมเดลผู้ใช้

// เข้าสู่ระบบลูกค้า
router.post('/login', async (req, res) => {
  try {
    const { id_card_number, password } = req.body;

    // ตรวจสอบว่ากรอกครบ
    if (!id_card_number || !password) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    // ค้นหาผู้ใช้จากเลขบัตร
    const user = await User.findOne({ id_card_number });
    if (!user) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // ส่งผลลัพธ์กลับ
    res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
});



// เข้าสู่ระบบเจ้าหน้าที่
router.post('/admin/login', async (req, res) => {
  try {
    const { id_card_number, password } = req.body;

    // ตรวจสอบว่ากรอกครบ
    if (!id_card_number || !password) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    // ค้นหาผู้ดูแลระบบจากเลขบัตร
    const admin = await Admin.findOne({ id_card_number });
    if (!admin) {
      return res.status(404).json({ message: 'ไม่พบผู้ดูแลระบบ' });
    }

    // ตรวจสอบรหัสผ่าน (เปรียบเทียบตรงๆ เนื่องจากไม่ใช้การเข้ารหัส)
    if (admin.password !== password) {
      return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // ส่งผลลัพธ์กลับ
    res.status(200).json({ message: 'เข้าสู่ระบบผู้ดูแลระบบสำเร็จ', admin });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
});


module.exports = router;
