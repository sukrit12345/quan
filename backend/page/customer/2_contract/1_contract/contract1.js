const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const contract1 = require('../../../../models/contract1'); 

// กำหนดที่เก็บไฟล์ใน Local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const idCardNumber = req.body.id_card_number; // ดึง id_card_number มาจาก req.body
    const extension = path.extname(file.originalname); // นามสกุลไฟล์ เช่น .jpg, .png
    cb(null, "เลขบัตรประชาชน"+idCardNumber + extension); // ตั้งชื่อไฟล์เป็น id_card_number + นามสกุล
  }
});


const upload = multer({ storage: storage });

//บันทึกข้อมูล
router.post('/contract1', upload.single('citizen_image'), async (req, res) => {
  try {
    const {
      id_card_number,
      first_name,
      last_name,
      bank_name,
      account_number,
      phone_number,
      instagram,
      facebook,
      line,
      residence_type,
      dormitory_name,
      room_number,
      house_number,
      province,
      amphoe,
      district,
      zipcode,
      occupation,
      workplace_name,
      university_name,
      contract_id
    } = req.body;

    // แปลง zipcode ให้เป็น string
    let zipcodeString = zipcode;
    if (Array.isArray(zipcode)) {
      zipcodeString = zipcode[0]; // เลือกค่าตัวแรกจาก array ถ้าเป็น array
    } else {
      zipcodeString = String(zipcode); // แปลงเป็น string ถ้าไม่ใช่ array
    }

    let photoPath = null;
    if (req.file) {
      const filePath = req.file.filename; // เส้นทางไฟล์ที่ถูกเก็บใน local
      photoPath = filePath; // เก็บเส้นทางไฟล์
    }

    const newContract1 = new contract1({
      id_card_number,
      first_name,
      last_name,
      bank_name,
      account_number,
      phone_number,
      instagram,
      facebook,
      line,
      residence_type,
      dormitory_name,
      room_number,
      house_number,
      province,
      amphoe,
      district,
      zipcode: zipcodeString, // ส่งค่า zipcode ที่แปลงแล้วเป็น string
      occupation,
      workplace_name,
      university_name,
      citizen_image: photoPath,
      status: 'รออนุมัติ',
      contract_id
    });

    await newContract1.save(); // บันทึกข้อมูลใน MongoDB
    res.status(201).json({ message: 'ลงทะเบียนสำเร็จ!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน' });
  }
});




module.exports = router;