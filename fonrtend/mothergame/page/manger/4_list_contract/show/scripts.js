import { BASE_URL } from '../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง


//เเสดงข้อมูล
document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector("#loan-status-table tbody");
  
    try {
      const response = await fetch(`${BASE_URL}/api/contract/contract-summary`);
      const { data } = await response.json();
  
      tableBody.innerHTML = ""; // ล้างข้อมูลเก่า
  
      data.forEach((item, index) => {
        const row = document.createElement("tr");

        const statusColor = getStatusColor(item.status);
  
        row.innerHTML = `
          <td>${data.length - index}</td>
          <td>${item.contract_id || "-"}</td>
          <td>${item.start_date ? new Date(item.start_date).toLocaleDateString("th-TH") : "-"}</td>
          <td>${item.id_card_number || "-"}</td>
          <td>${item.first_name || "-"}</td>
          <td>${item.last_name || "-"}</td>
          <td>${item.province || "-"}</td>
          <td>${item.end_date ? new Date(item.end_date).toLocaleDateString("th-TH") : "-"}</td>
          <td>${item.total_payment_due?.toLocaleString() || "-"}</td>
          <td>${item.amountPaid?.toLocaleString() || "-"}</td>
         <td style="color: ${statusColor}; ">${item.status || "-"}</td>
          <td>-</td> <!-- manager ไม่มีใน API นี้ -->
          <td>
            <button class="icon-button" onclick="window.open('../contract1/index.html?_id=${item.id}', '_blank')">
              <i class="fas fa-id-card icon-user"></i>
            </button>
            <button class="icon-button" onclick="window.open('../contract6/index.html?_id=${item.contract_id}', '_blank')">
              <i class="fas fa-file-contract icon-contract"></i>
            </button>
            <button class="icon-button" onclick="window.open('../changstatus/show/index.html?_id=${item.contract_id}', '_blank')">
              <i class="fas fa-exclamation-triangle icon-status"></i>
            </button>
          </td>
        `;
  
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
      tableBody.innerHTML = `<tr><td colspan="12">ไม่สามารถโหลดข้อมูลได้</td></tr>`;
    }
});
  


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
  