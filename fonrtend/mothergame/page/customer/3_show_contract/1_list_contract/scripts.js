import { BASE_URL } from "../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

// ฟังก์ชัน map สถานะเป็นรหัสสี
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

// ฟังก์ชันดึงข้อมูลจาก Contract6
async function fetchContractData() {
  try {
    const id_card_number = localStorage.getItem("id_card_number");

    if (!id_card_number) {
      console.log("ไม่พบเลขบัตรประชาชนใน localStorage");
      return;
    }

    const response = await fetch(
      `${BASE_URL}/api/contract6/id-card/${id_card_number}`
    );

    if (response.ok) {
      const result = await response.json();
      const contractList = result.data;

      const tableBody = document.getElementById("contract-table-body");

      if (contractList.length > 0) {
        // 🔁 เรียงข้อมูลจากวันครบกำหนดล่าสุดไปเก่าสุด
        contractList.sort(
          (a, b) => new Date(b.end_date) - new Date(a.end_date)
        );

        // ดึงข้อมูลมาแสดงในตารางโดยเรียงลำดับจากใหม่ไปเก่า
        contractList.forEach((contract, index) => {
          const statusColor = getStatusColor(contract.status);

          const newRow = document.createElement("tr");

          // เพิ่ม contract_id เป็น data attribute
          newRow.setAttribute("data-contract-id", contract.contract_id);

          newRow.innerHTML = `
            <td>${
              contractList.length - index
            }</td> <!-- เลขที่รายการจากมากไปน้อย -->
            <td>${formatDate(contract.end_date)}</td> <!-- วันครบกำหนด -->
            <td>${contract.total_payment_due}</td> <!-- ยอดรวมที่ต้องชำระ -->
            <td style="color: ${statusColor};">${
            contract.status || "-"
          }</td> <!-- สถานะ -->
          `;

          // เพิ่ม event listener เมื่อคลิกที่ <tr>
          newRow.addEventListener("click", () => {
            const contractId = newRow.getAttribute("data-contract-id"); // ดึง contract_id
            window.location.href = `../2_detail_contract/index.html?contract_id=${contractId}`; // ส่ง contract_id ไปยังหน้า index.html
          });

          tableBody.appendChild(newRow);
        });
      } else {
        console.log("ไม่พบข้อมูล Contract6 สำหรับเลขบัตรนี้");
      }
    } else {
      console.log("ไม่พบข้อมูลจาก API");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
  }
}

// แปลงวันที่เป็น dd/mm/yyyy
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// เรียกฟังก์ชันเพื่อดึงข้อมูล
fetchContractData();
