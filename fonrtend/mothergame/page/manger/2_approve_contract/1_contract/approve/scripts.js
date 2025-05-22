import { BASE_URL } from "../../../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง



//เเสดงข้อมูล
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) return alert("ไม่พบ ID");

    try {
        const response = await fetch(`${BASE_URL}/api/get-user/${id}`);
        if (!response.ok) {
            throw new Error('ไม่สามารถโหลดข้อมูลได้');
        }
        const data = await response.json();

        // เติมข้อมูลพื้นฐาน
        document.getElementById('idCardNumber').value = data.id_card_number || '';
        document.getElementById('first_name').value = data.first_name || '';
        document.getElementById('last_name').value = data.last_name || '';
        document.getElementById('bank-select').value = data.bank_name || '';
        document.getElementById('accountNumber').value = data.account_number || '';
        document.getElementById('phoneNumber').value = data.phone_number || '';
        document.getElementById('instagram').value = data.instagram || '';
        document.getElementById('facebook').value = data.facebook || '';
        document.getElementById('line').value = data.line || '';

        // จัดการข้อมูลที่อยู่อาศัย
        document.getElementById('residenceType').value = data.residence_type || '';
        toggleFields(); // เรียกฟังก์ชันเพื่อแสดงฟิลด์ที่เกี่ยวข้อง
        
        if (data.residence_type === 'private') {
            document.querySelector('input[name="house_number"]').value = data.house_number || '';
        } else if (data.residence_type === 'dormitory') {
            document.querySelector('input[name="dormitory_name"]').value = data.dormitory_name || '';
            document.querySelector('input[name="room_number"]').value = data.room_number || '';
        }

        // จัดการข้อมูลภูมิภาค
        document.getElementById('province').value = data.province || '';
        document.getElementById('amphoe').value = data.amphoe || '';
        document.getElementById('district').value = data.district || '';
        document.getElementById('zipcode').value = data.zipcode || '';

        // จัดการข้อมูลอาชีพ
        document.getElementById('occupation-select').value = data.occupation || '';
        toggleOccupationFields(); // เรียกฟังก์ชันเพื่อแสดงฟิลด์ที่เกี่ยวข้อง
        
        if (data.occupation === 'student') {
            document.getElementById('university-select').value = data.university_name || '';
        } else {
            document.querySelector('input[name="workplace_name"]').value = data.workplace_name || '';
        }

        // จัดการภาพถ่ายประชาชน
        if (data.citizen_image) {
            const previewImage = document.getElementById('previewImage2');
            const uploadContainer = document.getElementById('uploadContainer2');
            
            // แปลง path ให้ถูกต้องสำหรับการแสดงในเบราว์เซอร์
            const imagePath = data.citizen_image.replace(/\\/g, '/');
            previewImage.src = imagePath.startsWith('http') ? imagePath : `/${imagePath}`;
            previewImage.style.display = 'block';
            uploadContainer.style.display = 'none';
        }

        // ตั้งค่า event listeners
        document.getElementById('residenceType').addEventListener('change', toggleFields);
        document.getElementById('occupation-select').addEventListener('change', toggleOccupationFields);
        document.getElementById('citizen_image').addEventListener('change', handleImageUpload);
        
        document.getElementById('btn-next').addEventListener('click', (e) => {
            e.preventDefault();
            handleApprove(id);
        });
        
        document.getElementById('btn-cancel').addEventListener('click', (e) => {
            e.preventDefault();
            handleReject(id);
        });

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการโหลดข้อมูล: ' + error.message);
    }
});






//ตั้งค่าประเภททีอยู่อาศัย
function toggleFields() {
    const residenceType = document.getElementById('residenceType').value;
    
    // ซ่อนทั้งหมดก่อน
    document.getElementById('dormitoryFields').style.display = 'none';
    document.getElementById('privateFields').style.display = 'none';
    
    // แสดงตามประเภทที่เลือก
    if (residenceType === 'dormitory') {
        document.getElementById('dormitoryFields').style.display = 'flex';
    } else if (residenceType === 'private') {
        document.getElementById('privateFields').style.display = 'flex';
    }
}
//ตั้งค่าอาชีพ
function toggleOccupationFields() {
    const occupation = document.getElementById('occupation-select').value;
    
    // ซ่อนทั้งหมดก่อน
    document.getElementById('workplace-group').style.display = 'none';
    document.getElementById('university-group').style.display = 'none';
    
    // แสดงตามอาชีพที่เลือก
    if (occupation === 'student') {
        document.getElementById('university-group').style.display = 'block';
    } else if (occupation && occupation !== '') {
        document.getElementById('workplace-group').style.display = 'block';
    }
}
//เเสดงภาพ
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const previewImage = document.getElementById('previewImage2');
        const uploadContainer = document.getElementById('uploadContainer2');
        
        if (previewImage && uploadContainer) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            uploadContainer.style.display = 'none';
        }
    };
    reader.readAsDataURL(file);
}


//อนุมัติ
async function handleApprove(id) {
    try {
        const adminIdCard = localStorage.getItem('id_card_number');
        const adminPosition = localStorage.getItem('position');
        
        if (!adminIdCard || !adminPosition) {
            throw new Error('ไม่พบข้อมูลผู้ดูแลระบบในระบบ');
        }

        const response = await fetch(`${BASE_URL}/api/${id}/approve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                approvedBy: {
                    id_card_number: adminIdCard,
                    position: adminPosition
                }
            })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'การอนุมัติล้มเหลว');
        }

        window.location.href = '../show/index.html';
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการอนุมัติ: ' + error.message);
        
        // แสดง error จากเซิร์ฟเวอร์ถ้ามี
        if (error.details) {อัน
            console.error('รายละเอียดข้อผิดพลาด:', error.details);
        }
    }
}

//ไม่อนุมัติ
async function handleReject(id) {
    try {
        // ดึงข้อมูลผู้ดูแลระบบจาก localStorage
        const adminIdCard = localStorage.getItem('id_card_number');
        const adminPosition = localStorage.getItem('position');
        
        if (!adminIdCard || !adminPosition) {
            throw new Error('ไม่พบข้อมูลผู้ดูแลระบบในระบบ');
        }

        const response = await fetch(`${BASE_URL}/api/${id}/reject`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rejectedBy: {
                    id_card_number: adminIdCard,
                    position: adminPosition
                }
            })
        });
        
        if (response.ok) {
            window.location.href = '../show/index.html';
        } else {
            throw new Error('การไม่อนุมัติล้มเหลว');
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการไม่อนุมัติ: ' + error.message);
    }
}

//ปิดฟิลด์
window.onload = function () {
    // ปิด input ทั้งหมด
    document.querySelectorAll("input").forEach(function (el) {
      el.disabled = true;
    });

    // ปิด select ทั้งหมด
    document.querySelectorAll("select").forEach(function (el) {
      el.disabled = true;
    });
  };