/**
 * ==========================================
 * GALAXY AGENTS - PITCH SCRIPT (THAI)
 * ==========================================
 *
 * Google Apps Script สร้าง Pitch Script 5 นาที
 * สำหรับการนำเสนอต่อนักลงทุน
 *
 * วิธีใช้:
 * 1. ไป script.google.com
 * 2. สร้าง project ใหม่
 * 3. วางโค้ดนี้ทั้งหมด
 * 4. รัน createPitchScriptThai()
 * 5. ตรวจสอบใน Google Drive
 */

function createPitchScriptThai() {
  const doc = DocumentApp.create('Galaxy Agents - Pitch Script 5 นาที (ภาษาไทย)');
  const body = doc.getBody();

  // Clear default content
  body.clear();

  // ============================================
  // HEADER
  // ============================================

  const header = body.appendParagraph('GALAXY AGENTS');
  header.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  header.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  header.editAsText().setBold(true).setForegroundColor('#43FF4D');

  const subtitle = body.appendParagraph('Pitch Script 5 นาที | กุมภาพันธ์ 2569');
  subtitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  subtitle.editAsText().setFontSize(12).setForegroundColor('#6B7280');

  body.appendParagraph(''); // Spacer

  // ============================================
  // SECTION 1: HOOK (30 วินาที)
  // ============================================

  addSection(body, '1. HOOK - เปิดเรื่อง (30 วินาที)', '#FF4444');

  addSpeakerNote(body, 'เริ่มด้วยตัวเลขที่น่าตกใจ + เล่าเรื่องสั้น');

  addScript(body,
    'สวัสดีครับ ผมชื่อ [ชื่อ] จาก Galaxy Agents\n\n' +
    'ถามว่า ปีที่แล้ว คนไทยเสียเงินจากมิจฉาชีพไปเท่าไหร่?\n\n' +
    '💰 115.3 พันล้านบาท\n\n' +
    'มากกว่างบประมาณ 3 โรงพยาบาลรามาธิบดีรวมกัน\n\n' +
    'และที่แย่กว่านั้น... 72% ของคนไทยเคยโดนหลอกมาแล้ว แต่ส่วนใหญ่ไม่รู้เลยว่าตัวเองกำลังถูกโกง\n\n' +
    'วันนี้ เราจะมาแก้ปัญหานี้ ด้วย AI'
  );

  addTiming(body, '⏱️ Timing: 0:00-0:30');

  // ============================================
  // SECTION 2: PROBLEM (1 นาที)
  // ============================================

  addSection(body, '2. PROBLEM - ปัญหา (1 นาที)', '#F59E0B');

  addSpeakerNote(body, 'ทำให้ investors รู้สึกถึงความรุนแรงของปัญหา');

  addScript(body,
    '🚨 ปัญหาที่เกิดขึ้นตอนนี้คือ:\n\n' +
    '1. มิจฉาชีพวิวัฒนาการเร็วกว่าระบบป้องกัน\n' +
    '   • SMS หลอกลวง 130 ล้านข้อความต่อปี\n' +
    '   • Call Center Gang มีสคริปต์ใหม่ทุกวัน\n' +
    '   • Deep Fake เริ่มใช้ใน Thailand แล้ว\n\n' +
    '2. เครื่องมือที่มีอยู่ ไม่ได้ผล\n' +
    '   • WhosCall, Truecaller → บล็อกเบอร์ได้ แต่จับ SMS/QR ไม่ได้\n' +
    '   • ธนาคาร → เตือนหลังโอนเงินไปแล้ว สายเกินไป\n' +
    '   • ตำรวจ → รับแจ้งความหลังเสียเงินแล้ว ไม่ใช่ป้องกัน\n\n' +
    '3. คนไทยขาดการศึกษา\n' +
    '   • 80% ไม่รู้ว่า OTP คืออะไร ทำไมไม่ควรบอกคนอื่น\n' +
    '   • พ่อแม่ ปู่ย่า ตายาย เป็นกลุ่มเสี่ยงสูงสุด\n' +
    '   • แค่อ่าน pamphlet ไม่ช่วย ต้อง "สัมผัส" มิจฉาชีพจริงๆ\n\n' +
    '💡 สรุป: เราต้องการระบบที่ทั้ง PROTECT และ EDUCATE'
  );

  addTiming(body, '⏱️ Timing: 0:30-1:30');

  // ============================================
  // SECTION 3: SOLUTION (1.5 นาที)
  // ============================================

  addSection(body, '3. SOLUTION - โซลูชัน (1 นาที 30 วินาที)', '#43FF4D');

  addSpeakerNote(body, 'แสดง DEMO (simulation video) + อธิบาย unique features');

  addScript(body,
    '✨ Galaxy Agents คือแพลตฟอร์มสอนคนไทยให้รู้ทันมิจฉาชีพ\n\n' +
    '🎬 สิ่งที่เราสร้างเสร็จแล้ว (MVP):\n\n' +
    '1. FRAUD SIMULATION ENGINE (นี่คือจุดเด่นของเรา!)\n' +
    '   [แสดงวิดีโอ 20 วินาที - สถานการณ์จำลอง call-center-001]\n\n' +
    '   → นี่คือ Fraud Simulation ของเรา\n' +
    '   → เหมือนดูหนังสั้น มีเสียงพากย์ภาษาไทย\n' +
    '   → ผู้ใช้ "สัมผัส" วิธีคิดของมิจฉาชีพ\n' +
    '   → ไม่ใช่แค่อ่าน ไม่ใช่แค่ฟัง แต่ "รู้สึก"\n' +
    '   → จดจำได้นาน behavioral change ถาวร\n\n' +
    '   ✅ ทำเสร็จแล้ว:\n' +
    '   • 10 สถานการณ์จำลอง (Call Center, SMS, Romance, Investment...)\n' +
    '   • เสียงพากย์ภาษาไทย ทุก scenario\n' +
    '   • ภาพประกอบ AI-generated 35+ ภาพ\n' +
    '   • Web app ใช้งานได้แล้ว\n\n' +
    '2. 7 AI AGENTS ที่มีบุคลิก\n' +
    '   • ลุงสิงห์ (Big Boss) → ผู้นำแก๊ง\n' +
    '   • อาร์ม (Tech Wizard) → ผู้เชี่ยวชาญเทคนิค\n' +
    '   • มิว (Social Engineer) → นักจิตวิทยา\n' +
    '   • หมอแดน (Authority Figure) → แกล้งเป็นหมอ/ตำรวจ\n' +
    '   • แต่ละตัวมี animation "แปลงร่าง" เป็นคนดี→คนชั่ว\n\n' +
    '3. THAI-FIRST DESIGN\n' +
    '   • UI ภาษาไทยทั้งหมด\n' +
    '   • วัฒนธรรมไทย - เข้าใจ "ตำรวจ", "บัตรคนจน", "PromptPay"\n' +
    '   • เสียงพากย์ไทย TTS คุณภาพสูง\n\n' +
    '🚀 ที่จะทำต่อ (ด้วยเงินที่ระดมได้):\n' +
    '   • Real-time SMS/URL/QR scanner (mobile app)\n' +
    '   • AI detection engine\n' +
    '   • น้องฟ้า chatbot (AI Guardian 24/7)\n' +
    '   • B2B API สำหรับธนาคาร'
  );

  addTiming(body, '⏱️ Timing: 1:30-3:00');

  // ============================================
  // SECTION 4: MARKET & TRACTION (1 นาที)
  // ============================================

  addSection(body, '4. MARKET & TRACTION - ตลาดและความก้าวหน้า (1 นาที)', '#3B82F6');

  addSpeakerNote(body, 'แสดงตัวเลข TAM/SAM/SOM + traction');

  addScript(body,
    '📊 ตลาด:\n\n' +
    '• TAM (Global AI Fraud Detection 2034): $65 Billion\n' +
    '• SAM (Thailand + SEA): $500 Million\n' +
    '• SOM (Year 3 Target): $15 Million\n\n' +
    '🇹🇭 ทำไมต้อง Thailand First?\n' +
    '   • 51M+ คนใช้ Mobile Wallet\n' +
    '   • 77M คนใช้ PromptPay\n' +
    '   • 92% ใช้ Digital Payment\n' +
    '   • ความเสียหาย ฿115.3B/ปี → 0.3% ของ GDP!\n\n' +
    '🎯 Customer Segments:\n\n' +
    'B2C:\n' +
    '   • 51M ผู้ใช้ digital wallet\n' +
    '   • กลุ่มเป้าหมายหลัก: วัยทำงาน 25-55 ปี\n' +
    '   • Pricing: ฿99-299/เดือน (Guardian/Shield tiers)\n\n' +
    'B2B:\n' +
    '   • ธนาคาร 177 แห่ง (144M บัญชี digital banking)\n' +
    '   • FinTech companies\n' +
    '   • โทรคมนาคม (AIS, TRUE, DTAC)\n\n' +
    '📈 ความก้าวหน้าปัจจุบัน:\n' +
    '   ✅ Simulation Engine สมบูรณ์:\n' +
    '      • 10 scenarios พร้อมเสียงพากย์ไทย\n' +
    '      • 35+ ภาพ AI-generated\n' +
    '      • 7 AI Agents + transformation animation\n' +
    '   ✅ Web App ใช้งานได้แล้ว:\n' +
    '      • 15,000+ บรรทัดโค้ด TypeScript\n' +
    '      • Responsive design\n' +
    '   🎯 พร้อม DEMO ให้ดูได้ทันที'
  );

  addTiming(body, '⏱️ Timing: 3:00-4:00');

  // ============================================
  // SECTION 5: BUSINESS MODEL & ASK (1 นาที)
  // ============================================

  addSection(body, '5. BUSINESS MODEL & ASK - โมเดลธุรกิจและเงินทุน (1 นาที)', '#EC4899');

  addSpeakerNote(body, 'ชัดเจน เรื่อง revenue + ขอเงินเท่าไหร่ ใช้ทำอะไร');

  addScript(body,
    '💰 Revenue Streams:\n\n' +
    'B2C SUBSCRIPTIONS (Roadmap):\n' +
    '   • Free: ฿0 (ดู simulations ได้ทั้งหมด) → เป็น funnel\n' +
    '   • Guardian: ฿99/mo (+ SMS/URL scanner mobile app)\n' +
    '   • Shield: ฿299/mo (+ call screening, ฿100K insurance)\n\n' +
    'B2B ENTERPRISE (Roadmap):\n' +
    '   • API Access: ฿50K-500K/mo (integration กับธนาคาร)\n' +
    '   • White-Label: ฿2M setup + ฿200K/mo\n' +
    '   • Training Platform: จ้างสอนพนักงาน\n\n' +
    '📈 Year 1 Target: ฿75M (~$2.2M USD)\n' +
    '   • B2C: ฿45M (500K users, 5% conversion)\n' +
    '   • B2B: ฿30M (3 banks + 5 FinTech)\n\n' +
    '💸 Cost Structure:\n' +
    '   • Monthly Burn: ฿2.5M\n' +
    '   • Runway: 2.5 years to break-even\n' +
    '   • Team: 14 คน (7 engineers, 4 business, 3 ops)\n\n' +
    '🚀 THE ASK:\n\n' +
    'เราระดม Seed: ฿30M ($900K USD)\n\n' +
    'ใช้เงินทำอะไร (18 เดือน roadmap)?\n\n' +
    '1. Engineering (50% = ฿15M):\n' +
    '   → Mobile Apps (iOS/Android)\n' +
    '   → Real-time SMS/URL/QR scanner\n' +
    '   → AI detection engine (train model)\n' +
    '   → น้องฟ้า chatbot (AI Guardian)\n' +
    '   → B2B API สำหรับธนาคาร\n\n' +
    '2. Marketing & GTM (30% = ฿9M):\n' +
    '   → Influencer partnerships\n' +
    '   → Bank pilot programs\n' +
    '   → User acquisition campaigns\n\n' +
    '3. Operations (20% = ฿6M):\n' +
    '   → Cloud infrastructure\n' +
    '   → BOT compliance\n' +
    '   → Insurance partnerships\n\n' +
    'เป้าหมาย 18 เดือน:\n' +
    '   ✓ 500K active users\n' +
    '   ✓ 5 bank partnerships\n' +
    '   ✓ ฿150M annual revenue\n' +
    '   ✓ Series B ready'
  );

  addTiming(body, '⏱️ Timing: 4:00-5:00');

  // ============================================
  // SECTION 6: CLOSING (จบภายใน 5 นาที)
  // ============================================

  addSection(body, '6. CLOSING - ปิดท้าย', '#6366F1');

  addScript(body,
    '🎯 สรุป:\n\n' +
    '• ปัญหา: คนไทยเสีย ฿115B/ปี จากมิจฉาชีพ\n' +
    '• โซลูชัน: Galaxy Agents = สอนคนไทยผ่านหนังสั้น\n' +
    '• มีแล้ว: Simulation Engine 10 scenarios พร้อมเสียงพากย์ไทย\n' +
    '• จะทำ: Mobile app + AI scanner + Chatbot (ใช้เงิน 18 เดือน)\n' +
    '• ตลาด: $500M SAM, Thailand-first แล้วขยาย SEA\n' +
    '• ขอ: ฿30M Seed → 500K users, 5 banks, ฿150M revenue\n\n' +
    '💬 "เราไม่ได้แค่ protect คนไทย\n' +
    '     เราสอนให้คนไทย รู้ทันมิจฉาชีพ ตลอดไป"\n\n' +
    '🙏 ขอบคุณครับ\n' +
    'พร้อมตอบคำถามครับ'
  );

  addTiming(body, '⏱️ Total: 5:00');

  // ============================================
  // Q&A PREP
  // ============================================

  body.appendPageBreak();

  addSection(body, 'Q&A PREPARATION - เตรียมตอบคำถาม', '#9CA3AF');

  addQA(body,
    'Q: แข่งกับ WhosCall/Truecaller ยังไง?',
    'A: พวกเขาทำแค่ call blocking\n' +
    'เราทำ 360° protection:\n' +
    '• SMS/URL/QR (พวกเขาไม่มี)\n' +
    '• Simulation education (unique!)\n' +
    '• Thai-specific AI\n' +
    '• B2B API (พวกเขาไม่มี)'
  );

  addQA(body,
    'Q: ทำไม simulation จะ work?',
    'A: Research พบว่า experiential learning มี retention rate 75%\n' +
    'vs. reading (10%)\n' +
    'เหมือนจำลองเครื่องบินตก (flight simulator) - pilot จดจำตลอดชีวิต\n' +
    'Simulation ของเราทำให้ผู้ใช้ "รู้สึก" ถึงอารมณ์ของการถูกหลอก → จำได้นาน'
  );

  addQA(body,
    'Q: Defensibility อะไร?',
    'A: • Data Network Effect - ยิ่งมีคนใช้ AI ยิ่งแม่น\n' +
    '• Thai Localization - ลึกมาก ไม่ใช่แค่แปลภาษา\n' +
    '• Brand Characters - 7 AI Agents จดจำได้\n' +
    '• Partnership Moat - ธนาคารไม่ integration ซ้ำ'
  );

  addQA(body,
    'Q: Regulation risk?',
    'A: • เรา HELP ธนาคารทำตาม BOT regulation\n' +
    '• Partnership กับ DEPA, ตำรวจ → legitimacy\n' +
    '• Data privacy compliant (PDPA)\n' +
    '• AI ไม่เก็บข้อมูลส่วนตัว เก็บแค่ patterns'
  );

  addQA(body,
    'Q: Go-to-market strategy?',
    'A: Phase 1: B2C Freemium (build user base)\n' +
    'Phase 2: B2B Partnership (banks distribute)\n' +
    'Phase 3: B2B2C (telecom bundle)\n' +
    '→ Viral loop: ลูกบอกแม่ → แม่บอกเพื่อน'
  );

  addQA(body,
    'Q: Exit strategy?',
    'A: 3 ทาง:\n' +
    '1. Acquisition by Bank/Telecom (most likely)\n' +
    '2. Acquisition by Global AI Security (Palo Alto, CrowdStrike)\n' +
    '3. IPO (if scale to 10M+ users)\n' +
    'Benchmark: Truecaller IPO at $600M valuation (50M users)'
  );

  // ============================================
  // TIPS & REMINDERS
  // ============================================

  body.appendPageBreak();

  addSection(body, 'PRESENTATION TIPS - เคล็ดลับการนำเสนอ', '#14B8A6');

  const tips = body.appendListItem('💪 พูดมั่นใจ ช้าๆ ชัดเจน');
  tips.setGlyphType(DocumentApp.GlyphType.BULLET);

  body.appendListItem('👁️ สบตา investors อย่างน้อย 3 คน').setGlyphType(DocumentApp.GlyphType.BULLET);
  body.appendListItem('🎬 แสดงวิดีโอ simulation ให้ดู (20 วินาที) - นี่คือ WOW moment').setGlyphType(DocumentApp.GlyphType.BULLET);
  body.appendListItem('🔢 ใช้ตัวเลขชัดเจน (฿115.3B, 72%, 95%) - ทำให้น่าเชื่อถือ').setGlyphType(DocumentApp.GlyphType.BULLET);
  body.appendListItem('😊 ยิ้ม! นักลงทุนลงทุนใน founder ก่อนลงทุนใน idea').setGlyphType(DocumentApp.GlyphType.BULLET);
  body.appendListItem('⏱️ ฝึกซ้อมจนได้เวลาพอดี 5 นาที (ไม่เกิน!)').setGlyphType(DocumentApp.GlyphType.BULLET);
  body.appendListItem('❌ อย่าอ่าน script - พูดเป็นธรรมชาติ').setGlyphType(DocumentApp.GlyphType.BULLET);
  body.appendListItem('🎯 จบด้วย clear ask: "เราขอ ฿30M Series A"').setGlyphType(DocumentApp.GlyphType.BULLET);

  body.appendParagraph(''); // Spacer

  const reminder = body.appendParagraph('🌟 สิ่งที่ต้องจำ:');
  reminder.editAsText().setBold(true).setFontSize(14).setForegroundColor('#43FF4D');

  body.appendParagraph(
    'คุณไม่ได้แค่ขายผลิตภัณฑ์\n' +
    'คุณกำลังขาย VISION:\n\n' +
    '"โลกที่คนไทยทุกคน รู้ทันมิจฉาชีพ ไม่มีใครถูกหลอกอีกต่อไป"\n\n' +
    'และคุณคือคนที่จะทำให้มันเป็นจริง 🚀'
  ).editAsText().setFontSize(11).setItalic(true);

  // ============================================
  // FOOTER
  // ============================================

  body.appendParagraph(''); // Spacer
  body.appendHorizontalRule();

  const footer = body.appendParagraph('Galaxy Agents • แพลตฟอร์มป้องกันการโกงด้วย AI');
  footer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  footer.editAsText().setFontSize(9).setForegroundColor('#6B7280');

  const contact = body.appendParagraph('สร้างโดย Google Apps Script • สามารถแก้ไขได้ตามต้องการ');
  contact.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  contact.editAsText().setFontSize(8).setForegroundColor('#9CA3AF');

  // ============================================
  // LOG & RETURN
  // ============================================

  Logger.log('Pitch Script (Thai) created successfully!');
  Logger.log('URL: ' + doc.getUrl());

  return doc.getUrl();
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function addSection(body, title, color) {
  body.appendParagraph(''); // Spacer
  const section = body.appendParagraph(title);
  section.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  section.editAsText().setBold(true).setFontSize(14).setForegroundColor(color);
}

function addSpeakerNote(body, note) {
  const para = body.appendParagraph('🎤 Speaker Note: ' + note);
  para.editAsText()
    .setFontSize(9)
    .setItalic(true)
    .setForegroundColor('#9CA3AF')
    .setBackgroundColor('#F3F4F6');
  para.setSpacingBefore(6);
  para.setSpacingAfter(6);
}

function addScript(body, text) {
  const para = body.appendParagraph(text);
  para.editAsText().setFontSize(11);
  para.setSpacingAfter(12);
  para.setLineSpacing(1.5);
}

function addTiming(body, timing) {
  const para = body.appendParagraph(timing);
  para.editAsText()
    .setFontSize(9)
    .setBold(true)
    .setForegroundColor('#6366F1')
    .setBackgroundColor('#EEF2FF');
  para.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
  para.setSpacingAfter(12);
}

function addQA(body, question, answer) {
  const q = body.appendParagraph(question);
  q.editAsText().setBold(true).setFontSize(11).setForegroundColor('#EC4899');

  const a = body.appendParagraph(answer);
  a.editAsText().setFontSize(10);
  a.setSpacingAfter(12);
  a.setLineSpacing(1.4);
}

// ============================================
// MENU
// ============================================

function onOpen() {
  const ui = DocumentApp.getUi();
  ui.createMenu('Galaxy Agents')
    .addItem('Create Pitch Script (Thai)', 'createPitchScriptThai')
    .addToUi();
}
