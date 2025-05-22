import { BASE_URL } from "../../../config/config.js";



document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch(`${ BASE_URL }/api/companies`); // เรียก API
      const data = await response.json();

      if (data.length > 0) {
        const company = data[0]; // ดึงบริษัทแรก (ถ้ามีหลายบริษัท)

        document.getElementById("company-registration-number").value = company.company_registration_number || "";
        document.getElementById("company-name").value = company.company_name || "";
        document.getElementById("account-name").value = company.account_name || "";
        document.getElementById("bank-name").value = company.bank_name || "";
        document.getElementById("accountNumber").value = company.account_number || "";
        document.getElementById("email").value = company.email || "";
        document.getElementById("phone_number").value = company.phone_number || "";
      } else {
        console.log("ไม่พบข้อมูลบริษัท");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบริษัท:", error);
    }
});



