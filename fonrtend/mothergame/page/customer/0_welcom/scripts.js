import { BASE_URL } from "../../../config/config.js"; // ตรวจสอบ path ให้ถูกต้อง

document.addEventListener("DOMContentLoaded", () => {
  const gameButton = document.getElementById("game-button");

  gameButton.addEventListener("click", async () => {
    const storedIdCard = localStorage.getItem("id_card_number")?.trim();

    if (!storedIdCard) {
      console.log("ไม่พบ id_card_number ใน localStorage");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/check-contract?id_card_number=${storedIdCard}`);
      const result = await response.json();

      if (result.allowed) {
        // แนบ id_card_number ไปกับ URL
        window.location.href = `https://game5-eight.vercel.app/?id_card_number=${storedIdCard}`;
      } else {
        alert("คุณไม่มีสิทธิ์เข้าถึงเมนูนี้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  });
});
