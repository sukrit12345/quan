import { BASE_URL } from '../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง


document.addEventListener("DOMContentLoaded", async () => { 
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('_id');

    if (!id) {
      alert("ไม่พบ id ที่ส่งมา");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/detailcontract1/${id}`);
      const result = await response.json();

      if (result.success) {
        const contract = result.data;
        console.log("ข้อมูลสัญญา:", contract);

        document.getElementById("idCardNumber").value = contract.id_card_number || "";
        document.getElementById("firstName").value = contract.first_name || "";
        document.getElementById("lastName").value = contract.last_name || "";
        document.getElementById("bankName").value = contract.bank_name || "";
        document.getElementById("accountNumber").value = contract.account_number || "";
        document.getElementById("phoneNumber").value = contract.phone_number || "";
        document.getElementById("instagram").value = contract.instagram || "";
        document.getElementById("facebook").value = contract.facebook || "";
        document.getElementById("line").value = contract.line || "";
        document.getElementById("residenceType").value = contract.residence_type || "";

        toggleFields();

        if (contract.residence_type === "หอพัก") {
          document.getElementById("dormitoryName").value = contract.dormitory_name || "";
          document.getElementById("roomNumber").value = contract.room_number || "";
        }

        if (contract.residence_type === "ที่พักส่วนตัว") {
          // แก้ไข id ให้ตรงกับฟอร์ม คือ houseNumber ไม่ใช่ house_number
          document.getElementById("houseNumber").value = contract.house_number || "";
        }

        document.getElementById("province").value = contract.province || "";
        document.getElementById("amphoe").value = contract.amphoe || "";
        document.getElementById("district").value = contract.district || "";
        document.getElementById("zipcode").value = contract.zipcode || "";

        document.getElementById("occupation").value = contract.occupation || "";

        if (contract.occupation === "นักศึกษา") {
          document.getElementById("university-group").style.display = "block";
          document.getElementById("university").value = contract.university_name || "";
          document.getElementById("workplace-group").style.display = "none";
        } else if (
          ["พนักงานเงินเดือน", "ราชการ", "ธุรกิจส่วนตัว", "ฟรีแลนซ์"].includes(contract.occupation)
        ) {
          document.getElementById("workplace-group").style.display = "block";
          document.getElementById("workplaceName").value = contract.workplace_name || "";
          document.getElementById("university-group").style.display = "none";
        } else {
          document.getElementById("workplace-group").style.display = "none";
          document.getElementById("university-group").style.display = "none";
        }

        // โหลดภาพถ่ายประชาชนเดิมถ้ามี
        if (contract.citizen_image) {
            const preview = document.getElementById('previewImage2');
            preview.src = `/uploads/${contract.citizen_image}`;
            preview.style.display = 'block';
          }
          
      } else {
        alert("ไม่สามารถโหลดข้อมูลสัญญาได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    }
  });




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
  


// ทำให้ทั้ง form เป็น readonly / disabled
const form = document.getElementById('userForm');
const elements = form.elements;


//ให้อ่านอย่างเดียว
for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    el.readOnly = true;
    } else {
    el.disabled = true;
    }
}



//pdf
document.addEventListener("DOMContentLoaded", function () {
    window.exportToPDF = function () {
      const formElement = document.getElementById("userForm");
  
      const opt = {
        margin: 0.5,
        filename: "ข้อมูลส่วนตัว.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2,  width: 710},
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak: {
          mode: ['avoid-all'], // ❗ ป้องกันไม่ให้ตัดข้อความกลางคัน
          before: '.page-break', // ใช้กรณีอยากกำหนดตำแหน่งขึ้นหน้าใหม่เอง
          after: [] // ไม่ต้องการตัดหลัง element ใด
        }
      };
  
      html2pdf().set(opt).from(formElement).save();
    };
});
  