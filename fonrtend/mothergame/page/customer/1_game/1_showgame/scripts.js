//เลือกเกมทั้งหมด/ของฉัน
function switchTab(tabId) {
  // เลือกทุกๆ แท็บ
  var tabs = document.querySelectorAll('.tab');
  
  // ลบคลาส active และ inactive จากทุกแท็บ
  tabs.forEach(function(tab) {
    tab.classList.remove('active');
    tab.classList.add('inactive');
  });

  // เพิ่มคลาส active ให้กับแท็บที่ถูกคลิก
  var clickedTab = document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`);
  clickedTab.classList.remove('inactive');
  clickedTab.classList.add('active');

  // คุณสามารถใช้ tabId เพื่อทำสิ่งที่เกี่ยวข้องกับแต่ละแท็บได้ เช่น แสดงเนื้อหาของแท็บ
  console.log('Switched to tab:', tabId);
}

//สีในคัดกรองประเภทเกม
document.getElementById("category").addEventListener("change", function() {
  this.style.color = "#A3A3A3"; 
});