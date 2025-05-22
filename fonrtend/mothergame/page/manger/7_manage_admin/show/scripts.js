import { BASE_URL } from "../../../../config/config.js";

let employeeData = [];
let chartInstance = null; // ใช้สำหรับอ้างอิงกราฟเดิม เพื่อลบตอนอัปเดตใหม่

document.addEventListener("DOMContentLoaded", function () {
  loadData();
  setupDatePicker();
  setupStaffSelect();
});

// โหลดข้อมูลพนักงาน
function loadData() {
  console.log("กำลังโหลดข้อมูลพนักงาน...");
  fetch(`${BASE_URL}/api/all`)
    .then(res => res.json())
    .then(apiData => {
      console.log("ข้อมูลที่ได้รับจาก API:", apiData);
      employeeData = apiData;
      populateStaffSelect();
      displayData(employeeData); // แสดงข้อมูลทั้งหมดเมื่อเริ่มต้น
      renderChart(employeeData);
    })
    .catch(err => {
      console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", err);
      alert("ไม่สามารถโหลดข้อมูลพนักงานได้");
    });
}

// ตั้งค่าปฎิทิน
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

// แปลง created_at จาก UTC เป็นเวลาประเทศไทย (UTC+7)
function convertToThailandTime(dateString) {
  const date = new Date(dateString);
  const thailandTime = new Date(date.getTime() + (7 * 60 * 60 * 1000)); // เพิ่มเวลาตาม UTC+7
  return thailandTime;
}

// ค้นหาวันที่
function filterByDateRange(selectedDates) {
  if (selectedDates.length === 0) {
    displayData(employeeData);
    renderChart(employeeData);
    return;
  }

  // ถ้าเลือกช่วงเวลา 2 วัน
  if (selectedDates.length === 2) {
    const [startDate, endDateOriginal] = selectedDates;
    
    // แปลง endDate ให้เป็นสิ้นวัน
    const endDate = new Date(endDateOriginal);
    endDate.setHours(23, 59, 59, 999); // เพิ่มเวลาสิ้นวัน

    // กรองข้อมูลตามช่วงวันที่
    const filtered = employeeData.filter(item => {
      const itemDate = convertToThailandTime(item.created_at); // แปลงเวลาของ created_at เป็นเวลาในประเทศไทย
      return itemDate >= startDate && itemDate <= endDate;
    });

    console.log("ข้อมูลที่กรองตามช่วงเวลา:", filtered);
    displayData(filtered);
    renderChart(filtered);

  } else if (selectedDates.length === 1) {
    // ถ้าเลือกเพียงวันที่เดียว
    const selectedDate = selectedDates[0];
    const endDate = new Date(selectedDate);
    endDate.setHours(23, 59, 59, 999); // เปลี่ยนเวลาของวันที่เลือกเป็นสิ้นวัน

    const filtered = employeeData.filter(item => {
      const itemDate = convertToThailandTime(item.created_at); // แปลงเวลาของ created_at เป็นเวลาในประเทศไทย
      return itemDate >= selectedDate && itemDate <= endDate;
    });

    console.log("ข้อมูลที่กรองตามวันเดียว:", filtered);
    displayData(filtered);
    renderChart(filtered);
  }
}


// ตั้งค่าการเลือกพนักงาน
function setupStaffSelect() {
  console.log("ตั้งค่าการเลือกพนักงาน...");
  $('#staff-select').select2({
    placeholder: "เลือกชื่อพนักงาน",
    allowClear: true
  });

  // วิธีที่ถูกต้องในการดักจับเหตุการณ์ change ของ Select2
  $('#staff-select').on('change', function(e) {
    const selectedName = $(this).val();
    console.log("[Select2] ชื่อที่เลือก:", selectedName);
    handleStaffSelection(selectedName); // เรียกฟังก์ชันที่แก้ไขแล้ว
  });
}

// เติมข้อมูลลงใน dropdown พนักงาน
function populateStaffSelect() {
  console.log("กำลังเติมข้อมูลใน dropdown...");
  
  // ล้างข้อมูลเก่า
  $('#staff-select').empty().append('<option value=""></option>');
  
  // สร้างรายการชื่อที่ไม่ซ้ำ
  const uniqueNames = [...new Set(
    employeeData
      .map(item => item.name?.toString().trim())
      .filter(name => name && name.length > 0)
  )];

  uniqueNames.forEach(name => {
    $('#staff-select').append(`<option value="${name}">${name}</option>`);
  });

  // รีเฟรช Select2
  $('#staff-select').select2({
    placeholder: "เลือกชื่อพนักงาน",
    allowClear: true
  });

  console.log("รายชื่อใน dropdown:", uniqueNames);
}

// ค้นหาพนักงาน
function handleStaffSelection(selectedName) {
  console.log("กำลังประมวลผลสำหรับชื่อ:", selectedName);
  console.log("ข้อมูลพนักงานทั้งหมด:", employeeData);

  const summarySpan = document.getElementById("staff-selection-summary"); // ใช้ ID

  if (!selectedName) {
    console.log("แสดงข้อมูลทั้งหมด");
    summarySpan.textContent = "เลือกชื่อพนักงาน"; // กรณีที่ไม่ได้เลือกพนักงาน
    displayData(employeeData);
    renderChart(employeeData);
    return;
  }

  // กรองข้อมูลแบบละเอียด
  const filtered = employeeData.filter(item => {
    if (!item.name) return false;
    return item.name.toString().trim().toLowerCase() === selectedName.toLowerCase().trim();
  });

  console.log("ผลลัพธ์การกรอง:", filtered);
  
  if (filtered.length === 0) {
    console.warn("ไม่พบข้อมูลที่ตรงกัน");
    summarySpan.textContent = "ไม่พบพนักงานที่เลือก"; // กรณีที่ไม่พบชื่อพนักงาน
    displayData([]);
    renderChart([]);
  } else {
    summarySpan.textContent = `${selectedName}`; // แสดงชื่อพนักงานที่เลือก
    displayData(filtered);
    renderChart(filtered);
  }
}


// แปลงเป็นเวลาไทย
function formatDate(dateString) {
  const date = new Date(dateString);
  const thailandTime = new Date(date.getTime() + (7 * 60 * 60 * 1000));
  const day = String(thailandTime.getDate()).padStart(2, '0');
  const month = String(thailandTime.getMonth() + 1).padStart(2, '0');
  const year = thailandTime.getFullYear();
  return `${day}/${month}/${year}`;
}

// แสดงข้อมูลในตาราง
function displayData(data) {
  console.log("ข้อมูลที่จะแสดงในตาราง:", data);
  const tableBody = document.querySelector("#employee-data");
  tableBody.innerHTML = "";  // เคลียร์ข้อมูลเก่าในตาราง

  data.sort((a, b) => b._id.localeCompare(a._id));  // เรียงข้อมูล

  data.forEach((item, index) => {
    const reverseIndex = data.length - index;
    const formattedDate = formatDate(item.created_at);  // แปลงวันที่เป็นเวลาไทย
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${reverseIndex}</td>
      <td>${formattedDate || "-"}</td>  <!-- ใช้ formattedDate ที่แปลงแล้ว -->
      <td>${item.name || "-"}</td>
      <td>${item.date_of_birth || "-"}</td>
      <td>${item.phone_number || "-"}</td>
      <td>${item.email || "-"}</td>
      <td>${item.approve_deposit || "-"}</td>
      <td>${item.approve_contract || "-"}</td>
      <td>${item.approve_rent || "-"}</td>
      <td>${item.follow_up || "-"}</td>
      <td class="action-buttons">
        <button class="edit-btn" data-id="${item._id}"><i class="fas fa-pen"></i></button>
        <button class="delete-btn" data-id="${item._id}"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  manageEditButtons();
  manageDeleteButtons();
}


// กราฟภาพรวมการทำงาน
function renderChart(data) {
  const ctx = document.getElementById('myChart').getContext('2d');

  // รวมค่าจากพนักงานทั้งหมด
  const totalDeposit = sumField(data, 'approve_deposit');
  const totalContract = sumField(data, 'approve_contract');
  const totalRent = sumField(data, 'approve_rent');
  const totalFollowUp = sumField(data, 'follow_up');

  if (chartInstance) chartInstance.destroy(); // ลบกราฟเก่าก่อนสร้างใหม่

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["อนุมัติฝากเงินเกม", "อนุมัติสัญญาเช่า", "อนุมัติค่าเช่า", "ติดตามหนี้"],
      datasets: [{
        label: 'ภาพรวมการทำงาน',
        data: [totalDeposit, totalContract, totalRent, totalFollowUp],
        backgroundColor: ['#FFCA43', '#4D5ABB', '#E84143', '#29ADCE']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// รวมค่าของฟิลด์ที่ต้องการ
function sumField(data, field) {
  return data.reduce((total, item) => {
    const value = parseInt(item[field]) || 0;
    return total + value;
  }, 0);
}

// จัดการปุ่มแก้ไข
function manageEditButtons() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      window.location.href = `../add/index.html?id=${id}`;
    });
  });
}

// จัดการปุ่มลบ
function manageDeleteButtons() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      if (confirm("คุณต้องการลบข้อมูลพนักงานนี้หรือไม่?")) {
        fetch(`${BASE_URL}/api/api/admin/${id}`, {
          method: "DELETE"
        })
        .then(res => res.json())
        .then(() => loadData())
        .catch(err => {
          console.error("เกิดข้อผิดพลาดในการลบ:", err);
          alert("ไม่สามารถลบข้อมูลได้");
        });
      }
    });
  });
}
