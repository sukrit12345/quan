// adminRouter.js
const express = require('express');
const router = express.Router();
const Admin = require('../../../../models/admin'); // นำเข้า Mongoose Model สำหรับ Admin

// เพิ่มพนักงาน
router.post('/submit', async (req, res) => {
  const {
    payment_date,
    id_card_number,
    email,
    password,
    name,
    position,
    phone_number,
    date_of_birth
  } = req.body;

  // ตรวจสอบว่าไม่มีกข้อมูลที่ขาดหาย
  if (
    !payment_date ||
    !id_card_number ||
    !email ||
    !password ||
    !name ||
    !position ||
    !phone_number ||
    !date_of_birth
  ) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  try {
    // ตรวจสอบว่า id_card_number, email หรือ phone_number มีในฐานข้อมูลแล้วหรือไม่
    const existingAdmin = await Admin.findOne({
      $or: [
        { id_card_number },
        { email },
        { phone_number },
        { name } // ตรวจสอบชื่อซ้ำ
      ]
    });
    
    if (existingAdmin) {
      return res.status(400).json({ message: 'ชื่อ, หมายเลขบัตรประชาชน, อีเมล์ หรือหมายเลขโทรศัพท์นี้มีอยู่แล้วในระบบ' });
    }
    
    // สร้างข้อมูล Admin ใหม่
    const newAdmin = new Admin({
      payment_date,
      id_card_number,
      email,
      password,
      name,
      position,
      phone_number,
      date_of_birth,
    });

    // บันทึกข้อมูล Admin ใหม่
    const savedAdmin = await newAdmin.save();

    res.status(201).json(savedAdmin); // ส่งกลับข้อมูลที่บันทึกแล้ว
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});



//เเสดงข้อมูลตามid
router.get('/admin/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'ไม่พบข้อมูล' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
  }
});


// อัปเดตข้อมูลพนักงาน
router.put('/admins/:id', async (req, res) => {
  const { id } = req.params;

  const {
    payment_date,
    id_card_number,
    name,
    email,
    password,
    phone_number,
    position,
    date_of_birth
  } = req.body;

  // ตรวจสอบว่าข้อมูลครบถ้วน
  if (
    !payment_date ||
    !id_card_number ||
    !name ||
    !email ||
    !password ||
    !phone_number ||
    !position ||
    !date_of_birth
  ) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  try {
    // ตรวจสอบว่ามีพนักงานนี้อยู่จริง
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลพนักงาน' });
    }

    // ตรวจสอบชื่อซ้ำ (ยกเว้นตัวเอง)
    const nameExists = await Admin.findOne({ name, _id: { $ne: id } });
    if (nameExists) {
      return res.status(400).json({ message: 'มีชื่อพนักงานนี้ในระบบแล้ว' });
    }

    // ตรวจสอบอีเมล, เบอร์โทร, หรือเลขบัตรที่ซ้ำ (ยกเว้นตัวเอง)
    const duplicateFields = await Admin.findOne({
      _id: { $ne: id },
      $or: [
        { id_card_number },
        { email },
        { phone_number }
      ]
    });

    if (duplicateFields) {
      return res.status(400).json({ message: 'หมายเลขบัตรประชาชน, อีเมล์ หรือหมายเลขโทรศัพท์นี้มีอยู่แล้วในระบบ' });
    }

    // อัปเดตข้อมูล
    admin.payment_date = payment_date;
    admin.id_card_number = id_card_number;
    admin.name = name;
    admin.email = email;
    admin.password = password;
    admin.phone_number = phone_number;
    admin.position = position;
    admin.date_of_birth = date_of_birth;

    // บันทึก
    const updatedAdmin = await admin.save();
    res.status(200).json({ message: 'อัปเดตข้อมูลสำเร็จ', data: updatedAdmin });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' });
  }
});




module.exports = router;
