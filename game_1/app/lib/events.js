// app/lib/events.js

const events = [
  // Event สำหรับผู้ชาย (Male)
  {
    eventNo: 1,
    withAge: 1,
    question: "คุณอยากร้องไห้หรือไม่ร้องไห้?",
    choices: [
      { text: "ร้องไห้", effects: { happiness: -5, health:-100  } },
      { text: "ไม่ร้องไห้", effects: { happiness: 5, health:-100} },
    ],
    gender: "male",
  },
  {
    eventNo: 2,
    withAge: 1,
    question: "คุณอยากเล่นนอกบ้านหรืออยู่บ้าน?",
    choices: [
      { text: "เล่นนอกบ้าน", effects: { happiness: 10,  health:-100} },
      { text: "อยู่บ้าน", effects: { happiness: -5, health:-100} },
    ],
    gender: "male",
  },
  {
    eventNo: 3,
    withAge: 1,
    question: "คุณอยากกินผักหรือกินขนม?",
    choices: [
      { text: "กินผัก", effects: {  happiness: -2, health: -50 } },
      { text: "กินขนม", effects: {  happiness: 5, health: -50 } },
    ],
    gender: "male",
  },
  {
    eventNo: 4,
    withAge: 2,
    question: "คุณอยากนอนกลางวันหรือเล่นเกม?",
    choices: [
      { text: "นอนกลางวัน", effects: {  happiness: 5, health: -50 } },
      { text: "เล่นเกม", effects: { happiness: 10, health: -50 } },
    ],
    gender: "male",
  },
  {
    eventNo: 5,
    withAge: 2,
    question: "คุณอยากอ่านหนังสือหรือดูการ์ตูน?",
    choices: [
      { text: "อ่านหนังสือ", effects: { iq: 10, happiness: 5 } },
      { text: "ดูการ์ตูน", effects: { iq: -5, happiness: 10 } },
    ],
    gender: "male",
  },
  {
    eventNo: 6,
    withAge: 3,
    question: "คุณอยากเลี้ยงสุนัขหรือแมว?",
    choices: [
      { text: "เลี้ยงสุนัข", effects: { happiness: 10} },
      { text: "เลี้ยงแมว", effects: { happiness: 5 } },
    ],
    gender: "male",
  },
  {
    eventNo: 7,
    withAge: 3,
    question: "คุณอยากเป็นฮีโร่หรือวายร้าย?",
    choices: [
      { text: "ฮีโร่", effects: { happiness: 10} },
      { text: "วายร้าย", effects: { happiness: 5 } },
    ],
    gender: "male",
  },
  {
    eventNo: 8,
    withAge: 4,
    question: "คุณอยากไปเที่ยวทะเลหรือภูเขา?",
    choices: [
      { text: "ทะเล", effects: { happiness: 10, health: 5 } },
      { text: "ภูเขา", effects: { happiness: 5, health: 10 } },
    ],
    gender: "male",
  },
  {
    eventNo: 9,
    withAge: 4,
    question: "คุณอยากกินพิซซ่าหรือซูชิ?",
    choices: [
      { text: "พิซซ่า", effects: { happiness: 10, health: -5 } },
      { text: "ซูชิ", effects: { happiness: 5, health: 5 } },
    ],
    gender: "male",
  },
  {
    eventNo: 10,
    withAge: 5,
    question: "คุณอยากเป็นนักบินอวกาศหรือนักสำรวจ?",
    choices: [
      { text: "นักบินอวกาศ", effects: { knowledge: 10, happiness: 5 } },
      { text: "นักสำรวจ", effects: { knowledge: 5, happiness: 10 } },
    ],
    gender: "male",
  },

  // Event สำหรับผู้หญิง (Female)
  {
    eventNo: 1,
    withAge: 1,
    question: "คุณอยากเรียนบัลเลต์หรือร้องเพลง?",
    choices: [
      { text: "เรียนบัลเลต์", effects: { happiness: 5, health: 2 } },
      { text: "ร้องเพลง", effects: { happiness: 10, health: 5 } },
    ],
    gender: "female",
  },
  {
    eventNo: 2,
    withAge: 1,
    question: "คุณอยากมีเพื่อนใหม่หรือเล่นคนเดียว?",
    choices: [
      { text: "มีเพื่อนใหม่", effects: {  happiness: 5 } },
      { text: "เล่นคนเดียว", effects: {  happiness: -5 } },
    ],
    gender: "female",
  },
  {
    eventNo: 3,
    withAge: 1,
    question: "คุณอยากช่วยคุณยายข้ามถนนหรือไม่ช่วย?",
    choices: [
      { text: "ช่วย", effects: { happiness: 5, lucky: 5 } },
      { text: "ไม่ช่วย", effects: { happiness: -5, lucky: -5 } },
    ],
    gender: "female",
  },
  {
    eventNo: 4,
    withAge: 2,
    question: "คุณอยากเป็นนางฟ้าหรือแม่มด?",
    choices: [
      { text: "นางฟ้า", effects: { happiness: 10, health: 5 } },
      { text: "แม่มด", effects: { happiness: 5, health: -5 } },
    ],
    gender: "female",
  },
  {
    eventNo: 5,
    withAge: 2,
    question: "คุณอยากเลี้ยงกระต่ายหรือนก?",
    choices: [
      { text: "กระต่าย", effects: { happiness: 10,  } },
      { text: "นก", effects: { happiness: 5,  } },
    ],
    gender: "female",
  },
  {
    eventNo: 6,
    withAge: 3,
    question: "คุณอยากเป็นนักวิทยาศาสตร์หรือศิลปิน?",
    choices: [
      { text: "นักวิทยาศาสตร์", effects: { iq: 10, happiness: 5 } },
      { text: "ศิลปิน", effects: { iq: 5, happiness: 10 } },
    ],
    gender: "female",
  },
  {
    eventNo: 7,
    withAge: 3,
    question: "คุณอยากไปเที่ยวสวนสนุกหรือพิพิธภัณฑ์?",
    choices: [
      { text: "สวนสนุก", effects: { happiness: 10, health: 5 } },
      { text: "พิพิธภัณฑ์", effects: { iq: 10, happiness: 5 } },
    ],
    gender: "female",
  },
  {
    eventNo: 8,
    withAge: 4,
    question: "คุณอยากกินไอศกรีมหรือเค้ก?",
    choices: [
      { text: "ไอศกรีม", effects: { happiness: 10, health: -5 } },
      { text: "เค้ก", effects: { happiness: 5, health: 5 } },
    ],
    gender: "female",
  },
  {
    eventNo: 9,
    withAge: 4,
    question: "คุณอยากเป็นเจ้าหญิงหรือนักรบ?",
    choices: [
      { text: "เจ้าหญิง", effects: { happiness: 10, health: 5 } },
      { text: "นักรบ", effects: { happiness: 5, health: 10 } },
    ],
    gender: "female",
  },
  {
    eventNo: 10,
    withAge: 5,
    question: "คุณอยากไปดวงจันทร์หรือใต้ทะเล?",
    choices: [
      { text: "ดวงจันทร์", effects: { iq: 10, happiness: 5 } },
      { text: "ใต้ทะเล", effects: { iq: 5, happiness: 10 } },
    ],
    gender: "female",
  },
];

export default events;