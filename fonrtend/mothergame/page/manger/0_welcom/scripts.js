// ดึงค่าตำแหน่งจาก localStorage แทนการดึงจาก URL
const position = localStorage.getItem('position');

// ฟังก์ชันแสดงเมนู
function showMenu() {
    const menuItems = document.querySelectorAll('.menu-item');

    // ซ่อนเมนูทั้งหมดก่อน
    menuItems.forEach(item => {
        item.style.display = 'none';  // ซ่อนเมนูทั้งหมด
    });

    // ตรวจสอบตำแหน่งและแสดงเมนูตามเงื่อนไข
    if (position === 'เจ้าหน้าที่') {
        console.log('กำลังแสดงเมนูสำหรับเจ้าหน้าที่');
        // แสดงเมนูที่เกี่ยวข้องกับเจ้าหน้าที่
        document.getElementById('approve-game-deposit').style.display = 'block';
        document.getElementById('approve-rental-contract').style.display = 'block';
        document.getElementById('approve-rent-payment').style.display = 'block';
        document.getElementById('rental-contracts-list').style.display = 'block';
    } else if (position === 'ผู้จัดการ') {
        console.log('กำลังแสดงเมนูสำหรับผู้จัดการ');
        // แสดงเมนูทั้งหมดสำหรับผู้จัดการ
        menuItems.forEach(item => {
            item.style.display = 'block';
        });
    } else {
        console.log('ไม่พบตำแหน่งที่ตรงกัน');
    }
}

// เรียกฟังก์ชันเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', showMenu);
