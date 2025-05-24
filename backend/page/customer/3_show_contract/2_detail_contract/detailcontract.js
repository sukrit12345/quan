const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const cron = require("node-cron");
const Contract1 = require("../../../../models/contract1");
const Contract6 = require("../../../../models/contract6");
const Payment  = require("../../../../models/payment");
const User = require("../../../../models/user"); // ปรับ path ตามจริง



// ข้อความสัญญาที่ไม่สามารถแก้ไขได้
const contractText5 = `
สัญญาเช่าเกมออนไลน์

ระหว่าง ผู้ให้เช่า และ ผู้เช่า ซึ่งเรียกรวมกันว่า "คู่สัญญา" ทั้งสองฝ่ายได้ตกลงทำสัญญากันในข้อตกลงดังต่อไปนี้:

1. ข้อตกลงเกี่ยวกับการเช่าเกมออนไลน์  
1.1 รายละเอียดเกมที่เช่า  
ผู้ให้เช่ายินยอมให้ผู้เช่าทำการเช่าเกมออนไลน์ทั้งหมดที่มีในคลังของผู้ให้เช่า ภายใต้เงื่อนไขและข้อกำหนดที่ระบุไว้ในสัญญานี้

1.2 ระยะเวลาการเช่า  
ระยะเวลาการเช่าเกมจะคำนวณตั้งแต่วันที่เริ่มต้นจนถึงวันที่ผู้เช่าชำระค่าบริการครบถ้วนและคืนเกมตามข้อกำหนดของสัญญา ทั้งนี้ สัญญาจะถือว่าสิ้นสุดลงเมื่อผู้เช่าได้ดำเนินการชำระค่าบริการครบถ้วนและคืนเกมเรียบร้อยแล้วเท่านั้น

2. หลักประกันและการชำระเงิน  
2.1 หลักประกัน  
ผู้เช่าตกลงให้อุปกรณ์อิเล็กทรอนิกส์ที่ใช้ในการเช่าเกมอยู่ภายใต้การควบคุมและจัดการโดยระบบ MDM (Mobile Device Management) ซึ่งจัดการโดยผู้ให้เช่า โดยผู้ให้เช่าจะดำเนินการติดตั้งซอฟต์แวร์ MDM บนอุปกรณ์ดังกล่าวเพื่อใช้เป็นหลักประกันในการเช่าเกม

2.2 การบริหารจัดการอุปกรณ์ผ่านระบบ MDM  
อุปกรณ์อิเล็กทรอนิกส์ที่ใช้ในการเช่าเกมจะอยู่ภายใต้การควบคุมโดยระบบ MDM ที่ผู้ให้เช่าเป็นผู้จัดการ เพื่อรักษาความปลอดภัย ควบคุมการใช้งาน และป้องกันการละเมิดสิทธิ์ตลอดระยะเวลาการเช่า

2.3 การคืนหลักประกัน  
หลักประกันจะได้รับการคืนให้แก่ผู้เช่าเมื่อผู้เช่าชำระค่าบริการทั้งหมดครบถ้วนตามที่ระบุในสัญญา และคืนเกมภายในระยะเวลาที่กำหนด พร้อมทั้งดำเนินการถอนระบบ MDM ออกจากอุปกรณ์ที่ใช้ในการเช่าเรียบร้อยแล้ว

2.4 การไม่ชำระค่าบริการและการยึดหลักประกัน  
2.4.1 ในกรณีที่ผู้เช่าไม่ชำระค่าบริการตามที่ระบุไว้ในสัญญาภายในระยะเวลาที่กำหนด ไม่ว่าทั้งหมดหรือบางส่วน ผู้ให้เช่ามีสิทธิ์ดำเนินการเรียกเก็บเงินค้างชำระ รวมถึงยึดหลักประกันตามข้อกำหนดในสัญญานี้ โดยไม่จำเป็นต้องได้รับความยินยอมเพิ่มเติมจากผู้เช่า  
2.4.2 การยึดหลักประกันตามข้อ 2.4.1 อาจรวมถึงการควบคุมอุปกรณ์ผ่านระบบ MDM การระงับการใช้งานอุปกรณ์ และ/หรือการดำเนินการทางกฎหมายที่จำเป็น เพื่อคุ้มครองสิทธิ์และผลประโยชน์ของผู้ให้เช่า โดยผู้ให้เช่าสามารถดำเนินการดังกล่าวได้ทันทีหลังเกิดการผิดนัดชำระเงิน

2.5 ความเสียหายหรือการจำหน่ายหลักประกัน  
2.5.1 หากผู้เช่ากระทำการใด ๆ อันส่งผลให้หลักประกันเกิดความเสียหาย สูญหาย ถูกทำลาย หรือถูกนำไปจำหน่ายโดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากผู้ให้เช่า ผู้ให้เช่ามีสิทธิ์ดำเนินการทางกฎหมายทั้งทางแพ่งและ/หรืออาญา เพื่อเรียกร้องค่าเสียหายและคุ้มครองสิทธิ์ตามกฎหมาย  
2.5.2 ในกรณีที่มีบุคคลภายนอกเป็นผู้รับซื้อหรือรับโอนหลักประกันดังกล่าว โดยทราบหรือควรทราบว่าเป็นทรัพย์ที่อยู่ภายใต้สัญญาเช่า ผู้ให้เช่ามีสิทธิ์ดำเนินคดีกับบุคคลดังกล่าวตามที่กฎหมายบัญญัติ

2.6 วิธีการชำระเงิน  
ค่าธรรมเนียมการเช่าสามารถชำระผ่านช่องทางที่ผู้ให้เช่ากำหนด เช่น บัญชีธนาคาร หรือช่องทางการชำระเงินออนไลน์ต่าง ๆ โดยผู้ให้เช่าจะต้องแจ้งข้อมูลการชำระเงินให้ผู้เช่าทราบอย่างชัดเจน

2.7 ค่าใช้จ่ายในการติดตามและดำเนินคดี 
หากผู้เช่าผิดนัดชำระค่าเช่าหรือกระทำการใด ๆ อันเป็นการผิดสัญญา และผู้ให้เช่าต้องเสียค่าใช้จ่ายในการติดตาม ทวงถาม หรือดำเนินการทางกฎหมายเพื่อบังคับตามสิทธิของผู้ให้เช่า ไม่ว่าจะเป็น ค่าทนายความ ค่าเดินทาง ค่าธรรมเนียมศาล ค่าผู้ติดตามทวงถาม หรือค่าใช้จ่ายอื่นใดอันสมควร ผู้เช่าตกลงจะเป็นผู้รับผิดชอบชำระค่าใช้จ่ายทั้งหมดดังกล่าวให้แก่ผู้ให้เช่า

3. การใช้งานและการคืนเกม  
3.1 การคืนเกมและการสิ้นสุดสัญญา  
ผู้เช่าตกลงคืนเกมภายในระยะเวลาที่ระบุไว้ในสัญญา และต้องชำระค่าบริการทั้งหมดให้ครบถ้วน หากผู้เช่าไม่ชำระเงินครบถ้วนตามข้อกำหนดดังกล่าว สัญญาจะยังไม่ถือว่าสิ้นสุดโดยสมบูรณ์ และผู้เช่ายังคงมีภาระผูกพันตามสัญญานี้

3.2 ข้อห้ามในการกระทำกับเกม  
ผู้เช่าห้ามกระทำการทำลาย ดัดแปลง หรือแก้ไขเนื้อหาและซอฟต์แวร์ของเกม รวมถึงห้ามละเมิดลิขสิทธิ์หรือสิทธิ์อื่นใดที่เกี่ยวข้องกับเกม

4. ข้อจำกัดความรับผิด  
4.1 ผู้ให้เช่าจะไม่รับผิดชอบต่อความเสียหายใด ๆ ที่เกิดขึ้นจากการใช้งานเกมอันเกิดจากความผิดพลาดของระบบ, อินเทอร์เน็ต, หรือการใช้งานผิดวิธีโดยผู้เช่า  
4.2 หากเกมเกิดปัญหาทางเทคนิคที่ไม่สามารถเล่นได้ ผู้ให้เช่าจะดำเนินการแก้ไขให้โดยเร็ว แต่ไม่ต้องรับผิดชอบต่อค่าเสียโอกาส หรือค่าเสียหายอื่น ๆ ของผู้เช่า

5. การยกเลิกสัญญา  
5.1 การยกเลิกสัญญาก่อนกำหนด  
สัญญานี้ไม่สามารถยกเลิกก่อนกำหนดได้ เว้นแต่จะเกิดกรณีละเมิดข้อกำหนดในสัญญา หรือมีเหตุสุดวิสัยที่ทำให้ไม่สามารถปฏิบัติตามสัญญาได้ โดยจะต้องได้รับการตกลงจากคู่สัญญาทั้งสองฝ่าย  

5.2 การยกเลิกสัญญาเนื่องจากการละเมิด  
ในกรณีที่ฝ่ายใดฝ่ายหนึ่งละเมิดข้อกำหนดในสัญญานี้ ฝ่ายที่ได้รับผลกระทบมีสิทธิ์ยกเลิกสัญญาทันทีโดยไม่ต้องคืนค่าธรรมเนียมหรือหลักประกันใด ๆ

6. ข้อพิพาทและการตีความสัญญา  
6.1 หากเกิดข้อพิพาทที่เกี่ยวข้องกับสัญญานี้ คู่สัญญาตกลงจะเจรจาเพื่อหาข้อยุติร่วมกันก่อน หากไม่สามารถตกลงกันได้ ให้มีการดำเนินคดีในศาลที่ผู้ให้เช่าตั้งอยู่  
6.2 ข้อความใด ๆ ในสัญญานี้ หากมีความไม่ชัดเจน ให้นำมาตีความโดยคำนึงถึงเจตนารมณ์ของคู่สัญญาและหลักความเป็นธรรม

7. ข้อกำหนดเพิ่มเติม  
การเปลี่ยนแปลงเงื่อนไขในสัญญานี้ จะต้องกระทำเป็นลายลักษณ์อักษรและได้รับความยินยอมจากทั้งสองฝ่าย  

8. การยอมรับเงื่อนไข  
ผู้เช่าตกลงยอมรับข้อกำหนดและเงื่อนไขทั้งหมดในสัญญานี้โดยสมบูรณ์ การติ๊กเครื่องหมายในช่อง "ยินยอม" ถือเป็นการยอมรับและตกลงตามข้อกำหนดในสัญญานี้ทั้งหมด
`;

//เเสดงสัญญา
router.get("/5", (req, res) => {
  res.json({ text: contractText5 });
});

//เเสดงรายละเอียดสัญญา
router.get("/contract6/:contract_id", async (req, res) => {
  try {
    const { contract_id } = req.params;

    // ค้นหาเอกสารที่ตรงกับ contract_id
    const contract = await Contract6.findOne({ contract_id });

    // ถ้าไม่พบข้อมูล
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูล Contract6 สำหรับ contract_id นี้",
      });
    }

    // ส่งข้อมูลกลับ
    res.json({
      success: true,
      data: contract,
    });
  } catch (error) {
    console.error("Error fetching contract6:", error);
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล Contract6",
      error: error.message,
    });
  }
});


//-------------------------------------------------------------
// 🛠️  Helper: คืนค่า Date เฉพาะวัน (00:00) ตามโซนไทย (UTC+7)
//-------------------------------------------------------------
function toThaiDateOnly(dateInput) {
  const d = new Date(dateInput);
  d.setHours(d.getHours() + 7);                 // ปรับเวลา +7 ชม.
  return new Date(d.toISOString().split("T")[0]); // ตัดเวลา เหลือ YYYY‑MM‑DD
}



//-------------------------------------------------------------
// ✅ คำนวณค่าเช่าที่เลยกำหนด  (เวอร์ชันใช้ toThaiDateOnly)
//-------------------------------------------------------------
function calculateOverdueRent(totalRent, rentalDuration, endDate) {
  if (!totalRent || !rentalDuration || !endDate) {
    return { overdueAmount: 0, status: "อยู่ในสัญญา" };
  }

  // วันที่ครบสัญญาและวันที่ปัจจุบัน (ตามโซนไทย)
  const endDateOnly     = toThaiDateOnly(endDate);
  const currentDateOnly = toThaiDateOnly(new Date());

  // ถึงวันครบสัญญาพอดี
  if (currentDateOnly.getTime() === endDateOnly.getTime()) {
    return { overdueAmount: 0, status: "ครบสัญญา" };
  }

  // คำนวณจำนวนวันเลยสัญญา
  const daysOverdue = Math.floor(
    (currentDateOnly - endDateOnly) / (1000 * 60 * 60 * 24)
  );

  if (daysOverdue > 0) {
    const overdueAmount = (totalRent / rentalDuration) * daysOverdue;
    return { overdueAmount, status: "เลยสัญญา" };
  }

  // ยังไม่ถึงวันครบสัญญา
  return { overdueAmount: 0, status: "อยู่ในสัญญา" };
}




//-------------------------------------------------------------
// ✅ อัปเดตยอดค้างหลังหักเงินที่จ่ายแล้ว
//-------------------------------------------------------------
async function updateContractsWithPayments() {
  try {
    const contracts = await Contract6.find({});

    for (const contract of contracts) {
      //-------------------------------------------------------
      // 1) ดึง payment ที่ “อนุมัติ” ทั้งหมด + หาใบล่าสุด
      //-------------------------------------------------------
      const payments = await Payment.find({
        contractId: contract.contract_id,
        status: "อนุมัติ",
      }).sort({ createdAt: -1 });                        // ล่าสุด index 0

      const totalPaid  = payments.reduce((sum, p) => sum + p.amountPaid, 0);
      const lastPaidAt = payments.length ? payments[0].createdAt : null;

      //-------------------------------------------------------
      // 2) อัปเดตยอดค้างรวม (total_payment_due)
      //-------------------------------------------------------
      const remainingDue = (contract.total_payment_due || 0) - totalPaid;
      contract.total_payment_due = remainingDue > 0 ? remainingDue : 0;

      //-------------------------------------------------------
      // 3) ตรวจสถานะชำระครบหรือไม่
      //-------------------------------------------------------
      if (contract.total_payment_due <= 0) {
        // ---------- จ่ายครบ ----------
        contract.status = "ชำระครบ";                    // ตั้ง/คงสถานะ

        // ★ คำนวณ overdue_rent สุดท้าย จาก (lastPaidAt - end_date) ★
        if (lastPaidAt) {
          const endDateOnly  = toThaiDateOnly(contract.end_date);
          const paidDateOnly = toThaiDateOnly(lastPaidAt);

          const daysOverdue = Math.max(
            Math.floor((paidDateOnly - endDateOnly) / (1000 * 60 * 60 * 24)),
            0
          );

          contract.overdue_rent =
            (contract.total_rent / contract.rental_duration) * daysOverdue;
        }
        // ถ้าไม่มี lastPaidAt → ไม่เปลี่ยน overdue_rent
      } else {
        // ---------- ยังไม่จ่ายครบ ----------
        const { status: newStatus, overdueAmount } = calculateOverdueRent(
          contract.total_rent,
          contract.rental_duration,
          contract.end_date
        );

        contract.status       = newStatus;
        contract.overdue_rent = overdueAmount;
      }

      //-------------------------------------------------------
      // 4) บันทึกเอกสาร
      //-------------------------------------------------------
      await contract.save();

      console.log(
        `✅ [${contract.contract_id}] จ่ายแล้ว: ${totalPaid.toLocaleString()} | คงเหลือ: ${contract.total_payment_due.toLocaleString()} | สถานะ: ${contract.status}`
      );
    }

    console.log("✅ อัปเดต total_payment_due และ status เรียบร้อยแล้ว");
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error.message);
  }
}




// ✅ รวมเงินที่ต้องชำระ
function calculateTotalPaymentDue(totalRent, overdueRent, trackingFee, legalFee) {
  return (
    (totalRent || 0) +
    (overdueRent || 0) +
    (trackingFee || 0) +
    (legalFee || 0)
  );
}

// ✅ cron job รันทุก 1 นาที
cron.schedule("0 */1 * * * *", async () => {
  console.log("⏰ เริ่มการอัปเดต overdue_rent, total_payment_due และ status");

  try {
    const contracts = await Contract6.find({});

    for (const contract of contracts) {
      // คำนวณค่าเช่าที่เลยกำหนด และสถานะ
      const { overdueAmount, status } = calculateOverdueRent(
        contract.total_rent,
        contract.rental_duration,
        contract.end_date
      );

      // คำนวณยอดที่ต้องชำระทั้งหมด
      const totalDue = calculateTotalPaymentDue(
        contract.total_rent,
        overdueAmount,
        contract.tracking_fee,
        contract.legal_fee
      );

      // อัปเดตลงเอกสาร
      contract.overdue_rent = overdueAmount;
      contract.total_payment_due = totalDue;
      contract.status = status;

      await contract.save();
    }

    console.log("✅ อัปเดต overdue_rent และ status เบื้องต้นสำเร็จ");

    // 🔁 อัปเดตยอดที่จ่ายจริง และปรับสถานะอีกครั้ง
    await updateContractsWithPayments();

  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการอัปเดต:", error.message);
  }
});







// สร้าง transporter สำหรับส่งอีเมล
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sukrit.chosri@gmail.com",
    pass: "ndvb oowv vxgq rhqr",
  },
});


//เเจ้งเตือนสัญญา
cron.schedule(
  "0 13 * * *",
  async () => {
    console.log("📧 [CRON #2] เริ่มส่งอีเมลแจ้งสถานะ");

    try {
      const contracts = await Contract6.find({
        status: { $in: ["เลยสัญญา", "ครบสัญญา"] }
      });

      for (const contract of contracts) {
        const user = await User.findOne({ id_card_number: contract.id_card_number });
        if (!user || !user.email) continue;

        const contract1 = await Contract1.findOne({
          id_card_number: contract.id_card_number,
          contract_id: contract.contract_id
        });
        if (!contract1) continue;

        const mailOptions = {
          from: "sukrit.chosri@gmail.com",
          to: user.email,
          subject: "แจ้งสถานะสัญญาเช่า",
          text: `เรียนคุณ ${contract1.first_name} ${contract1.last_name},

          สัญญาหมายเลข ${contract.contract_id}
          สถานะสัญญาเช่าของคุณคือ: ${contract.status}
          ยอดที่ต้องชำระทั้งหมด: ${contract.total_payment_due} บาท

          หากมีข้อสงสัย กรุณาติดต่อเจ้าหน้าที่`
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ ส่งอีเมลถึง ${user.email} สำเร็จ`);
      }

      console.log("✅ [CRON #2] ส่งอีเมลเฉพาะสถานะ 'เลยสัญญา' และ 'ครบสัญญา' สำเร็จ");
    } catch (error) {
      console.error("❌ [CRON #2] ส่งอีเมลล้มเหลว:", error.message);
    }
  },
  {
    timezone: "Asia/Bangkok"
  }
);





//เเสงการชำระ
router.get('/payments', async (req, res) => {
  const contractId = req.query.contract_id;

  if (!contractId) {
    return res.status(400).json({ error: 'กรุณาระบุ contract_id ใน query string' });
  }

  try {
    const payments = await Payment.find(
      { contractId: contractId },
      {
        paymentDate: 1,
        amountPaid: 1,
        status: 1,
        _id: 0
      }
    ).sort({ createdAt: -1 }); // ✅ เรียงตามเวลาสร้างล่าสุดก่อน

    res.status(200).json(payments);
  } catch (error) {
    console.error('ดึงข้อมูล payment ผิดพลาด:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' });
  }
});


module.exports = router;
