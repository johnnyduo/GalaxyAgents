import { FraudScenario } from '../types';

export const qrScamScenario: FraudScenario = {
  id: 'qr-scam-001',
  titleTh: 'QR Code ปลอม',
  titleEn: 'QR Code Scam',
  category: 'qr_scam',
  difficulty: 'beginner',
  estimatedDuration: 80,
  description: {
    th: 'มิจฉาชีพวาง QR Code ปลอมทับ QR จริงตามร้านอาหาร/ป้ายจ่ายเงิน เงินเข้าบัญชีมิจฉาชีพแทนร้านค้า',
    en: 'Scammers place fake QR codes over real ones at restaurants/payment points. Money goes to scammer accounts instead of merchants.',
  },
  involvedAgents: ['a5', 'a2', 'a1', 'a3'],
  evilAgents: ['a5'],
  victimSetup: {
    defaultName: 'คุณวรรณา',
    defaultMoney: 30000,
    scenarioContext: {
      th: 'กินข้าวเสร็จ จะจ่ายเงินค่าอาหาร ฿850 ผ่าน QR Code ที่วางอยู่บนโต๊ะ...',
      en: 'After finishing your meal, you scan the QR code on the table to pay ฿850...',
    },
  },
  steps: [
    {
      id: 'qr-01',
      order: 1,
      type: 'action',
      agentId: 'a5',
      alignment: 'good',
      content: {
        th: '🍜 กินอาหารเสร็จ บิลมา ฿850 มี QR Code วางอยู่บนโต๊ะ สแกนจ่ายได้เลย',
        en: '🍜 Meal finished. Bill: ฿850. QR code on the table for easy payment.',
      },
      duration: 3000,
    },
    {
      id: 'qr-02',
      order: 2,
      type: 'transformation',
      agentId: 'a5',
      alignment: 'transitioning',
      content: {
        th: '⚠️ Money Guard กำลังแปลงร่างเป็น "คุณสมคิด — คนวาง QR ปลอม"...',
        en: '⚠️ Money Guard is transforming into the fake QR code planter...',
      },
      duration: 2500,
    },
    {
      id: 'qr-03',
      order: 3,
      type: 'action',
      agentId: 'a5',
      alignment: 'evil',
      content: {
        th: '📷 QR Code บนโต๊ะ ถูกแปะทับด้วย QR ปลอม! ชื่อบัญชีปลายทางเป็น "ร้าน XXX" (แต่จริงๆ เป็นบัญชีมิจฉาชีพ)',
        en: '📷 The QR on the table was overlaid with a fake one! Recipient name shows "Restaurant XXX" (but it\'s actually a scammer account)',
      },
      duration: 4000,
    },
    {
      id: 'qr-04',
      order: 4,
      type: 'money_flow',
      agentId: 'a5',
      alignment: 'evil',
      content: {
        th: '💸 สแกน QR → โอน ฿850 → เงินเข้าบัญชีมิจฉาชีพ ไม่ใช่ร้านอาหาร!',
        en: '💸 Scan QR → Transfer ฿850 → Money goes to scammer, not the restaurant!',
      },
      duration: 3500,
      moneyChange: -850,
    },
    {
      id: 'qr-05',
      order: 5,
      type: 'dialogue',
      agentId: 'a5',
      alignment: 'evil',
      content: {
        th: '(มิจฉาชีพเก็บเงินจากเหยื่อหลายสิบรายต่อวัน ร้านละ 500-2,000 บาท โดยวาง QR ปลอมตามร้านอาหาร ตลาดนัด จุดจอดรถ)',
        en: '(Scammer collects from dozens of victims daily, 500-2,000 per transaction, placing fake QR at restaurants, markets, parking lots)',
      },
      duration: 4000,
    },
    {
      id: 'qr-06',
      order: 6,
      type: 'action',
      agentId: 'a5',
      alignment: 'evil',
      content: {
        th: '⚠️ ร้านอาหารบอกว่า "ยังไม่ได้รับเงินนะคะ!" ต้องจ่ายใหม่อีกรอบ!',
        en: '⚠️ Restaurant says "We haven\'t received payment!" You have to pay again!',
      },
      duration: 3000,
    },
    {
      id: 'qr-07',
      order: 7,
      type: 'money_flow',
      agentId: 'a5',
      alignment: 'evil',
      content: {
        th: '💸 จ่ายร้านอีกรอบ ฿850 (ครั้งนี้ QR จริง) → สูญเสียเงินซ้ำซ้อน!',
        en: '💸 Pay restaurant again ฿850 (real QR this time) → Double payment!',
      },
      duration: 3000,
      moneyChange: -850,
    },
    {
      id: 'qr-08',
      order: 8,
      type: 'dialogue',
      agentId: 'a2',
      alignment: 'good',
      content: {
        th: '🚨 QR Code ปลอมระบาดหนัก! มิจฉาชีพแปะ QR ทับตามร้านค้า ตลาด จุดจอดรถ ทั่วกรุงเทพฯ!',
        en: '🚨 Fake QR codes are spreading! Scammers overlay them at shops, markets, and parking lots across Bangkok!',
      },
      duration: 4000,
    },
    {
      id: 'qr-09',
      order: 9,
      type: 'reveal',
      agentId: 'a2',
      alignment: 'good',
      content: {
        th: '🔍 เปิดโปง! QR Code บนโต๊ะเป็นสติกเกอร์ปลอมแปะทับ! ดูด้วยตาเปล่าแทบแยกไม่ออก ต้องสังเกตชื่อบัญชีปลายทางก่อนกดยืนยัน!',
        en: '🔍 REVEALED! The QR was a fake sticker overlaid on the real one! Nearly impossible to tell visually. Must check recipient name before confirming!',
      },
      duration: 5000,
    },
    {
      id: 'qr-10',
      order: 10,
      type: 'education',
      agentId: 'a2',
      alignment: 'good',
      content: {
        th: '📚 วิธีป้องกัน: 1) เช็คชื่อบัญชีปลายทางก่อนกดยืนยันเสมอ 2) QR ที่ "แปะทับ" มักมีขอบสติกเกอร์ 3) ถามร้านค้าว่าชื่อบัญชีตรงไหม 4) ใช้ QR จากแอปร้านค้าแทน',
        en: '📚 Prevention: 1) Always check recipient name before confirming 2) Fake QR stickers have visible edges 3) Ask merchant to verify account name 4) Use merchant\'s app QR instead',
      },
      duration: 7000,
    },
    {
      id: 'qr-11',
      order: 11,
      type: 'education',
      agentId: 'a1',
      alignment: 'good',
      content: {
        th: '🛡️ สำหรับร้านค้า: 1) ตรวจ QR Code ทุกวัน 2) ใช้ QR แบบ dynamic (เปลี่ยนทุกครั้ง) 3) วาง QR ในที่ปลอดภัย 4) แจ้งลูกค้าให้เช็คชื่อบัญชี',
        en: '🛡️ For merchants: 1) Check QR codes daily 2) Use dynamic QR (changes each time) 3) Place QR in secure location 4) Tell customers to verify account name',
      },
      duration: 7000,
    },
  ],
  moneyLost: 1700,
  educationalPoints: [
    {
      th: 'เช็คชื่อบัญชีปลายทางก่อนกดยืนยันการโอนเสมอ',
      en: 'Always verify the recipient account name before confirming transfer',
    },
    {
      th: 'QR ปลอมมักเป็นสติกเกอร์แปะทับ สังเกตขอบสติกเกอร์',
      en: 'Fake QR is usually a sticker overlay. Look for sticker edges.',
    },
    {
      th: 'ถ้าร้านค้าบอกว่ายังไม่ได้รับเงิน แสดงว่า QR อาจปลอม',
      en: 'If merchant says payment not received, the QR may be fake',
    },
    {
      th: 'ร้านค้าควรใช้ QR แบบ dynamic และตรวจสอบทุกวัน',
      en: 'Merchants should use dynamic QR and check daily',
    },
  ],
  realWorldCases: [
    'ร้านอาหารย่านสีลม ถูกแปะ QR ปลอม เสียหาย 30,000 บาท ใน 1 สัปดาห์ (2024)',
    'ตลาดนัดจตุจักร พบ QR ปลอมกว่า 20 จุด ในวันเดียว (2023)',
    'จุดจอดรถห้างสรรพสินค้า QR จ่ายค่าจอดปลอม เหยื่อ 200+ ราย (2024)',
  ],
};
