import { BASE_URL } from "../../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get("id");

  if (!contractId) {
    alert("ไม่พบ ID ใน URL");
    return;
  }

  async function fetchContractData(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/get-user-contract5/${id}`);
      const data = await response.json();

      if (data.message === "ไม่พบข้อมูล") {
        alert("ไม่พบข้อมูลสัญญานี้");
        return;
      }

      // แสดงข้อมูลใน input fields
      document.getElementById("ipAddress").value = data.ipAddress || "";
      document.getElementById("userAgent").value = data.userAgent || "";

      // ปิดไม่ให้แก้ไข
      document.getElementById("ipAddress").disabled = true;
      document.getElementById("userAgent").disabled = true;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์");
    }
  }

  // เรียกใช้เมื่อหน้าโหลดเสร็จ
  fetchContractData(contractId);

  // ผูกปุ่มอนุมัติ/ไม่อนุมัติ
  document.getElementById("btnNext").addEventListener("click", () => {
    handleApprove(contractId);
  });

  document.getElementById("btn-cancel").addEventListener("click", (e) => {
    e.preventDefault(); // ป้องกันการ submit form
    handleReject(contractId);
  });
});

//อนุมัติ
async function handleApprove(id) {
  try {
    const adminIdCard = localStorage.getItem("id_card_number");
    const adminPosition = localStorage.getItem("position");

    if (!adminIdCard || !adminPosition) {
      throw new Error("ไม่พบข้อมูลผู้ดูแลระบบในระบบ");
    }

    const response = await fetch(`${BASE_URL}/api/${id}/approve-contract5`, {
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

  // ผูกปุ่มอนุมัติ/ไม่อนุมัติ
  document.getElementById("btnNext").addEventListener("click", () => {
    handleApprove(contractId);
  });

  document.getElementById("btn-cancel").addEventListener("click", (e) => {
    e.preventDefault(); // ป้องกันการ submit form
    handleReject(contractId);
  });
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

    const response = await fetch(`${BASE_URL}/api/${id}/reject-contract5`, {
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
