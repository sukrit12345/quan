import { BASE_URL } from '../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง

//เลือกวันที่
document.addEventListener("DOMContentLoaded", function() {
  flatpickr("#payment-date", {
      locale: {
          firstDayOfWeek: 1, // เริ่มต้นวันจันทร์
          weekdays: {
              shorthand: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
              longhand: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
          },
          months: {
              shorthand: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
              longhand: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
          }
      },
      dateFormat: "d/m/Y", // รูปแบบ DD/MM/YYYY
      defaultDate: "today", // วันที่เริ่มต้นเป็นวันนี้
      enableTime: false, // ปิดการใช้งานเวลา
      timeZone: "Asia/Bangkok" // กำหนดเขตเวลาเป็นกรุงเทพ
  });
});


//เลือกจังหวัด
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



//เเสดงเเละเพิ่มอุปกรณ์เเอปเปื้ล
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

  $('#device-model').on('select2:select', function (e) {
    var data = e.params.data;
    console.log('Data ที่จะส่ง:', data);
    var device = $('#device-select').val(); // เอาประเภทอุปกรณ์มาด้วยตอนบันทึก

    if (data.newTag && data.text && data.text.trim() !== '') {
      console.log('กำลังส่งข้อมูลไป:', { model: data.text.trim(), deviceType: device });
      $.ajax({
        url: `${BASE_URL}/api/apple/save-device-model`,  // ใช้ BASE_URL ตรงนี้ด้วย
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ model: data.text.trim(), deviceType: device }),
        success: function (response) {
          console.log('บันทึกสำเร็จ', response);
          var newOption = new Option(data.text, data.text, true, true);
          $('#device-model').append(newOption).trigger('change');
        },
        error: function (xhr, status, error) {
          console.error('บันทึกไม่สำเร็จ', error);
        }
      });
    }
  });
});




//เพิ่ม อัปเดตข้อมูล
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // ป้องกัน reload หน้า

  const urlParams = new URLSearchParams(window.location.search);
  const recordId = urlParams.get('id'); // ดึง id จาก URL ถ้ามี

  // ดึงค่าจาก form
  const paymentDate = document.getElementById('payment-date').value;
  const deviceType = document.getElementById('device-select').value;
  const deviceModel = document.getElementById('device-model').value;
  const deviceStorage = document.getElementById('device-storage').value;
  const batteryHealth = document.getElementById('battery-health').value;
  const selectedProvinces = Array.from(document.getElementById('province-select').selectedOptions).map(option => option.value);
  const occupation = document.getElementById('occupation-select').value;
  const maxFreeCoins = document.getElementById('max-free-coins').value;

  const formData = {
    payment_date: paymentDate,
    device_type: deviceType,
    device_model: deviceModel,
    device_storage: deviceStorage,
    battery_health: batteryHealth,
    provinces: selectedProvinces,
    occupation: occupation,
    max_free_coins: maxFreeCoins
  };

  const url = recordId 
    ? `${BASE_URL}/api/update-form/${recordId}` 
    : `${BASE_URL}/api/submit-device-form`;

  const method = recordId ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      window.location.href = '../show/index.html'; // ไปหน้าแสดงผล
    } else {
      alert('เกิดข้อผิดพลาด: ' + (data.error || 'ไม่ทราบสาเหตุ'));
    }
  })
  .catch(err => {
    console.error('เกิดข้อผิดพลาด:', err);
    alert('ไม่สามารถส่งข้อมูลได้');
  });
});





//เเสดงข้อมูลตามid
const urlParams = new URLSearchParams(window.location.search);
const recordId = urlParams.get('id');

// ถ้ามี id แสดงว่าอยู่ในโหมดแก้ไข => ดึงข้อมูลจาก API
if (recordId) {
  fetch(`${BASE_URL}/api/show-form/${recordId}`)
    .then(res => {
      if (!res.ok) throw new Error('ไม่พบข้อมูลจาก API');
      return res.json();
    })
    .then(data => {
      // เติมค่าในฟอร์ม
      document.getElementById('payment-date').value = data.payment_date?.split('T')[0] || ''; // ตัดเวลาออกถ้ามี
      document.getElementById('device-select').value = data.device_type || '';
      document.getElementById('device-storage').value = data.device_storage || '';
      document.getElementById('battery-health').value = data.battery_health || '';

      // ตั้งค่า device-model เมื่อมี device_type
      const deviceType = data.device_type;
      if (deviceType) {
        // ล้างตัวเลือกเดิมใน device-model
        const deviceModelSelect = document.getElementById('device-model');
        deviceModelSelect.innerHTML = '<option value="">เลือกรุ่น</option>';

        // เรียก API เพื่อดึงข้อมูลรุ่นจากประเภทอุปกรณ์
        fetch(`${BASE_URL}/api/apple/get-device-models?deviceType=${deviceType}`)
          .then(response => response.json())
          .then(models => {
            models.forEach(model => {
              const option = new Option(model, model);
              deviceModelSelect.appendChild(option);
            });

            // ตั้งค่ารุ่นที่มีข้อมูลจาก API
            if (data.device_model) {
              deviceModelSelect.value = data.device_model;
            }
          })
          .catch(err => {
            console.error('ไม่สามารถดึงข้อมูลรุ่นจาก API:', err);
          });
      }

      // แก้ province ให้รองรับ array ถูกต้อง
      const provinceSelect = document.getElementById('province-select');
      const selectedProvinces = data.provinces || [];

      // ลบตัวเลือกเดิมทั้งหมดใน select
      provinceSelect.innerHTML = '';

      // เพิ่มตัวเลือก 'เลือกจังหวัด' ก่อน
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'เลือกจังหวัด';
      provinceSelect.appendChild(defaultOption);

      // เพิ่มตัวเลือกจังหวัดจาก API
      $.getJSON("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json", function (provinceData) {
        $.each(provinceData, function (i, item) {
          // เพิ่มตัวเลือกจังหวัดหากยังไม่มี
          let optionExists = false;
          Array.from(provinceSelect.options).forEach(option => {
            if (option.value === item.name_th) {
              optionExists = true;
            }
          });

          if (!optionExists) {
            let option = new Option(item.name_th, item.name_th);
            provinceSelect.add(option);
          }
        });

        // ตรวจสอบและเลือกจังหวัดที่ตรงกับข้อมูล
        Array.from(provinceSelect.options).forEach(option => {
          option.selected = selectedProvinces.includes(option.value);
        });
      });

      // ตรวจสอบการตั้งค่าอื่น ๆ ในฟอร์ม
      document.getElementById('occupation-select').value = data.occupation || '';
      document.getElementById('max-free-coins').value = data.max_free_coins || '';
    })
    .catch(err => {
      console.error('ไม่สามารถโหลดข้อมูลเพื่อแก้ไข:', err);
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    });
}



//ย้อนกลับ
document.getElementById("cancel-btn").addEventListener("click", function () {
  window.location.href = "../show/index.html"; // ไปที่หน้า index.html
});