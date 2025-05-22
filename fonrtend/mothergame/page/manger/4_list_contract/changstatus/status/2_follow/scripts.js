import { BASE_URL } from '../../../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง

// สร้าง flatpickr สำหรับ payment-date และ dueDate พร้อม locale และ config เหมือนกัน
const localeConfig = {
  firstDayOfWeek: 1,
  weekdays: {
    shorthand: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    longhand: [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ],
  },
  months: {
    shorthand: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    longhand: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
  },
};

const fpPaymentDate = flatpickr("#transactionDate", {
  locale: localeConfig,
  dateFormat: "d/m/Y",
  defaultDate: "today",
  enableTime: false,
  timeZone: "Asia/Bangkok",
  onChange: calculateDueDateFromInputs,
});

const fpDueDate = flatpickr("#dueDate", {
  locale: localeConfig,
  dateFormat: "d/m/Y",
  defaultDate: "today",
  enableTime: false,
  timeZone: "Asia/Bangkok",
  onChange: calculateFollowDurationFromDates,
});

function formatDateToDDMMYYYY(date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function parseDateDDMMYYYY(str) {
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

// คำนวณ dueDate จาก transactionDate และ followDuration (input หรือ date picker)
function calculateDueDateFromInputs() {
  const paymentDateStr = document.getElementById("transactionDate").value;
  const followDurationStr = document.getElementById("followDuration").value;

  if (!paymentDateStr || !followDurationStr) {
    fpDueDate.clear(); // ล้าง dueDate
    return;
  }

  const paymentDate = parseDateDDMMYYYY(paymentDateStr);
  const duration = parseInt(followDurationStr, 10);
  if (!paymentDate || isNaN(duration)) {
    fpDueDate.clear();
    return;
  }

  const dueDate = new Date(paymentDate);
  dueDate.setDate(dueDate.getDate() + duration);

  fpDueDate.setDate(dueDate, true); // true = trigger change event
}

// คำนวณ followDuration จาก dueDate - transactionDate
function calculateFollowDurationFromDates() {
  const paymentDateStr = document.getElementById("transactionDate").value;
  const dueDateStr = document.getElementById("dueDate").value;

  if (!paymentDateStr || !dueDateStr) {
    document.getElementById("followDuration").value = "";
    return;
  }

  const paymentDate = parseDateDDMMYYYY(paymentDateStr);
  const dueDate = parseDateDDMMYYYY(dueDateStr);
  if (!paymentDate || !dueDate) {
    document.getElementById("followDuration").value = "";
    return;
  }

  const diffTime = dueDate.getTime() - paymentDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    // ถ้าวันที่ dueDate น้อยกว่า transactionDate ให้เคลียร์ค่า
    document.getElementById("followDuration").value = "";
    fpDueDate.clear();
    return;
  }
  document.getElementById("followDuration").value = diffDays;
}

// event listener สำหรับ input followDuration แบบพิมพ์เอง (นอกจาก flatpickr change)
document
  .getElementById("followDuration")
  .addEventListener("input", calculateDueDateFromInputs);

// เรียกครั้งแรกถ้ามีค่าเริ่มต้น
calculateDueDateFromInputs();





//เเสดงภาพสลิป
document
  .getElementById("fileInput2")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById("previewImage2");
    const uploadContainer = document.getElementById("uploadContainer2");

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block"; // แสดงรูปที่เลือก
        uploadContainer.style.display = "none"; // ซ่อนไอคอนและข้อความอัปโหลด
      };
      reader.readAsDataURL(file);
    }
  });
document.getElementById("previewImage2").addEventListener("click", function () {
  document.getElementById("fileInput2").click(); // เปิด dialog ให้เลือกไฟล์ใหม่
});



document.getElementById("followForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
  
    // ดึง contractId จาก query string
    const urlParams = new URLSearchParams(window.location.search);
    const contractId = urlParams.get('_id');
  
    if (!contractId) {
      alert("ไม่พบ contractId ใน URL");
      return;
    }
  
    try {
      const response = await fetch(`${ BASE_URL }/api/followup/${contractId}`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        window.location.href = "../../show/index.html";
        form.reset(); // เคลียร์ฟอร์ม
      } else {
        alert("เกิดข้อผิดพลาด: " + (result.message || "ไม่สามารถบันทึกข้อมูลได้"));
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ: " + error.message);
    }
  });
  