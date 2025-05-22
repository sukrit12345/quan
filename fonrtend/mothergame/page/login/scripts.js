import { BASE_URL } from '../../config/config.js'; // ตรวจสอบ path ให้ถูกต้อง

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const idCardInput = document.getElementById("id_card_number");
  const passwordInput = document.getElementById("passwordInput");
  const togglePasswordButton = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");
  const forgotPassword = document.getElementById("forgotPassword");
  const registerSection = document.getElementById("registerSection");
  const customerBtn = document.getElementById("customerBtn");
  const staffBtn = document.getElementById("staffBtn");

  // แสดง/ซ่อนรหัสผ่าน
  togglePasswordButton.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    // ปรับ icon
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
  });

  // ค่าเริ่มต้น
  let selectedRole = "customer";
  customerBtn.classList.add("bg-red-400", "text-white");
  staffBtn.classList.remove("bg-red-400", "text-white");
  customerBtn.classList.remove("bg-red-100", "text-gray-600");
  staffBtn.classList.add("bg-red-100", "text-gray-600");
  registerSection.style.display = "block";
  loginBtn.style.display = "block";
  forgotPassword.style.display = "block";

  // เมื่อลูกค้าถูกเลือก
  customerBtn.addEventListener("click", () => {
    selectedRole = "customer";
    customerBtn.classList.add("bg-red-400", "text-white");
    staffBtn.classList.remove("bg-red-400", "text-white");
    customerBtn.classList.remove("bg-red-100", "text-gray-600");
    staffBtn.classList.add("bg-red-100", "text-gray-600");

    registerSection.style.display = "block";
    loginBtn.style.display = "block";
    forgotPassword.style.display = "block";
  });

  // เมื่อเจ้าหน้าที่ถูกเลือก
  staffBtn.addEventListener("click", () => {
    selectedRole = "staff";
    staffBtn.classList.add("bg-red-400", "text-white");
    customerBtn.classList.remove("bg-red-400", "text-white");
    staffBtn.classList.remove("bg-red-100", "text-gray-600");
    customerBtn.classList.add("bg-red-100", "text-gray-600");

    registerSection.style.display = "none";
    forgotPassword.style.display = "none";
    loginBtn.style.display = "block";
  });

  // เข้าสู่ระบบ เมื่อกดปุ่ม
  loginBtn.addEventListener("click", () => {
    if (selectedRole === "customer") {
      customerLogin();
    } else if (selectedRole === "staff") {
      adminLogin();
    }
  });

  // ฟังก์ชันเข้าสู่ระบบลูกค้า
  async function customerLogin() {
    const id_card_number = idCardInput.value.trim();
    const password = passwordInput.value;

    if (!id_card_number || !password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_card_number, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.clear();
        localStorage.setItem("id_card_number", id_card_number);

        window.location.href = `../customer/0_welcom/index.html`;
      } else {
        alert(result.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  }


  // ฟังก์ชันเข้าสู่ระบบเจ้าหน้าที่
  async function adminLogin() {
    const id_card_number = idCardInput.value.trim();
    const password = passwordInput.value;
  
    if (!id_card_number || !password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
  
    const loginData = { id_card_number, password };
  
    try {
      const response = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // ล้างข้อมูล localStorage เก่าก่อน
        localStorage.clear();
  
        // เก็บข้อมูลใหม่หลัง login สำเร็จ
        const position = result.admin.position;
        localStorage.setItem("id_card_number", id_card_number);
        localStorage.setItem("position", position);
  
        // ไปยังหน้า welcome
        window.location.href = "../manger/0_welcom/index.html";
      } else {
        alert(result.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  }
  

});
