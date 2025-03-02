// app/lib/events.js

const events = {
  male: [
    {
      id: 1000001,
      withAge: 0,
      question: "อสุจิวิ่งเข้าหามดลูกแต่มีคู่แข่งอยู่ข้างๆ หนูจะทำยังไง?",
      choices: [
        { text: "หยุดวิ่ง", resText: "ไม่เกิดการปฏิสนธิ", effects: { happiness: -10, health: -100, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ชนคู่แข่ง", resText: "เริ่มต้นชีวิตใหม่", effects: { happiness: 5, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },
    {
      id: 1000002,
      withAge: 0,
      question: "ตอนอยู่ในท้อง จะทำอะไรดี?",
      choices: [
        { text: "นอนขดตัวสบายๆ", resText: "เป็นเด็กกาก", effects: { happiness: 0, health: 5, wealth: 0, iq: 0, lucky: 0 } },
        { text: "ตีลังกาเล่นแก้เบื่อ", resText: "แข็งแรง", effects: { happiness: 5, health: 10, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },
    {
      id: 1000003,
      withAge: 0,
      question: "คุณเกิดมาแล้ว แต่ร้องไห้ไม่หยุด คุณจะทำยังไง?",
      choices: [
        { text: "ร้องไห้ต่อไป", resText: "พ่อแม่ปวดหัว", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "หยุดร้องและยิ้ม", resText: "พ่อแม่ดีใจ", effects: { happiness: 10, health: 5, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },

    // วัย 1-2 ปี (ชาย)
    {
      id: 1000004,
      withAge: 1,
      question: "คุณหัดเดินแต่ล้มบ่อย คุณจะทำยังไง?",
      choices: [
        { text: "เลิกเดินและคลานแทน", resText: "พัฒนาการช้า", effects: { happiness: -5, health: -5, wealth: 0, iq: 0, lucky: -5 } },
        { text: "พยายามเดินต่อไป", resText: "แข็งแรงขึ้น", effects: { happiness: 5, health: 10, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },
    {
      id: 1000005,
      withAge: 1,
      question: "คุณเห็นสุนัขตัวใหญ่ คุณจะทำยังไง?",
      choices: [
        { text: "วิ่งหนี", resText: "สุนัขไล่ตาม", effects: { happiness: -5, health: -5, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ยิ้มและเล่นกับมัน", resText: "สุนัขชอบคุณ", effects: { happiness: 10, health: 5, wealth: 0, iq: 0, lucky: 10 } },
      ],
    },
    {
      id: 1000006,
      withAge: 1,
      question: "คุณหิวแต่แม่ไม่ให้กินขนม คุณจะทำยังไง?",
      choices: [
        { text: "ร้องไห้และอาละวาด", resText: "แม่โมโห", effects: { happiness: -5, health: -5, wealth: 0, iq: 0, lucky: -5 } },
        { text: "รอจนถึงมื้ออาหาร", resText: "แม่ชมคุณ", effects: { happiness: 5, health: 5, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },

    // วัย 2-3 ปี (ชาย)
    {
      id: 1000007,
      withAge: 2,
      question: "คุณเห็นเพื่อนเล่นของเล่นที่คุณอยากได้ คุณจะทำยังไง?",
      choices: [
        { text: "แย่งของเล่นมา", resText: "เพื่อนร้องไห้", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ขอเล่นด้วย", resText: "เพื่อนยินดี", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },
    {
      id: 1000008,
      withAge: 2,
      question: "คุณหกล้มและเจ็บ คุณจะทำยังไง?",
      choices: [
        { text: "ร้องไห้และไม่ยอมลุก", resText: "พ่อแม่กังวล", effects: { happiness: -5, health: -5, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ลุกขึ้นและยิ้ม", resText: "พ่อแม่ภูมิใจ", effects: { happiness: 5, health: 5, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },
    {
      id: 1000009,
      withAge: 2,
      question: "คุณเห็นแมวตัวหนึ่ง คุณจะทำยังไง?",
      choices: [
        { text: "วิ่งไล่จับแมว", resText: "แมวหนีและคุณล้ม", effects: { happiness: -5, health: -5, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ยิ้มและเรียกแมว", resText: "แมวมาใกล้คุณ", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 10 } },
      ],
    },

    // วัย 3-4 ปี (ชาย)
    {
      id: 1000010,
      withAge: 3,
      question: "คุณเห็นเพื่อนกินขนมที่คุณชอบ คุณจะทำยังไง?",
      choices: [
        { text: "แย่งขนมมา", resText: "เพื่อนร้องไห้", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ขอแบ่งขนม", resText: "เพื่อนยินดีแบ่ง", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },
    {
      id: 1000011,
      withAge: 3,
      question: "คุณเห็นแม่ทำกับข้าว คุณจะทำยังไง?",
      choices: [
        { text: "นั่งดูเฉยๆ", resText: "แม่เหนื่อย", effects: { happiness: 0, health: 0, wealth: 0, iq: 0, lucky: 0 } },
        { text: "ช่วยแม่ทำกับข้าว", resText: "แม่ดีใจ", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },
    {
      id: 1000012,
      withAge: 3,
      question: "คุณเห็นเพื่อนร้องไห้ คุณจะทำยังไง?",
      choices: [
        { text: "เดินหนี", resText: "เพื่อนเสียใจ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ไปปลอบเพื่อน", resText: "เพื่อนดีใจ", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },

    // วัย 4-5 ปี (ชาย)
    {
      id: 1000013,
      withAge: 4,
      question: "คุณเห็นเพื่อนล้ม คุณจะทำยังไง?",
      choices: [
        { text: "เดินหนี", resText: "เพื่อนเสียใจ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ช่วยเพื่อนลุก", resText: "เพื่อนขอบคุณ", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },
    {
      id: 1000014,
      withAge: 4,
      question: "คุณเห็นพ่อทำงานหนัก คุณจะทำยังไง?",
      choices: [
        { text: "นั่งเล่นเฉยๆ", resText: "พ่อเหนื่อย", effects: { happiness: 0, health: 0, wealth: 0, iq: 0, lucky: 0 } },
        { text: "ช่วยพ่อทำงาน", resText: "พ่อดีใจ", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },
    {
      id: 1000015,
      withAge: 4,
      question: "คุณเห็นเพื่อนทำของเล่นพัง คุณจะทำยังไง?",
      choices: [
        { text: "หัวเราะเยาะเพื่อน", resText: "เพื่อนโกรธ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ช่วยเพื่อนซ่อมของเล่น", resText: "เพื่อนขอบคุณ", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },

    // วัย 5 ปี 

    // วัย 6 ปี (ชาย)
    {
      id: 1000016,
      withAge: 6,
      question: "แอบเล่นโทรศัพท์พ่อ จะทำอะไร?",
      choices: [
        { text: "เเอบดูหนังโป๊ะ", resText: "เป็นเด็กบ้ากาม", effects: { happiness: -5, health: 0, wealth: 0, iq: -5, lucky: -5 } },
        { text: "เล่นเกม", resText: "เป็นเด็กติดเกม", effects: { happiness: 10, health: -5, wealth: 0, iq: -5, lucky: 0 } },
      ],
    },
    {
      id: 1000017,
      withAge: 6,
      question: "คุณเห็นเพื่อนทำการบ้านไม่เป็น คุณจะทำยังไง?",
      choices: [
        { text: "สอนเพื่อนทำการบ้าน", resText: "เพื่อนขอบคุณ", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
        { text: "ปล่อยให้เพื่อนทำเอง", resText: "เพื่อนเสียใจ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
      ],
    },
    {
      id: 1000018,
      withAge: 6,
      question: "คุณลืมเอาเงินไปโรงเรียน จะทำยังไง?",
      choices: [
        { text: "ปล้นเพื่อน", resText: "รวยแต่เสี่ยงโดนจับ", effects: { happiness: -10, health: 0, wealth: 20, iq: -5, lucky: -10 } },
        { text: "ผลิตเงินใช้เอง", resText: "รวยแบบสร้างสรรค์", effects: { happiness: 5, health: 0, wealth: 15, iq: 5, lucky: 5 } },
      ],
    },

    // วัย 7 ปี (ชาย)
    {
      id: 1000019,
      withAge: 7,
      question: "กางเกงขาดกลางโรงเรียน! จะทำยังไง?",
      choices: [
        { text: "แกล้งทำเป็นว่าไม่มีอะไรเกิดขึ้น", resText: "เพื่อนข้างหลังเห็นแล้วหัวเราะทั้งห้อง", effects: { happiness: -10, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "เปิดโชว์ไปเลย", resText: "เป็นคนฮอต", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },
    {
      id: 1000020,
      withAge: 7,
      question: "คุณเห็นแมวจรจัดหิวโหย คุณจะทำยังไง?",
      choices: [
        { text: "ให้อาหารแมว", resText: "แมวขอบคุณและตามคุณ回家", effects: { happiness: 10, health: 0, wealth: -5, iq: 0, lucky: 10 } },
        { text: "เดินหนี", resText: "แมวโกรธและขู่คุณ", effects: { happiness: -5, health: -5, wealth: 0, iq: 0, lucky: -5 } },
      ],
    },
    {
      id: 1000021,
      withAge: 7,
      question: "คุณลืมการบ้านแต่ครูเดินมาตรวจ! จะทำยังไง?",
      choices: [
        { text: "ขอไปเข้าห้องน้ำหนีไปก่อน", resText: "โดนตี 20 ครั้ง", effects: { happiness: -10, health: -5, wealth: 0, iq: 0, lucky: -5 } },
        { text: "หยิบสมุดเพื่อนมาคัดลอกแบบเร็วๆ", resText: "สำเร็จวิชาความเร็ว", effects: { happiness: 5, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },

    // วัย 8 ปี (ชาย)
    {
      id: 1000022,
      withAge: 8,
      question: "เหยียบขี้หมา จะทำยังไง?",
      choices: [
        { text: "ล้างออก", resText: "จนเหมือนเดิม", effects: { happiness: 0, health: 0, wealth: 0, iq: 0, lucky: 0 } },
        { text: "ซื้อคู่ใหม่", resText: "ความรวยเพิ่มขึ้น", effects: { happiness: 5, health: 0, wealth: 10, iq: 0, lucky: 5 } },
      ],
    },
    {
      id: 1000023,
      withAge: 8,
      question: "คุณเห็นเพื่อนร้องไห้เพราะโดนแกล้ง คุณจะทำยังไง?",
      choices: [
        { text: "ปลอบเพื่อน", resText: "เพื่อนรู้สึกดีขึ้น", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
        { text: "เดินหนี", resText: "เพื่อนเสียใจมากขึ้น", effects: { happiness: -10, health: 0, wealth: 0, iq: 0, lucky: -5 } },
      ],
    },
    {
      id: 1000024,
      withAge: 8,
      question: "คุณเห็น ขี้... อยู่ข้างหน้า คุณจะทำอะไรกับมัน?",
      choices: [
        { text: "เหยียบมัน", resText: "ขี้.. กระเด็นเปื้อนเท้าคุณ\nและโดนเพื่อนล้อ", effects: { happiness: -10, health: 0, wealth: 0, iq: 0, lucky: -2 } },
        { text: "หยิบขี้และปาใส่เพื่อน", resText: "คุณถูกเพื่อนโกรธ", effects: { happiness: 10, health: 0, wealth: 0, iq: 2, lucky: -5 } },
      ],
    },

    // วัย 5 ปี (ชาย) - เพิ่มเติม 3 เหตุการณ์
    {
      id: 1000025,
      withAge: 5,
      question: "วันแรกที่โรงเรียนอนุบาล คุณจะทำยังไง?",
      choices: [
        { text: "ร้องไห้และเกาะขาพ่อแม่", resText: "พ่อแม่กังวลและคุณเครียด", effects: { happiness: -10, health: -5, wealth: 0, iq: -5, lucky: -5 } },
        { text: "ยิ้มและทักทายเพื่อนใหม่", resText: "มีเพื่อนเยอะและปรับตัวได้เร็ว", effects: { happiness: 15, health: 5, wealth: 0, iq: 10, lucky: 10 } },
      ],
    },
    {
      id: 1000026,
      withAge: 5,
      question: "คุณพบว่าเพื่อนถูกแกล้ง คุณจะทำยังไง?",
      choices: [
        { text: "เข้าไปช่วยเหลือ", resText: "คุณกลายเป็นที่รักของเพื่อน", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 15 } },
        { text: "ไม่สนใจ เดินผ่านไป", resText: "เพื่อนๆ มองคุณไม่ดี", effects: { happiness: -5, health: 0, wealth: 0, iq: -5, lucky: -10 } },
      ],
    },
    {
      id: 1000027,
      withAge: 5,
      question: "คุณมีการแสดงในงานโรงเรียน แต่ลืมบทของตัวเอง คุณจะทำยังไง?",
      choices: [
        { text: "ร้องไห้บนเวที", resText: "พ่อแม่เสียหน้า", effects: { happiness: -15, health: -5, wealth: 0, iq: -5, lucky: -10 } },
        { text: "ด้นสดและแสดงต่อไป", resText: "ทุกคนประทับใจในความกล้าของคุณ", effects: { happiness: 15, health: 0, wealth: 0, iq: 15, lucky: 10 } },
      ],
    },

    {
      id: 1000028,
      withAge: 6,
      question: "คุณเดินเข้าไปที่ร้านหนังสือ คุณจะหยิบซื้อหนังสือแบบไหน?",
      choices: [
        { text: "หนังสือเรียนวิทยาศาตร์?", resText: "หนังสือเล่มนี้ทำให้คุณฉลาดขึ้น", effects: { happiness: 2, health: -2, wealth: 0, iq: 2, lucky: 0 } },
        { text: "หนังสือโป๊ะ", resText: "คุณรู้สึก ปึ๋งปั๋ง อยากจะได้สาว", effects: { happiness: 5, health: 5, wealth: 0, iq: 0, lucky: 0 } },
      ],
    },

    {
      id: 1000028,
      withAge: 6,
      question: "คุณเดินเข้าไปที่ร้านหนังสือ คุณจะหยิบซื้อหนังสือแบบไหน?",
      choices: [
        { text: "หนังสือเรียนวิทยาศาตร์?", resText: "หนังสือเล่มนี้ทำให้คุณฉลาดขึ้น", effects: { happiness: 2, health: -2, wealth: 0, iq: 2, lucky: 0 } },
        { text: "หนังสือโป๊ะ", resText: "คุณรู้สึก ปึ๋งปั๋ง อยากจะได้สาว", effects: { happiness: 5, health: 5, wealth: 0, iq: 0, lucky: 0 } },
      ],
    },

    {
      id: 1000029,
      withAge: 7,
      question: "ขอกินขนมเพื่อน แต่เขามีชิ้นสุดท้าย!",
      choices: [
        { text: "ตบหน้ามัน", resText: "ได้กินขนมอย่างผู้ชนะ", effects: { happiness: 5, health: 0, wealth: 0, iq: 0, lucky: 0 } },
        { text: 'บอกว่า "ไม่เป็นไรหรอก" แต่ทำหน้าเศร้า', resText: "ได้กินขนมเเละโดนอัดตูด", effects: { happiness: -5, health: -5, wealth: 0, iq: 0, lucky: -2 } },
      ],
    },

    {
      id: 1000030,
      withAge: 7,
      question: "เล่นซ่อนแอบเเล้วแอบกับเพื่อนหลายคนแล้วดันเผลอตด",
      choices: [
        { text: "บอกว่าเพื่อนอีกคนตด", resText: "รอดพ้นจากการโดนล่อ", effects: { happiness: 5, health: 0, wealth: 0, iq: 0, lucky: 0 } },
        { text: "ยอมรับว่าตด", resText: "ถูกล่อตลอดประถม", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -2 } },
      ],
    },
  ],

  female: [

    {
      id: 2000001,
      withAge: 0,
      question: "อสุจิวิ่งเข้าหามดลูกแต่มีคู่แข่งอยู่ข้างๆ หนูจะทำยังไง?",
      choices: [
        { text: "หยุดวิ่ง", resText: "ไม่เกิดการปฏิสนธิ", effects: { happiness: -10, health: -100, wealth: 0, iq: 0, lucky: -5 } },
        { text: "ชนคู่แข่ง", resText: "เริ่มต้นชีวิตใหม่", effects: { happiness: 5, health: 10, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },
    {
      id: 2000002,
      withAge: 0,
      question: "ตอนอยู่ในท้อง จะทำอะไรดี?",
      choices: [
        { text: "นอนขดตัวสบายๆ", resText: "เป็นเด็กกาก", effects: { happiness: 0, health: 5, wealth: 0, iq: 0, lucky: 0 } },
        { text: "ตีลังกาเล่นแก้เบื่อ", resText: "แข็งแรง", effects: { happiness: 5, health: 10, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },

    {
      id: 2000003,
      withAge: 2,
      question: "แอบเล่นโทรศัพท์พ่อ จะทำอะไร?",
      choices: [
        { text: "แอบดูหนังโป๊ะ", resText: "เป็นเด็กบ้ากาม", effects: { happiness: 5, health: -5, wealth: 0, iq: -10, lucky: -5 } },
        { text: "เล่นเกม", resText: "เป็นเด็กติดเกม", effects: { happiness: 10, health: -2, wealth: 0, iq: -5, lucky: 0 } },
      ],
    },
    {
      id: 2000004,
      withAge: 2,
      question: "กางเกงขาดกลางโรงเรียน!",
      choices: [
        { text: "แกล้งทำเป็นว่าไม่มีอะไรเกิดขึ้น", resText: "เพื่อนข้างหลังเห็นแล้วหัวเราะทั้งห้อง", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "เปิดโชว์ไปเลย", resText: "เป็นคนฮอต", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },

    {
      id: 2000005,
      withAge: 3,
      question: "เข้าห้องเรียนสาย แล้วครูกำลังเช็คชื่อ",
      choices: [
        { text: "บอกว่ารถติด", resText: "โดนทำโทษ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "บอกว่าฉันลูกผอ.", resText: "คุณครูให้คะแนนเพิ่ม", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },
    {
      id: 2000006,
      withAge: 3,
      question: "ส่งคลิปโป๊ะลงแชทกลุ่มเพื่อน แต่เผลอส่งเข้ากลุ่มที่มีครูอยู่!",
      choices: [
        { text: "รีบลบข้อความทันที", resText: "โดนเรียกผู้ปกครอง", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "อยากดูมากกว่านี้จ่ายตังมา", resText: "รวย", effects: { happiness: 10, health: 0, wealth: 5, iq: 0, lucky: 5 } },
      ],
    },


    {
      id: 2000007,
      withAge: 4,
      question: "เผลอไลค์รูปเก่าของคนที่แอบชอบ!",
      choices: [
        { text: "รีบ Unlike แล้วภาวนาให้เขาไม่เห็น", resText: "อดเย็ด", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
        { text: "แกล้งคอมเมนต์ว่า 'อุ๊ย! เจอรูปนี้โดยบังเอิญเลยกดไลค์ 😆'", resText: "เย็ด", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      ],
    },
    {
      id: 2000008,
      withAge: 4,
      question: "เพื่อนชวนตั้งวงพนันในโรงเรียน",
      choices: [
        { text: "จัด", resText: "รวย", effects: { happiness: 5, health: 0, wealth: 10, iq: -5, lucky: 5 } },
        { text: "ขอเป็นคนเล่นดีกว่า", resText: "จน", effects: { happiness: 0, health: 0, wealth: -5, iq: 0, lucky: -5 } },
      ],
    },

    {
      id: 2000009,
      withAge: 15,
      question: "เลิกกับแฟน จะทำยังไง",
      choices: [
        { text: "กินเหล้า", resText: "เป็นตับแข็ง", effects: { happiness: -10, health: -10, wealth: -5, iq: -5, lucky: -5 } },
        { text: "นัดหาสาวใหม่", resText: "ชีวิตแฮปปี้", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      ],
    },
    {
      id: 2000010,
      withAge: 25,
      question: "เงินเดือนหมดก่อนสิ้นเดือน",
      choices: [
        { text: "กู้", resText: "เป็นหนี้โดนประจาน", effects: { happiness: -5, health: 0, wealth: -10, iq: 0, lucky: -5 } },
        { text: "ขโมย", resText: "ติดคุกแป๊บๆ", effects: { happiness: -10, health: -5, wealth: 5, iq: -5, lucky: -10 } },
      ],
    },


  {
    id: 2000011,
    withAge: 1,
    question: "หนูจะทำอะไรเมื่อเห็นเพื่อนล้ม?",
    choices: [
      { text: "ช่วยเพื่อนลุกขึ้น", resText: "เพื่อนรู้สึกดีและขอบคุณ", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      { text: "วิ่งไปเรียกครู", resText: "ครูชมว่าหนูเป็นเด็กดี", effects: { happiness: 5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },
  {
    id: 2000012,
    withAge: 1,
    question: "หนูจะทำอะไรเมื่อแมวกินขนมของหนู?",
    choices: [
      { text: "ร้องไห้แล้วบอกแม่", resText: "แม่หัวเราะแล้วซื้อขนมใหม่ให้", effects: { happiness: 5, health: 0, wealth: 0, iq: 0, lucky: 0 } },
      { text: "แกล้งทำเป็นดุแมว", resText: "แมวตกใจแล้ววิ่งหนี", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
    ],
  },
  {
    id: 2000013,
    withAge: 1,
    question: "หนูจะทำอะไรเมื่อเพื่อนแกล้งเอาของเล่นไป?",
    choices: [
      { text: "ร้องไห้แล้วไม่เล่นกับใคร", resText: "รู้สึกเหงาและเสียใจ", effects: { happiness: -10, health: -5, wealth: 0, iq: 0, lucky: -5 } },
      { text: "แกล้งตอบโต้กลับ", resText: "โดนครูดุและเพื่อนไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: -5, lucky: -10 } },
    ],
  },

  {
    id: 2000014,
    withAge: 2,
    question: "หนูจะทำอะไรเมื่อได้เป็นหัวหน้าห้อง?",
    choices: [
      { text: "ตั้งใจทำงานให้ดี", resText: "เพื่อนและครูชื่นชม", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
      { text: "ใช้สิทธิ์แกล้งเพื่อน", resText: "เพื่อนไม่ชอบและโดนครูดุ", effects: { happiness: -5, health: 0, wealth: 0, iq: -5, lucky: -5 } },
    ],
  },
  {
    id: 2000015,
    withAge: 2,
    question: "หนูจะทำอะไรเมื่อเพื่อนชวนแข่งกินขนม?",
    choices: [
      { text: "กินให้เร็วที่สุด", resText: "ท้องอืดแต่ชนะ", effects: { happiness: 5, health: -5, wealth: 0, iq: 0, lucky: 0 } },
      { text: "กินช้าๆ แต่เพลิน", resText: "เพื่อนรอไม่ไหวแล้วหนูชนะ", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
    ],
  },
  {
    id: 2000016,
    withAge: 7,
    question: "หนูจะทำอะไรเมื่อลืมทำการบ้าน?",
    choices: [
      { text: "บอกครูว่าหนูไม่สบาย", resText: "ครูให้ส่งวันหลังแต่ไม่เชื่อ", effects: { happiness: -5, health: 0, wealth: 0, iq: -5, lucky: -5 } },
      { text: "รีบทำในห้องเรียน", resText: "ทำไม่ทันและโดนทำโทษ", effects: { happiness: -10, health: 0, wealth: 0, iq: -10, lucky: -10 } },
    ],
  },


  {
    id: 2000017,
    withAge: 3,
    question: "หนูจะทำอะไรเมื่อได้คะแนนสอบดี?",
    choices: [
      { text: "บอกพ่อแม่ทันที", resText: "ได้รางวัลและคำชม", effects: { happiness: 10, health: 0, wealth: 5, iq: 5, lucky: 5 } },
      { text: "เก็บไว้เป็นความลับ", resText: "รู้สึกดีแต่ไม่มีใครรู้", effects: { happiness: 5, health: 0, wealth: 0, iq: 0, lucky: 0 } },
    ],
  },
  {
    id: 2000018,
    withAge: 3,
    question: "หนูจะทำอะไรเมื่อเพื่อนชวนแกล้งครู?",
    choices: [
      { text: "ร่วมแกล้งด้วย", resText: "โดนครูดุแต่เพื่อนชม", effects: { happiness: 5, health: 0, wealth: 0, iq: -5, lucky: -5 } },
      { text: "บอกครูล่วงหน้า", resText: "ครูชมแต่เพื่อนไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },
  {
    id: 2000019,
    withAge: 3,
    question: "หนูจะทำอะไรเมื่อโดนเพื่อนแย่งของเล่น?",
    choices: [
      { text: "ร้องไห้แล้วบอกครู", resText: "ครูช่วยแต่เพื่อนไม่ชอบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
      { text: "แย่งคืนมาเลย", resText: "ของเล่นพังและโดนทำโทษ", effects: { happiness: -10, health: 0, wealth: -5, iq: -5, lucky: -10 } },
    ],
  },

  {
    id: 2000020,
    withAge: 4,
    question: "หนูจะทำอะไรเมื่อได้งานแรก?",
    choices: [
      { text: "ตั้งใจทำงานให้ดี", resText: "ได้เงินเดือนเพิ่ม", effects: { happiness: 10, health: 0, wealth: 10, iq: 5, lucky: 5 } },
      { text: "ทำงานแบบขอไปที", resText: "โดนตำหนิและเสี่ยงถูกไล่ออก", effects: { happiness: -5, health: 0, wealth: -5, iq: -5, lucky: -5 } },
    ],
  },
  {
    id: 2000021,
    withAge: 4,
    question: "หนูจะทำอะไรเมื่อเพื่อนชวนเที่ยวกลางสัปดาห์?",
    choices: [
      { text: "ไปเที่ยวเลย", resText: "สนุกแต่ทำงานไม่ทัน", effects: { happiness: 5, health: 0, wealth: -5, iq: -5, lucky: 0 } },
      { text: "ปฏิเสธและทำงานต่อ", resText: "งานเสร็จแต่รู้สึกเหงา", effects: { happiness: -5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },
  {
    id: 2000022,
    withAge: 4,
    question: "หนูจะทำอะไรเมื่อโดนเพื่อนร่วมงานแย่งเครดิต?",
    choices: [
      { text: "ยอมรับและไม่พูดอะไร", resText: "รู้สึกแย่และเสียโอกาส", effects: { happiness: -10, health: -5, wealth: 0, iq: 0, lucky: -10 } },
      { text: "แจ้งหัวหน้าและยืนหยัด", resText: "ได้เครดิตคืนแต่ความสัมพันธ์แย่ลง", effects: { happiness: 5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },


  {
    id: 2000023,
    withAge: 17,
    question: "หนูจะทำอะไรเมื่อเลิกกับแฟน?",
    choices: [
      { text: "กินเหล้า", resText: "เป็นตับแข็ง", effects: { happiness: -10, health: -10, wealth: -5, iq: -5, lucky: -5 } },
      { text: "นัดหาสาวใหม่", resText: "ชีวิตแฮปปี้", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
    ],
  },
  {
    id: 2000024,
    withAge: 17,
    question: "หนูจะทำอะไรเมื่อเงินเดือนหมดก่อนสิ้นเดือน?",
    choices: [
      { text: "กู้", resText: "เป็นหนี้โดนประจาน", effects: { happiness: -5, health: 0, wealth: -10, iq: 0, lucky: -5 } },
      { text: "ขโมย", resText: "ติดคุกแป๊บๆ", effects: { happiness: -10, health: -5, wealth: 5, iq: -5, lucky: -10 } },
    ],
  },
  {
    id: 2000025,
    withAge: 18,
    question: "หนูจะทำอะไรเมื่อเจอแฟนเก่าในงานเลี้ยง?",
    choices: [
      { text: "ทำเป็นไม่รู้จัก", resText: "รู้สึกอึดอัดแต่ปลอดภัย", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: 0 } },
      { text: "เข้าไปทักทาย", resText: "คุยกันแล้วรู้สึกดี", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
    ],
  },

  {
    id: 2000026,
    withAge: 6,
    question: "หนูจะทำอะไรเมื่อเพื่อนล้อว่าหนูขี้ไม่ลาด?",
    choices: [
      { text: "ร้องไห้แล้วบอกครู", resText: "ครูช่วยแต่เพื่อนล้อมากขึ้น", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
      { text: "หัวเราะแล้วล้อกลับ", resText: "เพื่อนหยุดล้อและสนุกด้วย", effects: { happiness: 10, health: 0, wealth: 0, iq: 5, lucky: 5 } },
    ],
  },
  {
    id: 2000027,
    withAge: 6,
    question: "หนูจะทำอะไรเมื่อแม่บอกให้อาบน้ำ?",
    choices: [
      { text: "รีบไปอาบน้ำทันที", resText: "แม่ชมและรู้สึกสดชื่น", effects: { happiness: 5, health: 5, wealth: 0, iq: 0, lucky: 0 } },
      { text: "ขอเล่นเกมก่อน", resText: "แม่ดุและรู้สึกเหนื่อย", effects: { happiness: -5, health: -5, wealth: 0, iq: 0, lucky: -5 } },
    ],
  },
  {
    id: 2000028,
    withAge: 7,
    question: "หนูจะทำอะไรเมื่อเพื่อนชวนแอบไปเล่นนอกโรงเรียน?",
    choices: [
      { text: "ไปเล่นด้วย", resText: "สนุกแต่โดนครูจับได้", effects: { happiness: 5, health: 0, wealth: 0, iq: -5, lucky: -5 } },
      { text: "ปฏิเสธและบอกครู", resText: "ปลอดภัยแต่เพื่อนไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },
  {
    id: 2000029,
    withAge: 7,
    question: "หนูจะทำอะไรเมื่อเห็นเพื่อนลืมดินสอ?",
    choices: [
      { text: "ยืมดินสอให้เพื่อน", resText: "เพื่อนขอบคุณและรู้สึกดี", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      { text: "ไม่สนใจ", resText: "เพื่อนไม่พอใจและไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
    ],
  },
  {
    id: 2000030,
    withAge: 8,
    question: "หนูจะทำอะไรเมื่อเพื่อนชวนแอบกินขนมในห้องเรียน?",
    choices: [
      { text: "กินด้วย", resText: "อร่อยแต่โดนครูจับได้", effects: { happiness: 5, health: -5, wealth: 0, iq: -5, lucky: -5 } },
      { text: "ปฏิเสธและบอกครู", resText: "ปลอดภัยแต่เพื่อนไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },
  {
    id: 2000031,
    withAge: 8,
    question: "หนูจะทำอะไรเมื่อเห็นเพื่อนร้องไห้?",
    choices: [
      { text: "เข้าไปปลอบ", resText: "เพื่อนรู้สึกดีขึ้นและขอบคุณ", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      { text: "ไม่สนใจ", resText: "เพื่อนรู้สึกแย่และไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
    ],
  },
  {
    id: 2000032,
    withAge: 9,
    question: "หนูจะทำอะไรเมื่อเพื่อนชวนแอบดูการ์ตูนตอนดึก?",
    choices: [
      { text: "ดูด้วย", resText: "สนุกแต่ตื่นสายและโดนดุ", effects: { happiness: 5, health: -5, wealth: 0, iq: -5, lucky: -5 } },
      { text: "ปฏิเสธและนอน", resText: "ตื่นเช้าและรู้สึกสดชื่น", effects: { happiness: 0, health: 5, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },
  {
    id: 2000033,
    withAge: 9,
    question: "หนูจะทำอะไรเมื่อเพื่อนลืมการบ้าน?",
    choices: [
      { text: "ให้เพื่อนลอก", resText: "เพื่อนขอบคุณแต่ครูจับได้", effects: { happiness: 5, health: 0, wealth: 0, iq: -5, lucky: -5 } },
      { text: "บอกให้เพื่อนทำเอง", resText: "เพื่อนไม่พอใจแต่ปลอดภัย", effects: { happiness: -5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },
  {
    id: 2000034,
    withAge: 10,
    question: "หนูจะทำอะไรเมื่อเพื่อนชวนแอบไปเที่ยวโดยไม่บอกพ่อแม่?",
    choices: [
      { text: "ไปเที่ยวด้วย", resText: "สนุกแต่โดนดุและทำโทษ", effects: { happiness: 5, health: 0, wealth: 0, iq: -5, lucky: -5 } },
      { text: "ปฏิเสธและบอกพ่อแม่", resText: "ปลอดภัยแต่เพื่อนไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
    ],
  },
  {
    id: 2000035,
    withAge: 10,
    question: "หนูจะทำอะไรเมื่อเห็นเพื่อนโดนแกล้ง?",
    choices: [
      { text: "เข้าไปช่วย", resText: "เพื่อนขอบคุณและรู้สึกดี", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      { text: "ไม่สนใจ", resText: "เพื่อนรู้สึกแย่และไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
    ],
  },

  {
    id: 2000036,
    withAge: 5,
    question: "หนูจะทำอะไรเมื่อเพื่อนบอกว่าหนูเป็นเจ้าหญิง?",
    choices: [
      { text: "เชื่อและแต่งตัวเป็นเจ้าหญิง", resText: "เพื่อนหัวเราะและสนุกด้วย", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      { text: "ไม่เชื่อและบอกว่าเพื่อนโกหก", resText: "เพื่อนไม่พอใจและไม่เล่นด้วย", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
    ],
  },
  {
    id: 2000037,
    withAge: 5,
    question: "หนูจะทำอะไรเมื่อเพื่อนชวนเล่นซ่อนหาแต่หนูไม่อยากเล่น?",
    choices: [
      { text: "บอกว่าไม่เล่นและไปเล่นคนเดียว", resText: "รู้สึกเหงาแต่ปลอดภัย", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: 0 } },
      { text: "เล่นด้วยแม้ไม่อยากเล่น", resText: "สนุกแต่เหนื่อยและง่วงนอน", effects: { happiness: 5, health: -5, wealth: 0, iq: 0, lucky: 0 } },
    ],
  },
  {
    id: 2000038,
    withAge: 5,
    question: "หนูจะทำอะไรเมื่อเพื่อนบอกว่าหนูเป็นแมว?",
    choices: [
      { text: "เหมียวๆ แล้วเดินสี่ขา", resText: "เพื่อนหัวเราะและสนุกสนาน", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      { text: "ไม่เล่นและบอกว่าเพื่อนแปลก", resText: "เพื่อนไม่พอใจและไม่เล่นด้วย", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
    ],
  },
  {
    id: 2000039,
    withAge: 5,
    question: "หนูจะทำอะไรเมื่อแม่บอกให้เก็บของเล่น?",
    choices: [
      { text: "รีบเก็บของเล่นทันที", resText: "แม่ชมและได้กินขนม", effects: { happiness: 5, health: 0, wealth: 0, iq: 5, lucky: 0 } },
      { text: "ขอเล่นต่ออีกหน่อย", resText: "แม่ดุและไม่ได้กินขนม", effects: { happiness: -5, health: 0, wealth: 0, iq: -5, lucky: -5 } },
    ],
  },
  {
    id: 2000040,
    withAge: 5,
    question: "หนูจะทำอะไรเมื่อเห็นเพื่อนร้องไห้เพราะล้ม?",
    choices: [
      { text: "เข้าไปปลอบและช่วยลุกขึ้น", resText: "เพื่อนขอบคุณและรู้สึกดี", effects: { happiness: 10, health: 0, wealth: 0, iq: 0, lucky: 5 } },
      { text: "ไม่สนใจและเดินไปเล่นต่อ", resText: "เพื่อนไม่พอใจและไม่คบ", effects: { happiness: -5, health: 0, wealth: 0, iq: 0, lucky: -5 } },
    ],
  },


  ],
};

export default events;