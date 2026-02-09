/**
 * ==========================================
 * GALAXY AGENTS - BUSINESS MODEL CANVAS
 * ==========================================
 *
 * Google Apps Script สร้าง Business Model Canvas
 * รูปแบบมาตรฐาน 9 ช่อง (Osterwalder) ขนาด 16:9 Landscape
 *
 * ผลลัพธ์: Google Slides 1 หน้า เต็มหน้ากระดาษ
 *
 * วิธีใช้:
 * 1. ไป script.google.com
 * 2. สร้าง project ใหม่
 * 3. วางโค้ดนี้ทั้งหมด
 * 4. รัน createBusinessModelCanvas()
 * 5. ตรวจสอบใน Google Drive
 */

// ============================================
// CONFIGURATION
// ============================================

const BMC_CONFIG = {
  // Colors (Galaxy Agents theme)
  COLORS: {
    BLACK: '000000',
    DARK_BG: '0A0F1A',
    DARK_CARD: '111827',
    NEON_GREEN: '43FF4D',
    DANGER_RED: 'FF4444',
    WARNING_ORANGE: 'F59E0B',
    WHITE: 'FFFFFF',
    GRAY_300: 'D1D5DB',
    GRAY_400: '9CA3AF',
    GRAY_500: '6B7280',
    PURPLE: '6366F1',
    BLUE: '3B82F6',
    TEAL: '14B8A6',
    PINK: 'EC4899',
  },

  // Fonts
  FONTS: {
    TITLE: 'Kanit',
    BODY: 'Sarabun',
    MONO: 'IBM Plex Mono',
  },
};

// ============================================
// MAIN FUNCTION
// ============================================

function createBusinessModelCanvas() {
  const presentation = SlidesApp.create('Galaxy Agents - Business Model Canvas');
  const slides = presentation.getSlides();

  // Remove default slide
  if (slides.length > 0) {
    slides[0].remove();
  }

  // Create BMC slide
  createBMCSlide(presentation);

  Logger.log('Business Model Canvas created successfully!');
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

  if (options.lineSpacing) {
    paragraphStyle.setSpaceAbove(options.lineSpacing);
  }

  return textBox;
}

function addShape(slide, shapeType, left, top, width, height, fillColor, borderColor = null, borderWeight = 1) {
  const shape = slide.insertShape(shapeType, left, top, width, height);

  if (fillColor) {
    const rgb = hexToRgb(fillColor);
    shape.getFill().setSolidFill(rgb.red * 255, rgb.green * 255, rgb.blue * 255);
  }

  if (borderColor) {
    const rgb = hexToRgb(borderColor);
    shape.getBorder().getLineFill().setSolidFill(rgb.red * 255, rgb.green * 255, rgb.blue * 255);
    shape.getBorder().setWeight(borderWeight);
  } else {
    shape.getBorder().setTransparent();
  }

  return shape;
}

// ============================================
// BMC SLIDE - STANDARD 9-BLOCK FORMAT
// ============================================

function createBMCSlide(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, BMC_CONFIG.COLORS.DARK_BG);

  // ============================================
  // HEADER
  // ============================================

  // Logo area
  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 15, 8, 28, 28, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.NEON_GREEN, 2);
  addTextBox(slide, '🌟', 18, 12, 22, 22, { fontSize: 14, align: 'center' });

  // Title
  addTextBox(slide, 'GALAXY AGENTS', 50, 10, 200, 25, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 18,
    bold: true,
    color: BMC_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Subtitle
  addTextBox(slide, 'Business Model Canvas', 50, 28, 200, 15, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 10,
    color: BMC_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  // Tagline
  addTextBox(slide, 'AI-Powered Fraud Defense Platform | แพลตฟอร์มป้องกันการโกงด้วย AI', 280, 15, 420, 20, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 9,
    color: BMC_CONFIG.COLORS.GRAY_400,
    align: 'right'
  });

  // Date
  addTextBox(slide, 'February 2026 | Round 2 Submission', 280, 30, 420, 15, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 7,
    color: BMC_CONFIG.COLORS.GRAY_500,
    align: 'right'
  });

  // ============================================
  // BMC GRID LAYOUT (Standard Osterwalder)
  // ============================================

  // Grid dimensions
  const gridTop = 48;
  const gridLeft = 10;
  const gridWidth = 700;
  const gridHeight = 345;

  // Column widths (5 columns)
  const col1 = gridLeft;                    // Key Partners
  const col2 = gridLeft + 140;              // Key Activities / Key Resources
  const col3 = gridLeft + 280;              // Value Propositions
  const col4 = gridLeft + 420;              // Customer Relationships / Channels
  const col5 = gridLeft + 560;              // Customer Segments

  // Row heights
  const row1 = gridTop;                     // Top row
  const row2 = gridTop + 172;               // Middle split
  const row3 = gridTop + 275;               // Cost/Revenue row

  // Cell dimensions
  const cellW1 = 135;   // Standard column width
  const cellW2 = 135;   // Value Props width
  const cellH1 = 170;   // Full height cells
  const cellH2 = 100;   // Half height cells (Activities/Resources, Relations/Channels)
  const cellH3 = 68;    // Cost/Revenue height

  // ============================================
  // 1. KEY PARTNERS (Left column, full height)
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col1, row1, cellW1, cellH1, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.PURPLE, 2);

  addTextBox(slide, '🤝 KEY PARTNERS', col1 + 5, row1 + 5, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.PURPLE,
    align: 'left'
  });

  const keyPartners = `• Banks: SCB, KBANK, BBL, KTB
  Distribution + Revenue share

• Telecoms: AIS, TRUE, DTAC
  Spam filtering + Co-marketing

• Government: BOT, DEPA, Police
  Data sharing + Legitimacy

• Tech: LINE, Google, Meta
  Platform integration

• Insurance: AIA, Muang Thai
  Fraud insurance bundles

• Academic: Chula, NECTEC
  AI research collaboration`;

  addTextBox(slide, keyPartners, col1 + 5, row1 + 22, cellW1 - 10, cellH1 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 2. KEY ACTIVITIES (Second column, top half)
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col2, row1, cellW1, cellH2, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.TEAL, 2);

  addTextBox(slide, '⚡ KEY ACTIVITIES', col2 + 5, row1 + 5, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.TEAL,
    align: 'left'
  });

  const keyActivities = `• AI Model Training
  Continuous accuracy improvement

• Fraud Data Collection
  New scam patterns daily

• Platform Development
  Build & maintain apps/APIs

• Content Creation
  Simulations & education

• Partnership Management
  Bank & telecom relationships`;

  addTextBox(slide, keyActivities, col2 + 5, row1 + 22, cellW1 - 10, cellH2 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 3. KEY RESOURCES (Second column, bottom half)
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col2, row1 + cellH2 + 2, cellW1, cellH1 - cellH2 - 2, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.WARNING_ORANGE, 2);

  addTextBox(slide, '🔑 KEY RESOURCES', col2 + 5, row1 + cellH2 + 7, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.WARNING_ORANGE,
    align: 'left'
  });

  const keyResources = `• AI/ML Models (NLP Thai)
• 10,000+ fraud patterns DB
• 7 AI Agent characters
• Cloud infrastructure
• 14-person team
• Proprietary algorithms`;

  addTextBox(slide, keyResources, col2 + 5, row1 + cellH2 + 24, cellW1 - 10, 50, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 4. VALUE PROPOSITIONS (Center column, full height)
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col3, row1, cellW2, cellH1, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.NEON_GREEN, 2);

  addTextBox(slide, '💎 VALUE PROPOSITIONS', col3 + 5, row1 + 5, cellW2 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  const valueProps = `FOR INDIVIDUALS:
⚡ Real-time SMS/URL/QR protection
🎮 Learn scams via simulations
🇹🇭 Thai-first, culturally relevant
🤖 24/7 AI Guardian (น้องฟ้า)
👨‍👩‍👧 Family protection features

FOR ENTERPRISES:
📉 95% fraud detection rate
✅ BOT compliance ready
🔌 Easy API integration
📊 Behavioral analytics
🏷️ White-label available

UNIQUE DIFFERENTIATORS:
• 7 specialized AI Agents
• Evil transformation system
• Largest Thai scam database
• Gamified fraud education`;

  addTextBox(slide, valueProps, col3 + 5, row1 + 22, cellW2 - 10, cellH1 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 5. CUSTOMER RELATIONSHIPS (Fourth column, top half)
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col4, row1, cellW1, cellH2, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.PINK, 2);

  addTextBox(slide, '💝 CUSTOMER RELATIONSHIPS', col4 + 5, row1 + 5, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 7,
    bold: true,
    color: BMC_CONFIG.COLORS.PINK,
    align: 'left'
  });

  const customerRel = `• Free Users: Self-service +
  AI chatbot support

• Premium: Dedicated AI guardian
  + Priority alerts

• Enterprise: Account manager
  + SLA support

• Engagement:
  Gamification, badges, streaks
  Push alerts, monthly reports
  Family protection features`;

  addTextBox(slide, customerRel, col4 + 5, row1 + 22, cellW1 - 10, cellH2 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 6. CHANNELS (Fourth column, bottom half)
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col4, row1 + cellH2 + 2, cellW1, cellH1 - cellH2 - 2, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.BLUE, 2);

  addTextBox(slide, '📢 CHANNELS', col4 + 5, row1 + cellH2 + 7, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.BLUE,
    align: 'left'
  });

  const channels = `• Mobile Apps (iOS/Android)
• Web App (PWA)
• LINE Official (52M users)
• Bank partnerships
• Social Media (TikTok, FB)
• Government programs`;

  addTextBox(slide, channels, col4 + 5, row1 + cellH2 + 24, cellW1 - 10, 50, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 7. CUSTOMER SEGMENTS (Right column, full height)
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col5, row1, cellW1, cellH1, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.DANGER_RED, 2);

  addTextBox(slide, '👥 CUSTOMER SEGMENTS', col5 + 5, row1 + 5, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.DANGER_RED,
    align: 'left'
  });

  const customerSegments = `B2C - INDIVIDUALS:
• 51M+ mobile wallet users
• Ages 18-65, smartphone users
• 72% face scam attempts
• Elderly & vulnerable groups

B2B - FINANCIAL:
• 177 FinTech companies
• Major banks (SCB, KBANK...)
• 144M digital banking accounts
• Insurance companies

B2B2C - TELECOM:
• AIS, TRUE, DTAC
• 130M scam texts/year

GOVERNMENT:
• BOT, DEPA, Police
• Digital literacy programs`;

  addTextBox(slide, customerSegments, col5 + 5, row1 + 22, cellW1 - 10, cellH1 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 8. COST STRUCTURE (Bottom left, half width)
  // ============================================
  const costWidth = 345;
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col1, row3, costWidth, cellH3, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.WARNING_ORANGE, 2);

  addTextBox(slide, '💰 COST STRUCTURE', col1 + 5, row3 + 5, 150, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.WARNING_ORANGE,
    align: 'left'
  });

  addTextBox(slide, 'Monthly Burn: ฿2.5M | Runway: 2.5 years to break-even', col1 + 160, row3 + 5, 180, 15, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 6,
    color: BMC_CONFIG.COLORS.GRAY_500,
    align: 'right'
  });

  const costStructure = `FIXED COSTS (฿480K/mo):                    VARIABLE COSTS:                           PERSONNEL (฿1.15M/mo):
• Cloud Infrastructure: ฿150K              • API Calls: ฿0.10/call (10M/mo)          • Engineering (7): ฿700K
• AI/ML Computing: ฿200K                   • SMS Notifications: ฿0.50/SMS            • Business (4): ฿300K
• Office & Utilities: ฿80K                 • Customer Support: ฿15/ticket            • Operations (3): ฿150K
• Software Licenses: ฿50K`;

  addTextBox(slide, costStructure, col1 + 5, row3 + 22, costWidth - 10, 45, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 5.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 9. REVENUE STREAMS (Bottom right, half width)
  // ============================================
  const revLeft = col1 + costWidth + 5;
  const revWidth = 345;
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, revLeft, row3, revWidth, cellH3, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.NEON_GREEN, 2);

  addTextBox(slide, '💵 REVENUE STREAMS', revLeft + 5, row3 + 5, 150, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, 'Year 1 Target: ฿75M (~$2.2M USD)', revLeft + 160, row3 + 5, 180, 15, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 6,
    color: BMC_CONFIG.COLORS.GRAY_500,
    align: 'right'
  });

  const revenueStreams = `B2C SUBSCRIPTIONS:                         B2B ENTERPRISE:                            YEAR 1 PROJECTIONS:
• Free: ฿0 (5 checks/day)                  • API Access: ฿50K-500K/mo                • B2C: ฿45M (500K users, 5% convert)
• Guardian: ฿99/mo (unlimited)             • White-Label: ฿2M + ฿200K/mo             • B2B: ฿30M (3 banks + 5 FinTech)
• Shield: ฿299/mo (+insurance)             • Enterprise: Custom pricing              • Total: ฿75M annual revenue`;

  addTextBox(slide, revenueStreams, revLeft + 5, row3 + 22, revWidth - 10, 45, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 5.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // FOOTER - KEY METRICS
  // ============================================

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 10, 395, 700, 2, BMC_CONFIG.COLORS.NEON_GREEN);

  const metrics = 'TAM: $65B (Global AI Fraud 2034)  |  SAM: $500M (Thailand + SEA)  |  SOM: $15M (Year 3)  |  Thailand Fraud Loss: ฿115.3B/year (GASA 2025)  |  72% Thais face scams';

  addTextBox(slide, metrics, 10, 398, 700, 12, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 6,
    color: BMC_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// THAI VERSION
// ============================================

function createBusinessModelCanvasThai() {
  const presentation = SlidesApp.create('Galaxy Agents - Business Model Canvas (TH)');
  const slides = presentation.getSlides();

  if (slides.length > 0) {
    slides[0].remove();
  }

  createBMCSlideThai(presentation);

  Logger.log('Business Model Canvas (Thai) created successfully!');
  Logger.log('URL: ' + presentation.getUrl());

  return presentation.getUrl();
}

function createBMCSlideThai(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, BMC_CONFIG.COLORS.DARK_BG);

  // ============================================
  // HEADER
  // ============================================

  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 15, 8, 28, 28, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.NEON_GREEN, 2);
  addTextBox(slide, '🌟', 18, 12, 22, 22, { fontSize: 14, align: 'center' });

  addTextBox(slide, 'GALAXY AGENTS', 50, 10, 200, 25, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 18,
    bold: true,
    color: BMC_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  addTextBox(slide, 'Business Model Canvas', 50, 28, 200, 15, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 10,
    color: BMC_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, 'แพลตฟอร์มป้องกันการโกงด้วย AI | AI-Powered Fraud Defense Platform', 280, 15, 420, 20, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 9,
    color: BMC_CONFIG.COLORS.GRAY_400,
    align: 'right'
  });

  addTextBox(slide, 'กุมภาพันธ์ 2569 | Round 2 Submission', 280, 30, 420, 15, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 7,
    color: BMC_CONFIG.COLORS.GRAY_500,
    align: 'right'
  });

  // ============================================
  // BMC GRID LAYOUT
  // ============================================

  const gridTop = 48;
  const gridLeft = 10;

  const col1 = gridLeft;
  const col2 = gridLeft + 140;
  const col3 = gridLeft + 280;
  const col4 = gridLeft + 420;
  const col5 = gridLeft + 560;

  const row1 = gridTop;
  const row3 = gridTop + 275;

  const cellW1 = 135;
  const cellW2 = 135;
  const cellH1 = 170;
  const cellH2 = 100;
  const cellH3 = 68;

  // ============================================
  // 1. พันธมิตรหลัก
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col1, row1, cellW1, cellH1, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.PURPLE, 2);

  addTextBox(slide, '🤝 พันธมิตรหลัก', col1 + 5, row1 + 5, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.PURPLE,
    align: 'left'
  });

  const keyPartnersTH = `• ธนาคาร: SCB, KBANK, BBL, KTB
  Distribution + แบ่งรายได้

• โทรคมนาคม: AIS, TRUE, DTAC
  กรอง Spam + Co-marketing

• รัฐบาล: BOT, DEPA, ตำรวจ
  แชร์ข้อมูล + ความน่าเชื่อถือ

• เทค: LINE, Google, Meta
  Platform integration

• ประกันภัย: AIA, เมืองไทย
  Bundled products

• วิชาการ: จุฬาฯ, NECTEC
  ร่วมวิจัย AI`;

  addTextBox(slide, keyPartnersTH, col1 + 5, row1 + 22, cellW1 - 10, cellH1 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 2. กิจกรรมหลัก
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col2, row1, cellW1, cellH2, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.TEAL, 2);

  addTextBox(slide, '⚡ กิจกรรมหลัก', col2 + 5, row1 + 5, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.TEAL,
    align: 'left'
  });

  const keyActivitiesTH = `• Training โมเดล AI
  ปรับปรุงความแม่นยำต่อเนื่อง

• รวบรวมข้อมูลโกง
  รูปแบบกลโกงใหม่ทุกวัน

• พัฒนาแพลตฟอร์ม
  สร้างและดูแลแอป/API

• สร้างเนื้อหา
  สถานการณ์จำลอง + การศึกษา

• จัดการพันธมิตร`;

  addTextBox(slide, keyActivitiesTH, col2 + 5, row1 + 22, cellW1 - 10, cellH2 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 3. ทรัพยากรหลัก
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col2, row1 + cellH2 + 2, cellW1, cellH1 - cellH2 - 2, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.WARNING_ORANGE, 2);

  addTextBox(slide, '🔑 ทรัพยากรหลัก', col2 + 5, row1 + cellH2 + 7, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.WARNING_ORANGE,
    align: 'left'
  });

  const keyResourcesTH = `• โมเดล AI/ML (NLP ภาษาไทย)
• ฐานข้อมูล 10,000+ รูปแบบโกง
• AI Agent 7 ตัว
• Cloud infrastructure
• ทีมงาน 14 คน
• อัลกอริทึมเฉพาะ`;

  addTextBox(slide, keyResourcesTH, col2 + 5, row1 + cellH2 + 24, cellW1 - 10, 50, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 4. คุณค่าที่นำเสนอ
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col3, row1, cellW2, cellH1, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.NEON_GREEN, 2);

  addTextBox(slide, '💎 คุณค่าที่นำเสนอ', col3 + 5, row1 + 5, cellW2 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  const valuePropsTH = `สำหรับผู้ใช้ทั่วไป:
⚡ ป้องกัน SMS/URL/QR Real-time
🎮 เรียนรู้กลโกงผ่านจำลอง
🇹🇭 ออกแบบเพื่อคนไทย
🤖 AI Guardian 24/7 (น้องฟ้า)
👨‍👩‍👧 ปกป้องครอบครัว

สำหรับองค์กร:
📉 ตรวจจับโกงแม่นยำ 95%
✅ สอดคล้อง BOT
🔌 API integration ง่าย
📊 วิเคราะห์พฤติกรรม
🏷️ White-label พร้อม

จุดแตกต่าง:
• 7 AI Agents เฉพาะทาง
• ระบบแปลงร่างชั่วร้าย
• ฐานข้อมูลโกงไทยใหญ่สุด`;

  addTextBox(slide, valuePropsTH, col3 + 5, row1 + 22, cellW2 - 10, cellH1 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 5. ความสัมพันธ์ลูกค้า
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col4, row1, cellW1, cellH2, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.PINK, 2);

  addTextBox(slide, '💝 ความสัมพันธ์ลูกค้า', col4 + 5, row1 + 5, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 7,
    bold: true,
    color: BMC_CONFIG.COLORS.PINK,
    align: 'left'
  });

  const customerRelTH = `• ผู้ใช้ฟรี: Self-service +
  AI chatbot support

• Premium: AI guardian เฉพาะ
  + แจ้งเตือนลำดับแรก

• องค์กร: Account manager
  + SLA support

• การมีส่วนร่วม:
  Gamification, ตรา, streaks
  Push alerts, รายงานรายเดือน`;

  addTextBox(slide, customerRelTH, col4 + 5, row1 + 22, cellW1 - 10, cellH2 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 6. ช่องทาง
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col4, row1 + cellH2 + 2, cellW1, cellH1 - cellH2 - 2, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.BLUE, 2);

  addTextBox(slide, '📢 ช่องทาง', col4 + 5, row1 + cellH2 + 7, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.BLUE,
    align: 'left'
  });

  const channelsTH = `• Mobile Apps (iOS/Android)
• Web App (PWA)
• LINE Official (52M ผู้ใช้)
• พันธมิตรธนาคาร
• Social Media (TikTok, FB)
• โปรแกรมภาครัฐ`;

  addTextBox(slide, channelsTH, col4 + 5, row1 + cellH2 + 24, cellW1 - 10, 50, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 7. กลุ่มลูกค้า
  // ============================================
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col5, row1, cellW1, cellH1, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.DANGER_RED, 2);

  addTextBox(slide, '👥 กลุ่มลูกค้า', col5 + 5, row1 + 5, cellW1 - 10, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.DANGER_RED,
    align: 'left'
  });

  const customerSegmentsTH = `B2C - ผู้ใช้ทั่วไป:
• 51 ล้าน+ ผู้ใช้ Mobile Wallet
• อายุ 18-65 ใช้สมาร์ทโฟน
• 72% เจอมิจฉาชีพ
• ผู้สูงอายุและกลุ่มเปราะบาง

B2B - สถาบันการเงิน:
• 177 บริษัท FinTech
• ธนาคารใหญ่ (SCB, KBANK...)
• 144 ล้านบัญชี digital banking
• บริษัทประกันภัย

B2B2C - โทรคมนาคม:
• AIS, TRUE, DTAC
• 130 ล้าน SMS หลอกลวง/ปี

ภาครัฐ:
• BOT, DEPA, ตำรวจ`;

  addTextBox(slide, customerSegmentsTH, col5 + 5, row1 + 22, cellW1 - 10, cellH1 - 30, {
    fontFamily: BMC_CONFIG.FONTS.BODY,
    fontSize: 6.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 8. โครงสร้างต้นทุน
  // ============================================
  const costWidth = 345;
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, col1, row3, costWidth, cellH3, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.WARNING_ORANGE, 2);

  addTextBox(slide, '💰 โครงสร้างต้นทุน', col1 + 5, row3 + 5, 150, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.WARNING_ORANGE,
    align: 'left'
  });

  addTextBox(slide, 'ค่าใช้จ่าย/เดือน: ฿2.5M | Runway: 2.5 ปีถึงคุ้มทุน', col1 + 160, row3 + 5, 180, 15, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 6,
    color: BMC_CONFIG.COLORS.GRAY_500,
    align: 'right'
  });

  const costStructureTH = `ต้นทุนคงที่ (฿480K/เดือน):                 ต้นทุนผันแปร:                              บุคลากร (฿1.15M/เดือน):
• Cloud Infrastructure: ฿150K              • API Calls: ฿0.10/call (10M/เดือน)        • Engineering (7): ฿700K
• AI/ML Computing: ฿200K                   • SMS Notifications: ฿0.50/SMS            • Business (4): ฿300K
• สำนักงาน: ฿80K                            • Customer Support: ฿15/ticket            • Operations (3): ฿150K
• Software Licenses: ฿50K`;

  addTextBox(slide, costStructureTH, col1 + 5, row3 + 22, costWidth - 10, 45, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 5.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // 9. กระแสรายได้
  // ============================================
  const revLeft = col1 + costWidth + 5;
  const revWidth = 345;
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, revLeft, row3, revWidth, cellH3, BMC_CONFIG.COLORS.DARK_CARD, BMC_CONFIG.COLORS.NEON_GREEN, 2);

  addTextBox(slide, '💵 กระแสรายได้', revLeft + 5, row3 + 5, 150, 15, {
    fontFamily: BMC_CONFIG.FONTS.TITLE,
    fontSize: 8,
    bold: true,
    color: BMC_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, 'เป้าหมายปีที่ 1: ฿75M (~$2.2M USD)', revLeft + 160, row3 + 5, 180, 15, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 6,
    color: BMC_CONFIG.COLORS.GRAY_500,
    align: 'right'
  });

  const revenueStreamsTH = `B2C สมาชิก:                                B2B องค์กร:                                คาดการณ์ปีที่ 1:
• ฟรี: ฿0 (5 ครั้ง/วัน)                      • API Access: ฿50K-500K/เดือน             • B2C: ฿45M (500K ผู้ใช้, 5% สมัคร)
• Guardian: ฿99/เดือน (ไม่จำกัด)            • White-Label: ฿2M + ฿200K/เดือน          • B2B: ฿30M (3 ธนาคาร + 5 FinTech)
• Shield: ฿299/เดือน (+ประกัน)              • Enterprise: ราคาพิเศษ                    • รวม: ฿75M รายได้ต่อปี`;

  addTextBox(slide, revenueStreamsTH, revLeft + 5, row3 + 22, revWidth - 10, 45, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 5.5,
    color: BMC_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // ============================================
  // FOOTER
  // ============================================

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 10, 395, 700, 2, BMC_CONFIG.COLORS.NEON_GREEN);

  const metricsTH = 'TAM: $65B (AI Fraud โลก 2577)  |  SAM: $500M (ไทย + SEA)  |  SOM: $15M (ปีที่ 3)  |  ความเสียหายโกงไทย: ฿115.3B/ปี (GASA 2568)  |  72% คนไทยเจอมิจฉาชีพ';

  addTextBox(slide, metricsTH, 10, 398, 700, 12, {
    fontFamily: BMC_CONFIG.FONTS.MONO,
    fontSize: 6,
    color: BMC_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// UTILITY
// ============================================

function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Galaxy Agents BMC')
    .addItem('Create BMC (English)', 'createBusinessModelCanvas')
    .addItem('Create BMC (Thai)', 'createBusinessModelCanvasThai')
    .addToUi();
}
