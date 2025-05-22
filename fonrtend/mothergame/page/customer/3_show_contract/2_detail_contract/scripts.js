import { BASE_URL } from "../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

//เเสดงสัญญา
window.addEventListener("DOMContentLoaded", () => {
  // ดึงข้อมูลเอกสารจาก API เมื่อหน้าเว็บโหลดเสร็จ
  fetch(`${BASE_URL}/api/5`)
    .then((response) => response.json()) // แปลงข้อมูลจาก API เป็น JSON
    .then((data) => {
      // ตรวจสอบว่าข้อมูลที่ได้รับมี 'text'
      if (data && data.text) {
        // ใส่ข้อความที่ได้รับจาก API ลงในพาเรนต์ที่มี id="contract-docs"
        document.getElementById("contract-docs").innerText = data.text;
      } else {
        console.log("ไม่พบข้อมูลเอกสาร");
      }
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเอกสาร:", error);
    });
});

// ดึง contract_id จาก URL
const urlParams = new URLSearchParams(window.location.search);
const contractId = urlParams.get("contract_id"); // ต้องมี ?contract_id=BA9212320 ใน URL


// ฟังก์ชันในการดึงข้อมูลและแสดงผล
fetch(`${BASE_URL}/api/contract6/${contractId}`)
  .then((res) => res.json())
  .then((result) => {
    if (result.success) {
      const data = result.data;


      // แสดงสถานะใน HTML
      const statusEl = document.getElementById("contract-status");
      const statusText = data.status || "-";
      const statusColor = getStatusColor(statusText);
      statusEl.innerHTML = `<span style="color: ${statusColor}; font-weight: bold;">${statusText}</span>`;

      // แสดงข้อมูลอื่นๆ
      document.getElementById("contract-code").textContent =
        data.contract_id || "-";
      document.getElementById("device-type").textContent =
        data.device_type || "-";
      document.getElementById("device-model").textContent = data.model || "-";
      document.getElementById("start-date").textContent = formatDate(
        data.start_date
      );
      document.getElementById("total-days").textContent =
        data.rental_duration || "-";
      document.getElementById("end-date").textContent = formatDate(
        data.end_date
      );
      document.getElementById("total-rent").textContent = formatCurrency(
        data.total_rent
      );
      document.getElementById("late-rent").textContent =formatCurrency(
        data.overdue_rent
      );
      document.getElementById("security-fee").textContent = formatCurrency(
        data.tracking_fee
      );
      document.getElementById("legal-fee").textContent = formatCurrency(
        data.legal_fee
      );
      document.getElementById("total-payment").textContent =formatCurrency(
        data.total_payment_due
      );
      
    } else {
      alert("ไม่พบข้อมูลสัญญา");
    }
  })
  .catch((err) => {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสัญญา:", err);
});




// ฟังก์ชันแปลงวันที่ (yyyy-mm-dd → dd/mm/yyyy)
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

// ฟังก์ชันแปลงเป็นรูปแบบเงิน
function formatCurrency(num) {
  if (num == null) return "-";
  return parseFloat(num).toLocaleString("th-TH", {
    style: "currency",
    currency: "THB",
  });
}

//สีสถานะสัญญา
function getStatusColor(status) {
  const statusColorMap = {
    อยู่ในสัญญา: "#21266E",
    เลยสัญญา: "#FFCA43",
    ชำระครบ: "#7FCF18",
    อายัด: "#E84143",
    นัดวันชำระ: "#FF7C3B",
    ครบสัญญา: "#FAA5A6",
    ส่งผู้ติดตาม: "#7E1E20",
    แบล็คลิสต์: "#000000",
  };
  return statusColorMap[status] || "#CCCCCC"; // สีเทาอ่อนหากไม่พบ
}

//ชำระเงิน
document.getElementById("payBtn").addEventListener("click", function () {
    window.location.href = `../3_payment/1_payment/index.html?contract_id=${contractId}`;
});








//เเสดงการชำระเงิน
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get("contract_id");

  if (!contractId) {
    console.error("ไม่พบ contract_id ใน URL");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/payments?contract_id=${contractId}`);
    const payments = await response.json();

    const tbody = document.querySelector('#payment-table tbody');
    tbody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน

    if (payments.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="4" style="text-align:center;">ไม่พบข้อมูลการชำระ</td>`;
      tbody.appendChild(row);
      return;
    }

    payments.forEach((payment, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${payments.length - index}</td>
        <td>${payment.paymentDate}</td>
        <td>${payment.amountPaid.toLocaleString()}</td>
        <td style="color: ${getStatusColor2(payment.status)};">
          ${payment.status}
        </td>
      `;
      tbody.appendChild(row);
    });
    
  } catch (error) {
    console.error("เกิดข้อผิดพลาดขณะโหลดข้อมูล:", error);
  }
});


//กำหนดสีสถานะชำระเงิน
function getStatusColor2(status) {
  switch(status) {
    case 'รออนุมัติ': return '#FFCA43';
    case 'ไม่อนุมัติ': return '#E84143';
    case 'อนุมัติ': return '#7FCF18';
    default: return '#000000';
  }
}

