const express = require('express');
const router = express.Router();
const AppleModel = require('../../../../models/apple'); // path ไปที่ model ของคุณ

// เเสดงอุปกรณ์เเอปเปิ้ล
router.get('/get-device-models', async (req, res) => {
  try {
    const { deviceType } = req.query; // รับประเภทอุปกรณ์จาก query string
    if (!deviceType) {
      return res.status(400).json({ message: 'ต้องระบุประเภทอุปกรณ์ (deviceType)' });
    }

    const models = await AppleModel.find({ deviceType }).select('name -_id'); // หาเฉพาะประเภทที่เลือก
    res.json(models.map(m => m.name));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// เพิ่มอุปกรณ์เเอปเปิ้ล
router.post('/save-device-model', async (req, res) => {
  try {
    const { model, deviceType } = req.body;
    console.log('Model received:', model, 'DeviceType:', deviceType);

    if (!model || !deviceType) {
      return res.status(400).json({ message: 'ต้องระบุทั้ง model และ deviceType' });
    }

    const exists = await AppleModel.findOne({ name: model, deviceType });
    if (exists) {
      return res.status(200).json({ message: 'มีรุ่นนี้อยู่แล้วในประเภทนี้' });
    }

    const newModel = new AppleModel({ name: model, deviceType });
    await newModel.save();
    console.log('เพิ่มรุ่นใหม่:', model, 'ประเภท:', deviceType);
    res.status(200).json({ message: 'เพิ่มสำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
