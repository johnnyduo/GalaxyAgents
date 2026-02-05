import { FraudScenario } from '../types';

export const callCenterScenario: FraudScenario = {
  id: 'call-center-001',
  titleTh: 'แก๊งคอลเซ็นเตอร์',
  titleEn: 'Call Center Gang',
  category: 'call_center',
  difficulty: 'beginner',
  estimatedDuration: 120,
  description: {
    th: 'มิจฉาชีพแอบอ้างเป็นตำรวจ โทรมาข่มขู่ว่าบัญชีถูกใช้ฟอกเงิน สั่งให้โอนเงินไป "บัญชีปลอดภัย"',
    en: 'Scammers impersonate police officers, claim your account is linked to money laundering, and pressure you to transfer money to a "safe account"',
  },
  involvedAgents: ['a0', 'a1', 'a3', 'a2'],
  evilAgents: ['a0', 'a1'],
  victimSetup: {
    defaultName: 'คุณสมชาย',
    defaultMoney: 500000,
    scenarioContext: {
      th: 'วันธรรมดา คุณกำลังทำงานอยู่ที่บ้าน โทรศัพท์ดังขึ้น...',
      en: 'An ordinary weekday. You are working from home when your phone rings...',
    },
  },
  steps: [
    // === ACT 1: THE SETUP ===
    {
      id: 'cc-01',
      order: 1,
      type: 'action',
      agentId: 'a0',
      alignment: 'good',
      content: {
        th: '📞 โทรศัพท์ดัง... หมายเลขที่โทรมา: 02-142-XXXX (กรุงเทพฯ)',
        en: '📞 Phone rings... Caller ID: 02-142-XXXX (Bangkok)',
      },
      duration: 3000,
    },
    {
      id: 'cc-02',
      order: 2,
      type: 'transformation',
      agentId: 'a0',
      alignment: 'transitioning',
      content: {
        th: '⚠️ ลุงสิงห์ กำลังแปลงร่างเป็น "พ.ต.อ.สมชาย"...',
        en: '⚠️ Big Boss is transforming into "Officer Somchai"...',
      },
      duration: 3000,
    },
    {
      id: 'cc-03',
      order: 3,
      type: 'dialogue',
      agentId: 'a0',
      alignment: 'evil',
      content: {
        th: 'สวัสดีครับ ผม พ.ต.อ.สมชาย จากกองบังคับการปราบปรามอาชญากรรมทางเทคโนโลยี มีเรื่องด่วนที่ต้องแจ้งให้ทราบ',
        en: 'Hello, I am Police Colonel Somchai from the Technology Crime Suppression Division. I have an urgent matter to inform you about.',
      },
      duration: 5000,
    },
    {
      id: 'cc-04',
      order: 4,
      type: 'dialogue',
      agentId: 'a0',
      alignment: 'evil',
      content: {
        th: 'บัญชีธนาคารของคุณถูกใช้ในขบวนการฟอกเงินข้ามชาติ! มีเงินหมุนเวียนกว่า 50 ล้านบาท ถ้าไม่ให้ความร่วมมือ จะออกหมายจับภายใน 24 ชั่วโมง!',
        en: 'Your bank account has been used in an international money laundering ring! Over 50 million baht has circulated through it. If you do not cooperate, an arrest warrant will be issued within 24 hours!',
      },
      duration: 7000,
    },

    // === ACT 2: THE ACCOMPLICE ===
    {
      id: 'cc-05',
      order: 5,
      type: 'transformation',
      agentId: 'a1',
      alignment: 'transitioning',
      content: {
        th: '⚠️ พี่เหยี่ยว กำลังแปลงร่างเป็น "จนท.สมศรี"...',
        en: '⚠️ Hawk Eye is transforming into "Bank Officer"...',
      },
      duration: 2500,
    },
    {
      id: 'cc-06',
      order: 6,
      type: 'dialogue',
      agentId: 'a1',
      alignment: 'evil',
      content: {
        th: 'สวัสดีค่ะ ดิฉันเป็นเจ้าหน้าที่จากธนาคาร ขอยืนยันว่าบัญชีของท่านถูกอายัดชั่วคราว ตามคำสั่งของตำรวจจริงค่ะ',
        en: 'Hello, I am a bank officer. I confirm that your account has been temporarily frozen per police orders.',
      },
      duration: 5000,
      edgeAnimation: { source: 'a1', target: 'a0', style: 'data_flow' },
    },
    {
      id: 'cc-07',
      order: 7,
      type: 'dialogue',
      agentId: 'a1',
      alignment: 'evil',
      content: {
        th: 'เพื่อพิสูจน์ความบริสุทธิ์ ต้องโอนเงินทั้งหมดไป "บัญชีพิสูจน์ตัวตน" ของ ปปง. ชั่วคราวค่ะ',
        en: 'To prove your innocence, you must transfer all funds to a temporary "identity verification account" from the Anti-Money Laundering Office.',
      },
      duration: 6000,
    },

    // === ACT 3: THE MONEY FLOW ===
    {
      id: 'cc-08',
      order: 8,
      type: 'money_flow',
      agentId: 'a0',
      alignment: 'evil',
      content: {
        th: '💸 เหยื่อถูกกดดันจนโอนเงิน ฿200,000 ไปบัญชีมิจฉาชีพ...',
        en: '💸 Victim is pressured into transferring 200,000 to scammer account...',
      },
      duration: 4000,
      moneyChange: -200000,
      edgeAnimation: { source: 'a3', target: 'a0', style: 'money_flow' },
    },

    // === ACT 4: THE WARNING (ป้าฮูก stays good) ===
    {
      id: 'cc-09',
      order: 9,
      type: 'dialogue',
      agentId: 'a2',
      alignment: 'good',
      content: {
        th: '🚨 ระวัง! รูปแบบนี้ตรงกับเคสโกง #1847 ที่พบในกรุงเทพ! ตำรวจจริงไม่เคยโทรมาขอโอนเงิน!',
        en: '🚨 Warning! This pattern matches fraud case #1847 from Bangkok! Real police NEVER call asking you to transfer money!',
      },
      duration: 5000,
    },

    // === ACT 5: MORE PRESSURE & SECOND DRAIN ===
    {
      id: 'cc-10',
      order: 10,
      type: 'dialogue',
      agentId: 'a0',
      alignment: 'evil',
      content: {
        th: 'อย่าเชื่อใครทั้งนั้น! ห้ามบอกใคร! ถ้าบอก ถือว่าขัดขวางการทำงานของเจ้าหน้าที่ โทษจำคุก 5 ปี! โอนส่วนที่เหลือมาด้วย!',
        en: 'Do not trust anyone! Do not tell anyone! If you do, it is obstruction of justice - 5 years in prison! Transfer the rest now!',
      },
      duration: 6000,
    },
    {
      id: 'cc-11',
      order: 11,
      type: 'money_flow',
      agentId: 'a0',
      alignment: 'evil',
      content: {
        th: '💸 เหยื่อถูกข่มขู่จนโอนเงินอีก ฿300,000...',
        en: '💸 Victim is intimidated into transferring another 300,000...',
      },
      duration: 4000,
      moneyChange: -300000,
      edgeAnimation: { source: 'a3', target: 'a0', style: 'money_flow' },
    },

    // === ACT 6: THE REVEAL ===
    {
      id: 'cc-12',
      order: 12,
      type: 'reveal',
      agentId: 'a2',
      alignment: 'good',
      content: {
        th: '🔍 เปิดโปง! ทั้งหมดนี้คือกลโกง "แก๊งคอลเซ็นเตอร์"! ไม่มีคดีจริง ไม่มีหมายจับ ไม่มีบัญชีปลอดภัย!',
        en: '🔍 REVEALED! This was all a "Call Center Gang" scam! There was no real case, no arrest warrant, no safe account!',
      },
      duration: 5000,
    },

    // === ACT 7: EDUCATION ===
    {
      id: 'cc-13',
      order: 13,
      type: 'education',
      agentId: 'a2',
      alignment: 'good',
      content: {
        th: '📚 สิ่งที่ควรรู้: ตำรวจจริงไม่เคยโทรมาสั่งให้โอนเงิน ไม่เคยขอ OTP ไม่เคยข่มขู่ทางโทรศัพท์ ถ้าสงสัย ให้วางสาย แล้วโทร 1599 (ศูนย์ปราบไซเบอร์)',
        en: '📚 What you should know: Real police NEVER call to order money transfers, NEVER ask for OTP, NEVER threaten over the phone. If suspicious, hang up and call 1599 (Cyber Crime hotline)',
      },
      duration: 8000,
      mediaHint: 'Illustration of a Thai person confidently hanging up a scam phone call, with a police badge showing "FAKE" stamp, and the number 1599 prominently displayed. Anti-scam educational style.',
    },
    {
      id: 'cc-14',
      order: 14,
      type: 'education',
      agentId: 'a3',
      alignment: 'good',
      content: {
        th: '🛡️ วิธีป้องกัน: 1) วางสาย ไม่ต้องกลัว 2) โทร 1599 ตรวจสอบ 3) อย่าโอนเงินให้ใครที่โทรมาเอง 4) บอกคนใกล้ชิดทันที',
        en: '🛡️ How to protect yourself: 1) Hang up, do not be afraid 2) Call 1599 to verify 3) Never transfer money to anyone who calls you 4) Tell family immediately',
      },
      duration: 8000,
    },
  ],
  moneyLost: 500000,
  educationalPoints: [
    {
      th: 'ตำรวจจริงไม่เคยโทรมาขอให้โอนเงิน',
      en: 'Real police never call and ask you to transfer money',
    },
    {
      th: 'ไม่มี "บัญชีปลอดภัย" ของ ปปง. - ทั้งหมดเป็นบัญชีมิจฉาชีพ',
      en: 'There is no "safe account" from AMLO - it is all a scammer account',
    },
    {
      th: 'ห้ามแจ้ง OTP หรือรหัสใดๆ ทางโทรศัพท์',
      en: 'Never share OTP or any codes over the phone',
    },
    {
      th: 'ถ้าสงสัย วางสาย แล้วโทร 1599',
      en: 'If suspicious, hang up and call 1599',
    },
    {
      th: 'มิจฉาชีพมักห้ามเหยื่อบอกใคร - นี่คือสัญญาณอันตราย!',
      en: 'Scammers often forbid victims from telling anyone - this is a red flag!',
    },
  ],
  realWorldCases: [
    'คุณยายสมุทรปราการ เสียเงิน 2 ล้านบาท (2024)',
    'ครูเชียงใหม่ ถูกหลอก 800,000 บาท (2023)',
    'นักธุรกิจกรุงเทพ โอนไป 5 ล้านบาท ก่อนรู้ตัว (2024)',
  ],
};
