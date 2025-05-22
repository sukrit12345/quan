import { BASE_URL } from "../../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

// ตั้งค่าปฏิทิน
function setupDatePicker() {
  console.log("ตั้งค่า Date Picker ให้แสดงวันที่ปัจจุบัน (เวลาไทย)...");

  const today = new Date(); // วันที่ปัจจุบัน
  const currentDate = today.toLocaleDateString("th-TH"); // ใช้ locale 'th-TH' เพื่อให้วันที่ออกมาในรูปแบบ dd/mm/yyyy สำหรับประเทศไทย

  document.getElementById("paymentDate").value = currentDate;
}

// เรียกใช้ฟังก์ชันตั้งค่า
setupDatePicker();

// ดึง contract_id จาก URL
const urlParams = new URLSearchParams(window.location.search);
const contractId = urlParams.get("contract_id");

//เเสดงเงินที่ต้องชำระ
if (contractId) {
  fetch(`${BASE_URL}/api/contract/total-payment/${contractId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("ไม่สามารถโหลดข้อมูลได้");
      }
      return response.json();
    })
    .then((data) => {
      // แสดงผลใน input
      document.getElementById("total").value =
        data.total_payment_due.toLocaleString();
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
    });
} else {
  console.error("ไม่พบ contract_id ใน URL");
}

//เเสดงบัญชีที่ต้องชำระ
fetch(`${BASE_URL}/api/company/bank-info`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("ไม่สามารถโหลดข้อมูลได้");
    }
    return response.json();
  })
  .then((data) => {
    // แสดงผลใน input
    document.getElementById("bank-name").value = data.bank_name;
    document.getElementById("account-name").value = data.account_name;
    document.getElementById("account-number").value = data.account_number;
  })
  .catch((error) => {
    console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
});












document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");
  const fileInput = document.getElementById("fileInput2");
  const previewImage = document.getElementById("previewImage2");
  const uploadContainer = document.getElementById("uploadContainer2");

  // ดึง contract_id จาก URL
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get("contract_id");
  if (contractId) {
    document.getElementById("contractId").value = contractId;
  }

  // ✅ แสดงภาพ preview เมื่อเลือกไฟล์
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("เลือกรูปภาพแล้ว:", file.name); // แสดงชื่อไฟล์ใน console
  
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block"; // แสดงรูป
        uploadContainer.style.display = "none"; // ซ่อนกล่อง upload
  
        console.log("โหลดภาพสำเร็จ แสดง preview แล้ว"); // log เมื่อโหลดภาพเสร็จ
      };
      reader.readAsDataURL(file);
    } else {
      console.log("ไม่ได้เลือกรูปภาพหรือไฟล์ไม่ถูกต้อง");
    }
  });

  // ✅ คลิกภาพเพื่อเปลี่ยนรูปใหม่
  previewImage.addEventListener("click", () => {
    fileInput.click(); // เปิดกล่องเลือกไฟล์ใหม่
  });

  // ✅ เมื่อส่งฟอร์ม
  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ตรวจสอบค่า
    const contractId = document.getElementById("contractId").value;
    const paymentDate = document.getElementById("paymentDate").value;
    const total = document.getElementById("total").value;
    const amountPaid = document.getElementById("amount").value;
    const accountName = document.getElementById("account-name").value;
    const bankName = document.getElementById("bank-name").value;
    const accountNumber = document.getElementById("account-number").value;

    // ตรวจสอบว่าไฟล์ถูกเลือก
    if (!fileInput.files.length) {
      alert("กรุณาเลือกไฟล์ proofImage");
      return;
    }

    // ✅ เตรียมข้อมูล
    const formData = new FormData();
    formData.append("contractId", contractId);
    formData.append("paymentDate", paymentDate);
    formData.append("total", total);
    formData.append("amountPaid", amountPaid);
    formData.append("accountName", accountName);
    formData.append("bankName", bankName);
    formData.append("accountNumber", accountNumber);
    formData.append("proofImage", fileInput.files[0]);

    // ✅ ส่งข้อมูลไป API
    try {
      const response = await fetch(`${BASE_URL}/api/payment`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Success:", data);

      if (response.ok) {
        window.location.href = `../../2_detail_contract/index.html?contract_id=${contractId}`;
      } else {
        alert(data.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถส่งข้อมูลได้");
    }
  });
});


//ย้อน
document.getElementById("cancel-button").addEventListener("click", function () {
  window.location.href = `../../2_detail_contract/index.html?contract_id=${contractId}`;
});