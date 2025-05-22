import { BASE_URL } from '../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง




const urlParams = new URLSearchParams(window.location.search);
const contractId = urlParams.get("id"); // ดึงค่าของ 'id' จาก query string

window.onload = () => {
  if (contractId) {
    loadPaymentData(contractId);
  } else {
    alert("ไม่พบ ID ใน URL");
  }
};

async function loadPaymentData(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/payment/${id}`);
    if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูล");

    const data = await response.json();

    document.getElementById("total").value = data.total;
    document.getElementById("paymentDate").value = data.paymentDate;
    document.getElementById("amount").value = data.amountPaid;
    document.getElementById("bank-name").value = data.bankName;
    document.getElementById("account-name").value = data.accountName;
    document.getElementById("account-number").value = data.accountNumber;
    document.getElementById("contractId").value = data.contractId;

    if (data.proofImage) {
      const preview = document.getElementById("previewImage2");
      preview.src = `/uploads/${data.proofImage}`;
      preview.style.display = "block";
      document.getElementById("upload-text").style.display = "none";
      document.getElementById("upload-icon").style.display = "none";
    }

    // ผูกปุ่มอนุมัติ/ไม่อนุมัติ
    document.getElementById("submit-button").addEventListener("click", () => {
      handleApprove(contractId);
    });

    document.getElementById("cancel-button").addEventListener("click", (e) => {
      e.preventDefault(); // ป้องกันการ submit form
      handleReject(contractId);
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    alert("เกิดปัญหาในการโหลดข้อมูล");
  }
}

//อนุมัติ
async function handleApprove(id) {
  try {
    const adminIdCard = localStorage.getItem("id_card_number");
    const adminPosition = localStorage.getItem("position");

    if (!adminIdCard || !adminPosition) {
      throw new Error("ไม่พบข้อมูลผู้ดูแลระบบในระบบ");
    }

    const response = await fetch(`${BASE_URL}/api/${id}/approve-payment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        approvedBy: {
          id_card_number: adminIdCard,
          position: adminPosition,
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "การอนุมัติล้มเหลว");
    }

    window.location.href = "../show/index.html";
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    alert("เกิดข้อผิดพลาดในการอนุมัติ: " + error.message);

    // แสดง error จากเซิร์ฟเวอร์ถ้ามี
    if (error.details) {
      console.error("รายละเอียดข้อผิดพลาด:", error.details);
    }
  }
}

//ไม่อนุมัติ
async function handleReject(id) {
  try {
    // ดึงข้อมูลผู้ดูแลระบบจาก localStorage
    const adminIdCard = localStorage.getItem("id_card_number");
    const adminPosition = localStorage.getItem("position");

    if (!adminIdCard || !adminPosition) {
      throw new Error("ไม่พบข้อมูลผู้ดูแลระบบในระบบ");
    }

    const response = await fetch(`${BASE_URL}/api/${id}/reject-payment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rejectedBy: {
          id_card_number: adminIdCard,
          position: adminPosition,
        },
      }),
    });

    if (response.ok) {
      window.location.href = "../show/index.html";
    } else {
      throw new Error("การไม่อนุมัติล้มเหลว");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    alert("เกิดข้อผิดพลาดในการไม่อนุมัติ: " + error.message);
  }
}








