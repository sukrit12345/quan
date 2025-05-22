const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../../../models/user'); // อย่าลืมปรับ path ให้ตรงกับที่คุณเก็บ model

//สมัครสมาชิก
router.post('/register', async (req, res) => {
    try {
      const { id_card_number, email, password } = req.body;
  
      // ตรวจสอบว่าได้กรอกข้อมูลครบถ้วน
      if (!id_card_number || !email || !password) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      }
  
      // ตรวจสอบข้อมูลซ้ำ (อีเมลหรือเลขบัตรประชาชน)
      const existingUser = await User.findOne({
        $or: [{ email }, { id_card_number }]
      });
      if (existingUser) {
        return res.status(400).json({ message: 'อีเมลหรือเลขบัตรประชาชนนี้มีอยู่แล้ว' });
      }
  
      // แฮชรหัสผ่าน
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // สร้างผู้ใช้ใหม่
      const newUser = new User({
        id_card_number,
        email,
        password: hashedPassword,
        coin: 0 // ตั้งค่า coin เริ่มต้น
      });
  
      // บันทึกข้อมูลผู้ใช้ใหม่
      await newUser.save();
  
      // ส่ง response กลับ
      res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ', user: { id: newUser._id, email: newUser.email } });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
    }
});

module.exports = router;
