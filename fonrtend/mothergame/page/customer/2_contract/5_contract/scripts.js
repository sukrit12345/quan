import { BASE_URL } from "../../../../config/config.js"; // เปลี่ยน path ให้ถูกต้อง

//เเสดงสัญญา
fetch(`${BASE_URL}/api/contract/5`)
  .then((response) => response.json())
  .then((data) => {
    const p = document.createElement("p");
    p.className = "contract-text";
    // แปลง \n เป็น <br> เพื่อให้ขึ้นบรรทัดใหม่
    p.innerHTML = data.text.replace(/\n/g, "<br>");
    document.getElementById("contract-container").appendChild(p);
  })
.catch((error) => console.error("Error fetching contract:", error));



//บันทึก
document.getElementById('btnNext').addEventListener('click', async () => {
  const isAgreed = document.getElementById('agree').checked;

  if (!isAgreed) {
    alert('กรุณายืนยันว่าได้อ่านและยอมรับเงื่อนไขก่อนดำเนินการต่อ');
    return; // ไม่ทำงานต่อถ้าไม่ติ๊ก
  }

  // ดึง contract_id จาก URL
  const urlParams = new URLSearchParams(window.location.search);
  const contract_id = urlParams.get('contract_id');

  try {
    const res = await fetch(`${BASE_URL}/api/contract/log-next-button`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contract_id
      })
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = "../0_contract/index.html";
    } else {
      alert(data.message || 'เกิดข้อผิดพลาดในการบันทึก');
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
  }
});


// ย้อนกลับ
document.getElementById("btn-cancel").addEventListener("click", function () {
  window.location.href = "../0_contract/index.html";
});
