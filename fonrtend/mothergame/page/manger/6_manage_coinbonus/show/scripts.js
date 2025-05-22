import { BASE_URL } from "../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง



let data = []; // ตัวแปรเก็บข้อมูลจาก API
// เรียกใช้ฟังก์ชันโหลดข้อมูลเมื่อหน้าเพจโหลด
loadData();


//ตาราง
function loadData() {
  fetch(`${BASE_URL}/api/get-device-form`)
    .then((res) => res.json())
    .then((apiData) => {
      data = apiData; // เก็บข้อมูลจาก API
      displayData(data); // แสดงข้อมูลในตาราง
    })
    .catch((err) => {
      console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", err);
      alert("ไม่สามารถโหลดข้อมูลได้");
    });
}

// ฟังก์ชันแสดงข้อมูลในตาราง
function displayData(data) {
  const tableBody = document.querySelector("#device-form-table tbody");
  tableBody.innerHTML = "";

  // เรียงข้อมูลจากใหม่ไปเก่าโดยใช้ _id
  data.sort((a, b) => b._id.localeCompare(a._id));

  // แสดงข้อมูลในตาราง
  data.forEach((item, index) => {
    const reverseIndex = data.length - index;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${reverseIndex}</td>
      <td>${item.payment_date || "-"}</td>
      <td>${item.device_type || "-"}</td>
      <td>${item.device_model || "-"}</td>
      <td>${item.device_storage || "-"}</td>
      <td>${item.battery_health || "-"}</td>
      <td>${(item.provinces || []).join(", ")}</td>
      <td>${item.occupation || "-"}</td>
      <td>${item.max_free_coins || "-"}</td>
      <td class="action-buttons">
        <button class="edit-btn" data-id="${item._id}"><i class="fas fa-pen"></i></button>
        <button class="delete-btn" data-id="${item._id}"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // ฟังก์ชันจัดการปุ่มแก้ไข
  manageEditButtons();

  // ฟังก์ชันจัดการปุ่มลบ
  manageDeleteButtons();
}

// ฟังก์ชันจัดการปุ่มแก้ไข
function manageEditButtons() {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      window.location.href = `../add/index.html?id=${id}`;
    });
  });
}

// ฟังก์ชันจัดการปุ่มลบ
function manageDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      if (confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
        fetch(`${BASE_URL}/api/device-form/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            location.reload();
          })
          .catch((err) => {
            console.error("เกิดข้อผิดพลาดในการลบ:", err);
            alert("ไม่สามารถลบข้อมูลได้");
          });
      }
    });
  });
}




//ค้นหา
$(document).ready(function () {
    // ใช้ Select2 สำหรับแต่ละ dropdown
    setupSelect2();
  
    // เมื่อมีการเปลี่ยน dropdown ใด ๆ จะเรียก filterResults
    $("#device-select, #device-model, #device-storage, #battery-health, #province-select, #occupation-select").on("change", function () {
      filterResults(); // เรียกฟังก์ชันกรอง
    });
  
    // ฟังก์ชันกรองข้อมูล
    function filterResults() {
      let category = $("#device-select").val();
      let model = $("#device-model").val();
      let capacity = $("#device-storage").val();
      let batteryHealth = $("#battery-health").val();
      let province = $("#province-select").val();
      let occupation = $("#occupation-select").val();
  
      // กรองข้อมูลใน data ตามค่า
      const filteredData = data.filter(item => {
        return (
          (category ? item.device_type === category : true) &&
          (model ? item.device_model === model : true) &&
          (capacity ? item.device_storage === capacity : true) &&
          (batteryHealth ? item.battery_health === batteryHealth : true) &&
          (province ? item.provinces.includes(province) : true) &&
          (occupation ? item.occupation === occupation : true)
        );
      });
  
      // แสดงข้อมูลที่กรอง
      displayData(filteredData);
    }
  
    // ฟังก์ชันตั้งค่า Select2
    function setupSelect2() {
      $("#device-select").select2({
        placeholder: "เลือกประเภทอุปกรณ์",
        allowClear: true,
      });
  
      $("#device-model").select2({
        placeholder: "เลือกรุ่น",
        allowClear: true,
      });
  
      $("#device-storage").select2({
        placeholder: "เลือกความจุ",
        allowClear: true,
      });
  
      $("#battery-health").select2({
        placeholder: "เลือกสุขภาพแบต",
        allowClear: true,
      });
  
      $("#province-select").select2({
        placeholder: "เลือกจังหวัด",
        allowClear: true,
      });
  
      $("#occupation-select").select2({
        placeholder: "เลือกอาชีพ",
        allowClear: true,
      });
    }
});
  


//เเสดงจังหวัด
$(document).ready(function () {
    $("#province-select").select2({
      width: "100%",
      placeholder: "เลือกจังหวัด",
    });
  
    // เพิ่มตัวเลือก 'ทั่วประเทศ' ก่อน
    $("#province-select").append(
      $("<option>", {
        value: "ทั่วประเทศ", // ค่าที่ใช้สำหรับ 'ทั่วประเทศ'
        text: "ทั่วประเทศ",   // ข้อความที่แสดงใน dropdown
      })
    );
  
    // โหลดข้อมูลจังหวัดจาก JSON
    $.getJSON("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json", function (data) {
      $.each(data, function (i, item) {
        $("#province-select").append(
          $("<option>", {
            value: item.name_th, // ให้ value เป็นชื่อจังหวัด
            text: item.name_th   // ข้อความที่แสดงใน dropdown
          })
        );
      });
    });
});
  




//เเสดงอุปกรณ์เเอปเปื้ล
$(document).ready(function () {
  $('#device-select').on('change', function () {
    var device = $(this).val();
    if ($('#device-model').hasClass("select2-hidden-accessible")) {
      $('#device-model').select2('destroy');
    }
    $('#device-model').empty().append('<option value="">เลือกรุ่น</option>');

    if (device) {
      // ใช้ BASE_URL ตรงนี้
      $.get(`${BASE_URL}/api/apple/get-device-models?deviceType=${device}`, function (models) {
        models.forEach(function (model) {
          $('#device-model').append(new Option(model, model));
        });

        $('#device-model').select2({
          width: '100%',
          placeholder: 'เลือกรุ่น',
          tags: true,
          createTag: function (params) {
            var term = $.trim(params.term);
            if (term === '') {
              return null;
            }
            return {
              id: term,
              text: term,
              newTag: true
            };
          }
        });
      });
    }
  });

});














