/**
 * Galaxy Agents - AI Scene Image Generator
 *
 * Generates illustration images for each scenario step using Gemini 3 Pro Image.
 * Run: GEMINI_API_KEY=your_key node scripts/generate-scenario-images.cjs
 *
 * Models:
 * - gemini-3-pro-image-preview (best quality, $0.134/image)
 * - gemini-2.5-flash-image (faster, $0.039/image)
 */

const fs = require('fs');
const path = require('path');

// Load .env file
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../public/scenario-images');

// Model selection
const GEMINI_PRO_IMAGE = 'gemini-3-pro-image-preview';  // Best quality
const GEMINI_FLASH_IMAGE = 'gemini-2.5-flash-image';    // Faster fallback

// Pre-defined image prompts for all 10 scenarios
const SCENARIO_IMAGE_PROMPTS = [
  // ========== SMS PHISHING ==========
  {
    scenarioId: 'sms-phishing-001',
    stepId: 'sms-03',
    prompt: 'Thai smartphone screen showing fake SMS message from "Kerry Express" with suspicious link, dark mode UI, realistic phone mockup, Thai language text visible',
    style: 'phone_screen',
  },
  {
    scenarioId: 'sms-phishing-001',
    stepId: 'sms-04',
    prompt: 'Fake Kerry Express website on phone screen, credit card input form, red warning signs subtle in background, phishing page mockup, dark theme',
    style: 'phone_screen',
  },
  {
    scenarioId: 'sms-phishing-001',
    stepId: 'sms-07',
    prompt: 'Close-up of hands typing credit card number on phone, warning glow effect, cybersecurity awareness illustration, dramatic lighting',
    style: 'scene',
  },
  {
    scenarioId: 'sms-phishing-001',
    stepId: 'sms-11',
    prompt: 'Split screen comparison: fake website URL vs real website URL, magnifying glass on domain name, educational infographic style',
    style: 'warning',
  },

  // ========== CALL CENTER SCAM ==========
  {
    scenarioId: 'call-center-001',
    stepId: 'cc-02',
    prompt: 'Thai smartphone showing incoming call from unknown number with DSI/Police badge icon, suspicious caller ID, dark mode phone UI',
    style: 'phone_screen',
  },
  {
    scenarioId: 'call-center-001',
    stepId: 'cc-05',
    prompt: 'Fake Thai police ID card document, official-looking but with subtle warning signs, document forgery illustration',
    style: 'document',
  },
  {
    scenarioId: 'call-center-001',
    stepId: 'cc-08',
    prompt: 'Person looking worried at phone with banking app open, money transfer screen, dramatic red lighting, anxiety atmosphere',
    style: 'scene',
  },
  {
    scenarioId: 'call-center-001',
    stepId: 'cc-12',
    prompt: 'Warning infographic: "Real police never ask for money transfer" in Thai style, badge crossed out with money symbol',
    style: 'warning',
  },

  // ========== ROMANCE SCAM ==========
  {
    scenarioId: 'romance-scam-001',
    stepId: 'rs-02',
    prompt: 'Dating app profile with too-perfect photos, foreign businessman/soldier profile, red flags highlighted subtly, phone screen mockup',
    style: 'phone_screen',
  },
  {
    scenarioId: 'romance-scam-001',
    stepId: 'rs-05',
    prompt: 'Chat conversation showing love bombing messages, heart emojis, suspicious money request at the end, LINE/Facebook Messenger style',
    style: 'phone_screen',
  },
  {
    scenarioId: 'romance-scam-001',
    stepId: 'rs-08',
    prompt: 'Crying person looking at phone with empty bank account screen, broken heart visual effect, emotional manipulation illustration',
    style: 'scene',
  },
  {
    scenarioId: 'romance-scam-001',
    stepId: 'rs-11',
    prompt: 'Warning signs infographic: reverse image search, video call test, never send money to strangers, Thai language educational style',
    style: 'warning',
  },

  // ========== SOCIAL IMPERSONATION ==========
  {
    scenarioId: 'social-impersonation-001',
    stepId: 'si-02',
    prompt: 'Facebook Messenger chat from "friend" asking to borrow money urgently, cloned profile subtle differences, phone screen mockup',
    style: 'phone_screen',
  },
  {
    scenarioId: 'social-impersonation-001',
    stepId: 'si-05',
    prompt: 'Side-by-side comparison of real vs fake Facebook profile, spot the differences style, educational illustration',
    style: 'warning',
  },
  {
    scenarioId: 'social-impersonation-001',
    stepId: 'si-08',
    prompt: 'Phone showing PromptPay QR code transfer screen, money being sent, warning aura effect',
    style: 'phone_screen',
  },

  // ========== PONZI SCHEME ==========
  {
    scenarioId: 'ponzi-scheme-001',
    stepId: 'ps-02',
    prompt: 'Too-good-to-be-true investment ad on Facebook/LINE, 30% monthly returns promise, Thai cryptocurrency scam style graphic',
    style: 'phone_screen',
  },
  {
    scenarioId: 'ponzi-scheme-001',
    stepId: 'ps-05',
    prompt: 'Fake investment dashboard showing unrealistic profits, green charts going up, scam app interface mockup',
    style: 'phone_screen',
  },
  {
    scenarioId: 'ponzi-scheme-001',
    stepId: 'ps-08',
    prompt: 'Ponzi scheme pyramid diagram collapsing, money flying away, dramatic illustration of investment scam',
    style: 'warning',
  },

  // ========== FAKE INVESTMENT ==========
  {
    scenarioId: 'fake-investment-001',
    stepId: 'fi-02',
    prompt: 'LINE group chat with fake testimonials, people showing bank transfers, too many success stories, scam community mockup',
    style: 'phone_screen',
  },
  {
    scenarioId: 'fake-investment-001',
    stepId: 'fi-05',
    prompt: 'Fake stock trading app with unrealistic gains, buy/sell buttons, professional-looking but fraudulent interface',
    style: 'phone_screen',
  },
  {
    scenarioId: 'fake-investment-001',
    stepId: 'fi-08',
    prompt: 'SEC Thailand warning stamp on fake investment scheme, regulatory alert illustration',
    style: 'warning',
  },

  // ========== JOB SCAM ==========
  {
    scenarioId: 'job-scam-001',
    stepId: 'js-02',
    prompt: 'Facebook job post offering high salary work from home, typing job 500 baht per post, suspicious job ad mockup',
    style: 'phone_screen',
  },
  {
    scenarioId: 'job-scam-001',
    stepId: 'js-05',
    prompt: 'Fake job website asking for registration fee, credit card form for "training materials", scam employment site',
    style: 'phone_screen',
  },
  {
    scenarioId: 'job-scam-001',
    stepId: 'js-08',
    prompt: 'Warning infographic: legitimate jobs never ask for upfront payment, Thai language job scam awareness',
    style: 'warning',
  },

  // ========== LOAN APP SCAM ==========
  {
    scenarioId: 'loan-app-001',
    stepId: 'la-02',
    prompt: 'Suspicious loan app on phone, "instant approval 50000 baht" banner, predatory lending app interface',
    style: 'phone_screen',
  },
  {
    scenarioId: 'loan-app-001',
    stepId: 'la-05',
    prompt: 'Loan app demanding excessive permissions: contacts, photos, location, privacy invasion illustration',
    style: 'phone_screen',
  },
  {
    scenarioId: 'loan-app-001',
    stepId: 'la-08',
    prompt: 'Threatening debt collection messages, edited embarrassing photos threat, digital harassment illustration',
    style: 'phone_screen',
  },
  {
    scenarioId: 'loan-app-001',
    stepId: 'la-11',
    prompt: 'Bank of Thailand licensed lender verification, how to check legitimate loan apps, educational infographic',
    style: 'warning',
  },

  // ========== QR SCAM ==========
  {
    scenarioId: 'qr-scam-001',
    stepId: 'qr-02',
    prompt: 'Suspicious QR code sticker placed over legitimate payment QR at Thai restaurant/market, close-up photo style',
    style: 'scene',
  },
  {
    scenarioId: 'qr-scam-001',
    stepId: 'qr-05',
    prompt: 'Phone scanning QR code with payment confirmation showing wrong recipient name, warning highlight',
    style: 'phone_screen',
  },
  {
    scenarioId: 'qr-scam-001',
    stepId: 'qr-08',
    prompt: 'Warning infographic: always verify recipient name before confirming QR payment, Thai PromptPay safety tips',
    style: 'warning',
  },

  // ========== SIM SWAP ==========
  {
    scenarioId: 'sim-swap-001',
    stepId: 'ss-02',
    prompt: 'Phone showing "No Service" with SIM card ejected, network connection lost, technical illustration',
    style: 'phone_screen',
  },
  {
    scenarioId: 'sim-swap-001',
    stepId: 'ss-05',
    prompt: 'Hacker at computer receiving OTP codes, multiple bank login screens, cybercrime illustration dark theme',
    style: 'scene',
  },
  {
    scenarioId: 'sim-swap-001',
    stepId: 'ss-08',
    prompt: 'Bank accounts showing unauthorized transfers, multiple transactions alert, financial damage illustration',
    style: 'phone_screen',
  },
  {
    scenarioId: 'sim-swap-001',
    stepId: 'ss-11',
    prompt: 'SIM lock PIN setup screen, carrier security settings, how to protect against SIM swap educational graphic',
    style: 'warning',
  },
];

// Style modifiers
const STYLE_MODIFIERS = {
  phone_screen: ', ultra realistic smartphone mockup, high resolution screen, modern UI design, 2024 mobile interface, clean professional look',
  scene: ', digital illustration, cinematic lighting, cybersecurity theme, modern flat design with depth, professional quality',
  document: ', realistic document scan, official paper texture, Thai government style, high detail',
  warning: ', infographic design, bold warning colors, Thai language typography, educational poster style, clean vector graphics',
};

const GLOBAL_STYLE = 'Galaxy Agents anti-fraud awareness campaign style, dark theme with neon green (#43FF4D) accents, professional cybersecurity aesthetic, Thai context';

// Generate image using Gemini 3 Pro Image
async function generateImageGeminiPro(prompt) {
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not set');
    return null;
  }

  const fullPrompt = `${prompt.prompt}${STYLE_MODIFIERS[prompt.style]}, ${GLOBAL_STYLE}`;

  console.log(`🎨 [Gemini 3 Pro Image] Generating: ${prompt.scenarioId}/${prompt.stepId}`);
  console.log(`   Prompt: ${fullPrompt.substring(0, 80)}...`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_PRO_IMAGE}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a high-quality, photorealistic illustration image.

SCENE: ${fullPrompt}

REQUIREMENTS:
- Professional fraud awareness campaign aesthetic
- Dark theme with neon green (#43FF4D) accents
- Modern, clean UI design if showing phone screens
- Educational and safe for all audiences
- Thai context (Thai language text where appropriate)
- 16:9 aspect ratio

Generate the image now.`
            }]
          }],
          generationConfig: {
            responseModalities: ['image', 'text'],
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(`   ❌ API Error: ${error}`);
      return null;
    }

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          console.log(`   ✅ Generated ${(imageBuffer.length / 1024).toFixed(1)}KB`);
          return imageBuffer;
        }
      }
    }

    console.error('   ❌ No image in response');
    return null;
  } catch (error) {
    console.error(`   ❌ Error: ${error}`);
    return null;
  }
}

async function generateAllImages() {
  console.log('🚀 Galaxy Agents - Scenario Image Generator\n');
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`🎯 Total prompts: ${SCENARIO_IMAGE_PROMPTS.length}`);
  console.log(`🤖 Model: ${GEMINI_PRO_IMAGE}\n`);

  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not set. Get one from https://aistudio.google.com/apikey');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const prompt of SCENARIO_IMAGE_PROMPTS) {
    const scenarioDir = path.join(OUTPUT_DIR, prompt.scenarioId);
    if (!fs.existsSync(scenarioDir)) {
      fs.mkdirSync(scenarioDir, { recursive: true });
    }

    const outputPath = path.join(scenarioDir, `${prompt.stepId}.png`);

    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${prompt.scenarioId}/${prompt.stepId} (exists)`);
      successCount++;
      continue;
    }

    const imageBuffer = await generateImageGeminiPro(prompt);

    if (imageBuffer) {
      fs.writeFileSync(outputPath, imageBuffer);
      successCount++;
    } else {
      failCount++;
    }

    // Rate limiting: wait 3 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log(`\n========================================`);
  console.log(`✅ Success: ${successCount}/${SCENARIO_IMAGE_PROMPTS.length}`);
  console.log(`❌ Failed: ${failCount}/${SCENARIO_IMAGE_PROMPTS.length}`);
  console.log(`========================================\n`);

  // Generate manifest file
  const manifest = {
    generatedAt: new Date().toISOString(),
    model: GEMINI_PRO_IMAGE,
    totalImages: SCENARIO_IMAGE_PROMPTS.length,
    scenarios: [...new Set(SCENARIO_IMAGE_PROMPTS.map(p => p.scenarioId))],
    images: SCENARIO_IMAGE_PROMPTS.map(p => ({
      scenario: p.scenarioId,
      step: p.stepId,
      path: `/scenario-images/${p.scenarioId}/${p.stepId}.png`,
      style: p.style,
    }))
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('📄 Manifest saved to manifest.json');
}

// Run
generateAllImages().catch(console.error);
