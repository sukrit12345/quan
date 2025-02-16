document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // ตรวจสอบข้อมูล
    const formData = new FormData(this);
    let isValid = true;
    
    for (let pair of formData.entries()) {
        if (!pair[1] && pair[0] !== 'file') {
            isValid = false;
            break;
        }
    }
    
    if (isValid) {
        alert('ส่งแบบฟอร์มสำเร็จ');
    } else {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
});




// สำหรับภาพถ่ายตรง
document.getElementById('fileInput1').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('previewImage1');
    const uploadContainer = document.getElementById('uploadContainer1'); 

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
// คลิกที่ภาพเพื่อเลือกไฟล์ใหม่
document.getElementById('previewImage1').addEventListener('click', function() {
    document.getElementById('fileInput1').click(); // เปิด dialog ให้เลือกไฟล์ใหม่
});


// สำหรับภาพถ่ายประชาชน
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

