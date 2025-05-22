import { BASE_URL } from "../../../../config/config.js";

//เรียกidพาท
function getContractIdFromPath() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("contract_id");
}

//เเสดงจำนวนเหรียญ
async function loadBonusCoins() {
  const contract_id = getContractIdFromPath();

  try {
    const res = await fetch(
      `${BASE_URL}/api/contract/get-bonus-coins/${contract_id}`
    );
    const data = await res.json();

    const bonusSelect = document.getElementById("bonusCoins");
    bonusSelect.innerHTML = '<option value="">เลือกโบนัสเหรียญฟรี</option>';

    if (data.bonusOptions && data.bonusOptions.length > 0) {
      // สมมุติว่าใช้ค่ามากที่สุดเป็น max
      const max = Math.max(...data.bonusOptions.map((b) => parseInt(b)));
      for (let value = max; value >= 500; value -= 500) {
        const option = document.createElement("option");
        option.value = `coins${value}`;
        option.textContent = `${value} เหรียญ`;
        bonusSelect.appendChild(option);
      }
    }
  } catch (err) {
    console.error("โหลดโบนัสล้มเหลว:", err);
  }
}

window.onload = loadBonusCoins;


//คำนวณค่าเช่าทั้งหมดเเละรายวัน
function calculateRent() {
  const bonusCoinsSelect = document.getElementById("bonusCoins");
  const rentalDurationInput = document.getElementById("rentalDuration"); // input ที่ผู้ใช้กรอกจำนวนวันเช่า
  const totalRentInput = document.getElementById("totalRent");
  const dailyRentInput = document.getElementById("dailyRent"); // input สำหรับค่าเช่าต่อวัน

  // ดึงค่า bonusCoins และ rentalDuration จาก input
  const bonusCoins = parseInt(bonusCoinsSelect.value.replace("coins", "")) || 0;
  const rentalDuration = parseInt(rentalDurationInput.value) || 0;

  // ตรวจสอบว่ามีการเลือกค่าครบถ้วน
  if (bonusCoins > 0 && rentalDuration > 0) {
    // คำนวณ totalRent
    const percentFee = 0.02 * rentalDuration * bonusCoins;
    const totalRent = Math.round(percentFee + bonusCoins + 600);

    // แสดงค่า totalRent ใน input
    totalRentInput.value = totalRent;

    // คำนวณ dailyRent และปัดเศษเป็นจำนวนเต็ม
    if (!isNaN(totalRent) && !isNaN(rentalDuration) && rentalDuration > 0) {
      const dailyRent = Math.round(totalRent / rentalDuration);
      dailyRentInput.value = dailyRent;
    }
  } else {
    // หากข้อมูลไม่ครบ จะไม่คำนวณและลบค่าใน input ทั้งสอง
    totalRentInput.value = "";
    dailyRentInput.value = "";
  }
}

// เมื่อผู้ใช้เลือกค่า bonusCoins หรือกรอกจำนวนวันเช่าให้คำนวณค่าเช่า
document.getElementById("bonusCoins").addEventListener("change", calculateRent);
document.getElementById("rentalDuration").addEventListener("change", calculateRent);



// เรียกใช้เมื่อเปลี่ยนค่า bonus หรือ ระยะเวลาเช่า
document.getElementById("bonusCoins").addEventListener("change", calculateRent);
document
  .getElementById("rentalDuration")
  .addEventListener("input", calculateRent);

// ตรวจสอบอุปกรณ์
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// กำหนดตัวแปร
const startDateInput = document.getElementById("startDate");
const rentalDurationSelect = document.getElementById("rentalDuration");
const endDateInput = document.getElementById("endDate");

// ตั้งค่าวันที่เริ่มต้น (วันปัจจุบัน)
const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yyyy = today.getFullYear();

// สำหรับทั้งมือถือและคอมพิวเตอร์
startDateInput.value = `${dd}/${mm}/${yyyy}`;
startDateInput.readOnly = true; // ตั้งค่าให้ไม่สามารถแก้ไขได้
startDateInput.style.backgroundColor = "#f5f5f5"; // ทำให้ดูเหมือนไม่สามารถแก้ไขได้

// สำหรับคอมพิวเตอร์ (ปิดการใช้งาน Flatpickr)
if (!isMobile) {
  startDateInput.addEventListener("click", function (e) {
    e.preventDefault(); // ป้องกันไม่ให้คลิกได้
  });
}

// ฟังก์ชันคำนวณวันที่ครบกำหนด
function calculateEndDate() {
  const [day, month, year] = startDateInput.value.split("/").map(Number);
  const startDate = new Date(year, month - 1, day);

  const duration = parseInt(rentalDurationSelect.value);
  if (!isNaN(duration)) {
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + duration);

    const dd = String(dueDate.getDate()).padStart(2, "0");
    const mm = String(dueDate.getMonth() + 1).padStart(2, "0");
    const yyyy = dueDate.getFullYear() + 543; // พ.ศ.

    endDateInput.value = `${dd}/${mm}/${yyyy}`;
  } else {
    endDateInput.value = "";
  }
}

// Event Listeners
rentalDurationSelect.addEventListener("change", calculateEndDate);

// คำนวณครั้งแรกเมื่อโหลดหน้า
calculateEndDate();








// ✅ แปลงวันที่จาก พ.ศ. → ค.ศ.
function convertThaiDateToISO(thaiDate) {
  const [day, month, year] = thaiDate.split("/").map((v) => v.trim());
  let y = parseInt(year, 10);

  // ตรวจสอบว่าปีเป็น พ.ศ. หรือ ค.ศ.
  if (y > 2400) {
    y -= 543; // เป็น พ.ศ. ต้องลบ 543
  }

  return `${y}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

//บันทึก
document
  .getElementById("nextButton")
  .addEventListener("click", async function () {
    const contractId = getContractIdFromPath();
    const bonusCoins = document.getElementById("bonusCoins").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const rentalDuration = document.getElementById("rentalDuration").value;
    const dailyRent = document.getElementById("dailyRent").value;
    const totalRent = document.getElementById("totalRent").value;

    // ✅ ตรวจสอบข้อมูลเบื้องต้นก่อนส่ง
    if (
      !bonusCoins ||
      !startDate ||
      !endDate ||
      !rentalDuration ||
      !dailyRent ||
      !totalRent
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const formattedStartDate = convertThaiDateToISO(startDate);
    const formattedEndDate = convertThaiDateToISO(endDate);

    try {
      const response = await fetch(
        `${BASE_URL}/api/contract/contract3/${contractId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bonus_coins: bonusCoins,
            start_date: formattedStartDate,
            rental_duration: rentalDuration,
            end_date: formattedEndDate,
            daily_rent: dailyRent,
            total_rent: totalRent,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        window.location.href = "../0_contract/index.html";
      } else {
        alert(result.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        console.error(result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
});

// ย้อนกลับ
document.getElementById("btn-cancel").addEventListener("click", function () {
  window.location.href = "../0_contract/index.html";
});
