const express = require('express');
const router = express.Router();
const DeviceForm = require('../../../../models/mange_coinbonus'); // path ไปที่ model ของคุณ

//บันทึก
router.post('/submit-device-form', async (req, res) => {
  try {
    const {
      payment_date,
      device_type,
      device_model,
      device_storage,
      battery_health,
      provinces,
      occupation,
      max_free_coins
    } = req.body;

    const newForm = new DeviceForm({
      payment_date,
      device_type,
      device_model,
      device_storage,
      battery_health,
      provinces,
      occupation,
      max_free_coins
    });

    await newForm.save();
    res.status(201).json({ message: 'บันทึกข้อมูลเรียบร้อยแล้ว', data: newForm });
  } catch (err) {
    console.error('เกิดข้อผิดพลาด:', err);
    res.status(500).json({ error: 'ไม่สามารถบันทึกข้อมูลได้' });
  }
});


//เเสดงตามid
router.get('/show-form/:id', async (req, res) => {
  try {
    const formId = req.params.id;
    const formData = await DeviceForm.findById(formId);

    if (!formData) {
      return res.status(404).json({ error: 'ไม่พบข้อมูล' });
    }

    res.status(200).json(formData);
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
  }
});




//อัปเดตตามid
router.put('/update-form/:id', async (req, res) => {
  try {
    const updatedForm = await DeviceForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'อัปเดตข้อมูลสำเร็จ', data: updatedForm });
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการอัปเดต:', err);
    res.status(500).json({ error: 'ไม่สามารถอัปเดตข้อมูลได้' });
  }
});


module.exports = router;
