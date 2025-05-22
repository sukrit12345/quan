import { BASE_URL } from "../../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง


const urlParams = new URLSearchParams(window.location.search);
const contractId = urlParams.get("id");  // ดึงค่าของ 'id' จาก query string


// ผูกปุ่มอนุมัติ/ไม่อนุมัติ
document.getElementById("btnNext").addEventListener("click", () => {
  handleApprove(contractId);
});

document.getElementById("btn-cancel").addEventListener("click", (e) => {
  e.preventDefault(); // ป้องกันการ submit form
  handleReject(contractId);
});

//อนุมัติ
async function handleApprove(id) {
  try {
    const adminIdCard = localStorage.getItem("id_card_number");
    const adminPosition = localStorage.getItem("position");

    if (!adminIdCard || !adminPosition) {
      throw new Error("ไม่พบข้อมูลผู้ดูแลระบบในระบบ");
    }

    const response = await fetch(`${BASE_URL}/api/${id}/approve-contract4`, {
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

    const response = await fetch(`${BASE_URL}/api/${id}/reject-contract4`, {
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

//ปิดฟิลด์
window.onload = function () {
  // ปิด input ทั้งหมด
  document.querySelectorAll("input").forEach(function (el) {
    el.disabled = true;
  });

  // ปิด select ทั้งหมด
  document.querySelectorAll("select").forEach(function (el) {
    el.disabled = true;
  });
};
