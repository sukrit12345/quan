import { BASE_URL } from "../../../../config/config.js";

// ดึง contract_id จาก query string ของ URL
const urlParams = new URLSearchParams(window.location.search);
let contractId = urlParams.get("contract_id");

// ทำความสะอาด contract_id (ป้องกันค่าเป็น array)
if (Array.isArray(contractId)) {
  contractId = contractId.find(item => item && item.trim() !== "") || "";
}

// บันทึกข้อมูล
document.getElementById("btn-next").addEventListener("click", function (e) {
  e.preventDefault();

  const form = document.getElementById("userForm");

  if (form.checkValidity()) {
    const fileInput = document.getElementById("citizen_image");
    if (fileInput && fileInput.files.length === 0) {
      alert("กรุณาเลือกไฟล์สำหรับบัตรประชาชน");
      return;
    }

    const formData = new FormData(form);

    // ดึงข้อมูลจาก dropdown
    const provinceName = $("#province-select option:selected").text();
    const amphoeName = $("#amphoe option:selected").text();
    const districtName = $("#district option:selected").text();
    let zipcode = $("#zipcode option:selected").val();

    // ทำความสะอาด zipcode
    if (Array.isArray(zipcode)) {
      zipcode = zipcode[0];
    }

    // เพิ่มข้อมูลลง FormData
    formData.append("province_name", provinceName);
    formData.append("amphoe_name", amphoeName);
    formData.append("district_name", districtName);
    formData.append("zipcode", zipcode);

    // ตรวจสอบและตั้งค่า contract_id ใหม่
    if (!contractId || contractId.trim() === "") {
      alert("ไม่พบเลขที่สัญญาที่ถูกต้อง");
      return;
    }
    formData.set("contract_id", contractId); // ใช้ set แทน append เพื่อป้องกันค่าซ้ำ

    // Debug
    console.log("ส่งข้อมูลต่อไปนี้:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    fetch(`${BASE_URL}/api/contract/contract1`, {
      method: "POST",
      body: formData,
    })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "การส่งข้อมูลล้มเหลว");
      }
      window.location.href = "../../2_contract/0_contract/index.html";
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาด:", error);
      alert(`เกิดข้อผิดพลาด: ${error.message}`);
    });
  } else {
    form.reportValidity();
  }
});

// ย้อนกลับ
document.getElementById("btn-cancel").addEventListener("click", function () {
  window.location.href = "../0_contract/index.html";
});