// ดึงค่า _id จาก URL
const params = new URLSearchParams(window.location.search);
const id = params.get("_id");

// ฟังก์ชันสำหรับเปลี่ยนหน้าแต่ละสถานะ
function goToSetDatePage() {
  if (id) {
    window.location.href = `../status/1_set/index.html?_id=${id}`;
  } else {
    alert("ไม่พบ _id ใน URL");
  }
}

function goToFollowPage() {
  if (id) {
    window.location.href = `../status/2_follow/index.html?_id=${id}`;
  } else {
    alert("ไม่พบ _id ใน URL");
  }
}

function goToSeizedPage() {
  if (id) {
    window.location.href = `../status/3_seized/index.html?_id=${id}`;
  } else {
    alert("ไม่พบ _id ใน URL");
  }
}

function goToBlacklistPage() {
  if (id) {
    window.location.href = `../status/4_blacklist/index.html?_id=${id}`;
  } else {
    alert("ไม่พบ _id ใน URL");
  }
}

function goToFullyPaidPage() {
  if (id) {
    window.location.href = `../status/5_fully/index.html?_id=${id}`;
  } else {
    alert("ไม่พบ _id ใน URL");
  }
}


function goToHistoryPage() {
    if (id) {
      window.location.href = `../status/6_history/index.html?_id=${id}`;
    } else {
      alert("ไม่พบ _id ใน URL");
    }
  }
  