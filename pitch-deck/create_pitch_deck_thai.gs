/**
 * ==========================================
 * GALAXY AGENTS - PITCH DECK (ภาษาไทย)
 * ==========================================
 *
 * Google Apps Script สำหรับสร้าง Pitch Deck แบบมืออาชีพ 16:9
 * สำหรับ Round 2 (Deadline: 11 ก.พ. 2569 เวลา 23:59 น.)
 *
 * COLOR PALETTE (จาก Galaxy Agents web app):
 * - Primary Green (Neon): #43FF4D / #39FF14
 * - Background Black: #000000 / #111827
 * - Accent Red (Danger): #FF4444 / #EF4444
 * - Text White: #FFFFFF
 * - Text Gray: #9CA3AF
 *
 * วิธีใช้:
 * 1. เปิด Google Apps Script (script.google.com)
 * 2. สร้าง project ใหม่
 * 3. วาง script นี้ทั้งหมด
 * 4. รัน createGalaxyAgentsPitchDeckThai()
 * 5. ตรวจสอบใน Google Drive ไฟล์ "Galaxy Agents - Pitch Deck (TH)"
 */

// ============================================
// CONFIGURATION
// ============================================

const PITCH_CONFIG_TH = {
  WIDTH: 720,
  HEIGHT: 405,

  COLORS: {
    BLACK: '000000',
    DARK_BG: '0A0F1A',
    DARK_CARD: '111827',
    NEON_GREEN: '43FF4D',
    LIGHT_GREEN: '39FF14',
    DANGER_RED: 'FF4444',
    WARNING_ORANGE: 'F59E0B',
    WHITE: 'FFFFFF',
    GRAY_300: 'D1D5DB',
    GRAY_400: '9CA3AF',
    GRAY_500: '6B7280',
    PURPLE: '6366F1',
    BLUE: '3B82F6',
    TEAL: '14B8A6',
  },

  FONTS: {
    TITLE: 'Kanit',
    BODY: 'Sarabun',
    MONO: 'IBM Plex Mono',
  },
};

// ============================================
// MAIN FUNCTION
// ============================================

function createGalaxyAgentsPitchDeckThai() {
  const presentation = SlidesApp.create('Galaxy Agents - Pitch Deck (TH)');
  const slides = presentation.getSlides();

  if (slides.length > 0) {
    slides[0].remove();
  }

  createSlide01_Cover_TH(presentation);
  createSlide02_TeamProfile_TH(presentation);
  createSlide03_Problem_TH(presentation);
  createSlide04_Solution_TH(presentation);
  createSlide05_KeyFeatures_TH(presentation);
  createSlide06_UserInsight_TH(presentation);
  createSlide07_FraudImpact_TH(presentation);
  createSlide08_TechStack_TH(presentation);
  createSlide09_Architecture_TH(presentation);
  createSlide10_DevMethodology_TH(presentation);
  createSlide11_DevTimeline_TH(presentation);
  createSlide12_MarketPotential_TH(presentation);
  createSlide13_TargetCustomer_TH(presentation);
  createSlide14_ValueProposition_TH(presentation);
  createSlide15_RevenueModel_TH(presentation);
  createSlide16_Competitive_TH(presentation);
  createSlide17_GoToMarket_TH(presentation);
  createSlide18_Demo_TH(presentation);
  createSlide19_CallToAction_TH(presentation);

  Logger.log('สร้าง Pitch Deck สำเร็จ!');
  Logger.log('URL: ' + presentation.getUrl());

  return presentation.getUrl();
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function hexToRgb(hex) {
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return { red: r, green: g, blue: b };
}

function setBackground(slide, color) {
  slide.getBackground().setSolidFill(
    hexToRgb(color).red * 255,
    hexToRgb(color).green * 255,
    hexToRgb(color).blue * 255
  );
}

function addTextBox(slide, text, left, top, width, height, options = {}) {
  const textBox = slide.insertTextBox(text, left, top, width, height);
  const textRange = textBox.getText();
  const style = textRange.getTextStyle();

  if (options.fontFamily) style.setFontFamily(options.fontFamily);
  if (options.fontSize) style.setFontSize(options.fontSize);
  if (options.bold) style.setBold(true);
  if (options.italic) style.setItalic(true);

  if (options.color) {
    const rgb = hexToRgb(options.color);
    style.setForegroundColor(rgb.red * 255, rgb.green * 255, rgb.blue * 255);
  }

  const paragraphStyle = textRange.getParagraphStyle();
  if (options.align === 'center') paragraphStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
  if (options.align === 'right') paragraphStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.END);

  return textBox;
}

function addShape(slide, shapeType, left, top, width, height, fillColor, borderColor = null) {
  const shape = slide.insertShape(shapeType, left, top, width, height);

  if (fillColor) {
    const rgb = hexToRgb(fillColor);
    shape.getFill().setSolidFill(rgb.red * 255, rgb.green * 255, rgb.blue * 255);
  }

  if (borderColor) {
    const rgb = hexToRgb(borderColor);
    shape.getBorder().getLineFill().setSolidFill(rgb.red * 255, rgb.green * 255, rgb.blue * 255);
    shape.getBorder().setWeight(2);
  } else {
    shape.getBorder().setTransparent();
  }

  return shape;
}

// ============================================
// SLIDE 1: หน้าปก
// ============================================

function createSlide01_Cover_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.BLACK);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 405, PITCH_CONFIG_TH.COLORS.DARK_BG);
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 4, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

  const logoCircle = addShape(slide, SlidesApp.ShapeType.ELLIPSE, 310, 60, 100, 100, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

  addTextBox(slide, 'GALAXY AGENTS', 60, 180, 600, 60, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 48,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });

  addTextBox(slide, 'แพลตฟอร์มป้องกันการโกงด้วย AI', 60, 245, 600, 35, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 24,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'center'
  });

  addTextBox(slide, 'ปกป้องคนไทยจากมิจฉาชีพออนไลน์ ด้วยทีม AI Agent อัจฉริยะ 7 ตัว', 60, 290, 600, 30, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 16,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 0, 365, 720, 40, PITCH_CONFIG_TH.COLORS.DARK_CARD);

  addTextBox(slide, 'Round 2 | กุมภาพันธ์ 2569', 60, 375, 200, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_500,
    align: 'left'
  });

  addTextBox(slide, 'การแข่งขันป้องกันการฉ้อโกง', 460, 375, 200, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'right'
  });
}

// ============================================
// SLIDE 2: ทีมงาน
// ============================================

function createSlide02_TeamProfile_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 120, 25, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '01 ทีมงาน', 35, 22, 110, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'left'
  });

  addTextBox(slide, 'ทีมพัฒนา', 30, 55, 400, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const teamMembers = [
    { role: 'หัวหน้าทีม / AI Engineer', skills: 'Machine Learning, NLP\nวิเคราะห์รูปแบบการโกง', color: PITCH_CONFIG_TH.COLORS.NEON_GREEN },
    { role: 'Full-Stack Developer', skills: 'React, TypeScript\nNode.js, Cloud', color: PITCH_CONFIG_TH.COLORS.BLUE },
    { role: 'UX/UI Designer', skills: 'User Research\nออกแบบภาษาไทย', color: PITCH_CONFIG_TH.COLORS.PURPLE },
  ];

  teamMembers.forEach((member, i) => {
    const x = 30 + (i * 225);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 105, 210, 180, PITCH_CONFIG_TH.COLORS.DARK_CARD, member.color);
    addShape(slide, SlidesApp.ShapeType.ELLIPSE, x + 75, 115, 60, 60, PITCH_CONFIG_TH.COLORS.GRAY_500);

    addTextBox(slide, member.role, x + 10, 185, 190, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 13,
      bold: true,
      color: member.color,
      align: 'center'
    });

    addTextBox(slide, member.skills, x + 10, 215, 190, 60, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 11,
      color: PITCH_CONFIG_TH.COLORS.GRAY_400,
      align: 'center'
    });
  });

  addTextBox(slide, 'ความรับผิดชอบหลัก', 30, 300, 200, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const responsibilities = [
    '• พัฒนาและ training โมเดล AI สำหรับตรวจจับการโกง',
    '• พัฒนา Web/Mobile app ด้วย React ecosystem',
    '• ออกแบบ UX/UI เน้นผู้ใช้ชาวไทย',
    '• วิเคราะห์ข้อมูลภัยคุกคามและรูปแบบการโกงแบบ real-time'
  ];

  addTextBox(slide, responsibilities.join('\n'), 30, 325, 660, 70, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });
}

// ============================================
// SLIDE 3: ปัญหา
// ============================================

function createSlide03_Problem_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 150, 25, PITCH_CONFIG_TH.COLORS.DANGER_RED);
  addTextBox(slide, '02 ปัญหา', 35, 22, 140, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'วิกฤตมิจฉาชีพ ฿115 พันล้านบาท', 30, 55, 550, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const stats = [
    { value: '฿115.3B', label: 'ความเสียหาย/ปี', sublabel: 'GASA Report 2568', color: PITCH_CONFIG_TH.COLORS.DANGER_RED },
    { value: '72%', label: 'เจอมิจฉาชีพ', sublabel: 'คนไทยที่โดน', color: PITCH_CONFIG_TH.COLORS.WARNING_ORANGE },
    { value: '6 ใน 10', label: 'ตกเป็นเหยื่อ', sublabel: 'ประชากรไทย', color: PITCH_CONFIG_TH.COLORS.DANGER_RED },
    { value: '130 ล้าน', label: 'SMS หลอกลวง/ปี', sublabel: 'เพิ่ม 112% YoY', color: PITCH_CONFIG_TH.COLORS.WARNING_ORANGE },
  ];

  stats.forEach((stat, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 105, 160, 110, PITCH_CONFIG_TH.COLORS.DARK_CARD, stat.color);

    addTextBox(slide, stat.value, x + 10, 115, 140, 40, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 26,
      bold: true,
      color: stat.color,
      align: 'center'
    });

    addTextBox(slide, stat.label, x + 10, 155, 140, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 12,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'center'
    });

    addTextBox(slide, stat.sublabel, x + 10, 178, 140, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_500,
      align: 'center'
    });
  });

  addTextBox(slide, 'ความท้าทายหลัก', 30, 230, 200, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const problems = [
    '• มิจฉาชีพปรับตัวเร็วกว่าเครื่องมือป้องกันแบบเดิม',
    '• ผู้สูงอายุและกลุ่มเปราะบางขาด digital literacy',
    '• ไม่มีแพลตฟอร์มป้องกันโกงแบบครบวงจรที่เข้าใจคนไทย',
    '• ธนาคารเสียหายหลายพันล้าน ลูกค้าสูญเสียความเชื่อมั่น'
  ];

  addTextBox(slide, problems.join('\n'), 30, 255, 400, 100, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 12,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 450, 230, 240, 100, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.DANGER_RED);
  addTextBox(slide, '"คนไทยสูญเสีย 60-70 ล้านบาท ทุกวัน จากมิจฉาชีพออนไลน์"', 460, 245, 220, 60, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 12,
    italic: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });
  addTextBox(slide, '— สำนักงานตำรวจแห่งชาติ 2567', 460, 305, 220, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 9,
    color: PITCH_CONFIG_TH.COLORS.GRAY_500,
    align: 'center'
  });

  addTextBox(slide, 'แหล่งข้อมูล: GASA Thailand Report 2568, Nation Thailand, Insurance Journal', 30, 380, 660, 15, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 8,
    color: PITCH_CONFIG_TH.COLORS.GRAY_500,
    align: 'left'
  });
}

// ============================================
// SLIDE 4: วิธีแก้ปัญหา
// ============================================

function createSlide04_Solution_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 180, 25, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '03 วิธีแก้ปัญหา', 35, 22, 170, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'left'
  });

  addTextBox(slide, 'Galaxy Agents: การป้องกันด้วย AI', 30, 55, 550, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'ทีม AI Agent 7 ตัว ทำงานร่วมกันเพื่อตรวจจับ ป้องกัน และให้ความรู้คนไทยเรื่องการโกงออนไลน์ แบบ real-time', 30, 100, 400, 50, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 14,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  const agents = [
    { name: 'ลุงสิงห์', role: 'Big Boss', icon: '🦁', desc: 'ผู้บัญชาการ', color: PITCH_CONFIG_TH.COLORS.WARNING_ORANGE },
    { name: 'พี่เหยี่ยว', role: 'Hawk Eye', icon: '🦅', desc: 'นักสืบ', color: PITCH_CONFIG_TH.COLORS.TEAL },
    { name: 'ป้าฮูก', role: 'Memory Bank', icon: '🦉', desc: 'คลังข้อมูล', color: PITCH_CONFIG_TH.COLORS.PURPLE },
    { name: 'น้องฟ้า', role: 'Guardian', icon: '🦄', desc: 'ผู้คุ้มครอง', color: PITCH_CONFIG_TH.COLORS.BLUE },
    { name: 'ครูหมี', role: 'Trainer', icon: '🐻', desc: 'ครูฝึกสอน', color: PITCH_CONFIG_TH.COLORS.NEON_GREEN },
    { name: 'จ.ส.ต.จิ้งจอก', role: 'Money Guard', icon: '🦊', desc: 'ผู้พิทักษ์เงิน', color: PITCH_CONFIG_TH.COLORS.WARNING_ORANGE },
    { name: 'ผบ.มังกร', role: 'Alert', icon: '🐉', desc: 'สายฟ้าแจ้งเตือน', color: PITCH_CONFIG_TH.COLORS.DANGER_RED },
  ];

  agents.forEach((agent, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    const x = 30 + (col * 170);
    const y = 160 + (row * 95);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, y, 160, 85, PITCH_CONFIG_TH.COLORS.DARK_CARD, agent.color);

    addTextBox(slide, agent.icon + ' ' + agent.name, x + 10, y + 10, 140, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 14,
      bold: true,
      color: agent.color,
      align: 'left'
    });

    addTextBox(slide, agent.role, x + 10, y + 35, 140, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 11,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'left'
    });

    addTextBox(slide, agent.desc, x + 10, y + 55, 140, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_500,
      align: 'left'
    });
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 355, 660, 40, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '✓ ออกแบบเพื่อคนไทย  |  ✓ จำลองสถานการณ์  |  ✓ 7 AI Agents  |  ✓ เสียงพากย์ไทย', 40, 365, 640, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 12,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'center'
  });
}

// ============================================
// SLIDE 5: ฟีเจอร์หลัก
// ============================================

function createSlide05_KeyFeatures_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 150, 25, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '04 ฟีเจอร์หลัก', 35, 22, 140, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'left'
  });

  addTextBox(slide, 'ฟีเจอร์สำคัญ', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const features = [
    {
      title: 'จำลองสถานการณ์โกง',
      desc: '✅ MVP เสร็จแล้ว: 10 สถานการณ์สไตล์หนังสั้น มีเสียงพากย์ไทย 35+ ภาพ AI-generated',
      icon: '🎮',
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN
    },
    {
      title: '7 AI Agents ที่มีบุคลิก',
      desc: '✅ MVP เสร็จแล้ว: ลุงสิงห์, อาร์ม, มิว, หมอแดน พร้อม transformation animation',
      icon: '🤖',
      color: PITCH_CONFIG_TH.COLORS.PURPLE
    },
    {
      title: 'ตรวจจับโกง Real-time (Roadmap)',
      desc: '🚀 จะทำต่อ: AI วิเคราะห์ SMS/URL/QR ใน mobile app พร้อม detection engine',
      icon: '⚡',
      color: PITCH_CONFIG_TH.COLORS.BLUE
    },
    {
      title: 'AI Guardian น้องฟ้า (Roadmap)',
      desc: '🚀 จะทำต่อ: Chatbot ช่วยตอบคำถาม ตรวจ SMS คำแนะนำรับมือมิจฉาชีพ 24/7',
      icon: '🛡️',
      color: PITCH_CONFIG_TH.COLORS.BLUE
    },
    {
      title: 'ฐานข้อมูลโกงไทย',
      desc: 'คลังข้อมูลรูปแบบโกงของไทยที่ใหญ่ที่สุด ข้อมูลจาก 142+ เคสที่บันทึกไว้',
      icon: '📊',
      color: PITCH_CONFIG_TH.COLORS.PURPLE
    },
    {
      title: 'ปกป้องครอบครัว',
      desc: 'ดูแลผู้สูงอายุในครอบครัว แชร์การแจ้งเตือนระหว่างสมาชิก',
      icon: '👨‍👩‍👧',
      color: PITCH_CONFIG_TH.COLORS.TEAL
    },
    {
      title: 'เชื่อมต่อธนาคารและแอป',
      desc: 'API สำหรับธนาคารและ FinTech โซลูชัน White-label สำหรับองค์กร',
      icon: '🏦',
      color: PITCH_CONFIG_TH.COLORS.WARNING_ORANGE
    },
  ];

  features.forEach((feature, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 30 + (col * 345);
    const y = 100 + (row * 100);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, y, 330, 90, PITCH_CONFIG_TH.COLORS.DARK_CARD, feature.color);

    addTextBox(slide, feature.icon, x + 15, y + 15, 30, 30, {
      fontSize: 24
    });

    addTextBox(slide, feature.title, x + 55, y + 15, 260, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 14,
      bold: true,
      color: feature.color,
      align: 'left'
    });

    addTextBox(slide, feature.desc, x + 55, y + 42, 260, 45, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG_TH.COLORS.GRAY_300,
      align: 'left'
    });
  });
}

// ============================================
// SLIDE 6: User Insight
// ============================================

function createSlide06_UserInsight_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG_TH.COLORS.BLUE);
  addTextBox(slide, '05 ความเข้าใจผู้ใช้', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'เข้าใจเหยื่อมิจฉาชีพไทย', 30, 55, 450, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const personas = [
    {
      name: 'สมชาย (อายุ 35)',
      type: 'พนักงานออฟฟิศ',
      pain: 'ได้รับ SMS หลอก 5+ ครั้ง/วัน ไม่แน่ใจอันไหนจริง',
      need: 'วิธีตรวจสอบข้อความแบบรวดเร็ว',
      color: PITCH_CONFIG_TH.COLORS.BLUE
    },
    {
      name: 'คุณยาย (อายุ 68)',
      type: 'ผู้เกษียณ',
      pain: 'สูญเงิน ฿50,000 จากแก๊ง call center',
      need: 'AI ดูแล 24/7, ครอบครัวติดตามได้',
      color: PITCH_CONFIG_TH.COLORS.DANGER_RED
    },
    {
      name: 'พิม (อายุ 28)',
      type: 'ฟรีแลนซ์',
      pain: 'เกือบหลงเชื่อข้อเสนองานปลอม',
      need: 'ความรู้เรื่องกลโกงใหม่ๆ',
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN
    },
  ];

  personas.forEach((persona, i) => {
    const x = 30 + (i * 225);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 105, 215, 160, PITCH_CONFIG_TH.COLORS.DARK_CARD, persona.color);
    addShape(slide, SlidesApp.ShapeType.ELLIPSE, x + 77, 115, 60, 60, PITCH_CONFIG_TH.COLORS.GRAY_500);

    addTextBox(slide, persona.name, x + 10, 180, 195, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 13,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'center'
    });

    addTextBox(slide, persona.type, x + 10, 198, 195, 18, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 10,
      color: persona.color,
      align: 'center'
    });

    addTextBox(slide, '😰 ' + persona.pain, x + 10, 218, 195, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_300,
      align: 'left'
    });

    addTextBox(slide, '✅ ' + persona.need, x + 10, 243, 195, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
      align: 'left'
    });
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 280, 660, 70, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

  addTextBox(slide, 'ข้อค้นพบสำคัญ', 45, 288, 100, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, 'ผู้ใช้ไม่ได้ต้องการแค่การป้องกัน — พวกเขาต้องการ "การศึกษา" ระบบจำลองของเราสอนผู้ใช้ให้รู้ว่ามิจฉาชีพคิดอย่างไร ทำให้พวกเขาระวังตัวได้ถาวร สร้างการเปลี่ยนแปลงพฤติกรรมที่ยั่งยืน ไม่ใช่แค่การแจ้งเตือนชั่วคราว', 45, 308, 630, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, '51 ล้านผู้ใช้ Mobile Wallet  |  77 ล้านบัญชี PromptPay  |  92% ใช้ Digital Payment', 30, 365, 660, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });

  addTextBox(slide, 'แหล่งข้อมูล: Statista Thailand 2568, ธนาคารแห่งประเทศไทย', 30, 385, 660, 15, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 8,
    color: PITCH_CONFIG_TH.COLORS.GRAY_500,
    align: 'center'
  });
}

// ============================================
// SLIDE 7: ผลกระทบ
// ============================================

function createSlide07_FraudImpact_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 250, 25, PITCH_CONFIG_TH.COLORS.DANGER_RED);
  addTextBox(slide, '06 ผลกระทบด้าน Cybersecurity', 35, 22, 240, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'ลดการโกงและผลกระทบต่อสังคม', 30, 55, 500, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const impacts = [
    { metric: '20%', label: 'เป้าหมายลดการโกง', sublabel: 'ประหยัด ฿23B ภายในปี 70', color: PITCH_CONFIG_TH.COLORS.NEON_GREEN },
    { metric: '95%', label: 'ความแม่นยำตรวจจับ', sublabel: 'AI pattern matching', color: PITCH_CONFIG_TH.COLORS.NEON_GREEN },
    { metric: '<1 วิ', label: 'ความเร็วตรวจจับ', sublabel: 'ป้องกัน Real-time', color: PITCH_CONFIG_TH.COLORS.BLUE },
    { metric: '1 ล้าน+', label: 'เป้าหมายผู้ใช้', sublabel: 'ภายในปีที่ 3', color: PITCH_CONFIG_TH.COLORS.PURPLE },
  ];

  impacts.forEach((impact, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 105, 160, 85, PITCH_CONFIG_TH.COLORS.DARK_CARD, impact.color);

    addTextBox(slide, impact.metric, x + 10, 115, 140, 35, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 26,
      bold: true,
      color: impact.color,
      align: 'center'
    });

    addTextBox(slide, impact.label, x + 10, 150, 140, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'center'
    });

    addTextBox(slide, impact.sublabel, x + 10, 170, 140, 18, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_500,
      align: 'center'
    });
  });

  addTextBox(slide, 'ประโยชน์ต่อสังคม', 30, 205, 200, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const benefits = [
    { icon: '👴', title: 'ปกป้องผู้สูงอายุ', desc: 'กลุ่มเปราะบางมี AI ดูแล 24/7' },
    { icon: '💰', title: 'Financial Inclusion', desc: 'Digital Payment ที่ปลอดภัยสำหรับทุกคน' },
    { icon: '📚', title: 'Digital Literacy', desc: 'เกมการเรียนรู้สร้างการตระหนักรู้ถาวร' },
    { icon: '👮', title: 'ลดอาชญากรรม', desc: 'แชร์ข้อมูลกับหน่วยงานจับมิจฉาชีพ' },
  ];

  benefits.forEach((benefit, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 230, 160, 70, PITCH_CONFIG_TH.COLORS.DARK_CARD);

    addTextBox(slide, benefit.icon + ' ' + benefit.title, x + 10, 238, 140, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
      align: 'left'
    });

    addTextBox(slide, benefit.desc, x + 10, 258, 140, 40, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_300,
      align: 'left'
    });
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 315, 660, 45, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.BLUE);

  addTextBox(slide, 'สอดคล้องกับ UN SDGs', 45, 320, 150, 18, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLUE,
    align: 'left'
  });

  addTextBox(slide, 'SDG 8: งานที่ดีและเศรษฐกิจเติบโต  |  SDG 9: อุตสาหกรรมและนวัตกรรม  |  SDG 16: สันติภาพและความยุติธรรม', 45, 338, 630, 18, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, '"ทุกบาทที่รอดจากมิจฉาชีพ คือครอบครัวหนึ่งที่รอดพ้นจากความเดือดร้อน"', 30, 370, 660, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 12,
    italic: true,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// SLIDE 8: เทคโนโลยี
// ============================================

function createSlide08_TechStack_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 180, 25, PITCH_CONFIG_TH.COLORS.PURPLE);
  addTextBox(slide, '07 เทคโนโลยี', 35, 22, 170, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'Technology Stack', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const categories = [
    {
      title: 'Frontend',
      items: ['React 18 + TypeScript', 'Vite Build System', 'TailwindCSS', 'GSAP Animations', 'ReactFlow'],
      color: PITCH_CONFIG_TH.COLORS.BLUE
    },
    {
      title: 'AI / ML',
      items: ['Google Gemini API', 'TensorFlow.js', 'NLP ภาษาไทย', 'Pattern Matching', 'Anomaly Detection'],
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN
    },
    {
      title: 'Backend',
      items: ['Node.js Runtime', 'Express API', 'IndexedDB Storage', 'WebSocket Real-time', 'REST APIs'],
      color: PITCH_CONFIG_TH.COLORS.PURPLE
    },
    {
      title: 'Infrastructure',
      items: ['AWS / GCP Cloud', 'Docker Containers', 'CI/CD Pipeline', 'CDN Distribution', 'SSL/TLS Security'],
      color: PITCH_CONFIG_TH.COLORS.TEAL
    },
  ];

  categories.forEach((cat, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 100, 160, 180, PITCH_CONFIG_TH.COLORS.DARK_CARD, cat.color);

    addTextBox(slide, cat.title, x + 10, 108, 140, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 14,
      bold: true,
      color: cat.color,
      align: 'center'
    });

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x + 20, 132, 120, 2, cat.color);

    addTextBox(slide, cat.items.map(item => '• ' + item).join('\n'), x + 15, 140, 130, 130, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 10,
      color: PITCH_CONFIG_TH.COLORS.GRAY_300,
      align: 'left'
    });
  });

  addTextBox(slide, 'จุดเด่นทางเทคนิค', 30, 295, 200, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const highlights = [
    '✓ ตรวจจับโกงได้แม้ไม่มีอินเทอร์เน็ต',
    '✓ ตอบสนอง <100ms Real-time',
    '✓ NLP ภาษาไทยความแม่นยำ 95%+',
    '✓ รองรับ 10 ล้าน+ ผู้ใช้พร้อมกัน'
  ];

  addTextBox(slide, highlights.join('    |    '), 30, 320, 660, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 355, 660, 40, PITCH_CONFIG_TH.COLORS.DARK_CARD);
  addTextBox(slide, 'ประสิทธิภาพ: 98% uptime SLA  |  <100ms latency  |  10K+ req/sec  |  Auto-scaling', 40, 365, 640, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// SLIDE 9: สถาปัตยกรรม
// ============================================

function createSlide09_Architecture_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 180, 25, PITCH_CONFIG_TH.COLORS.PURPLE);
  addTextBox(slide, '08 สถาปัตยกรรม', 35, 22, 170, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'System Architecture', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // User layer
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 105, 200, 50, PITCH_CONFIG_TH.COLORS.BLUE, PITCH_CONFIG_TH.COLORS.BLUE);
  addTextBox(slide, '📱 Mobile App / Web App\nชั้นส่วนติดต่อผู้ใช้', 35, 112, 190, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });

  addTextBox(slide, '↓', 120, 155, 30, 25, {
    fontSize: 20,
    color: PITCH_CONFIG_TH.COLORS.GRAY_500,
    align: 'center'
  });

  // API Gateway
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 180, 200, 40, PITCH_CONFIG_TH.COLORS.TEAL, PITCH_CONFIG_TH.COLORS.TEAL);
  addTextBox(slide, '🔒 API Gateway (Auth + Rate Limit)', 35, 188, 190, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });

  addTextBox(slide, '↓', 120, 220, 30, 25, {
    fontSize: 20,
    color: PITCH_CONFIG_TH.COLORS.GRAY_500,
    align: 'center'
  });

  // AI Agents layer
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 245, 200, 80, PITCH_CONFIG_TH.COLORS.NEON_GREEN, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '🤖 AI Agent Orchestrator\n7 AI Agents เฉพาะทาง\n• ตรวจจับ • วิเคราะห์ • แจ้งเตือน', 35, 252, 190, 70, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'center'
  });

  // Data layer
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 260, 105, 200, 220, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.PURPLE);
  addTextBox(slide, '💾 Data Layer\n\n• IndexedDB (Local)\n• Cloud Database\n• ฐานข้อมูลรูปแบบโกง\n• โปรไฟล์ผู้ใช้\n• ประวัติการจำลอง\n• ML Models', 270, 110, 180, 200, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // External services
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 490, 105, 200, 110, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.WARNING_ORANGE);
  addTextBox(slide, '🌐 External Services\n\n• Google Gemini AI\n• Bank APIs\n• Telecom SMS Gateway\n• Threat Intel Feeds', 500, 110, 180, 100, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // Monitoring
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 490, 225, 200, 100, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.DANGER_RED);
  addTextBox(slide, '📊 Monitoring & Analytics\n\n• Dashboard Real-time\n• วิเคราะห์การโกง\n• พฤติกรรมผู้ใช้\n• สุขภาพระบบ', 500, 230, 180, 90, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 340, 660, 55, PITCH_CONFIG_TH.COLORS.DARK_CARD);
  addTextBox(slide, 'หลักการออกแบบ', 45, 345, 150, 18, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'left'
  });
  addTextBox(slide, '• Microservices: แต่ละ Agent deploy แยกกันได้\n• Event-driven: แจ้งเตือนโกง Real-time ผ่าน WebSocket\n• Offline-first: ตรวจจับหลักทำงานได้แม้ไม่มีอินเทอร์เน็ต', 45, 362, 620, 35, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });
}

// ============================================
// SLIDE 10: ระเบียบวิธีพัฒนา
// ============================================

function createSlide10_DevMethodology_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG_TH.COLORS.TEAL);
  addTextBox(slide, '09 ระเบียบวิธีพัฒนา', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'Development Methodology', 30, 55, 400, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // Agile
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 330, 140, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.TEAL);

  addTextBox(slide, '🔄 Agile Scrum', 45, 108, 300, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.TEAL,
    align: 'left'
  });

  const agilePoints = [
    '• Sprint 2 สัปดาห์',
    '• Daily standups (15 นาที)',
    '• Sprint reviews กับผู้มีส่วนได้ส่วนเสีย',
    '• รับ feedback ผู้ใช้อย่างต่อเนื่อง',
    '• Retrospectives เพื่อปรับปรุง'
  ];

  addTextBox(slide, agilePoints.join('\n'), 45, 135, 300, 100, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // DevOps
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 380, 100, 310, 140, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.PURPLE);

  addTextBox(slide, '🚀 DevOps & CI/CD', 395, 108, 280, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.PURPLE,
    align: 'left'
  });

  const devopsPoints = [
    '• GitHub Actions สำหรับ CI/CD',
    '• Automated testing (Jest, Cypress)',
    '• Docker containerization',
    '• Blue-green deployments',
    '• Infrastructure as Code (Terraform)'
  ];

  addTextBox(slide, devopsPoints.join('\n'), 395, 135, 280, 100, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // QA
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 255, 330, 100, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

  addTextBox(slide, '✅ Quality Assurance', 45, 263, 300, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'left'
  });

  const qaPoints = [
    '• เป้าหมาย code coverage 80%+',
    '• Security audits (OWASP top 10)',
    '• Performance benchmarking',
    '• Accessibility testing (WCAG 2.1)'
  ];

  addTextBox(slide, qaPoints.join('\n'), 45, 288, 300, 65, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // User research
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 380, 255, 310, 100, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.BLUE);

  addTextBox(slide, '👥 User Research', 395, 263, 280, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLUE,
    align: 'left'
  });

  const researchPoints = [
    '• สัมภาษณ์ผู้ใช้รายสัปดาห์',
    '• A/B testing สำหรับตัดสินใจ UI',
    '• Analytics-driven iterations',
    '• โปรแกรม Beta กับผู้ใช้ 100+ คน'
  ];

  addTextBox(slide, researchPoints.join('\n'), 395, 288, 280, 65, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 365, 660, 30, PITCH_CONFIG_TH.COLORS.DARK_CARD);
  addTextBox(slide, 'เครื่องมือ: GitHub | Jira | Figma | Slack | Notion | Vercel | AWS', 40, 372, 640, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// SLIDE 11: Timeline
// ============================================

function createSlide11_DevTimeline_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG_TH.COLORS.WARNING_ORANGE);
  addTextBox(slide, '10 แผนการพัฒนา', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'left'
  });

  addTextBox(slide, 'Development Timeline', 30, 55, 350, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const phases = [
    { quarter: 'Q1 2569', title: 'เปิดตัว MVP', items: ['ระบบตรวจจับโกงหลัก', 'เปิดตัว Web app', 'เป้าหมาย 100K ผู้ใช้'], color: PITCH_CONFIG_TH.COLORS.NEON_GREEN, status: 'กำลังดำเนินการ' },
    { quarter: 'Q2 2569', title: 'B2B API', items: ['API สำหรับธนาคาร', '3 พันธมิตรนำร่อง', 'Mobile app beta'], color: PITCH_CONFIG_TH.COLORS.BLUE, status: 'วางแผน' },
    { quarter: 'Q3 2569', title: 'ขยายขนาด', items: ['AI แม่นยำ 98%', '500K ผู้ใช้', 'White-label พร้อม'], color: PITCH_CONFIG_TH.COLORS.PURPLE, status: 'วางแผน' },
    { quarter: 'Q4 2569', title: 'องค์กร', items: ['ดีลกับ Telecom', 'เปิดตัว Mobile เต็มรูปแบบ', 'จุดคุ้มทุน'], color: PITCH_CONFIG_TH.COLORS.WARNING_ORANGE, status: 'วางแผน' },
  ];

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 150, 660, 4, PITCH_CONFIG_TH.COLORS.GRAY_500);

  phases.forEach((phase, i) => {
    const x = 45 + (i * 165);

    addShape(slide, SlidesApp.ShapeType.ELLIPSE, x + 65, 142, 20, 20, phase.color);

    addTextBox(slide, phase.quarter, x, 105, 150, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 12,
      bold: true,
      color: phase.color,
      align: 'center'
    });

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 175, 150, 130, PITCH_CONFIG_TH.COLORS.DARK_CARD, phase.color);

    addTextBox(slide, phase.title, x + 10, 183, 130, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 13,
      bold: true,
      color: phase.color,
      align: 'left'
    });

    const statusColor = phase.status === 'กำลังดำเนินการ' ? PITCH_CONFIG_TH.COLORS.NEON_GREEN : PITCH_CONFIG_TH.COLORS.GRAY_500;
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x + 70, 185, 70, 16, statusColor);
    addTextBox(slide, phase.status, x + 72, 186, 66, 14, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 7,
      bold: true,
      color: phase.status === 'กำลังดำเนินการ' ? PITCH_CONFIG_TH.COLORS.BLACK : PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'center'
    });

    addTextBox(slide, phase.items.map(item => '• ' + item).join('\n'), x + 10, 210, 130, 90, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_300,
      align: 'left'
    });
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 320, 660, 70, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

  addTextBox(slide, 'แนวโน้มปี 2570+', 45, 328, 150, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 12,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, '• ขยายไปเอเชียตะวันออกเฉียงใต้: เวียดนาม, อินโดนีเซีย, ฟิลิปปินส์\n• 1 ล้าน+ ผู้ใช้ทั่วภูมิภาค\n• เป้าหมายรายได้ $10-15M ต่อปี', 45, 348, 620, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });
}

// ============================================
// SLIDE 12: ศักยภาพตลาด
// ============================================

function createSlide12_MarketPotential_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 210, 25, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '11 ศักยภาพตลาด', 35, 22, 200, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'left'
  });

  addTextBox(slide, 'Market Potential (TAM SAM SOM)', 30, 55, 450, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // TAM
  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 30, 105, 280, 180, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.BLUE);
  addTextBox(slide, 'TAM', 140, 120, 60, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 12,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLUE,
    align: 'center'
  });
  addTextBox(slide, '$65B', 100, 145, 140, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });
  addTextBox(slide, 'ตลาด AI Fraud Detection\nโลก ภายในปี 2577', 80, 190, 180, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });
  addTextBox(slide, 'CAGR 18%', 100, 235, 140, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.BLUE,
    align: 'center'
  });

  // SAM
  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 330, 105, 200, 130, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.PURPLE);
  addTextBox(slide, 'SAM', 405, 115, 60, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 12,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.PURPLE,
    align: 'center'
  });
  addTextBox(slide, '$500M', 375, 135, 120, 35, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 28,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });
  addTextBox(slide, 'ไทย + เอเชียตะวันออกเฉียงใต้\nป้องกันการโกง', 360, 175, 150, 35, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });

  // SOM
  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 550, 120, 130, 100, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, 'SOM', 595, 128, 50, 18, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'center'
  });
  addTextBox(slide, '$15M', 575, 148, 80, 30, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 22,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });
  addTextBox(slide, 'เป้าหมายปีที่ 3', 570, 180, 90, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 9,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });

  addTextBox(slide, 'ข้อมูลตลาด', 30, 295, 150, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 320, 660, 70, PITCH_CONFIG_TH.COLORS.DARK_CARD);

  const marketData = [
    { label: 'ความเสียหายจากโกงในไทย', value: '฿115.3B/ปี', source: 'GASA 2568' },
    { label: 'ตลาดโกง SEA', value: '$8B ภายในปี 69', source: 'Asia Risk Center' },
    { label: 'AI Fraud Detection (โลก)', value: '$14.7B → $65B', source: 'Precedence Research' },
    { label: 'ผู้ใช้ดิจิทัลไทย', value: '51 ล้าน', source: 'Statista 2568' },
  ];

  marketData.forEach((data, i) => {
    const x = 40 + (i * 165);
    addTextBox(slide, data.label + '\n' + data.value + '\n' + data.source, x, 328, 155, 55, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_300,
      align: 'left'
    });
  });
}

// ============================================
// SLIDE 13: กลุ่มลูกค้าเป้าหมาย
// ============================================

function createSlide13_TargetCustomer_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 230, 25, PITCH_CONFIG_TH.COLORS.BLUE);
  addTextBox(slide, '12 กลุ่มลูกค้าเป้าหมาย', 35, 22, 220, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'Target Customers', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // B2C
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 320, 150, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.BLUE);

  addTextBox(slide, '👤 B2C: ผู้ใช้ทั่วไป', 45, 108, 290, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLUE,
    align: 'left'
  });

  addTextBox(slide, '• 51 ล้าน+ ผู้ใช้ Mobile Wallet ในไทย\n• อายุ 18-65 ปี ใช้สมาร์ทโฟน\n• 72% เจอมิจฉาชีพทุกปี\n• ผู้สูงอายุและกลุ่มเปราะบาง\n• วัยรุ่นที่ต้องการเรียนรู้', 45, 140, 290, 100, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // B2B
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 370, 100, 320, 150, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.PURPLE);

  addTextBox(slide, '🏢 B2B: สถาบันการเงิน', 385, 108, 290, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.PURPLE,
    align: 'left'
  });

  addTextBox(slide, '• 177 บริษัท FinTech ในไทย\n• ธนาคารใหญ่ (SCB, KBANK, BBL, KTB)\n• 144 ล้านบัญชี Digital Banking\n• ผู้ให้บริการ Mobile Payment\n• บริษัทประกันภัย', 385, 140, 290, 100, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // B2B2C
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 265, 320, 90, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.TEAL);

  addTextBox(slide, '📡 B2B2C: โอเปอเรเตอร์โทรคมนาคม', 45, 273, 290, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 13,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.TEAL,
    align: 'left'
  });

  addTextBox(slide, '• AIS, TRUE, DTAC\n• กรอง SMS/สายหลอกลวง\n• 130 ล้าน SMS หลอกลวงที่ตรวจพบ (2567)', 45, 298, 290, 50, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // Government
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 370, 265, 320, 90, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

  addTextBox(slide, '🏛️ รัฐบาลและภาครัฐ', 385, 273, 290, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 13,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, '• ธนาคารแห่งประเทศไทย (BOT)\n• DEPA, สำนักงานตำรวจแห่งชาติ\n• โปรแกรม Digital Literacy', 385, 298, 290, 50, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 365, 660, 30, PITCH_CONFIG_TH.COLORS.DARK_CARD);
  addTextBox(slide, 'โฟกัสหลัก: B2C ตลาดมวลชน + B2B พันธมิตรธนาคาร', 40, 372, 640, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 12,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'center'
  });
}

// ============================================
// SLIDE 14: คุณค่าที่นำเสนอ
// ============================================

function createSlide14_ValueProposition_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 220, 25, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '13 คุณค่าที่นำเสนอ', 35, 22, 210, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'left'
  });

  addTextBox(slide, 'Value Propositions', 30, 55, 350, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // For Users
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 330, 175, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.BLUE);

  addTextBox(slide, '👤 สำหรับผู้ใช้ทั่วไป', 45, 108, 300, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLUE,
    align: 'left'
  });

  const userValues = [
    '🎮 เรียนรู้กลโกงผ่านหนังสั้น มีเสียงพากย์ (✅ มีแล้ว)',
    '🤖 7 AI Agents ที่มีบุคลิก (✅ มีแล้ว)',
    '🇹🇭 ออกแบบเพื่อคนไทยโดยเฉพาะ',
    '⚡ ป้องกัน SMS/URL/QR Real-time (🚀 Roadmap)',
    '🛡️ AI Guardian น้องฟ้า 24/7 (🚀 Roadmap)',
    '📱 ใช้งานง่าย ไม่ต้องมีทักษะเทคนิค'
  ];

  addTextBox(slide, userValues.join('\n'), 45, 138, 300, 130, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // For Enterprises
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 380, 100, 310, 175, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.PURPLE);

  addTextBox(slide, '🏢 สำหรับองค์กร', 395, 108, 280, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.PURPLE,
    align: 'left'
  });

  const bizValues = [
    '📉 อัตราตรวจจับโกงสูงถึง 95%',
    '✅ สอดคล้องข้อกำหนด BOT',
    '🤝 สร้างความเชื่อมั่นลูกค้า',
    '🔌 API integration ง่าย',
    '📊 แดชบอร์ดวิเคราะห์พฤติกรรม',
    '🏷️ White-label พร้อมใช้'
  ];

  addTextBox(slide, bizValues.join('\n'), 395, 138, 280, 130, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // Differentiators
  addTextBox(slide, 'จุดแตกต่างที่เป็นเอกลักษณ์', 30, 290, 250, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const differentiators = [
    { title: '7 AI Agents', desc: 'ไม่ใช่แชทบอททั่วไป', color: PITCH_CONFIG_TH.COLORS.NEON_GREEN },
    { title: 'Evil Transform', desc: 'เห็นมิจฉาชีพคิดอย่างไร', color: PITCH_CONFIG_TH.COLORS.DANGER_RED },
    { title: 'Thai Scam DB', desc: 'ข้อมูลโกงไทยที่ใหญ่ที่สุด', color: PITCH_CONFIG_TH.COLORS.PURPLE },
    { title: 'Gamified Learn', desc: 'การศึกษาที่น่าสนใจ', color: PITCH_CONFIG_TH.COLORS.BLUE },
  ];

  differentiators.forEach((diff, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 315, 160, 55, PITCH_CONFIG_TH.COLORS.DARK_CARD, diff.color);

    addTextBox(slide, diff.title, x + 10, 323, 140, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 12,
      bold: true,
      color: diff.color,
      align: 'left'
    });

    addTextBox(slide, diff.desc, x + 10, 345, 140, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG_TH.COLORS.GRAY_400,
      align: 'left'
    });
  });

  addTextBox(slide, '📈 Data Network Effect: ผู้ใช้มากขึ้น → ตรวจจับดีขึ้น → ผู้ใช้มากขึ้น', 30, 380, 660, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 11,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'center'
  });
}

// ============================================
// SLIDE 15: รูปแบบรายได้
// ============================================

function createSlide15_RevenueModel_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG_TH.COLORS.WARNING_ORANGE);
  addTextBox(slide, '14 รูปแบบรายได้', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'left'
  });

  addTextBox(slide, 'Revenue Model', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // B2C Pricing
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 330, 145, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.BLUE);

  addTextBox(slide, '👤 B2C แพ็กเกจสมาชิก', 45, 108, 300, 22, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLUE,
    align: 'left'
  });

  const b2cTiers = [
    { tier: 'ฟรี', price: '฿0', features: '5 ครั้ง/วัน, จำลอง 2 สถานการณ์' },
    { tier: 'Guardian', price: '฿99/เดือน', features: 'ไม่จำกัด, ทุกสถานการณ์' },
    { tier: 'Shield', price: '฿299/เดือน', features: '+ คัดกรองสาย, ประกัน ฿100K' },
  ];

  b2cTiers.forEach((t, i) => {
    const y = 135 + (i * 35);
    addTextBox(slide, t.tier, 50, y, 70, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
      align: 'left'
    });
    addTextBox(slide, t.price, 125, y, 70, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 11,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'left'
    });
    addTextBox(slide, t.features, 195, y, 155, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_400,
      align: 'left'
    });
  });

  // B2B Pricing
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 380, 100, 310, 145, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.PURPLE);

  addTextBox(slide, '🏢 B2B ราคาองค์กร', 395, 108, 280, 22, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.PURPLE,
    align: 'left'
  });

  const b2bTiers = [
    { tier: 'API Access', price: '฿50K-500K/เดือน', features: 'ธนาคาร, FinTech' },
    { tier: 'White-Label', price: '฿2M + ฿200K/เดือน', features: 'แบรนด์ตัวเอง' },
    { tier: 'Enterprise', price: 'ราคาพิเศษ', features: 'Telecom, รัฐบาล' },
  ];

  b2bTiers.forEach((t, i) => {
    const y = 135 + (i * 35);
    addTextBox(slide, t.tier, 400, y, 85, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 10,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
      align: 'left'
    });
    addTextBox(slide, t.price, 490, y, 95, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 10,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'left'
    });
    addTextBox(slide, t.features, 590, y, 90, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_400,
      align: 'left'
    });
  });

  // Revenue projections
  addTextBox(slide, 'คาดการณ์รายได้ปีที่ 1', 30, 260, 250, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // B2C
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 285, 215, 65, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.BLUE);
  addTextBox(slide, 'B2C', 45, 290, 50, 18, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLUE,
    align: 'left'
  });
  addTextBox(slide, '฿45M', 45, 308, 100, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 22,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });
  addTextBox(slide, '500K ผู้ใช้ → 5% สมัคร\n25K จ่าย × ฿150 เฉลี่ย × 12 เดือน', 45, 330, 185, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 8,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'left'
  });

  // B2B
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 255, 285, 215, 65, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.PURPLE);
  addTextBox(slide, 'B2B', 270, 290, 50, 18, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.PURPLE,
    align: 'left'
  });
  addTextBox(slide, '฿30M', 270, 308, 100, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 22,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });
  addTextBox(slide, '3 พันธมิตรธนาคาร: ฿18M\n5 FinTech: ฿12M', 270, 330, 185, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 8,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'left'
  });

  // Total
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 480, 285, 210, 65, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, 'รวม', 495, 290, 60, 18, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'left'
  });
  addTextBox(slide, '฿75M', 495, 308, 100, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 22,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });
  addTextBox(slide, '~$2.2M USD\nเป้าหมายปีที่ 1', 495, 330, 185, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 8,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 360, 660, 35, PITCH_CONFIG_TH.COLORS.DARK_CARD);
  addTextBox(slide, 'ค่าใช้จ่าย/เดือน: ฿2.5M  |  Runway: 2.5 ปีถึงจุดคุ้มทุน  |  เป้าหมาย Seed Funding: ฿75M', 40, 368, 640, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// SLIDE 16: คู่แข่ง
// ============================================

function createSlide16_Competitive_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG_TH.COLORS.DANGER_RED);
  addTextBox(slide, '15 ภูมิทัศน์การแข่งขัน', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'Competitive Landscape', 30, 55, 350, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // Table header
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 660, 30, PITCH_CONFIG_TH.COLORS.DARK_CARD);
  addTextBox(slide, 'คู่แข่ง', 40, 107, 120, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'left'
  });
  addTextBox(slide, 'จุดแข็ง', 170, 107, 150, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'left'
  });
  addTextBox(slide, 'จุดอ่อน', 350, 107, 150, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'left'
  });
  addTextBox(slide, 'ข้อได้เปรียบของเรา', 530, 107, 150, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'left'
  });

  const competitors = [
    { name: 'Feedzai', strength: 'ระดับ Enterprise, ทั่วโลก', weakness: 'แพง, ไม่โฟกัสไทย', edge: 'ทำเพื่อคนไทย, ราคาถูก' },
    { name: 'NICE Actimize', strength: 'ความสัมพันธ์กับธนาคาร', weakness: 'ซับซ้อน, deploy ช้า', edge: 'คล่องตัว, AI-native' },
    { name: 'เครื่องมือธนาคาร', strength: 'แบรนด์น่าเชื่อถือ', weakness: 'ทั่วไป, ไม่เฉพาะทาง', edge: '7 Agents เฉพาะทาง' },
    { name: 'WhosCall', strength: 'บล็อคสายได้', weakness: 'ไม่ครอบคลุม SMS/QR', edge: 'ครอบคลุมครบ' },
  ];

  competitors.forEach((comp, i) => {
    const y = 135 + (i * 38);
    const bgColor = i % 2 === 0 ? PITCH_CONFIG_TH.COLORS.DARK_CARD : PITCH_CONFIG_TH.COLORS.BLACK;

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, y, 660, 35, bgColor);

    addTextBox(slide, comp.name, 40, y + 8, 120, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'left'
    });
    addTextBox(slide, comp.strength, 170, y + 8, 170, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_300,
      align: 'left'
    });
    addTextBox(slide, comp.weakness, 350, y + 8, 170, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.DANGER_RED,
      align: 'left'
    });
    addTextBox(slide, comp.edge, 530, y + 8, 150, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
      align: 'left'
    });
  });

  addTextBox(slide, 'ข้อได้เปรียบในการแข่งขันของเรา', 30, 295, 300, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const moats = [
    { title: 'Data Network Effect', desc: 'ผู้ใช้มาก = AI ดีขึ้น', icon: '📊' },
    { title: 'Thai Localization', desc: 'เข้าใจวัฒนธรรมลึกซึ้ง', icon: '🇹🇭' },
    { title: 'Cinematic Simulation', desc: 'เหมือนหนังสั้น มีเสียงพากย์ไทย', icon: '🎮' },
    { title: 'Brand Characters', desc: 'AI Agents ที่จดจำได้', icon: '🤖' },
  ];

  moats.forEach((moat, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 320, 160, 70, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

    addTextBox(slide, moat.icon + ' ' + moat.title, x + 10, 328, 140, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 10,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
      align: 'left'
    });

    addTextBox(slide, moat.desc, x + 10, 355, 140, 30, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG_TH.COLORS.GRAY_400,
      align: 'left'
    });
  });
}

// ============================================
// SLIDE 17: กลยุทธ์เข้าตลาด
// ============================================

function createSlide17_GoToMarket_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG_TH.COLORS.TEAL);
  addTextBox(slide, '16 กลยุทธ์เข้าตลาด', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'Go-to-Market Strategy', 30, 55, 350, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  const phases = [
    {
      phase: 'เฟส 1',
      title: 'เปิดตัวและหาลูกค้า',
      period: 'Q1-Q2 2569',
      actions: [
        'เปิดตัวแอปฟรี iOS/Android',
        'แคมเปญ Social Media (TikTok, FB)',
        'ร่วมมือกับ Influencer',
        'PR: เรื่องราวการป้องกันโกง'
      ],
      color: PITCH_CONFIG_TH.COLORS.BLUE
    },
    {
      phase: 'เฟส 2',
      title: 'สร้างพันธมิตร',
      period: 'Q3-Q4 2569',
      actions: [
        'โปรแกรมนำร่องกับธนาคาร 3 แห่ง',
        'เชื่อม LINE Official Account',
        'ร่วมมือกับรัฐบาล (DEPA)',
        'สร้างทีมขาย B2B'
      ],
      color: PITCH_CONFIG_TH.COLORS.PURPLE
    },
    {
      phase: 'เฟส 3',
      title: 'ขยายและเติบโต',
      period: '2570+',
      actions: [
        'White-label สำหรับ Telecom',
        'ขยายสู่ SEA (เวียดนาม, อินโด)',
        'เร่งขายองค์กร',
        'ไลเซนส์ AI Model'
      ],
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN
    },
  ];

  phases.forEach((phase, i) => {
    const x = 30 + (i * 225);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 100, 215, 170, PITCH_CONFIG_TH.COLORS.DARK_CARD, phase.color);

    addTextBox(slide, phase.phase, x + 10, 108, 80, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 10,
      bold: true,
      color: phase.color,
      align: 'left'
    });

    addTextBox(slide, phase.period, x + 120, 108, 85, 20, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_500,
      align: 'right'
    });

    addTextBox(slide, phase.title, x + 10, 130, 195, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
      fontSize: 13,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'left'
    });

    addTextBox(slide, phase.actions.map(a => '• ' + a).join('\n'), x + 10, 158, 195, 100, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG_TH.COLORS.GRAY_300,
      align: 'left'
    });
  });

  addTextBox(slide, 'พันธมิตรเป้าหมาย', 30, 285, 200, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 310, 660, 80, PITCH_CONFIG_TH.COLORS.DARK_CARD);

  const partners = [
    { type: 'ธนาคาร', names: 'SCB, KBANK, BBL, KTB', value: 'Distribution + รายได้' },
    { type: 'โทรคมนาคม', names: 'AIS, TRUE, DTAC', value: 'กรอง Spam + Co-marketing' },
    { type: 'รัฐบาล', names: 'BOT, DEPA, ตำรวจ', value: 'แชร์ข้อมูล + ความน่าเชื่อถือ' },
    { type: 'เทค', names: 'LINE, Google, Meta', value: 'Platform integration' },
  ];

  partners.forEach((partner, i) => {
    const x = 45 + (i * 165);

    addTextBox(slide, partner.type, x, 318, 150, 18, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 10,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
      align: 'left'
    });
    addTextBox(slide, partner.names, x, 336, 150, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.WHITE,
      align: 'left'
    });
    addTextBox(slide, partner.value, x, 360, 150, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 8,
      color: PITCH_CONFIG_TH.COLORS.GRAY_500,
      align: 'left'
    });
  });
}

// ============================================
// SLIDE 18: Demo
// ============================================

function createSlide18_Demo_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.DARK_BG);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '17 ต้นแบบที่ใช้งานได้', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.BLACK,
    align: 'left'
  });

  addTextBox(slide, 'Working Prototype (MVP 1)', 30, 55, 400, 40, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'left'
  });

  // Demo area
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 400, 225, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '📱 LIVE DEMO\n\n[ใส่ภาพหน้าจอแอปที่นี่]\n\nหรือเยี่ยมชม:\ngalaxyagents.vercel.app', 50, 140, 360, 160, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 14,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });

  // Features
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 450, 100, 240, 225, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.PURPLE);

  addTextBox(slide, '✅ ฟีเจอร์ที่พัฒนาแล้ว', 465, 108, 210, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.PURPLE,
    align: 'left'
  });

  const features = [
    '• AI Agent 7 ตัวครบ',
    '• ระบบจำลองแบบ Cinematic',
    '• 10 สถานการณ์สไตล์หนังสั้น',
    '• เสียงพากย์ภาษาไทย (TTS)',
    '• Animation แปลงร่างชั่วร้าย',
    '• UI ภาษาไทย',
    '• Agent ทำงานร่วมกัน Real-time',
    '• แสดงผลการสูญเงิน',
    '• บันทึกข้อมูล IndexedDB',
    '• Responsive Design'
  ];

  addTextBox(slide, features.join('\n'), 465, 138, 210, 180, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG_TH.COLORS.GRAY_300,
    align: 'left'
  });

  // Metrics
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 340, 660, 55, PITCH_CONFIG_TH.COLORS.DARK_CARD);

  const metrics = [
    { label: 'บรรทัดโค้ด', value: '15,000+' },
    { label: 'Components', value: '25+' },
    { label: 'สถานการณ์', value: '10' },
    { label: 'AI Agents', value: '7' },
    { label: 'ภาษา', value: 'ไทย/อังกฤษ' },
  ];

  metrics.forEach((metric, i) => {
    const x = 50 + (i * 130);

    addTextBox(slide, metric.value, x, 348, 110, 25, {
      fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
      fontSize: 18,
      bold: true,
      color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
      align: 'center'
    });
    addTextBox(slide, metric.label, x, 373, 110, 18, {
      fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG_TH.COLORS.GRAY_500,
      align: 'center'
    });
  });
}

// ============================================
// SLIDE 19: Call to Action
// ============================================

function createSlide19_CallToAction_TH(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG_TH.COLORS.BLACK);

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 4, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 285, 50, 150, 150, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);
  addTextBox(slide, '🌟', 325, 95, 70, 60, {
    fontSize: 48,
    align: 'center'
  });

  addTextBox(slide, 'GALAXY AGENTS', 60, 210, 600, 50, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 40,
    bold: true,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });

  addTextBox(slide, 'ปกป้องประเทศไทยจากวิกฤตมิจฉาชีพ ฿115 พันล้านบาท', 60, 260, 600, 30, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 18,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'center'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 160, 300, 400, 60, PITCH_CONFIG_TH.COLORS.DARK_CARD, PITCH_CONFIG_TH.COLORS.NEON_GREEN);

  addTextBox(slide, '🚀 พร้อม Demo  |  🤝 ต้องการพันธมิตร  |  💰 Seed Funding', 170, 318, 380, 30, {
    fontFamily: PITCH_CONFIG_TH.FONTS.BODY,
    fontSize: 13,
    color: PITCH_CONFIG_TH.COLORS.WHITE,
    align: 'center'
  });

  addTextBox(slide, 'ขอบคุณครับ 🙏', 60, 365, 600, 25, {
    fontFamily: PITCH_CONFIG_TH.FONTS.TITLE,
    fontSize: 18,
    color: PITCH_CONFIG_TH.COLORS.GRAY_400,
    align: 'center'
  });

  addTextBox(slide, 'galaxyagents.vercel.app', 60, 385, 600, 20, {
    fontFamily: PITCH_CONFIG_TH.FONTS.MONO,
    fontSize: 12,
    color: PITCH_CONFIG_TH.COLORS.NEON_GREEN,
    align: 'center'
  });
}

// ============================================
// UTILITY
// ============================================

function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Galaxy Agents')
    .addItem('สร้าง Pitch Deck (ไทย)', 'createGalaxyAgentsPitchDeckThai')
    .addToUi();
}
