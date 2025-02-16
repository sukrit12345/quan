// สำหรับภาพหลักฐานการโอน
document.getElementById('fileInput2').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('previewImage2');
    const uploadContainer = document.getElementById('uploadContainer2'); 

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block'; // แสดงรูปที่เลือก
            uploadContainer.style.display = 'none'; // ซ่อนไอคอนและข้อความอัปโหลด
        }
        reader.readAsDataURL(file);
    }

    // รีเซ็ต input file เพื่อให้สามารถเลือกไฟล์ใหม่ได้เมื่อคลิกซ้ำ
    event.target.value = ''; // รีเซ็ตค่า input file
});
document.getElementById('previewImage2').addEventListener('click', function() {
    document.getElementById('fileInput2').click(); // เปิด dialog ให้เลือกไฟล์ใหม่
});
