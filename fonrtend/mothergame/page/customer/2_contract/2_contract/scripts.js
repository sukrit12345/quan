import { BASE_URL } from "../../../../config/config.js";

//เเสดงประเภทเเละรุ่นอุปกรณ์
document.addEventListener("DOMContentLoaded", () => {
  const deviceSelect = document.getElementById("device-select");
  const modelSelect = document.getElementById("device-model");

  // โหลดประเภทอุปกรณ์
  fetch(`${BASE_URL}/api/contract/devices`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((device) => {
        const option = document.createElement("option");
        option.value = device;
        option.textContent = device;
        deviceSelect.appendChild(option);
      });
    });

  // เมื่อเลือกประเภทอุปกรณ์ ให้โหลดรุ่น
  deviceSelect.addEventListener("change", () => {
    const selectedType = deviceSelect.value;
    modelSelect.innerHTML = '<option value="">เลือกรุ่นอุปกรณ์</option>'; // reset

    if (selectedType) {
      fetch(`${BASE_URL}/api/contract/devices/${selectedType}`)
        .then((res) => res.json())
        .then((models) => {
          models.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.name;
            option.textContent = item.name;
            modelSelect.appendChild(option);
          });
        });
    }
  });
});






// ฟังก์ชันแสดงตัวอย่างรูปภาพ
function setupImagePreviews() {
  for (let i = 1; i <= 4; i++) {
    const fileInput = document.getElementById(`fileInput${i}`);
    const previewImage = document.getElementById(`previewImage${i}`);
    const uploadContainer = document.getElementById(`uploadContainer${i}`);

    // เมื่อมีการเปลี่ยนแปลงไฟล์ที่อัพโหลด
    fileInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();

        // เมื่อโหลดไฟล์เสร็จ
        reader.onload = function(e) {
          previewImage.src = e.target.result;  // แสดงภาพที่เลือก
          previewImage.style.display = 'block'; // แสดงภาพที่แสดงตัวอย่าง
          uploadContainer.style.display = 'none'; // ซ่อนกล่องอัพโหลด
        };
        
        reader.readAsDataURL(this.files[0]);
      } else {
        // ถ้าไม่มีการเลือกไฟล์ ให้แสดงกล่องอัพโหลดและซ่อนตัวอย่างภาพ
        previewImage.style.display = 'none';
        uploadContainer.style.display = 'block';
      }
    });

    // เมื่อคลิกที่ตัวอย่างภาพ, เปิด file input ให้เลือกภาพใหม่
    previewImage.addEventListener('click', function() {
      fileInput.click();  // เปิด file input
    });

    // เมื่อคลิกที่ไฟล์ input, ไม่ให้มันรีเซ็ท
    fileInput.addEventListener('click', function(event) {
      event.stopPropagation(); // ป้องกันไม่ให้การคลิกที่ input ทำให้ภาพหาย
    });
  }
}




// ฟังก์ชันตรวจสอบการอัปโหลดรูปภาพ
function checkAllImagesUploaded() {
  const requiredImages = [
    'fileInput1', // ภาพหน้าบัญชี Apple ID
    'fileInput2', // ภาพหน้าเกี่ยวกับ (เห็นรุ่นอุปกรณ์)
    'fileInput4'  // ภาพหน้าเกี่ยวกับ (เห็นความจุอุปกรณ์)
  ];

  for (const inputId of requiredImages) {
    const fileInput = document.getElementById(inputId);
    if (!fileInput.files || fileInput.files.length === 0) {
      // แสดงกรอบสีแดงชั่วคราวเมื่อรูปไม่ครบ
      const uploadContainer = fileInput.closest('.photo-upload');
      uploadContainer.style.border = "2px solid red";
      setTimeout(() => uploadContainer.style.border = "", 2000);
      
      return false;
    }
  }
  return true;
}

// ฟังก์ชันบันทึกข้อมูล
async function submitDeviceInfo() {
  try {
    // ตรวจสอบว่าข้อมูลถูกกรอกครบถ้วน
    const requiredFields = [
      { id: 'device-select', name: 'ประเภทอุปกรณ์' },
      { id: 'device-model', name: 'รุ่นอุปกรณ์' },
      { id: 'storage-capacity', name: 'ความจุอุปกรณ์' },
      { id: 'battery-health', name: 'สุขภาพแบตเตอรี่' }
    ];

    // ตรวจสอบฟิลด์ที่ต้องกรอก
    for (const field of requiredFields) {
      const element = document.getElementById(field.id);
      if (!element.value) {
        throw new Error(`กรุณากรอกข้อมูลในฟิลด์: ${field.name}`);
      }
    }

    // เตรียมข้อมูล FormData
    const formData = new FormData();
    
    // เพิ่มข้อมูลจากฟอร์ม (บังคับกรอก)
    formData.append("deviceType", document.getElementById("device-select").value);
    formData.append("model", document.getElementById("device-model").value);
    formData.append("storage", document.getElementById("storage-capacity").value);
    formData.append("batteryHealth", document.getElementById("battery-health").value);
    
    // เพิ่ม contract_id จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const contractId = urlParams.get("contract_id") || window.location.pathname.split("/").pop();
    formData.append("contract_id", contractId);

    // เพิ่มไฟล์รูปภาพ
    const imageUploads = [
      {id: 'fileInput1', name: 'appleIdImage'},
      {id: 'fileInput2', name: 'modelImage'},
      {id: 'fileInput3', name: 'batteryImage'},
      {id: 'fileInput4', name: 'storageImage'}
    ];

    for (const {id, name} of imageUploads) {
      formData.append(name, document.getElementById(id).files[0]);
    }

    // แสดงสถานะกำลังส่งข้อมูล
    const submitBtn = document.getElementById("btn-next");
    submitBtn.disabled = true;
    submitBtn.textContent = "กำลังส่งข้อมูล...";

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์
    const response = await fetch(`${BASE_URL}/api/contract/submit-device-info`, {
      method: "POST",
      body: formData
    });

    // ตรวจสอบ response
    const result = await response.json();
    
    if (!response.ok) {
      // จัดการข้อผิดพลาดจากเซิร์ฟเวอร์
      if (result.error && result.error.includes('duplicate key')) {
        throw new Error('หมายเลขสัญญานี้ถูกใช้งานไปแล้ว กรุณาตรวจสอบอีกครั้ง');
      }
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
    }

    return result;

  } catch (error) {
    console.error("Error submitting device info:", error);
    throw error; // ส่งต่อ error เพื่อให้ caller จัดการ
    
  } finally {
    // คืนสถานะปุ่มไม่ว่าจะสำเร็จหรือล้มเหลว
    const submitBtn = document.getElementById("btn-next");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "บันทึก";
    }
  }
}

// การเรียกใช้งานเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener("DOMContentLoaded", function () {
  // ตั้งค่าการแสดงตัวอย่างรูปภาพเมื่อเลือกไฟล์
  setupImagePreviews();

  // จัดการการคลิกปุ่ม "บันทึก"
  document.getElementById("btn-next").addEventListener("click", async (e) => {
    e.preventDefault();
    
    try {
      // ตรวจสอบว่าอัปโหลดรูปครบหรือไม่
      if (!checkAllImagesUploaded()) {
        alert("กรุณาเลือกรูปภาพทั้งหมด 3 ภาพก่อนส่งข้อมูล");
        return;
      }

      // ส่งข้อมูล
      const response = await submitDeviceInfo();
      window.location.href = "../0_contract/index.html";
      
      // สามารถเพิ่มการ redirect ไปหน้าอื่นหลังสำเร็จได้ที่นี่
      // window.location.href = "/next-page";
      
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  });
});


// ย้อนกลับ
document.getElementById("btn-cancel").addEventListener("click", function () {
  window.location.href = "../0_contract/index.html";
});
