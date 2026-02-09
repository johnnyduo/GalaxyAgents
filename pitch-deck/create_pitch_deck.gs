/**
 * ==========================================
 * GALAXY AGENTS - PITCH DECK GENERATOR
 * ==========================================
 *
 * Google Apps Script to create a professional 16:9 pitch deck
 * for Round 2 submission (Deadline: 11 Feb 2026 @ 11:59 PM)
 *
 * COLOR PALETTE (from Galaxy Agents web app):
 * - Primary Green (Neon): #43FF4D / #39FF14
 * - Background Black: #000000 / #111827
 * - Accent Red (Danger): #FF4444 / #EF4444
 * - Text White: #FFFFFF
 * - Text Gray: #9CA3AF
 * - Purple Accent: #6366F1
 * - Blue Accent: #3B82F6
 *
 * HOW TO USE:
 * 1. Open Google Apps Script (script.google.com)
 * 2. Create new project
 * 3. Paste this entire script
 * 4. Run createGalaxyAgentsPitchDeck()
 * 5. Check your Google Drive for "Galaxy Agents - Pitch Deck"
 */

// ============================================
// CONFIGURATION
// ============================================

const PITCH_CONFIG = {
  // Slide dimensions (16:9)
  WIDTH: 720,  // points (10 inches)
  HEIGHT: 405, // points (5.625 inches)

  // Colors (hex without #)
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

  // Fonts
  FONTS: {
    TITLE: 'Kanit',
    BODY: 'Sarabun',
    MONO: 'IBM Plex Mono',
  },

  // Cinematic images from Pexels (royalty-free, no watermark)
  IMAGES: {
    HERO: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg', // Cyber security
    TEAM: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', // Team collaboration
    PROBLEM: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg', // Security warning
    TECH: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg', // Technology
    DATA: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg', // Data visualization
    MOBILE: 'https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg', // Mobile phone
    CITY: 'https://images.pexels.com/photos/1756652/pexels-photo-1756652.jpeg', // Bangkok city
    MARKET: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg', // Market graph
    SHIELD: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg', // Shield
  }
};

// ============================================
// MAIN FUNCTION
// ============================================

function createGalaxyAgentsPitchDeck() {
  // Create new presentation
  const presentation = SlidesApp.create('Galaxy Agents - Pitch Deck');
  const slides = presentation.getSlides();

  // Remove default blank slide
  if (slides.length > 0) {
    slides[0].remove();
  }

  // Set page size to 16:9
  // Note: Google Slides API doesn't allow changing size after creation
  // The default is already 16:9 (10" x 5.625")

  // Create all slides
  createSlide01_Cover(presentation);
  createSlide02_TeamProfile(presentation);
  createSlide03_Problem(presentation);
  createSlide04_Solution(presentation);
  createSlide05_KeyFeatures(presentation);
  createSlide06_UserInsight(presentation);
  createSlide07_FraudImpact(presentation);
  createSlide08_TechStack(presentation);
  createSlide09_Architecture(presentation);
  createSlide10_DevMethodology(presentation);
  createSlide11_DevTimeline(presentation);
  createSlide12_MarketPotential(presentation);
  createSlide13_TargetCustomer(presentation);
  createSlide14_ValueProposition(presentation);
  createSlide15_RevenueModel(presentation);
  createSlide16_Competitive(presentation);
  createSlide17_GoToMarket(presentation);
  createSlide18_Demo(presentation);
  createSlide19_CallToAction(presentation);

  Logger.log('Pitch deck created successfully!');
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

  // Set font
  if (options.fontFamily) style.setFontFamily(options.fontFamily);
  if (options.fontSize) style.setFontSize(options.fontSize);
  if (options.bold) style.setBold(true);
  if (options.italic) style.setItalic(true);

  // Set color
  if (options.color) {
    const rgb = hexToRgb(options.color);
    style.setForegroundColor(rgb.red * 255, rgb.green * 255, rgb.blue * 255);
  }

  // Set alignment
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

function addGradientOverlay(slide, left, top, width, height, direction = 'vertical') {
  const shape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, left, top, width, height);
  shape.getBorder().setTransparent();
  // Note: Google Apps Script has limited gradient support
  // Using semi-transparent black instead
  shape.getFill().setSolidFill(0, 0, 0, 0.7);
  return shape;
}

// ============================================
// SLIDE 1: COVER
// ============================================

function createSlide01_Cover(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.BLACK);

  // Background gradient overlay
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 405, PITCH_CONFIG.COLORS.DARK_BG);

  // Accent line top
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 4, PITCH_CONFIG.COLORS.NEON_GREEN);

  // Logo area (circle placeholder)
  const logoCircle = addShape(slide, SlidesApp.ShapeType.ELLIPSE, 310, 60, 100, 100, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);

  // Title
  addTextBox(slide, 'GALAXY AGENTS', 60, 180, 600, 60, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 48,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });

  // Subtitle
  addTextBox(slide, 'AI-Powered Fraud Defense Platform', 60, 245, 600, 35, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 24,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'center'
  });

  // Tagline
  addTextBox(slide, 'Protecting Thai Citizens from Online Scams with Intelligent AI Agents', 60, 290, 600, 30, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 16,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });

  // Bottom info bar
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 0, 365, 720, 40, PITCH_CONFIG.COLORS.DARK_CARD);

  addTextBox(slide, 'Round 2 Submission | February 2026', 60, 375, 200, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_500,
    align: 'left'
  });

  addTextBox(slide, 'Fraud Defense Hackathon', 460, 375, 200, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'right'
  });
}

// ============================================
// SLIDE 2: TEAM PROFILE
// ============================================

function createSlide02_TeamProfile(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 120, 25, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '01 TEAM', 35, 22, 110, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Team Profile', 30, 55, 400, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Team cards (3 columns)
  const teamMembers = [
    { role: 'Team Lead / AI Engineer', skills: 'Machine Learning, NLP\nFraud Pattern Analysis', color: PITCH_CONFIG.COLORS.NEON_GREEN },
    { role: 'Full-Stack Developer', skills: 'React, TypeScript\nNode.js, Cloud Architecture', color: PITCH_CONFIG.COLORS.BLUE },
    { role: 'UX/UI Designer', skills: 'User Research\nThai Localization', color: PITCH_CONFIG.COLORS.PURPLE },
  ];

  teamMembers.forEach((member, i) => {
    const x = 30 + (i * 225);

    // Card background
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 105, 210, 180, PITCH_CONFIG.COLORS.DARK_CARD, member.color);

    // Avatar placeholder
    addShape(slide, SlidesApp.ShapeType.ELLIPSE, x + 75, 115, 60, 60, PITCH_CONFIG.COLORS.GRAY_500);

    // Role
    addTextBox(slide, member.role, x + 10, 185, 190, 25, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 13,
      bold: true,
      color: member.color,
      align: 'center'
    });

    // Skills
    addTextBox(slide, member.skills, x + 10, 215, 190, 60, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 11,
      color: PITCH_CONFIG.COLORS.GRAY_400,
      align: 'center'
    });
  });

  // Responsibilities section
  addTextBox(slide, 'Key Responsibilities', 30, 300, 200, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  const responsibilities = [
    '• AI model development & training for fraud detection',
    '• Web/Mobile app development with React ecosystem',
    '• User experience design focused on Thai users',
    '• Real-time threat intelligence & pattern analysis'
  ];

  addTextBox(slide, responsibilities.join('\n'), 30, 325, 660, 70, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });
}

// ============================================
// SLIDE 3: PROBLEM STATEMENT
// ============================================

function createSlide03_Problem(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 150, 25, PITCH_CONFIG.COLORS.DANGER_RED);
  addTextBox(slide, '02 PROBLEM', 35, 22, 140, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Thailand\'s ฿115 Billion Scam Crisis', 30, 55, 500, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Big stat cards
  const stats = [
    { value: '฿115.3B', label: 'Annual Losses', sublabel: 'GASA Report 2025', color: PITCH_CONFIG.COLORS.DANGER_RED },
    { value: '72%', label: 'Face Scam Attempts', sublabel: 'Thai Adults', color: PITCH_CONFIG.COLORS.WARNING_ORANGE },
    { value: '6 in 10', label: 'Fallen Victim', sublabel: 'Thai Citizens', color: PITCH_CONFIG.COLORS.DANGER_RED },
    { value: '130M', label: 'Scam Texts/Year', sublabel: '112% increase YoY', color: PITCH_CONFIG.COLORS.WARNING_ORANGE },
  ];

  stats.forEach((stat, i) => {
    const x = 30 + (i * 170);

    // Card
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 105, 160, 110, PITCH_CONFIG.COLORS.DARK_CARD, stat.color);

    // Value
    addTextBox(slide, stat.value, x + 10, 115, 140, 40, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 28,
      bold: true,
      color: stat.color,
      align: 'center'
    });

    // Label
    addTextBox(slide, stat.label, x + 10, 155, 140, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 12,
      bold: true,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'center'
    });

    // Sublabel
    addTextBox(slide, stat.sublabel, x + 10, 178, 140, 25, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_500,
      align: 'center'
    });
  });

  // Problem bullets
  addTextBox(slide, 'Key Challenges', 30, 230, 200, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  const problems = [
    '• Scammers evolve faster than traditional security tools',
    '• Elderly & vulnerable populations lack digital literacy',
    '• No unified, Thai-focused fraud defense platform exists',
    '• Banks lose billions; customers lose trust'
  ];

  addTextBox(slide, problems.join('\n'), 30, 255, 400, 100, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 13,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Quote box
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 450, 230, 240, 100, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.DANGER_RED);
  addTextBox(slide, '"Thai citizens lose ฿60-70 million DAILY to online scams"', 460, 245, 220, 60, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 13,
    italic: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });
  addTextBox(slide, '— Royal Thai Police, 2024', 460, 305, 220, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 9,
    color: PITCH_CONFIG.COLORS.GRAY_500,
    align: 'center'
  });

  // Source
  addTextBox(slide, 'Sources: GASA Thailand Report 2025, Nation Thailand, Insurance Journal', 30, 380, 660, 15, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 8,
    color: PITCH_CONFIG.COLORS.GRAY_500,
    align: 'left'
  });
}

// ============================================
// SLIDE 4: SOLUTION
// ============================================

function createSlide04_Solution(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 150, 25, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '03 SOLUTION', 35, 22, 140, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Galaxy Agents: AI-Powered Protection', 30, 55, 550, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Main description
  addTextBox(slide, 'A team of 7 specialized AI agents working together to detect, prevent, and educate Thai citizens about online fraud — in real-time.', 30, 100, 400, 50, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 14,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Agent cards (2 rows, showing key agents)
  const agents = [
    { name: 'ลุงสิงห์', role: 'Big Boss', icon: '🦁', desc: 'Commander', color: PITCH_CONFIG.COLORS.WARNING_ORANGE },
    { name: 'พี่เหยี่ยว', role: 'Hawk Eye', icon: '🦅', desc: 'Scout', color: PITCH_CONFIG.COLORS.TEAL },
    { name: 'ป้าฮูก', role: 'Memory Bank', icon: '🦉', desc: 'Database', color: PITCH_CONFIG.COLORS.PURPLE },
    { name: 'น้องฟ้า', role: 'Guardian', icon: '🦄', desc: 'Protector', color: PITCH_CONFIG.COLORS.BLUE },
    { name: 'ครูหมี', role: 'Trainer', icon: '🐻', desc: 'Educator', color: PITCH_CONFIG.COLORS.NEON_GREEN },
    { name: 'จ.ส.ต.จิ้งจอก', role: 'Money Guard', icon: '🦊', desc: 'Finance', color: PITCH_CONFIG.COLORS.WARNING_ORANGE },
    { name: 'ผบ.มังกร', role: 'Alert', icon: '🐉', desc: 'Alerter', color: PITCH_CONFIG.COLORS.DANGER_RED },
  ];

  agents.forEach((agent, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    const x = 30 + (col * 170);
    const y = 160 + (row * 95);

    // Card
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, y, 160, 85, PITCH_CONFIG.COLORS.DARK_CARD, agent.color);

    // Icon + Name row
    addTextBox(slide, agent.icon + ' ' + agent.name, x + 10, y + 10, 140, 25, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 14,
      bold: true,
      color: agent.color,
      align: 'left'
    });

    // English name
    addTextBox(slide, agent.role, x + 10, y + 35, 140, 20, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 11,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'left'
    });

    // Description
    addTextBox(slide, agent.desc, x + 10, y + 55, 140, 20, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_500,
      align: 'left'
    });
  });

  // Key differentiator
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 355, 660, 40, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '✓ Thai-First Design  |  ✓ Real-time Detection  |  ✓ Educational Simulations  |  ✓ 24/7 AI Guardian', 40, 365, 640, 25, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 12,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'center'
  });
}

// ============================================
// SLIDE 5: KEY FEATURES
// ============================================

function createSlide05_KeyFeatures(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 150, 25, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '04 FEATURES', 35, 22, 140, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Key Features', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  const features = [
    {
      title: 'Real-time Scam Detection',
      desc: 'AI analyzes SMS, calls, URLs, QR codes in milliseconds. Pattern matching against 10,000+ fraud signatures.',
      icon: '⚡',
      color: PITCH_CONFIG.COLORS.NEON_GREEN
    },
    {
      title: 'Interactive Fraud Simulations',
      desc: '10 realistic scenarios teaching users how scammers think. Evil agent transformation shows attack patterns.',
      icon: '🎮',
      color: PITCH_CONFIG.COLORS.DANGER_RED
    },
    {
      title: '24/7 AI Guardian (น้องฟ้า)',
      desc: 'Personal assistant answers questions, checks suspicious messages, and guides users through potential scams.',
      icon: '🛡️',
      color: PITCH_CONFIG.COLORS.BLUE
    },
    {
      title: 'Thai Fraud Database',
      desc: 'Largest collection of Thai-specific scam patterns. Historical data from 142+ documented cases.',
      icon: '📊',
      color: PITCH_CONFIG.COLORS.PURPLE
    },
    {
      title: 'Family Protection',
      desc: 'Monitor and protect elderly relatives. Share alerts across family members.',
      icon: '👨‍👩‍👧',
      color: PITCH_CONFIG.COLORS.TEAL
    },
    {
      title: 'Bank & App Integration',
      desc: 'API for banks and fintech. White-label solution for enterprises.',
      icon: '🏦',
      color: PITCH_CONFIG.COLORS.WARNING_ORANGE
    },
  ];

  features.forEach((feature, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 30 + (col * 345);
    const y = 100 + (row * 100);

    // Card
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, y, 330, 90, PITCH_CONFIG.COLORS.DARK_CARD, feature.color);

    // Icon
    addTextBox(slide, feature.icon, x + 15, y + 15, 30, 30, {
      fontSize: 24
    });

    // Title
    addTextBox(slide, feature.title, x + 55, y + 15, 260, 25, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 14,
      bold: true,
      color: feature.color,
      align: 'left'
    });

    // Description
    addTextBox(slide, feature.desc, x + 55, y + 42, 260, 45, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG.COLORS.GRAY_300,
      align: 'left'
    });
  });
}

// ============================================
// SLIDE 6: USER INSIGHT
// ============================================

function createSlide06_UserInsight(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 180, 25, PITCH_CONFIG.COLORS.BLUE);
  addTextBox(slide, '05 USER INSIGHT', 35, 22, 170, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Understanding Thai Scam Victims', 30, 55, 450, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // User personas
  const personas = [
    {
      name: 'สมชาย (Age 35)',
      type: 'Office Worker',
      pain: 'Receives 5+ scam SMS daily, unsure which are real',
      need: 'Quick way to verify messages',
      color: PITCH_CONFIG.COLORS.BLUE
    },
    {
      name: 'คุณยาย (Age 68)',
      type: 'Retiree',
      pain: 'Lost ฿50,000 to call center scam',
      need: '24/7 guardian, family can monitor',
      color: PITCH_CONFIG.COLORS.DANGER_RED
    },
    {
      name: 'พิม (Age 28)',
      type: 'Freelancer',
      pain: 'Almost fell for fake job offer',
      need: 'Education on new scam types',
      color: PITCH_CONFIG.COLORS.NEON_GREEN
    },
  ];

  personas.forEach((persona, i) => {
    const x = 30 + (i * 225);

    // Card
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 105, 215, 160, PITCH_CONFIG.COLORS.DARK_CARD, persona.color);

    // Avatar placeholder
    addShape(slide, SlidesApp.ShapeType.ELLIPSE, x + 77, 115, 60, 60, PITCH_CONFIG.COLORS.GRAY_500);

    // Name
    addTextBox(slide, persona.name, x + 10, 180, 195, 20, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 13,
      bold: true,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'center'
    });

    // Type
    addTextBox(slide, persona.type, x + 10, 198, 195, 18, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 10,
      color: persona.color,
      align: 'center'
    });

    // Pain
    addTextBox(slide, '😰 ' + persona.pain, x + 10, 218, 195, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_300,
      align: 'left'
    });

    // Need
    addTextBox(slide, '✅ ' + persona.need, x + 10, 243, 195, 20, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.NEON_GREEN,
      align: 'left'
    });
  });

  // Key insight box
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 280, 660, 70, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);

  addTextBox(slide, 'Key Insight', 45, 288, 100, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, 'Users don\'t just need protection — they need EDUCATION. Our simulation system teaches users how scammers think, making them permanently more vigilant. This creates lasting behavioral change, not just momentary alerts.', 45, 308, 630, 40, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 12,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Stats bar
  addTextBox(slide, '51M mobile wallet users  |  77M PromptPay registrations  |  92% use digital payments', 30, 365, 660, 25, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });

  addTextBox(slide, 'Source: Statista Thailand 2025, Bank of Thailand', 30, 385, 660, 15, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 8,
    color: PITCH_CONFIG.COLORS.GRAY_500,
    align: 'center'
  });
}

// ============================================
// SLIDE 7: FRAUD IMPACT / SOCIETAL IMPACT
// ============================================

function createSlide07_FraudImpact(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 210, 25, PITCH_CONFIG.COLORS.DANGER_RED);
  addTextBox(slide, '06 CYBERSECURITY IMPACT', 35, 22, 200, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Fraud Reduction & Societal Impact', 30, 55, 500, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Impact metrics
  const impacts = [
    { metric: '20%', label: 'Target Fraud Reduction', sublabel: '฿23B savings by 2027', color: PITCH_CONFIG.COLORS.NEON_GREEN },
    { metric: '95%', label: 'Detection Accuracy', sublabel: 'AI pattern matching', color: PITCH_CONFIG.COLORS.NEON_GREEN },
    { metric: '<1s', label: 'Detection Speed', sublabel: 'Real-time protection', color: PITCH_CONFIG.COLORS.BLUE },
    { metric: '1M+', label: 'Target Users', sublabel: 'Year 3 goal', color: PITCH_CONFIG.COLORS.PURPLE },
  ];

  impacts.forEach((impact, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 105, 160, 85, PITCH_CONFIG.COLORS.DARK_CARD, impact.color);

    addTextBox(slide, impact.metric, x + 10, 115, 140, 35, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 28,
      bold: true,
      color: impact.color,
      align: 'center'
    });

    addTextBox(slide, impact.label, x + 10, 150, 140, 20, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'center'
    });

    addTextBox(slide, impact.sublabel, x + 10, 170, 140, 18, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_500,
      align: 'center'
    });
  });

  // Social benefits
  addTextBox(slide, 'Societal Benefits', 30, 205, 200, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  const benefits = [
    { icon: '👴', title: 'Elderly Protection', desc: 'Most vulnerable group gets 24/7 AI guardian assistance' },
    { icon: '💰', title: 'Financial Inclusion', desc: 'Safe digital payments for underbanked populations' },
    { icon: '📚', title: 'Digital Literacy', desc: 'Gamified learning builds permanent fraud awareness' },
    { icon: '👮', title: 'Crime Reduction', desc: 'Data sharing with authorities to catch scammers' },
  ];

  benefits.forEach((benefit, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 230, 160, 70, PITCH_CONFIG.COLORS.DARK_CARD);

    addTextBox(slide, benefit.icon + ' ' + benefit.title, x + 10, 238, 140, 20, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG.COLORS.NEON_GREEN,
      align: 'left'
    });

    addTextBox(slide, benefit.desc, x + 10, 258, 140, 40, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_300,
      align: 'left'
    });
  });

  // UN SDG alignment
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 315, 660, 45, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.BLUE);

  addTextBox(slide, 'UN SDG Alignment', 45, 320, 150, 18, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLUE,
    align: 'left'
  });

  addTextBox(slide, 'SDG 8: Decent Work & Economic Growth  |  SDG 9: Industry & Innovation  |  SDG 16: Peace & Justice', 45, 338, 630, 18, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Quote
  addTextBox(slide, '"Every baht saved from scammers is a family protected from financial ruin."', 30, 370, 660, 25, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 13,
    italic: true,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// SLIDE 8: TECH STACK
// ============================================

function createSlide08_TechStack(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 180, 25, PITCH_CONFIG.COLORS.PURPLE);
  addTextBox(slide, '07 TECHNOLOGIES', 35, 22, 170, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Technology Stack', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Tech categories
  const categories = [
    {
      title: 'Frontend',
      items: ['React 18 + TypeScript', 'Vite Build System', 'TailwindCSS', 'GSAP Animations', 'ReactFlow'],
      color: PITCH_CONFIG.COLORS.BLUE
    },
    {
      title: 'AI / ML',
      items: ['Google Gemini API', 'TensorFlow.js', 'NLP for Thai', 'Pattern Matching', 'Anomaly Detection'],
      color: PITCH_CONFIG.COLORS.NEON_GREEN
    },
    {
      title: 'Backend',
      items: ['Node.js Runtime', 'Express API', 'IndexedDB Storage', 'WebSocket Real-time', 'REST APIs'],
      color: PITCH_CONFIG.COLORS.PURPLE
    },
    {
      title: 'Infrastructure',
      items: ['AWS / GCP Cloud', 'Docker Containers', 'CI/CD Pipeline', 'CDN Distribution', 'SSL/TLS Security'],
      color: PITCH_CONFIG.COLORS.TEAL
    },
  ];

  categories.forEach((cat, i) => {
    const x = 30 + (i * 170);

    // Card
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 100, 160, 180, PITCH_CONFIG.COLORS.DARK_CARD, cat.color);

    // Title
    addTextBox(slide, cat.title, x + 10, 108, 140, 25, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 14,
      bold: true,
      color: cat.color,
      align: 'center'
    });

    // Separator line
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x + 20, 132, 120, 2, cat.color);

    // Items
    addTextBox(slide, cat.items.map(item => '• ' + item).join('\n'), x + 15, 140, 130, 130, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 10,
      color: PITCH_CONFIG.COLORS.GRAY_300,
      align: 'left'
    });
  });

  // Key tech highlights
  addTextBox(slide, 'Technical Highlights', 30, 295, 200, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  const highlights = [
    '✓ Zero-dependency fraud detection (works offline)',
    '✓ <100ms response time for real-time protection',
    '✓ Thai language NLP with 95%+ accuracy',
    '✓ Scalable to 10M+ concurrent users'
  ];

  addTextBox(slide, highlights.join('     |     '), 30, 320, 660, 25, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  // Performance stats
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 355, 660, 40, PITCH_CONFIG.COLORS.DARK_CARD);
  addTextBox(slide, 'Performance: 98% uptime SLA  |  <100ms latency  |  10K+ req/sec  |  Auto-scaling', 40, 365, 640, 25, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// SLIDE 9: ARCHITECTURE
// ============================================

function createSlide09_Architecture(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 180, 25, PITCH_CONFIG.COLORS.PURPLE);
  addTextBox(slide, '08 ARCHITECTURE', 35, 22, 170, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'System Architecture', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Architecture diagram (simplified boxes)
  // User layer
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 105, 200, 50, PITCH_CONFIG.COLORS.BLUE, PITCH_CONFIG.COLORS.BLUE);
  addTextBox(slide, '📱 Mobile App / Web App\nUser Interface Layer', 35, 112, 190, 40, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });

  // Arrow down
  addTextBox(slide, '↓', 120, 155, 30, 25, {
    fontSize: 20,
    color: PITCH_CONFIG.COLORS.GRAY_500,
    align: 'center'
  });

  // API Gateway
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 180, 200, 40, PITCH_CONFIG.COLORS.TEAL, PITCH_CONFIG.COLORS.TEAL);
  addTextBox(slide, '🔒 API Gateway (Auth + Rate Limit)', 35, 188, 190, 25, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });

  // Arrow down
  addTextBox(slide, '↓', 120, 220, 30, 25, {
    fontSize: 20,
    color: PITCH_CONFIG.COLORS.GRAY_500,
    align: 'center'
  });

  // AI Agents layer
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 245, 200, 80, PITCH_CONFIG.COLORS.NEON_GREEN, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '🤖 AI Agent Orchestrator\n7 Specialized Agents\n• Detection • Analysis • Alert', 35, 252, 190, 70, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'center'
  });

  // Right side: Data layer
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 260, 105, 200, 220, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.PURPLE);
  addTextBox(slide, '💾 Data Layer\n\n• IndexedDB (Local)\n• Cloud Database\n• Fraud Pattern DB\n• User Profiles\n• Simulation History\n• ML Models', 270, 110, 180, 200, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // External services
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 490, 105, 200, 110, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.WARNING_ORANGE);
  addTextBox(slide, '🌐 External Services\n\n• Google Gemini AI\n• Bank APIs\n• Telecom SMS Gateway\n• Threat Intel Feeds', 500, 110, 180, 100, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Monitoring
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 490, 225, 200, 100, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.DANGER_RED);
  addTextBox(slide, '📊 Monitoring & Analytics\n\n• Real-time Dashboard\n• Fraud Analytics\n• User Behavior\n• System Health', 500, 230, 180, 90, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Key points
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 340, 660, 55, PITCH_CONFIG.COLORS.DARK_CARD);
  addTextBox(slide, 'Architecture Principles', 45, 345, 150, 18, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });
  addTextBox(slide, '• Microservices: Each agent is independently deployable\n• Event-driven: Real-time fraud alerts via WebSocket\n• Offline-first: Core detection works without internet', 45, 362, 620, 35, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });
}

// ============================================
// SLIDE 10: DEVELOPMENT METHODOLOGY
// ============================================

function createSlide10_DevMethodology(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG.COLORS.TEAL);
  addTextBox(slide, '09 METHODOLOGY', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Development Methodology', 30, 55, 400, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Agile methodology
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 330, 140, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.TEAL);

  addTextBox(slide, '🔄 Agile Scrum', 45, 108, 300, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG.COLORS.TEAL,
    align: 'left'
  });

  const agilePoints = [
    '• 2-week sprint cycles',
    '• Daily standups (15 min)',
    '• Sprint reviews with stakeholders',
    '• Continuous user feedback integration',
    '• Retrospectives for improvement'
  ];

  addTextBox(slide, agilePoints.join('\n'), 45, 135, 300, 100, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // DevOps
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 380, 100, 310, 140, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.PURPLE);

  addTextBox(slide, '🚀 DevOps & CI/CD', 395, 108, 280, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG.COLORS.PURPLE,
    align: 'left'
  });

  const devopsPoints = [
    '• GitHub Actions for CI/CD',
    '• Automated testing (Jest, Cypress)',
    '• Docker containerization',
    '• Blue-green deployments',
    '• Infrastructure as Code (Terraform)'
  ];

  addTextBox(slide, devopsPoints.join('\n'), 395, 135, 280, 100, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Quality assurance
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 255, 330, 100, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);

  addTextBox(slide, '✅ Quality Assurance', 45, 263, 300, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  const qaPoints = [
    '• 80%+ code coverage target',
    '• Security audits (OWASP top 10)',
    '• Performance benchmarking',
    '• Accessibility testing (WCAG 2.1)'
  ];

  addTextBox(slide, qaPoints.join('\n'), 45, 288, 300, 65, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // User research
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 380, 255, 310, 100, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.BLUE);

  addTextBox(slide, '👥 User Research', 395, 263, 280, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLUE,
    align: 'left'
  });

  const researchPoints = [
    '• Weekly user interviews',
    '• A/B testing for UI decisions',
    '• Analytics-driven iterations',
    '• Beta program with 100+ users'
  ];

  addTextBox(slide, researchPoints.join('\n'), 395, 288, 280, 65, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Tools bar
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 365, 660, 30, PITCH_CONFIG.COLORS.DARK_CARD);
  addTextBox(slide, 'Tools: GitHub | Jira | Figma | Slack | Notion | Vercel | AWS', 40, 372, 640, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// SLIDE 11: DEVELOPMENT TIMELINE
// ============================================

function createSlide11_DevTimeline(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 180, 25, PITCH_CONFIG.COLORS.WARNING_ORANGE);
  addTextBox(slide, '10 TIMELINE', 35, 22, 170, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Development Timeline', 30, 55, 350, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Timeline phases
  const phases = [
    { quarter: 'Q1 2026', title: 'MVP Launch', items: ['Core fraud detection', 'Web app release', '100K users target'], color: PITCH_CONFIG.COLORS.NEON_GREEN, status: 'IN PROGRESS' },
    { quarter: 'Q2 2026', title: 'B2B API', items: ['API for banks', '3 pilot partners', 'Mobile app beta'], color: PITCH_CONFIG.COLORS.BLUE, status: 'PLANNED' },
    { quarter: 'Q3 2026', title: 'Scale', items: ['98% AI accuracy', '500K users', 'White-label ready'], color: PITCH_CONFIG.COLORS.PURPLE, status: 'PLANNED' },
    { quarter: 'Q4 2026', title: 'Enterprise', items: ['Telecom deal', 'Full mobile launch', 'Break-even'], color: PITCH_CONFIG.COLORS.WARNING_ORANGE, status: 'PLANNED' },
  ];

  // Timeline bar
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 150, 660, 4, PITCH_CONFIG.COLORS.GRAY_500);

  phases.forEach((phase, i) => {
    const x = 45 + (i * 165);

    // Dot on timeline
    addShape(slide, SlidesApp.ShapeType.ELLIPSE, x + 65, 142, 20, 20, phase.color);

    // Quarter label
    addTextBox(slide, phase.quarter, x, 105, 150, 25, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 12,
      bold: true,
      color: phase.color,
      align: 'center'
    });

    // Card
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 175, 150, 130, PITCH_CONFIG.COLORS.DARK_CARD, phase.color);

    // Title
    addTextBox(slide, phase.title, x + 10, 183, 130, 25, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 14,
      bold: true,
      color: phase.color,
      align: 'left'
    });

    // Status badge
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x + 80, 185, 60, 16, phase.status === 'IN PROGRESS' ? PITCH_CONFIG.COLORS.NEON_GREEN : PITCH_CONFIG.COLORS.GRAY_500);
    addTextBox(slide, phase.status, x + 82, 186, 56, 14, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 7,
      bold: true,
      color: phase.status === 'IN PROGRESS' ? PITCH_CONFIG.COLORS.BLACK : PITCH_CONFIG.COLORS.WHITE,
      align: 'center'
    });

    // Items
    addTextBox(slide, phase.items.map(item => '• ' + item).join('\n'), x + 10, 210, 130, 90, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG.COLORS.GRAY_300,
      align: 'left'
    });
  });

  // 2027 outlook
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 320, 660, 70, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);

  addTextBox(slide, '2027+ Outlook', 45, 328, 150, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 12,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, '• SEA Expansion: Vietnam, Indonesia, Philippines\n• 1M+ users across region\n• $10-15M annual revenue target', 45, 348, 620, 40, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });
}

// ============================================
// SLIDE 12: MARKET POTENTIAL (TAM SAM SOM)
// ============================================

function createSlide12_MarketPotential(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 210, 25, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '11 MARKET POTENTIAL', 35, 22, 200, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Market Potential (TAM SAM SOM)', 30, 55, 450, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // TAM
  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 30, 105, 280, 180, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.BLUE);
  addTextBox(slide, 'TAM', 140, 120, 60, 25, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 12,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLUE,
    align: 'center'
  });
  addTextBox(slide, '$65B', 100, 145, 140, 40, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });
  addTextBox(slide, 'Global AI Fraud Detection\nMarket by 2034', 80, 190, 180, 40, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });
  addTextBox(slide, 'CAGR 18%', 100, 235, 140, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.BLUE,
    align: 'center'
  });

  // SAM (nested inside TAM visually)
  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 330, 105, 200, 130, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.PURPLE);
  addTextBox(slide, 'SAM', 405, 115, 60, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 12,
    bold: true,
    color: PITCH_CONFIG.COLORS.PURPLE,
    align: 'center'
  });
  addTextBox(slide, '$500M', 375, 135, 120, 35, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 28,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });
  addTextBox(slide, 'Thailand + SEA\nFraud Prevention', 360, 175, 150, 35, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });

  // SOM (nested)
  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 550, 120, 130, 100, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, 'SOM', 595, 128, 50, 18, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'center'
  });
  addTextBox(slide, '$15M', 575, 148, 80, 30, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 22,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });
  addTextBox(slide, 'Year 3 Target', 570, 180, 90, 20, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 9,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });

  // Market data table
  addTextBox(slide, 'Market Data', 30, 295, 150, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 320, 660, 70, PITCH_CONFIG.COLORS.DARK_CARD);

  const marketData = [
    { label: 'Thailand Fraud Losses', value: '฿115.3B/year', source: 'GASA 2025' },
    { label: 'SEA Fraud Market', value: '$8B by 2026', source: 'Asia Risk Center' },
    { label: 'AI Fraud Detection (Global)', value: '$14.7B → $65B', source: 'Precedence Research' },
    { label: 'Thai Digital Users', value: '51M', source: 'Statista 2025' },
  ];

  marketData.forEach((data, i) => {
    const x = 40 + (i * 165);
    addTextBox(slide, data.label + '\n' + data.value + '\n' + data.source, x, 328, 155, 55, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_300,
      align: 'left'
    });
  });
}

// ============================================
// SLIDE 13: TARGET CUSTOMER
// ============================================

function createSlide13_TargetCustomer(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 210, 25, PITCH_CONFIG.COLORS.BLUE);
  addTextBox(slide, '12 TARGET CUSTOMER', 35, 22, 200, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Target Customers', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // B2C segment
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 320, 150, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.BLUE);

  addTextBox(slide, '👤 B2C: Individual Users', 45, 108, 290, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLUE,
    align: 'left'
  });

  addTextBox(slide, '• 51M+ mobile wallet users in Thailand\n• Ages 18-65, smartphone users\n• 72% face scam attempts yearly\n• Elderly & vulnerable populations\n• Tech-savvy young adults (education)', 45, 140, 290, 100, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // B2B segment
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 370, 100, 320, 150, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.PURPLE);

  addTextBox(slide, '🏢 B2B: Financial Institutions', 385, 108, 290, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG.COLORS.PURPLE,
    align: 'left'
  });

  addTextBox(slide, '• 177 fintech companies in Thailand\n• Major banks (SCB, KBANK, BBL, KTB)\n• 144M digital banking accounts\n• Mobile payment providers\n• Insurance companies', 385, 140, 290, 100, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // B2B2C segment
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 265, 320, 90, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.TEAL);

  addTextBox(slide, '📡 B2B2C: Telecom Operators', 45, 273, 290, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.TEAL,
    align: 'left'
  });

  addTextBox(slide, '• AIS, TRUE, DTAC\n• Spam/scam SMS filtering\n• 130M scam texts detected (2024)', 45, 298, 290, 50, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Government segment
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 370, 265, 320, 90, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);

  addTextBox(slide, '🏛️ Government & Public Sector', 385, 273, 290, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  addTextBox(slide, '• Bank of Thailand (BOT)\n• DEPA, Royal Thai Police\n• Digital literacy programs', 385, 298, 290, 50, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Summary
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 365, 660, 30, PITCH_CONFIG.COLORS.DARK_CARD);
  addTextBox(slide, 'Primary Focus: B2C mass market + B2B bank partnerships', 40, 372, 640, 20, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 12,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'center'
  });
}

// ============================================
// SLIDE 14: VALUE PROPOSITIONS
// ============================================

function createSlide14_ValueProposition(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 220, 25, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '13 VALUE PROPOSITIONS', 35, 22, 210, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Value Propositions', 30, 55, 350, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // For Users
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 330, 175, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.BLUE);

  addTextBox(slide, '👤 For Individual Users', 45, 108, 300, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLUE,
    align: 'left'
  });

  const userValues = [
    '⚡ Real-time SMS/URL/QR protection',
    '🎮 Learn scams through simulations',
    '🇹🇭 Thai-first, culturally relevant',
    '🤖 24/7 AI guardian (น้องฟ้า)',
    '👨‍👩‍👧 Family protection features',
    '📱 No technical skills needed'
  ];

  addTextBox(slide, userValues.join('\n'), 45, 138, 300, 130, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // For Enterprises
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 380, 100, 310, 175, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.PURPLE);

  addTextBox(slide, '🏢 For Enterprises', 395, 108, 280, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    bold: true,
    color: PITCH_CONFIG.COLORS.PURPLE,
    align: 'left'
  });

  const bizValues = [
    '📉 Up to 95% fraud detection rate',
    '✅ Meet BOT compliance requirements',
    '🤝 Build customer trust & loyalty',
    '🔌 Easy API integration',
    '📊 Behavioral analytics dashboard',
    '🏷️ White-label available'
  ];

  addTextBox(slide, bizValues.join('\n'), 395, 138, 280, 130, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Unique differentiators
  addTextBox(slide, 'Unique Differentiators', 30, 290, 200, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  const differentiators = [
    { title: '7 AI Agents', desc: 'Not generic chatbots', color: PITCH_CONFIG.COLORS.NEON_GREEN },
    { title: 'Evil Transform', desc: 'See how scammers think', color: PITCH_CONFIG.COLORS.DANGER_RED },
    { title: 'Thai Scam DB', desc: 'Largest Thai fraud data', color: PITCH_CONFIG.COLORS.PURPLE },
    { title: 'Gamified Learn', desc: 'Engaging education', color: PITCH_CONFIG.COLORS.BLUE },
  ];

  differentiators.forEach((diff, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 315, 160, 55, PITCH_CONFIG.COLORS.DARK_CARD, diff.color);

    addTextBox(slide, diff.title, x + 10, 323, 140, 20, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 12,
      bold: true,
      color: diff.color,
      align: 'left'
    });

    addTextBox(slide, diff.desc, x + 10, 345, 140, 20, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG.COLORS.GRAY_400,
      align: 'left'
    });
  });

  // Data network effect
  addTextBox(slide, '📈 Data Network Effect: More users → Better detection → More users', 30, 380, 660, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'center'
  });
}

// ============================================
// SLIDE 15: REVENUE MODEL
// ============================================

function createSlide15_RevenueModel(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG.COLORS.WARNING_ORANGE);
  addTextBox(slide, '14 REVENUE MODEL', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Revenue Model', 30, 55, 300, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // B2C Pricing table
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 330, 145, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.BLUE);

  addTextBox(slide, '👤 B2C Subscription Tiers', 45, 108, 300, 22, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLUE,
    align: 'left'
  });

  const b2cTiers = [
    { tier: 'Free', price: '฿0', features: '5 checks/day, 2 simulations' },
    { tier: 'Guardian', price: '฿99/mo', features: 'Unlimited, all simulations' },
    { tier: 'Shield', price: '฿299/mo', features: '+ Call screen, ฿100K insurance' },
  ];

  b2cTiers.forEach((t, i) => {
    const y = 135 + (i * 35);
    addTextBox(slide, t.tier, 50, y, 70, 25, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG.COLORS.NEON_GREEN,
      align: 'left'
    });
    addTextBox(slide, t.price, 125, y, 70, 25, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 11,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'left'
    });
    addTextBox(slide, t.features, 195, y, 155, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_400,
      align: 'left'
    });
  });

  // B2B Pricing
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 380, 100, 310, 145, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.PURPLE);

  addTextBox(slide, '🏢 B2B Enterprise Pricing', 395, 108, 280, 22, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.PURPLE,
    align: 'left'
  });

  const b2bTiers = [
    { tier: 'API Access', price: '฿50K-500K/mo', features: 'Banks, FinTechs' },
    { tier: 'White-Label', price: '฿2M + ฿200K/mo', features: 'Full branding' },
    { tier: 'Enterprise', price: 'Custom', features: 'Telecom, Gov' },
  ];

  b2bTiers.forEach((t, i) => {
    const y = 135 + (i * 35);
    addTextBox(slide, t.tier, 400, y, 85, 25, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 10,
      bold: true,
      color: PITCH_CONFIG.COLORS.NEON_GREEN,
      align: 'left'
    });
    addTextBox(slide, t.price, 490, y, 95, 25, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 10,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'left'
    });
    addTextBox(slide, t.features, 590, y, 90, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_400,
      align: 'left'
    });
  });

  // Revenue projections
  addTextBox(slide, 'Year 1 Revenue Projections', 30, 260, 250, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // B2C projection
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 285, 215, 65, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.BLUE);
  addTextBox(slide, 'B2C', 45, 290, 50, 18, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLUE,
    align: 'left'
  });
  addTextBox(slide, '฿45M', 45, 308, 100, 25, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 22,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });
  addTextBox(slide, '500K users → 5% convert\n25K paid × ฿150 avg × 12mo', 45, 330, 185, 25, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 8,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'left'
  });

  // B2B projection
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 255, 285, 215, 65, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.PURPLE);
  addTextBox(slide, 'B2B', 270, 290, 50, 18, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.PURPLE,
    align: 'left'
  });
  addTextBox(slide, '฿30M', 270, 308, 100, 25, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 22,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });
  addTextBox(slide, '3 bank partners: ฿18M\n5 fintech: ฿12M', 270, 330, 185, 25, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 8,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'left'
  });

  // Total
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 480, 285, 210, 65, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, 'TOTAL', 495, 290, 60, 18, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });
  addTextBox(slide, '฿75M', 495, 308, 100, 25, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 22,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });
  addTextBox(slide, '~$2.2M USD\nYear 1 Target', 495, 330, 185, 25, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 8,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'left'
  });

  // Cost structure
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 360, 660, 35, PITCH_CONFIG.COLORS.DARK_CARD);
  addTextBox(slide, 'Monthly Burn: ฿2.5M  |  Runway: 2.5 years to break-even  |  Seed Funding Goal: ฿75M', 40, 368, 640, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// SLIDE 16: COMPETITIVE LANDSCAPE
// ============================================

function createSlide16_Competitive(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 230, 25, PITCH_CONFIG.COLORS.DANGER_RED);
  addTextBox(slide, '15 COMPETITIVE LANDSCAPE', 35, 22, 220, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Competitive Landscape', 30, 55, 350, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Competitor table header
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 660, 30, PITCH_CONFIG.COLORS.DARK_CARD);
  addTextBox(slide, 'Competitor', 40, 107, 120, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'left'
  });
  addTextBox(slide, 'Strengths', 170, 107, 150, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'left'
  });
  addTextBox(slide, 'Weaknesses', 350, 107, 150, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'left'
  });
  addTextBox(slide, 'Our Edge', 530, 107, 150, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 10,
    bold: true,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'left'
  });

  const competitors = [
    { name: 'Feedzai', strength: 'Enterprise-grade, global', weakness: 'Expensive, no Thai focus', edge: 'Thai-first, affordable' },
    { name: 'NICE Actimize', strength: 'Banking relationships', weakness: 'Complex, slow deploy', edge: 'Agile, AI-native' },
    { name: 'Bank\'s Own Tools', strength: 'Trusted brand', weakness: 'Generic, not specialized', edge: '7 specialized agents' },
    { name: 'WhosCall', strength: 'Call blocking', weakness: 'No SMS/QR/simulation', edge: 'Full coverage' },
  ];

  competitors.forEach((comp, i) => {
    const y = 135 + (i * 38);
    const bgColor = i % 2 === 0 ? PITCH_CONFIG.COLORS.DARK_CARD : PITCH_CONFIG.COLORS.BLACK;

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, y, 660, 35, bgColor);

    addTextBox(slide, comp.name, 40, y + 8, 120, 20, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'left'
    });
    addTextBox(slide, comp.strength, 170, y + 8, 170, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_300,
      align: 'left'
    });
    addTextBox(slide, comp.weakness, 350, y + 8, 170, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.DANGER_RED,
      align: 'left'
    });
    addTextBox(slide, comp.edge, 530, y + 8, 150, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.NEON_GREEN,
      align: 'left'
    });
  });

  // Competitive moat
  addTextBox(slide, 'Our Competitive Moat', 30, 295, 200, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  const moats = [
    { title: 'Data Network Effect', desc: 'More users = better AI', icon: '📊' },
    { title: 'Thai Localization', desc: 'Deep cultural understanding', icon: '🇹🇭' },
    { title: 'Unique Simulation', desc: 'No competitor has this', icon: '🎮' },
    { title: 'Brand Characters', desc: 'Memorable AI agents', icon: '🤖' },
  ];

  moats.forEach((moat, i) => {
    const x = 30 + (i * 170);

    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 320, 160, 70, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);

    addTextBox(slide, moat.icon + ' ' + moat.title, x + 10, 328, 140, 25, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 11,
      bold: true,
      color: PITCH_CONFIG.COLORS.NEON_GREEN,
      align: 'left'
    });

    addTextBox(slide, moat.desc, x + 10, 355, 140, 30, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG.COLORS.GRAY_400,
      align: 'left'
    });
  });
}

// ============================================
// SLIDE 17: GO-TO-MARKET STRATEGY
// ============================================

function createSlide17_GoToMarket(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG.COLORS.TEAL);
  addTextBox(slide, '16 GO-TO-MARKET', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Go-to-Market Strategy', 30, 55, 350, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Phase boxes
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Launch & Acquire',
      period: 'Q1-Q2 2026',
      actions: [
        'Free app launch on iOS/Android',
        'Social media campaign (TikTok, FB)',
        'Influencer partnerships',
        'PR: fraud prevention stories'
      ],
      color: PITCH_CONFIG.COLORS.BLUE
    },
    {
      phase: 'Phase 2',
      title: 'Partnership',
      period: 'Q3-Q4 2026',
      actions: [
        'Bank pilot programs (3 banks)',
        'LINE Official Account integration',
        'Government partnership (DEPA)',
        'B2B sales team buildout'
      ],
      color: PITCH_CONFIG.COLORS.PURPLE
    },
    {
      phase: 'Phase 3',
      title: 'Scale & Expand',
      period: '2027+',
      actions: [
        'White-label for telecoms',
        'SEA expansion (Vietnam, Indonesia)',
        'Enterprise sales acceleration',
        'AI model licensing'
      ],
      color: PITCH_CONFIG.COLORS.NEON_GREEN
    },
  ];

  phases.forEach((phase, i) => {
    const x = 30 + (i * 225);

    // Card
    addShape(slide, SlidesApp.ShapeType.RECTANGLE, x, 100, 215, 170, PITCH_CONFIG.COLORS.DARK_CARD, phase.color);

    // Phase label
    addTextBox(slide, phase.phase, x + 10, 108, 80, 20, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 10,
      bold: true,
      color: phase.color,
      align: 'left'
    });

    // Period
    addTextBox(slide, phase.period, x + 120, 108, 85, 20, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_500,
      align: 'right'
    });

    // Title
    addTextBox(slide, phase.title, x + 10, 130, 195, 25, {
      fontFamily: PITCH_CONFIG.FONTS.TITLE,
      fontSize: 14,
      bold: true,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'left'
    });

    // Actions
    addTextBox(slide, phase.actions.map(a => '• ' + a).join('\n'), x + 10, 158, 195, 100, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 10,
      color: PITCH_CONFIG.COLORS.GRAY_300,
      align: 'left'
    });
  });

  // Key partnerships
  addTextBox(slide, 'Key Partnership Targets', 30, 285, 200, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 310, 660, 80, PITCH_CONFIG.COLORS.DARK_CARD);

  const partners = [
    { type: 'Banks', names: 'SCB, KBANK, BBL, KTB', value: 'Distribution + Revenue' },
    { type: 'Telecoms', names: 'AIS, TRUE, DTAC', value: 'Spam filtering + Co-marketing' },
    { type: 'Government', names: 'BOT, DEPA, Police', value: 'Data sharing + Legitimacy' },
    { type: 'Tech', names: 'LINE, Google, Meta', value: 'Platform integration' },
  ];

  partners.forEach((partner, i) => {
    const x = 45 + (i * 165);

    addTextBox(slide, partner.type, x, 318, 150, 18, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 10,
      bold: true,
      color: PITCH_CONFIG.COLORS.NEON_GREEN,
      align: 'left'
    });
    addTextBox(slide, partner.names, x, 336, 150, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.WHITE,
      align: 'left'
    });
    addTextBox(slide, partner.value, x, 360, 150, 25, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 8,
      color: PITCH_CONFIG.COLORS.GRAY_500,
      align: 'left'
    });
  });
}

// ============================================
// SLIDE 18: WORKING PROTOTYPE / DEMO
// ============================================

function createSlide18_Demo(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.DARK_BG);

  // Section label
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 20, 200, 25, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '17 WORKING DEMO', 35, 22, 190, 20, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 11,
    bold: true,
    color: PITCH_CONFIG.COLORS.BLACK,
    align: 'left'
  });

  // Title
  addTextBox(slide, 'Working Prototype (MVP 1)', 30, 55, 400, 40, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 32,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'left'
  });

  // Demo screenshot placeholder
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 100, 400, 225, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '📱 LIVE DEMO\n\n[Insert App Screenshot Here]\n\nOr visit:\ngalaxyagents.vercel.app', 50, 140, 360, 160, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 14,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });

  // Features implemented
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 450, 100, 240, 225, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.PURPLE);

  addTextBox(slide, '✅ Features Implemented', 465, 108, 210, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 14,
    bold: true,
    color: PITCH_CONFIG.COLORS.PURPLE,
    align: 'left'
  });

  const features = [
    '• 7 AI Agent characters',
    '• Interactive simulation engine',
    '• 10 fraud scenario playbacks',
    '• Evil transformation animation',
    '• Thai-localized UI',
    '• Real-time agent coordination',
    '• Money tracker visualization',
    '• Operation mode switching',
    '• IndexedDB persistence',
    '• Responsive design'
  ];

  addTextBox(slide, features.join('\n'), 465, 138, 210, 180, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 10,
    color: PITCH_CONFIG.COLORS.GRAY_300,
    align: 'left'
  });

  // Tech metrics
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 30, 340, 660, 55, PITCH_CONFIG.COLORS.DARK_CARD);

  const metrics = [
    { label: 'Code Lines', value: '15,000+' },
    { label: 'Components', value: '25+' },
    { label: 'Scenarios', value: '10' },
    { label: 'AI Agents', value: '7' },
    { label: 'Languages', value: 'TH/EN' },
  ];

  metrics.forEach((metric, i) => {
    const x = 50 + (i * 130);

    addTextBox(slide, metric.value, x, 348, 110, 25, {
      fontFamily: PITCH_CONFIG.FONTS.MONO,
      fontSize: 18,
      bold: true,
      color: PITCH_CONFIG.COLORS.NEON_GREEN,
      align: 'center'
    });
    addTextBox(slide, metric.label, x, 373, 110, 18, {
      fontFamily: PITCH_CONFIG.FONTS.BODY,
      fontSize: 9,
      color: PITCH_CONFIG.COLORS.GRAY_500,
      align: 'center'
    });
  });
}

// ============================================
// SLIDE 19: CALL TO ACTION
// ============================================

function createSlide19_CallToAction(presentation) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  setBackground(slide, PITCH_CONFIG.COLORS.BLACK);

  // Accent line top
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 4, PITCH_CONFIG.COLORS.NEON_GREEN);

  // Large logo placeholder
  addShape(slide, SlidesApp.ShapeType.ELLIPSE, 285, 50, 150, 150, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);
  addTextBox(slide, '🌟', 325, 95, 70, 60, {
    fontSize: 48,
    align: 'center'
  });

  // Title
  addTextBox(slide, 'GALAXY AGENTS', 60, 210, 600, 50, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 40,
    bold: true,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });

  // Tagline
  addTextBox(slide, 'Protecting Thailand from the ฿115 Billion Scam Crisis', 60, 260, 600, 30, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 18,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'center'
  });

  // Key asks
  addShape(slide, SlidesApp.ShapeType.RECTANGLE, 160, 300, 400, 60, PITCH_CONFIG.COLORS.DARK_CARD, PITCH_CONFIG.COLORS.NEON_GREEN);

  addTextBox(slide, '🚀 Ready to Demo  |  🤝 Seeking Partnerships  |  💰 Seed Funding', 170, 318, 380, 30, {
    fontFamily: PITCH_CONFIG.FONTS.BODY,
    fontSize: 13,
    color: PITCH_CONFIG.COLORS.WHITE,
    align: 'center'
  });

  // Contact info
  addTextBox(slide, 'galaxyagents.vercel.app', 60, 380, 600, 25, {
    fontFamily: PITCH_CONFIG.FONTS.MONO,
    fontSize: 14,
    color: PITCH_CONFIG.COLORS.NEON_GREEN,
    align: 'center'
  });

  // Thank you
  addTextBox(slide, 'Thank You | ขอบคุณครับ 🙏', 60, 370, 600, 25, {
    fontFamily: PITCH_CONFIG.FONTS.TITLE,
    fontSize: 16,
    color: PITCH_CONFIG.COLORS.GRAY_400,
    align: 'center'
  });
}

// ============================================
// UTILITY: Run from menu
// ============================================

function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Galaxy Agents')
    .addItem('Create Pitch Deck', 'createGalaxyAgentsPitchDeck')
    .addToUi();
}
