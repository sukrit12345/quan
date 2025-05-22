import { BASE_URL } from '../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง

let employeeData = []; // ใช้เก็บข้อมูลทั้งหมด เพื่อให้ filterByDateRange ใช้ได้

//ตั้งค่าปฎิทิน
function setupDatePicker() {
  console.log("ตั้งค่า Date Picker แบบช่วงเวลา...");
  flatpickr("#date-select", {
    mode: "range",
    dateFormat: "d/m/Y",
    locale: {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
        longhand: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
      },
      months: {
        shorthand: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
        longhand: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
      }
    },
    onChange: function (selectedDates, dateStr) {
      console.log("ช่วงวันที่ที่เลือก:", dateStr);
      filterByDateRange(selectedDates);
    }
  });
}






//ตั้งค่าเเอดมิน
async function populateEmployeeSelectFromAdmin() {
  const select = document.getElementById("approver-name-select");
  select.innerHTML = `<option value="">เลือกชื่อพนักงาน</option>`; // เคลียร์ก่อน

  try {
    const response = await fetch(`${BASE_URL}/api/admin-names`);
    const names = await response.json();

    // ลบชื่อซ้ำ (เผื่อเกิดกรณีซ้ำใน DB)
    const uniqueNames = [...new Set(names)];

    uniqueNames.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });

  } catch (error) {
    console.error("ไม่สามารถโหลดรายชื่อพนักงาน:", error);
  }
}







//ค้นหาวันที่
function filterByDateRange(selectedDates) {
  if (selectedDates.length !== 2) {
    displayData(employeeData);
    renderChart(employeeData);
    return;
  }

  const [startDate, endDateOriginal] = selectedDates;

  // แปลง endDate ให้เป็นสิ้นวัน
  const endDate = new Date(endDateOriginal);
  endDate.setHours(23, 59, 59, 999); // ✅ เพิ่มเวลาสิ้นวัน

  const filtered = employeeData.filter(item => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate && itemDate <= endDate;
  });

  console.log("ข้อมูลที่กรองตามช่วงเวลา:", filtered);
  displayData(filtered);
}



// รับค่าเลขบัตรประชาชน ชื่อ นามสกุล สถานะ พนักงาน
function setupSearch() {
    const idInput = document.getElementById("id-card-input");
    const nameInput = document.getElementById("customer-name-input");
    const statusSelect = document.getElementById("status-select");
    const approverSelect = document.getElementById("approver-name-select");

    // ตั้งค่า debounce เพื่อลดการเรียกฟังก์ชันบ่อยเกินไป
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    idInput.addEventListener("input", debounce(applySearchFilters, 300));
    nameInput.addEventListener("input", debounce(applySearchFilters, 300));
    statusSelect.addEventListener("change", applySearchFilters);
    approverSelect.addEventListener("change", applySearchFilters);
}

// ค้นหาเลขบัตรประชาชน ชื่อ นามสกุล สถานะ พนักงาน
async function applySearchFilters() {
    try {
        // ตรวจสอบว่า employeeData เป็น array และมีข้อมูล
        if (!Array.isArray(employeeData) || employeeData.length === 0) {
            console.warn('ข้อมูลพนักงานยังไม่ได้โหลด');
            const tableBody = document.querySelector('#bonus-management-table tbody');
            tableBody.innerHTML = '<tr><td colspan="11" class="error">ข้อมูลพนักงานยังไม่ได้โหลด</td></tr>';
            return;
        }

        // ดึงค่าจากฟิลด์ค้นหา
        const idValue = document.getElementById("id-card-input")?.value.trim() || "";
        const nameValue = document.getElementById("customer-name-input")?.value.trim().toLowerCase() || "";
        const statusValue = document.getElementById("status-select")?.value || "";
        const approverValue = document.getElementById("approver-name-select")?.value.toLowerCase() || "";

        // แสดงสถานะกำลังโหลด
        const tableBody = document.querySelector('#bonus-management-table tbody');
        tableBody.innerHTML = '<tr><td colspan="11" class="loading">กำลังค้นหาข้อมูล...</td></tr>';

        // ดึงชื่อผู้อนุมัติแบบ asynchronous
        const approverNames = await Promise.all(employeeData.map(item =>
            item.approver_id_card
                ? getApproverInfo(item.approver_id_card).catch(() => "-")
                : "-"
        ));

        // กรองข้อมูล
        const filteredData = employeeData.filter((item, index) => {
            const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
            const approverName = approverNames[index]?.toLowerCase() || "";

            const matchID = idValue === "" || item.id_card_number.includes(idValue);
            const matchName = nameValue === "" || fullName.includes(nameValue);
            const matchStatus = statusValue === "" || item.status === statusValue;
            const matchApprover = approverValue === "" || approverName.includes(approverValue);

            return matchID && matchName && matchStatus && matchApprover;
        });

        // ✅ ส่ง array ตรง ๆ เข้า displayData
        displayData(filteredData);
    } catch (error) {
        console.error('Error in applySearchFilters:', error);
        const tableBody = document.querySelector('#bonus-management-table tbody');
        tableBody.innerHTML = '<tr><td colspan="11" class="error">เกิดข้อผิดพลาดในการค้นหา</td></tr>';
    }
}




// โหลดข้อมูลพนักงานทั้งหมดเเสดงในตาราง
async function loadData() {
    try {
        const response = await fetch(`${BASE_URL}/api/apirent/contract-summary`);
        const data = await response.json();
        
        // ตรวจสอบว่า data เป็น array หรือไม่
        if (Array.isArray(data.data)) {
            employeeData = data.data; // ถ้าเป็น array จะเก็บข้อมูลที่ได้จาก data.data
            displayData(employeeData); // ส่งข้อมูลที่ได้ไปแสดงในตาราง
        } else {
            console.error('ข้อมูลไม่ถูกต้อง:', data);
            const tableBody = document.querySelector('#bonus-management-table tbody');
            tableBody.innerHTML = '<tr><td colspan="11" class="error">ไม่พบข้อมูลที่ต้องการ</td></tr>';
        }
    } catch (error) {
        console.error('โหลดข้อมูลผิดพลาด:', error);
        const tableBody = document.querySelector('#bonus-management-table tbody');
        tableBody.innerHTML = '<tr><td colspan="11" class="error">เกิดข้อผิดพลาดในการโหลดข้อมูล</td></tr>';
    }
}



// === ฟังก์ชันแปลงวันที่เป็นเวลาไทย ===
function formatDate(dateString) {
  const date = new Date(dateString);
  const thailandTime = new Date(date.getTime() + (7 * 60 * 60 * 1000));
  const day = String(thailandTime.getDate()).padStart(2, '0');
  const month = String(thailandTime.getMonth() + 1).padStart(2, '0');
  const year = thailandTime.getFullYear();
  return `${day}/${month}/${year}`;
}



//เรียกชื่อเเอดมินมาเเสดงในตาราง
async function getApproverInfo(approverIdCard) {
  if (!approverIdCard) return "-";
  
  try {
    const response = await fetch(`${BASE_URL}/api/approver-info/${approverIdCard}`);
    if (response.ok) {
      const result = await response.json();
      return result.data.approver_name || approverIdCard;
    }
    return approverIdCard;
  } catch (error) {
    console.error('Error fetching approver info:', error);
    return approverIdCard;
  }
}


// === ฟังก์ชันแสดงข้อมูลในตาราง ===
async function displayData(contracts = []) {
    const tableBody = document.querySelector('#bonus-management-table tbody');
  
    try {
      tableBody.innerHTML = "";
  
      for (const [index, contract] of contracts.entries()) {
        const statusColor = getStatusColor(contract.status);
        const formattedDate = formatDate(contract.createdAt);
  
        // ป้องกันกรณีไม่มี approver_id_card
        const approverName = contract.approver_id_card
          ? await getApproverInfo(contract.approver_id_card).catch(() => "-")
          : "-";
  
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${contracts.length - index}</td>
          <td>${formattedDate}</td>
          <td>${contract.id_card_number || "-"}</td>
          <td>${contract.first_name || "-"}</td>
          <td>${contract.last_name || "-"}</td>
          <td>${contract.contractId || "-"}</td>
          <td>${contract.total?.toLocaleString() || "-"}</td>
          <td>${contract.amountPaid?.toLocaleString() || "-"}</td>
          <td style="color: ${statusColor};">${contract.status || "-"}</td>
          <td>${approverName}</td>
          <td class="action-buttons">
            <button class="edit-btn" data-id="${contract.payment_id}">
              <i class="fas fa-pen"></i>
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      }
  
      manageEditButtons();
    } catch (error) {
      console.error('Error displaying data:', error);
      tableBody.innerHTML = '<tr><td colspan="11" class="error">เกิดข้อผิดพลาดในการแสดงผลข้อมูล</td></tr>';
    }
  }
  





//กำหนดสีสถานะ
function getStatusColor(status) {
  switch(status) {
    case 'รออนุมัติ': return '#FFCA43';
    case 'ไม่อนุมัติ': return '#E84143';
    case 'อนุมัติ': return '#7FCF18';
    default: return '#000000';
  }
}

// === จัดการปุ่มแก้ไข ===
function manageEditButtons() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      window.location.href = `../approve/index.html?id=${id}`;
    });
  });
}

// === จัดการปุ่มลบ ===
function manageDeleteButtons() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      if (confirm("คุณต้องการลบข้อมูลพนักงานนี้หรือไม่?")) {
        fetch(`${BASE_URL}/api/contract1/${id}`, {
          method: "DELETE"
        })
        .then(res => res.json())
        .then(() => {
          loadData(); // โหลดข้อมูลใหม่หลังลบ
        })
        .catch(err => {
          console.error("เกิดข้อผิดพลาดในการลบ:", err);
          alert("ไม่สามารถลบข้อมูลได้");
        });
      }
    });
  });
}



//ทำงาน
// เมื่อหน้าโหลดเสร็จ
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadData(); // ✅ เรียกใช้ loadData() ที่ประกาศไว้
    setupDatePicker();
    setupSearch();
    await populateEmployeeSelectFromAdmin();
  } catch (error) {
    console.error('โหลดข้อมูลผิดพลาด:', error);
  }
});