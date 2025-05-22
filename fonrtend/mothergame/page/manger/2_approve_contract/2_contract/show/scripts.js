import { BASE_URL } from '../../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง

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




// ตั้งค่าจังหวัด
function loadProvinces() {
  $.getJSON(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
    function (data) {
      const provinceSelect = $("#province-select");
      provinceSelect.empty().append(`<option value="">เลือกจังหวัด</option>`);
      console.log(data); // ตรวจสอบข้อมูลที่ได้จาก API

      data.forEach(item => {
        provinceSelect.append(
          $("<option>", {
            value: item.name_th,
            text: item.name_th,
          })
        );
      });

      // เรียกใช้ select2 เพื่อให้สามารถค้นหาจังหวัดได้
      provinceSelect.select2({
        placeholder: "เลือกจังหวัด",
        allowClear: true
      });

      // ฟังก์ชันตรวจสอบเมื่อมีการเปลี่ยนแปลงค่าของ select2
      provinceSelect.on('change', function() {
        applySearchFilters(); // เรียกใช้ฟังก์ชัน applySearchFilters() ทุกครั้งเมื่อเลือกหรือพิมพ์จังหวัดใหม่
      });
    }
  );
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



//รับค่าเลขบัตรประชาชน ชื่อ นามสกุล สถานะ จังหวัด พนักงาน
function setupSearch() {
  const idInput = document.getElementById("id-card-input");
  const nameInput = document.getElementById("customer-name-input");
  const statusSelect = document.getElementById("status-select");
  const provinceSelect = document.getElementById("province-select");
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
  provinceSelect.addEventListener("change", applySearchFilters);
  approverSelect.addEventListener("change", applySearchFilters);
}

//ค้นหาเลขบัตรประชาชน ชื่อ นามสกุล สถานะ จังหวัด พนักงาน
async function applySearchFilters() {
  try {
    // ดึงค่าจากฟิลด์ค้นหา
    const idValue = document.getElementById("id-card-input")?.value.trim() || "";
    const nameValue = document.getElementById("customer-name-input")?.value.trim().toLowerCase() || "";
    const statusValue = document.getElementById("status-select")?.value || "";
    const provinceValue = $("#province-select").val() || "";
    const approverValue = document.getElementById("approver-name-select")?.value.toLowerCase() || "";

    // แสดงสถานะกำลังโหลด
    const tableBody = document.querySelector('#bonus-management-table tbody');
    tableBody.innerHTML = '<tr><td colspan="9" class="loading">กำลังค้นหาข้อมูล...</td></tr>';

    // ดึงข้อมูลผู้อนุมัติแบบ asynchronous
    const approverPromises = employeeData.map(item => 
      getApproverInfo(item.approver_id_card)
    );
    const approverNames = await Promise.all(approverPromises);

    // กรองข้อมูล
    const filteredData = employeeData.filter((item, index) => {
      const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
      const approverName = approverNames[index]?.toLowerCase() || "";
      
      const matchID = idValue === "" || item.id_card_number.includes(idValue);
      const matchName = nameValue === "" || fullName.includes(nameValue);
      const matchStatus = statusValue === "" || item.status === statusValue;
      const matchProvince = provinceValue === "" || item.province === provinceValue;
      const matchApprover = approverValue === "" || approverName.includes(approverValue);

      return matchID && matchName && matchStatus && matchProvince && matchApprover;
    });

    // แสดงผลข้อมูล
    displayData(filteredData);
  } catch (error) {
    console.error('Error in applySearchFilters:', error);
    const tableBody = document.querySelector('#bonus-management-table tbody');
    tableBody.innerHTML = '<tr><td colspan="9" class="error">เกิดข้อผิดพลาดในการค้นหา</td></tr>';
  }
}



// โหลดข้อมูลพนักงานทั้งหมดแสดงในตาราง
async function loadData() {
    try {
      const response = await fetch(`${BASE_URL}/api/api/contract2-summary`);
      const data = await response.json();

      // ตรวจสอบว่า data มีฟิลด์ 'data' หรือไม่
      if (data && Array.isArray(data.data)) {
        employeeData = data.data; // ใช้ data.data ซึ่งเป็นอาเรย์
        displayData(employeeData); // แสดงข้อมูลในตาราง
      } else {
        console.error('ข้อมูลไม่ถูกต้อง:', data);
      }

    } catch (error) {
      console.error('โหลดข้อมูลผิดพลาด:', error);
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
    const response = await fetch(`${BASE_URL}/api/approver-info2/${approverIdCard}`);
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
async function displayData(data) {
    const tableBody = document.querySelector('#bonus-management-table tbody');
    
    try {
      tableBody.innerHTML = ""; // เคลียร์ข้อมูลเก่า

      // ลูปเพื่อแสดงข้อมูล
      for (const [index, contract] of data.entries()) {
        const statusColor = getStatusColor(contract.status); // ใช้ฟังก์ชันเพื่อกำหนดสีสถานะ
        const formattedDate = formatDate(contract.createdAt); // ฟอร์แมตวันที่ให้เหมาะสม
        const approverName = await getApproverInfo(contract.approver_id_card); // ดึงชื่อผู้อนุมัติ

        // สร้างแถวข้อมูลในตาราง
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${data.length - index}</td>
          <td>${formattedDate}</td>
          <td>${contract.id_card_number || "-"}</td>
          <td>${contract.first_name || "-"}</td>
          <td>${contract.last_name || "-"}</td>
          <td>${contract.province || "-"}</td>
          <td style="color: ${statusColor};">${contract.status || "-"}</td>
          <td>${approverName}</td>
          <td class="action-buttons">
            <button class="edit-btn" data-id="${contract.contract2_id}"><i class="fas fa-pen"></i></button>
            
          </td>
        `;
        tableBody.appendChild(row);
      }

      // ฟังก์ชันจัดการปุ่มแก้ไขและลบ
      manageEditButtons();
    } catch (error) {
      console.error('Error displaying data:', error);
      tableBody.innerHTML = '<tr><td colspan="9" class="error">เกิดข้อผิดพลาดในการแสดงผลข้อมูล</td></tr>';
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




//ทำงาน
// เมื่อหน้าโหลดเสร็จ
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadData(); // ✅ เรียกใช้ loadData() ที่ประกาศไว้
    setupDatePicker();
    setupSearch();
    await populateEmployeeSelectFromAdmin();
    loadProvinces();
  } catch (error) {
    console.error('โหลดข้อมูลผิดพลาด:', error);
  }
});