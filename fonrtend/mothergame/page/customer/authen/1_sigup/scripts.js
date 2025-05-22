import { BASE_URL } from '../../../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง

//เเสดงรหัสผ่าน
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("passwordInput");
    const eyeIcon = document.getElementById("eyeIcon");

    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
});

//เเสดงยืนยันรหัสผ่าน
document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    const confirmPasswordInput = document.getElementById(
      "confirmPasswordInput"
    );
    const confirmEyeIcon = document.getElementById("confirmEyeIcon");

    const isPassword = confirmPasswordInput.type === "password";
    confirmPasswordInput.type = isPassword ? "text" : "password";
    confirmEyeIcon.classList.toggle("fa-eye");
    confirmEyeIcon.classList.toggle("fa-eye-slash");
});


//สมัคร
document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.querySelector("#registerButton"); // เลือกปุ่มสมัครสมาชิก
    const idCardInput = document.querySelector("#idCardNumber"); // เลือก input id ของเลขบัตรประชาชน
    const emailInput = document.querySelector("#email"); // เลือก input id ของอีเมล
    const passwordInput = document.querySelector("#passwordInput"); // เลือก input id ของรหัสผ่าน
    const confirmPasswordInput = document.querySelector("#confirmPasswordInput"); // เลือก input id ของยืนยันรหัสผ่าน
  
    registerButton.addEventListener("click", async () => {
      const id_card_number = idCardInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
  
      // ตรวจสอบเลขบัตรประชาชนต้องมี 13 หลัก
      const idCardRegex = /^[0-9]{13}$/; // ตรวจสอบว่าเป็นตัวเลขและมีความยาว 13 หลัก
      if (!idCardRegex.test(id_card_number)) {
        alert("เลขบัตรประชาชนต้องเป็นตัวเลขและมี 13 หลัก");
        return;
      }
  
      // ตรวจสอบอีเมลต้องมีเครื่องหมาย '@'
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // ตรวจสอบรูปแบบอีเมล
      if (!emailRegex.test(email)) {
        alert("อีเมลไม่ถูกต้อง");
        return;
      }
      
      if (!id_card_number || !email || !password || !confirmPassword) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("รหัสผ่านไม่ตรงกัน");
        return;
      }
  
      try {
        const response = await fetch(`${BASE_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_card_number,
            email,
            password,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("สมัครสมาชิกสำเร็จ!");
          window.location.href = "../../../login/index.html"; // กลับหน้าเข้าสู่ระบบ
        } else {
          alert(result.message || "สมัครสมาชิกไม่สำเร็จ");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        alert("ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง");
      }
    });
  });
  