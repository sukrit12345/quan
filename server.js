const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(express.json()); 
app.use(cors()); // เปิด CORS


mongoose.connect('mongodb://localhost:27017/quantum', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});




//ลูกค้า
//สมัครสมาชิก
const sigup = require('./backend/page/customer/authen/1_sigup/sigup');
app.use('/api', sigup );
//เข้าสู่ระบบ
const login = require('./backend/page/login/login');
app.use('/api', login );


















// ขั้นตอนทำสัญญา //2_contract
//ทำสัญญา0
const  contract0 = require('./backend/page/customer/2_contract/0_contract/contract0');
app.use('/api', contract0);
//ทำสํญญา1
const contract1 = require('./backend/page/customer/2_contract/1_contract/contract1');
app.use('/api/contract', contract1 );
//ทำสํญญา2
const contract2 = require('./backend/page/customer/2_contract/2_contract/contract2');
app.use('/api/contract', contract2 );
//ทำสัญญา3
const contract3 = require('./backend/page/customer/2_contract/3_contract/contract3');
app.use('/api/contract', contract3 );
//ทำสํญญา4
const contract4 = require('./backend/page/customer/2_contract/4_contract/contract4');
app.use('/api/contract', contract4 );
//ทำสํญญา5
const contract5 = require('./backend/page/customer/2_contract/5_contract/contract5');
app.use('/api/contract', contract5 );


//เเสดงรายการสัญญา //3_show_contract
//1_list_contract
//เเสดงรายการสัญญาทั้งหมด
const  listcontract = require('./backend/page/customer/3_show_contract/1_list_contract/listcontract');
app.use('/api', listcontract);
//2_detail_contract
//เเสดงรายละเอียดสัญญา
const  detailcontract = require('./backend/page/customer/3_show_contract/2_detail_contract/detailcontract');
app.use('/api', detailcontract);
//3_payment
//ชำระเงิน
const  payment = require('./backend/page/customer/3_show_contract/3_payment/payment');
app.use('/api', payment);













//พนักงาน
//2_approve_contract อนุมัติสัญญา
//คำขอสัญญา1
//เพิ่ม เเสดงตามid อัปเดต
const contract1approve = require('./backend/page/manger/2_approve_contract/1_contract/approve/approve');
app.use('/api', contract1approve);
//เเสดง ลบ
const contract1Routes = require('./backend/page/manger/2_approve_contract/1_contract/show/show');
app.use('/api', contract1Routes);
//คำขอสัญญา2
//เพิ่ม เเสดงตามid อัปเดต
const contract2approve = require('./backend/page/manger/2_approve_contract/2_contract/approve/approve');
app.use('/api', contract2approve);
//เเสดง ลบ
const contract2Routes = require('./backend/page/manger/2_approve_contract/2_contract/show/show');
app.use('/api', contract2Routes);
//คำขอสัญญา3
//เพิ่ม เเสดงตามid อัปเดต
const contract3approve = require('./backend/page/manger/2_approve_contract/3_contract/approve/approve');
app.use('/api', contract3approve);
//เเสดง ลบ
const contract3Routes = require('./backend/page/manger/2_approve_contract/3_contract/show/show');
app.use('/api', contract3Routes);
//คำขอสัญญา4
//เพิ่ม เเสดงตามid อัปเดต
const contract4approve = require('./backend/page/manger/2_approve_contract/4_contract/approve/approve');
app.use('/api', contract4approve);
//เเสดง ลบ
const contract4Routes = require('./backend/page/manger/2_approve_contract/4_contract/show/show');
app.use('/api', contract4Routes);
//คำขอสัญญา5
//เพิ่ม เเสดงตามid อัปเดต
const contract5approve = require('./backend/page/manger/2_approve_contract/5_contract/approve/approve');
app.use('/api', contract5approve);
//เเสดง ลบ
const contract5Routes = require('./backend/page/manger/2_approve_contract/5_contract/show/show');
app.use('/api', contract5Routes);


//3_approve_rent อนุมัติชำระเงิน
//เเสดง ลบ
const showpayment = require('./backend/page/manger/3_approve_rent/show/show');
app.use('/api', showpayment);
//เพิ่ม เเสดงตามid อัปเดต
const approvepayment = require('./backend/page/manger/3_approve_rent/approve/approve');
app.use('/api', approvepayment);


//4_list_contract เเสดงรายการสัญญา
//เเสดงรายการทั้งหมด
const showcontract = require('./backend/page/manger/4_list_contract/show/show');
app.use('/api', showcontract);
//เเสดงข้อมูลรายบุคคล
const showcontract1 = require('./backend/page/manger/4_list_contract/contract1/contract1');
app.use('/api', showcontract1);
//เเสดงสัญญารายสัญญา
const showcontract6 = require('./backend/page/manger/4_list_contract/contract6/contract6');
app.use('/api', showcontract6);
//เเสดงชำระรายid
const showpayments = require('./backend/page/manger/4_list_contract/showpayment/showpayment');
app.use('/api', showpayments);
//สถานะนัดชำระ
const statusset = require('./backend/page/manger/4_list_contract/changestatus/status/1_set/set');
app.use('/api', statusset);
//สถานะส่งผู้ติดตาม
const statusfollow = require('./backend/page/manger/4_list_contract/changestatus/status/2_follow/follow');
app.use('/api', statusfollow);









//6_mange_coinbonus จัดการรายการจัดการเหรียญ
// เพิ่มรุ่นapple
const apple = require('./backend/page/manger/6_mange_coinbonus/add/apple');
app.use('/api/apple', apple);
//เพิ่ม เเสดงตามid อัปเดต
const mange_coinbonus_post = require('./backend/page/manger/6_mange_coinbonus/add/mange_coinbonus');
app.use('/api', mange_coinbonus_post );
//เเสดง ลบ
const mange_coinbonus = require('./backend/page/manger/6_mange_coinbonus/show/mange_coinbonus');
app.use('/api', mange_coinbonus );


//7_mange_admin จัดการรายการพนักงาน
//เพิ่ม เเสดงตามid อัปเดต
const adminRouter_post = require('./backend/page/manger/7_manage_admin/add/manage_admin');
app.use('/api/admin', adminRouter_post); 
//เเสดง ลบ
const adminRouter = require('./backend/page/manger/7_manage_admin/show/manage_admin');
app.use('/api', adminRouter );

//9_config ดูข้อมูลบริษัท
const company = require('./backend/page/manger/9_config/company');
app.use('/api', company );