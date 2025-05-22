import { BASE_URL } from "../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

// สมมติอ่าน payment_id จาก query string
const params = new URLSearchParams(window.location.search);
const paymentId = params.get("payment_id");
if (paymentId) loadPayment(paymentId);
//เเสดงข้อมูล
async function loadPayment(paymentId) {
  try {
    const res = await fetch(`${ BASE_URL }/api/showpayments/${paymentId}`);
    if (!res.ok) throw new Error("โหลดข้อมูลการชำระไม่สำเร็จ");

    const data = await res.json();

    // เติมค่าลงในฟอร์ม
    document.getElementById("total").value = data.total.toLocaleString();
    document.getElementById("paymentDate").value = data.paymentDate;
    document.getElementById("amount").value = data.amountPaid.toLocaleString();
    document.getElementById("bank-name").value = data.bankName ?? "";
    document.getElementById("account-name").value = data.accountName ?? "";
    document.getElementById("account-number").value = data.accountNumber ?? "";

    // แสดงรูปหลักฐาน (ถ้ามี)
    if (data.proofImage) {
      const img = document.getElementById("previewImage2");
      img.src = `/uploads/${data.proofImage}`;
      img.style.display = "block";
      // ซ่อนปุ่มอัปโหลด (ถ้าต้องการอ่านอย่างเดียว)
      document.getElementById("fileInput2").style.display = "none";
    }
  } catch (err) {
    alert(err.message);
  }
}
