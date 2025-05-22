import { BASE_URL } from "../../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

document.addEventListener("DOMContentLoaded", () => {
  // ดึงค่าจาก query string
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get("id"); // ดึงค่า 'id' จาก URL

  if (contractId) {
    // ดึงข้อมูลจาก API โดยใช้ contractId
    fetch(`${BASE_URL}/api/get-user-contract2/${contractId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // หากไม่พบข้อมูล หรือเกิดข้อผิดพลาด
          alert(data.message);
        } else {
          // กรณีพบข้อมูลสัญญา
          console.log(data); // ตรวจสอบข้อมูลที่ได้รับจาก API
          populateForm(data);
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        alert("ไม่สามารถดึงข้อมูลได้");
      });
  } else {
    alert("ไม่พบ parameter 'id' ใน URL");
  }

  // ผูกปุ่มอนุมัติ/ไม่อนุมัติ
  document.getElementById("btn-next").addEventListener("click", () => {
    handleApprove(contractId);
  });

  document.getElementById("btn-cancel").addEventListener("click", (e) => {
    e.preventDefault(); // ป้องกันการ submit form
    handleReject(contractId);
  });
});

// ฟังก์ชั่นเพื่อ populate ข้อมูลในฟอร์ม
function populateForm(data) {
  // เติมข้อมูลลงในฟอร์ม
  document.getElementById("device-select").value = data.deviceType || "";
  document.getElementById("device-model").value = data.model || "";
  document.getElementById("storage-capacity").value = data.storage || "";
  document.getElementById("battery-health").value = data.batteryHealth || "";
  const imageBasePath = `/uploads/`; // path ที่ถูกต้อง

  // แสดงภาพที่อัปโหลดแล้ว
  if (data.appleIdImage) {
    document.getElementById("previewImage1").src =
      imageBasePath + data.appleIdImage;
    document.getElementById("previewImage1").style.display = "block";
  }
  if (data.modelImage) {
    document.getElementById("previewImage2").src =
      imageBasePath + data.modelImage;
    document.getElementById("previewImage2").style.display = "block";
  }
  if (data.batteryImage) {
    document.getElementById("previewImage3").src =
      imageBasePath + data.batteryImage;
    document.getElementById("previewImage3").style.display = "block";
  }
  if (data.storageImage) {
    document.getElementById("previewImage4").src =
      imageBasePath + data.storageImage;
    document.getElementById("previewImage4").style.display = "block";
    console.log("previewImage4 path:", imageBasePath + data.storageImage);
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

    const response = await fetch(`${BASE_URL}/api/${id}/approve-contract2`, {
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

    const response = await fetch(`${BASE_URL}/api/${id}/reject-contract2`, {
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
