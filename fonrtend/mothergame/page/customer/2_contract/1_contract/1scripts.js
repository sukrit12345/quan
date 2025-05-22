

//เลือกหอพักหรือที่อยู่ส่วนตัว
function toggleFields() {
  const selectedType = document.getElementById("residenceType").value;
  const dormitoryFields = document.getElementById("dormitoryFields");
  const privateFields = document.getElementById("privateFields");

  // ซ่อนทุกฟอร์มก่อน
  dormitoryFields.style.display = "none";
  privateFields.style.display = "none";

  // แสดงฟอร์มที่ตรงกับตัวเลือก
  if (selectedType === "หอพัก") {
    dormitoryFields.style.display = "block";
  } else if (selectedType === "ที่พักส่วนตัว") {
    privateFields.style.display = "block";
  }
}


//เลือกที่อยู่
$(document).ready(function () {
  $("#province-select, #amphoe, #district, #zipcode").select2({
    width: "100%",
    placeholder: "เลือกที่อยู่",
  });

  let provinceData = [];
  let amphoeData = [];
  let districtData = [];

  // โหลดข้อมูลจังหวัด
  $.getJSON(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
    function (data) {
      provinceData = data;
      $.each(data, function (i, item) {
        $("#province-select").append(
          $("<option>", {
            value: item.name_th, // เปลี่ยนจาก id เป็น name_th (ชื่อจังหวัด)
            text: item.name_th,
          })
        );
      });
    }
  );

  // เมื่อเลือกจังหวัด
  $("#province-select").on("change", function () {
    const provinceName = $(this).val(); // ได้ชื่อจังหวัดตรงๆ

    $("#amphoe")
      .empty()
      .append('<option value="">เลือกอำเภอ</option>')
      .trigger("change");
    $("#district")
      .empty()
      .append('<option value="">เลือกตำบล</option>')
      .trigger("change");
    $("#zipcode")
      .empty()
      .append('<option value="">เลือกรหัสไปรษณีย์</option>')
      .trigger("change");

    if (!provinceName) return;

    $.getJSON(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json",
      function (data) {
        // หา id ของจังหวัดจากชื่อ
        const selectedProvince = provinceData.find(p => p.name_th === provinceName);
        if (!selectedProvince) return;

        amphoeData = data.filter(a => a.province_id == selectedProvince.id);
        $.each(amphoeData, function (i, item) {
          $("#amphoe").append(
            $("<option>", {
              value: item.name_th, // เปลี่ยนจาก id เป็น name_th (ชื่ออำเภอ)
              text: item.name_th,
              "data-id": item.id // เก็บ id อำเภอไว้ด้วย (ไว้ใช้หาตำบล)
            })
          );
        });
      }
    );
  });

  // เมื่อเลือกอำเภอ
  $("#amphoe").on("change", function () {
    const amphoeName = $(this).val();
    const amphoeId = $("#amphoe option:selected").data("id"); // ดึง id จาก data-id

    $("#district")
      .empty()
      .append('<option value="">เลือกตำบล</option>')
      .trigger("change");
    $("#zipcode")
      .empty()
      .append('<option value="">เลือกรหัสไปรษณีย์</option>')
      .trigger("change");

    if (!amphoeId) return;

    $.getJSON(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json",
      function (data) {
        districtData = data.filter(d => d.amphure_id == amphoeId);

        if (districtData.length > 0) {
          $.each(districtData, function (i, item) {
            $("#district").append(
              $("<option>", {
                value: item.name_th, // เปลี่ยนจาก id เป็น name_th (ชื่อตำบล)
                text: item.name_th,
                "data-zipcode": item.zip_code,
              })
            );
          });
        } else {
          $("#district").append('<option value="">ไม่มีข้อมูลตำบล</option>');
        }

        $("#district").trigger("change");
      }
    ).fail(function () {
      console.log("ไม่สามารถโหลดข้อมูลตำบลได้");
    });
  });

  // เมื่อเลือกตำบล
  $("#district").on("change", function () {
    const zip = $("option:selected", this).data("zipcode");
    if (zip) {
      $("#zipcode")
        .empty()
        .append(`<option value="${zip}">${zip}</option>`)
        .trigger("change");
    } else {
      $("#zipcode")
        .empty()
        .append('<option value="">ไม่มีรหัสไปรษณีย์สำหรับตำบลนี้</option>')
        .trigger("change");
    }
  });

});




//เลือกสถานที่ทำงานหรือมหาวิทยาลัย
const occupationSelect = document.getElementById('occupation-select');
const universityGroup = document.getElementById('university-group');
const workplaceGroup = document.getElementById('workplace-group');

occupationSelect.addEventListener('change', function () {
  if (this.value === 'นักศึกษา') {
    universityGroup.style.display = 'block';
    workplaceGroup.style.display = 'none';
  } else if (this.value === '') {
    universityGroup.style.display = 'none';
    workplaceGroup.style.display = 'none';
  } else {
    universityGroup.style.display = 'none';
    workplaceGroup.style.display = 'block';
  }
});



//เเสดงรายชื่อมหาลัย
const apiUrl = 'https://raw.githubusercontent.com/MicroBenz/thai-university-database/master/dist/universities.json';
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
    return response.json();
  })
  .then(data => {
    const universitySelect = document.getElementById('university-select');
    
    // เพิ่มตัวเลือก <option> สำหรับมหาวิทยาลัย
    data.forEach(university => {
        const option = document.createElement('option');
        option.value = university.thCode;  // ใช้ thCode แทน uid
        option.textContent = university.university;  // ใช้ university แทน th_name
        universitySelect.appendChild(option);
    });

    // เรียกใช้ Select2 บน dropdown เพื่อให้สามารถค้นหาได้
    $(universitySelect).select2({
      placeholder: 'เลือกมหาวิทยาลัย',
      allowClear: true
    });
  })
  .catch(error => {
    console.error('เกิดข้อผิดพลาด:', error);
});



// สำหรับภาพถ่ายประชาชน
document
.getElementById("citizen_image")
.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const previewImage = document.getElementById("previewImage2");
  const uploadContainer = document.getElementById("uploadContainer2");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block"; // แสดงรูปที่เลือก
      uploadContainer.style.display = "none"; // ซ่อนไอคอนและข้อความอัปโหลด
    };
    reader.readAsDataURL(file);
  }
});
document.getElementById("previewImage2").addEventListener("click", function () {
document.getElementById("citizen_image").click(); // เปิด dialog ให้เลือกไฟล์ใหม่
});




window.onload = function() {
  // ดึงค่าจาก localStorage
  const idCardNumber = localStorage.getItem("id_card_number");

  // ถ้ามีค่าอยู่ใน localStorage ให้นำมาใส่ใน input
  if (idCardNumber) {
    document.getElementById("idCardNumber").value = idCardNumber;
  }
};


//เช็คเลขบัญชีธนาคาร
function validateAccountNumber() {
  const accountInput = document.getElementById('accountNumber');
  let accountValue = accountInput.value;  // รับค่าที่กรอก

  // ตรวจสอบความยาวของเลขบัญชี
  if (accountValue.length > 10) {
    accountValue = accountValue.slice(0, 10); // ตัดค่าที่เกินออก
    accountInput.value = accountValue;  // อัพเดทค่าที่กรอกใหม่
  }
}


//เช็คเบอรโทรศัพท์
function validatePhoneNumber() {
  const phoneInput = document.getElementById('phoneNumber');  // หาช่อง input ที่มี id="phoneNumber"
  let phoneValue = phoneInput.value;  // รับค่าที่กรอก

  // ตรวจสอบความยาวของเบอร์โทรศัพท์
  if (phoneValue.length > 10) {
    phoneValue = phoneValue.slice(0, 10); // ตัดค่าที่เกินออก
    phoneInput.value = phoneValue;  // อัพเดทค่าที่กรอกใหม่
  }
}
