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
const contractId = urlParams.get("_id"); // ต้องมี ?_id=BA9212320 ใน URL

// ฟังก์ชันในการดึงข้อมูลและแสดงผล
fetch(`${BASE_URL}/api/detailcontract6/${contractId}`)
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
      document.getElementById("late-rent").textContent = formatCurrency(
        data.overdue_rent
      );
      document.getElementById("security-fee").textContent = formatCurrency(
        data.tracking_fee
      );
      document.getElementById("legal-fee").textContent = formatCurrency(
        data.legal_fee
      );
      document.getElementById("total-payment").textContent = formatCurrency(
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

//เเสดงการชำระเงิน
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get("_id");

  if (!contractId) {
    console.error("ไม่พบ contract_id ใน URL");
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/detailpayments/${contractId}`
    );
    const payments = await response.json();

    const tbody = document.querySelector("#payment-table tbody");
    tbody.innerHTML = ""; // ล้างข้อมูลเก่าก่อน

    if (payments.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="5" style="text-align:center;">ไม่พบข้อมูลการชำระ</td>`;
      tbody.appendChild(row);
      return;
    }

    payments.forEach((payment, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${payments.length - index}</td>
        <td>${payment.paymentDate}</td>
        <td>${payment.amountPaid.toLocaleString()}</td>
        <td style="color: ${getStatusColor2(payment.status)};">
          ${payment.status}
        </td>
        <td>
          <i class="fa-solid fa-eye" 
            style="cursor:pointer; color: #007bff;" 
            title="ดูรายละเอียด"></i>
        </td>
          `;
      // เพิ่ม event listener ให้ไอคอน
      const eyeIcon = row.querySelector("i.fa-eye");
      eyeIcon.addEventListener("click", () => {
        goToIndex(payment._id);
      });
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดขณะโหลดข้อมูล:", error);
  }
});



//กำหนดสีสถานะชำระเงิน
function getStatusColor2(status) {
  switch (status) {
    case "รออนุมัติ":
      return "#FFCA43";
    case "ไม่อนุมัติ":
      return "#E84143";
    case "อนุมัติ":
      return "#7FCF18";
    default:
      return "#000000";
  }
}

/* ฟังก์ชันนำทางไปหน้า index.html ในแท็บใหม่ */
function goToIndex(paymentId) {
  window.open(`../showpayment/index.html?payment_id=${paymentId}`, '_blank');
}




//pdfข้อมูลรายละเอียดสัญญา
document.getElementById('btn-export-pdf').addEventListener('click', () => {
  const element = document.getElementById('contract-print');

  // กำหนดตัวเลือก pdf (A4 portrait, ขอบ 10 มม.)
  const opt = {
    margin: 0.5,
    filename: "ข้อมูลรายละเอียดสัญญา.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2,  width: 710},
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: {
      mode: ['avoid-all'], // ❗ ป้องกันไม่ให้ตัดข้อความกลางคัน
      before: '.page-break', // ใช้กรณีอยากกำหนดตำแหน่งขึ้นหน้าใหม่เอง
      after: [] // ไม่ต้องการตัดหลัง element ใด
    }
  };

  // เรียก html2pdf
  html2pdf().set(opt).from(element).save();
});





//pdfข้อมูลรายละเอียดสัญญา
document.getElementById('btn-export-pdf2').addEventListener('click', () => {
  const element = document.getElementById('contract-docs');

  // กำหนดตัวเลือก pdf (A4 portrait, ขอบ 10 มม.)
  const opt = {
    margin: 0.5,
    filename: "ข้อมูลรายละเอียดสัญญา.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2,  width: 710},
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: {
      mode: ['avoid-all'], // ❗ ป้องกันไม่ให้ตัดข้อความกลางคัน
      before: '.page-break', // ใช้กรณีอยากกำหนดตำแหน่งขึ้นหน้าใหม่เอง
      after: [] // ไม่ต้องการตัดหลัง element ใด
    }
  };

  // เรียก html2pdf
  html2pdf().set(opt).from(element).save();
});

