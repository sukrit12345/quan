// เช็ครหัสผ่าน
const togglePasswordButton = document.getElementById("togglePassword");
const passwordInput = document.getElementById("passwordInput");
const eyeIcon = document.getElementById("eyeIcon");
const eyeIconPath = document.getElementById("eyeIconPath");

togglePasswordButton.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;

  if (type === "password") {
    eyeIconPath.setAttribute(
      "d",
      "M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9S16.97 3 12 3zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    );
  } else {
    eyeIconPath.setAttribute(
      "d",
      "M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9S16.97 3 12 3zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-8c-.83 0-1.5.67-1.5 1.5S11.17 14 12 14s1.5-.67 1.5-1.5S12.83 10 12 10z"
    );
  }
});




// เลือกโรล
const customerBtn = document.getElementById("customerBtn");
const staffBtn = document.getElementById("staffBtn");

customerBtn.addEventListener("click", () => {
  customerBtn.classList.add("bg-red-400", "text-white");
  staffBtn.classList.remove("bg-red-400", "text-white");
  customerBtn.classList.remove("bg-red-100", "text-gray-600");
  staffBtn.classList.add("bg-red-100", "text-gray-600");
});

staffBtn.addEventListener("click", () => {
  staffBtn.classList.add("bg-red-400", "text-white");
  customerBtn.classList.remove("bg-red-400", "text-white");
  staffBtn.classList.remove("bg-red-100", "text-gray-600");
  customerBtn.classList.add("bg-red-100", "text-gray-600");
});

// ตั้งค่าเริ่มต้นให้ customerBtn เป็นปุ่มที่ถูกเลือก
customerBtn.classList.add("bg-red-400", "text-white");
staffBtn.classList.remove("bg-red-400", "text-white");
customerBtn.classList.remove("bg-red-100", "text-gray-600");
staffBtn.classList.add("bg-red-100", "text-gray-600");
