import { BASE_URL } from '../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง

// เลือกวันที่ทำรายการ
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


// เลือกวันเกิด
document.addEventListener("DOMContentLoaded", function() {
    flatpickr("#date_of_birth", {
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







//เเสดงข้อมูลตามid
window.addEventListener('DOMContentLoaded', async () => {
  // ดึง ID จาก URL เช่น /admin.html?id=663e2b13a12854b8a1c1a2d3
  const urlParams = new URLSearchParams(window.location.search);
  const adminId = urlParams.get('id');

  if (!adminId) return;

  try {
    const response = await fetch(`${BASE_URL}/api/admin/admin/${adminId}`);
    if (!response.ok) throw new Error('ไม่พบข้อมูล');

    const data = await response.json();

    // ใส่ข้อมูลในฟอร์ม
    document.getElementById('payment-date').value = data.payment_date || '';
    document.getElementById('id_card_number').value = data.id_card_number || '';
    document.getElementById('name').value = data.name || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('password').value = data.password || '';
    document.getElementById('phone_number').value = data.phone_number || '';
    document.getElementById('position').value = data.position || '';
    document.getElementById('date_of_birth').value = data.date_of_birth || '';
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error.message);
  }
});





//บันทึกเเละอัปเดต
document.querySelector('#admin-form').addEventListener('submit', function (e) {
  e.preventDefault(); // ป้องกันหน้ารีเฟรช

  const urlParams = new URLSearchParams(window.location.search);
  const adminId = urlParams.get('id'); // ถ้ามี id แสดงว่าเป็นการแก้ไข

  // ดึงค่าจากฟอร์ม
  const payment_date = document.getElementById('payment-date').value;
  const id_card_number = document.getElementById('id_card_number').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone_number = document.getElementById('phone_number').value;
  const position = document.getElementById('position').value;
  const date_of_birth = document.getElementById('date_of_birth').value;

  // ตรวจสอบข้อมูลที่กรอก
  if (!payment_date || !id_card_number || !name || !email || !password || !phone_number || !position || !date_of_birth) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }

  const formData = {
    payment_date,
    id_card_number,
    name,
    email,
    password,
    phone_number,
    position,
    date_of_birth
  };

  const url = adminId 
    ? `${BASE_URL}/api/admin/admins/${adminId}` 
    : `${BASE_URL}/api/admin/submit`;

  const method = adminId ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(data => {
        throw new Error(data.message || 'ไม่ทราบสาเหตุ');
      });
    }
    return res.json();
  })
  .then(data => {
    window.location.href = '../show/index.html';
  })
  .catch(err => {
    console.error('เกิดข้อผิดพลาด:', err);
    alert('ไม่สามารถส่งข้อมูลได้: ' + err.message);
  });
});


//ย้อนกลับ
document.getElementById("cancel-btn").addEventListener("click", function () {
  window.location.href = "../show/index.html"; // ไปที่หน้า index.html
});