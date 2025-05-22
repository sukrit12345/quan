const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Contract6 = require("../../../../models/contract6");
const Payment = require("../../../../models/payment");
const company = require('../../../../models/company');


//เเสดงเงินที่ต้องชำระทั้งหมด
router.get("/contract/total-payment/:contract_id", async (req, res) => {
  try {
    const { contract_id } = req.params;

    const contract = await Contract6.findOne({ contract_id });

    if (!contract) {
      return res.status(404).json({ message: "ไม่พบสัญญา" });
    }

    res.json({
      total_payment_due: contract.total_payment_due
    });
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
});


//เเสดงบัญชีร้าน
router.get('/company/bank-info', async (req, res) => {
  try {
    const data = await company.findOne({}, 'account_name bank_name account_number'); // เอาเฉพาะฟิลด์ที่ต้องการ
    if (!data) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลบริษัท' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล', error: err });
  }
});




// ตั้งค่าการเก็บไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname); // .jpg, .png
    const contractId = req.body.contractId || "unknown"; // fallback เผื่อไม่มี
    const filename = `ชำระเงินรหัส${contractId}${extension}`;
    cb(null, filename);
  },
});



const upload = multer({ storage });

// บันทึกข้อมูลการชำระเงิน
router.post("/payment", upload.single("proofImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "กรุณาอัปโหลดไฟล์ proofImage" });
    }

    // แปลงค่าที่เป็น string มี comma ให้เป็นตัวเลข
    const total = Number(req.body.total.replace(/,/g, ""));
    const amountPaid = Number(req.body.amountPaid.replace(/,/g, ""));

    const { contractId, paymentDate, accountName, bankName, accountNumber } = req.body;
    const proofImage = `${req.file.filename}`;

    const newPayment = new Payment({
      contractId,
      total,
      paymentDate,
      amountPaid,
      accountName,
      bankName,
      accountNumber,
      proofImage,
    });

    await newPayment.save();
    res.status(201).json({
      message: "ข้อมูลการชำระเงินบันทึกสำเร็จ",
      payment: newPayment,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      error: error.message,
    });
  }
});



module.exports = router;
