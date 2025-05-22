const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const contract2 = require("../../../../models/contract2");
const Apple = require("../../../../models/apple"); // path ไปยังโมเดลของคุณ

// ดึงประเภทอุปกรณ์ทั้งหมดที่ไม่ซ้ำ
router.get("/devices", async (req, res) => {
  try {
    const deviceTypes = await Apple.distinct("deviceType");
    res.json(deviceTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ดึงรุ่นอุปกรณ์ทั้งหมดตามประเภท
router.get("/devices/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const models = await Apple.find({ deviceType: type }).select("name -_id");
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ตั้งค่าที่เก็บไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // โฟลเดอร์ uploads (ต้องมี)
  },
  filename: (req, file, cb) => {
    // ตั้งชื่อไฟล์แยกตามประเภทไฟล์
    const uniqueSuffix =
      req.body.contract_id +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);
    let filename = "";

    switch (file.fieldname) {
      case "appleIdImage":
        filename = "ภาพหน้าบัญชี Apple ID" + uniqueSuffix + path.extname(file.originalname);
        break;
      case "modelImage":
        filename = "ภาพหน้าเกี่ยวกับเห็นรุ่นอุปกรณ์" + uniqueSuffix + path.extname(file.originalname);
        break;
      case "storageImage":
        filename = "ภาพหน้าเกี่ยวกับเห็นความจุอุปกรณ์" + uniqueSuffix + path.extname(file.originalname);
        break;
      case "batteryImage":
        filename = "ภาพหน้าสุขภาพแบตเตอรี่" + uniqueSuffix + path.extname(file.originalname);
        break;
      default:
        filename = uniqueSuffix + path.extname(file.originalname);
    }

    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

//บันทึก
router.post(
  "/submit-device-info",
  upload.fields([
    { name: "appleIdImage" },
    { name: "modelImage" },
    { name: "storageImage" },
    { name: "batteryImage" },
  ]),
  async (req, res) => {
    try {
      const {
        deviceType,
        model,
        storage,
        batteryHealth,
        contract_id,
        status, // รับค่า status
        approver_id_card, // รับค่า approver_id_card
      } = req.body;

      // สร้างเอกสารใหม่ใน contract2
      const newData = new contract2({
        deviceType,
        model,
        storage,
        batteryHealth,
        contract_id,
        status, // เก็บค่า status
        approver_id_card, // เก็บค่า approver_id_card
        appleIdImage: req.files["appleIdImage"]?.[0]?.filename || "",
        modelImage: req.files["modelImage"]?.[0]?.filename || "",
        storageImage: req.files["storageImage"]?.[0]?.filename || "",
        batteryImage: req.files["batteryImage"]?.[0]?.filename || "",
      });

      // บันทึกข้อมูลในฐานข้อมูล
      await newData.save();
      res.status(200).json({ message: "บันทึกข้อมูลสำเร็จ" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "บันทึกไม่สำเร็จ", error: err.message });
    }
  }
);

module.exports = router;
