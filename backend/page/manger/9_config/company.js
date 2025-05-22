const express = require("express");
const router = express.Router();
const company = require("../../../models/company");

//เเสดงข้อมูล
router.get("/companies", async (req, res) => {
  try {
    const companies = await company.find(); // ค้นหาทั้งหมดใน collection
    res.json(companies); // ส่งข้อมูลทั้งหมดเป็น JSON
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies", error: err });
  }
});






module.exports = router;
