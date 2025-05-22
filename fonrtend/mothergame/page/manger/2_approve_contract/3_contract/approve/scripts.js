import { BASE_URL } from "../../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

document.addEventListener("DOMContentLoaded", function () {
  // ดึง 'id' จาก query string
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get("id"); // ดึงค่าของ 'id' จาก query string

  if (!contractId) {
    alert("ไม่พบ ID ใน URL");
    return;
  }

  // ฟังก์ชันที่ดึงข้อมูลสัญญาจาก API
  async function fetchContractData(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/get-user-contract3/${id}`);
      const data = await response.json();

      if (data.message && data.message === "ไม่พบข้อมูล") {
        alert("ไม่พบข้อมูลสัญญานี้");
        return;
      }

      // หากข้อมูลถูกต้อง, แสดงข้อมูลในฟอร์ม
      document.getElementById("bonusCoins").value = data.bonus_coins || "";
      document.getElementById("bonusCoins").disabled = true; // ทำให้ไม่สามารถแก้ไขได้

      document.getElementById("startDate").value =
        formatDate(data.start_date) || "";
      document.getElementById("startDate").disabled = true; // ทำให้ไม่สามารถแก้ไขได้

      document.getElementById("rentalDuration").value =
        data.rental_duration || "";
      document.getElementById("rentalDuration").disabled = true; // ทำให้ไม่สามารถแก้ไขได้

      document.getElementById("endDate").value =
        formatDate(data.end_date) || "";
      document.getElementById("endDate").disabled = true; // ทำให้ไม่สามารถแก้ไขได้

      document.getElementById("dailyRent").value = data.daily_rent || "";
      document.getElementById("dailyRent").disabled = true; // ทำให้ไม่สามารถแก้ไขได้

      document.getElementById("totalRent").value = data.total_rent || "";
      document.getElementById("totalRent").disabled = true; // ทำให้ไม่สามารถแก้ไขได้
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  }

  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลเมื่อโหลดหน้า
  fetchContractData(contractId);

  // ผูกปุ่มอนุมัติ/ไม่อนุมัติ
  document.getElementById("nextButton").addEventListener("click", () => {
    handleApprove(contractId);
  });

  document.getElementById("btn-cancel").addEventListener("click", (e) => {
    e.preventDefault(); // ป้องกันการ submit form
    handleReject(contractId);
  });
});

// === ฟังก์ชันแปลงวันที่เป็นเวลาไทย ===
function formatDate(dateString) {
  const date = new Date(dateString);
  const thailandTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  const day = String(thailandTime.getDate()).padStart(2, "0");
  const month = String(thailandTime.getMonth() + 1).padStart(2, "0");
  const year = thailandTime.getFullYear();
  return `${day}/${month}/${year}`;
}

//อนุมัติ
async function handleApprove(id) {
  try {
    const adminIdCard = localStorage.getItem("id_card_number");
    const adminPosition = localStorage.getItem("position");

    if (!adminIdCard || !adminPosition) {
      throw new Error("ไม่พบข้อมูลผู้ดูแลระบบในระบบ");
    }

    const response = await fetch(`${BASE_URL}/api/${id}/approve-contract3`, {
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

    const response = await fetch(`${BASE_URL}/api/${id}/reject-contract3`, {
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
