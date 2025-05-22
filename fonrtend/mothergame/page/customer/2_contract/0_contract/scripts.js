import { BASE_URL } from "../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

//บันทึก
document
  .getElementById("create-contract-btn")
  .addEventListener("click", async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/contracts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("สร้างสัญญาไม่สำเร็จ");

      const data = await response.json();
      console.log("สร้างสัญญาสำเร็จ:", data);

      // รีโหลดหรือเพิ่ม card ใหม่เข้า DOM
      location.reload(); // วิธีง่ายสุด
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  });




// ฟังก์ชันโหลดข้อมูลสัญญา
async function loadContracts() {
  const container = document.getElementById("contract-list");

  try {
    // แสดงสถานะกำลังโหลด
    container.innerHTML = `
      <div class="loading-state">
        <div class="spinner"></div>
        <p>กำลังโหลดข้อมูลสัญญา...</p>
      </div>
    `;

    // เรียก API
    const response = await fetch(
      `${BASE_URL}/api/contracts/with-all-statuses`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    // ตรวจสอบ HTTP Status
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `เซิร์ฟเวอร์ตอบกลับด้วยสถานะ ${response.status}`
      );
    }

    // แปลงข้อมูล JSON
    const result = await response.json();
    console.log("ข้อมูลที่ได้รับจาก API:", result);

    // ตรวจสอบโครงสร้างข้อมูล
    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("รูปแบบข้อมูลจากเซิร์ฟเวอร์ไม่ถูกต้อง");
    }

    container.innerHTML = "";

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (result.data.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="icon">📭</i>
          <p>ไม่พบข้อมูลสัญญาในระบบ</p>
        </div>
      `;
      return;
    }

    // แสดงผลข้อมูลสัญญา
    result.data.forEach((contract) => {
      const steps = [
        {
          name: "ยืนยันตัวตน",
          status: contract.identity_status || "รอดำเนินการ",
          key: "identity",
        },
        {
          name: "ประเมิณหลักประกัน",
          status: contract.collateral_status || "รอดำเนินการ",
          key: "collateral",
        },
        {
          name: "เช่าเกม",
          status: contract.rental_status || "รอดำเนินการ",
          key: "rental",
        },
        {
          name: "ยืนยันหลักประกัน",
          status: contract.delivery_status || "รอดำเนินการ",
          key: "delivery",
        },
        {
          name: "ยินยอมข้อตกลงในสัญญา",
          status: contract.completion_status || "รอดำเนินการ",
          key: "completion",
        },
      ];

      // ตรวจสอบว่ามีขั้นตอนใดถูกปฏิเสธหรือไม่
      const hasRejectedStep = steps.some(
        (step) => step.status === "ไม่อนุมัติ" || step.status === "รออนุมัติ"
      );

      const stepsHTML = steps
        .map((step, index) => {
          let statusClass = "pending-status"; // Default for "รอดำเนินการ"

          // กำหนด class ตามสถานะ
          if (step.status === "อนุมัติ") {
            statusClass = "approved-status";
          } else if (step.status === "ไม่อนุมัติ") {
            statusClass = "rejected-status";
          } else if (step.status === "รออนุมัติ") {
            statusClass = "pending-approval-status"; // สำหรับสถานะรออนุมัติ
          }
          // "รอดำเนินการ" จะใช้ค่า default คือ "pending-status"

          return `
          <div class="step">
            <span class="step-number">${index + 1}</span>
            <span class="step-text">
              ${step.name}
              <span class="status ${statusClass}">${step.status}</span>
            </span>
          </div>
        `;
        })
        .join("");

      // กำหนด URL ปลายทางตามสถานะปัจจุบัน
      let targetPage = "1_contract"; // หน้าเริ่มต้น

      if (!hasRejectedStep) {
        if (contract.identity_status === "อนุมัติ") {
          if (contract.collateral_status === "อนุมัติ") {
            if (contract.rental_status === "อนุมัติ") {
              if (contract.delivery_status === "อนุมัติ") {
                if (contract.completion_status === "อนุมัติ") {
                  targetPage = "../3_show_contract/1_list_contract"; // ไปหน้ารายการสัญญา
                } else {
                  targetPage = "5_contract"; // ทุกขั้นตอนเสร็จสิ้น
                }
              } else {
                targetPage = "4_contract"; // รอการจัดส่ง
              }
            } else {
              targetPage = "3_contract"; // รอเช่าเกม
            }
          } else {
            targetPage = "2_contract"; // รอหลักประกัน
          }
        }
      }

      

      // สร้างปุ่มตามสถานะ
      let buttonHTML = "";
      if (hasRejectedStep) {
        buttonHTML = `
          <button class="continue-btn disabled" disabled title="ไม่สามารถดำเนินการต่อได้เนื่องจากมีขั้นตอนที่ถูกปฏิเสธ">
            ดำเนินการต่อ
          </button>
        `;
      } else {
        buttonHTML = `
          <button class="continue-btn" 
                  data-contract-id="${contract.id}"
                  data-target-page="${targetPage}">
            ดำเนินการต่อ
          </button>
        `;
      }

      // ฟังก์ชันแปลงวันที่เป็นรูปแบบไทย (dd/mm/yyyy) + โซนเวลา UTC+7
      function formatThaiDate(dateString) {
        if (!dateString) return "";

        const date = new Date(dateString);
        // แปลง UTC เป็นเวลาไทย (+7 ชั่วโมง)
        date.setHours(date.getHours() + 7);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear() + 543; // ค.ศ. -> พ.ศ.

        return `${day}/${month}/${year}`;
      }

      container.innerHTML += `
        <div class="contract-card">
          <div class="contract-header">
            <p class="contract-number">ID: ${contract.id}</p>
            ${
              contract.createdAt
                ? `<p class="contract-date">${formatThaiDate(
                    contract.createdAt
                  )}</p>`
                : ""
            }
          </div>
          <div class="progress-steps">${stepsHTML}</div>
          <div class="action-btn">
            ${buttonHTML}
          </div>
        </div>
      `;
    });

    // เพิ่ม Event Listener สำหรับปุ่มที่เปิดใช้งานเท่านั้น
    document
      .querySelectorAll(".continue-btn:not(.disabled)")
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          const contractId = e.target.getAttribute("data-contract-id");
          const targetPage = e.target.getAttribute("data-target-page");
          window.location.href = `../${targetPage}/index.html?contract_id=${contractId}`;
        });
      });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลสัญญา:", error);
    container.innerHTML = `
      <div class="error-state">
        <i class="icon">⚠️</i>
        <h3>ไม่สามารถโหลดข้อมูลได้</h3>
        <p>${error.message}</p>
        <button class="retry-btn" onclick="loadContracts()">
          <i class="refresh-icon">↻</i> ลองอีกครั้ง
        </button>
      </div>
    `;
  }
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener("DOMContentLoaded", loadContracts);




