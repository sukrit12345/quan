import { BASE_URL } from "../../../../config/config.js";

//บันทึก
document.getElementById("btnNext").addEventListener("click", async () => {
  // ดึง contract_id จาก query string
  const urlParams = new URLSearchParams(window.location.search);
  const contract_id = urlParams.get("contract_id"); // ดึงค่า contract_id

  try {
    const res = await fetch(`${BASE_URL}/api/contract/contract4`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contract_id,
      }),
    });

    const data = await res.json();
    if (res.ok) {
        window.location.href = "../0_contract/index.html";
    } else {
      alert(data.message || "เกิดข้อผิดพลาดในการบันทึก");
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์");
  }
});



// ย้อนกลับ
document.getElementById("btn-cancel").addEventListener("click", function () {
    window.location.href = "../0_contract/index.html";
  });
  