/**
 * Galaxy Agents - AI Video Generator
 *
 * Generates short videos from scenario images using Google Veo 2.
 * Run: node scripts/generate-scenario-videos.cjs
 *
 * Uses Vertex AI Veo 2 to create smooth animated videos from static images.
 * Each scenario gets a ~15-30 second dramatic video.
 */

const fs = require('fs');
const path = require('path');

// Load .env
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID || '33095738446';
const INPUT_DIR = path.join(__dirname, '../public/scenario-images');
const OUTPUT_DIR = path.join(__dirname, '../public/scenario-videos');

// Veo 2 model
const VEO_MODEL = 'veo-2.0-generate-001';

// Video prompts for each scenario (image-to-video style)
const VIDEO_PROMPTS = {
  'sms-phishing-001': {
    prompt: 'Cinematic smartphone screen animation, fake SMS notification appearing with ominous red glow, fingers typing credit card numbers, dramatic zoom into suspicious URL, warning signs flashing, dark cybersecurity thriller mood, 4K quality',
    duration: 8,
  },
  'call-center-001': {
    prompt: 'Dramatic phone call scene, incoming call animation with police badge icon, worried person answering phone, money transfer app screen with red warning overlay, tension building cinematography, dark thriller aesthetic',
    duration: 8,
  },
  'romance-scam-001': {
    prompt: 'Emotional dating app animation, perfect profile photos transitioning to suspicious chat messages, broken heart visual effect, empty bank account reveal, melancholic to dramatic mood shift',
    duration: 8,
  },
  'social-impersonation-001': {
    prompt: 'Facebook messenger animation, side-by-side profile comparison morphing effect, urgent money request message appearing, PromptPay transfer confirmation, subtle warning signs highlighting',
    duration: 8,
  },
  'ponzi-scheme-001': {
    prompt: 'Investment dashboard animation, fake profits climbing unrealistically, pyramid structure forming and collapsing, money flying away dramatically, financial crash visualization',
    duration: 8,
  },
  'fake-investment-001': {
    prompt: 'LINE group chat animation, fake testimonials scrolling, stock trading app with impossible gains, SEC warning stamp appearing dramatically, scam exposure reveal',
    duration: 8,
  },
  'job-scam-001': {
    prompt: 'Facebook job post animation, too-good-to-be-true salary highlighted, registration fee form appearing ominously, credit card being entered, warning infographic reveal',
    duration: 8,
  },
  'loan-app-001': {
    prompt: 'Predatory loan app animation, instant approval banner flashing, excessive permissions pop-ups appearing, threatening messages animation, Bank of Thailand warning seal',
    duration: 8,
  },
  'qr-scam-001': {
    prompt: 'Thai market scene, QR code sticker being placed over legitimate code, phone scanning animation, wrong recipient name highlighted in red, payment warning reveal',
    duration: 8,
  },
  'sim-swap-001': {
    prompt: 'Phone losing signal animation, SIM card ejecting, hacker receiving OTP codes on multiple screens, bank accounts showing unauthorized transfers, cybercrime visualization',
    duration: 8,
  },
};

/**
 * Get access token for Vertex AI
 */
async function getAccessToken() {
  try {
    const { execSync } = require('child_process');
    return execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.error('❌ Run: gcloud auth application-default login');
    return null;
  }
}

/**
 * Generate video using Veo 2 (image-to-video)
 */
async function generateVideoFromImage(scenarioId, imagePath, prompt, accessToken) {
  console.log(`🎬 Generating video for: ${scenarioId}`);
  console.log(`   Image: ${imagePath}`);
  console.log(`   Prompt: ${prompt.substring(0, 60)}...`);

  // Read image as base64
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = imageBuffer.toString('base64');

  try {
    // Vertex AI Veo 2 endpoint
    const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${GCP_PROJECT_ID}/locations/us-central1/publishers/google/models/${VEO_MODEL}:predictLongRunning`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{
          prompt: prompt,
          image: {
            bytesBase64Encoded: imageBase64,
          },
        }],
        parameters: {
          aspectRatio: '16:9',
          sampleCount: 1,
          durationSeconds: 8,
          enhancePrompt: true,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`   ❌ Veo API Error: ${error}`);
      return null;
    }

    const data = await response.json();

    // Veo returns operation ID for long-running task
    if (data.name) {
      console.log(`   ⏳ Operation started: ${data.name}`);
      return data.name; // Return operation ID to poll later
    }

    // Direct response (if available)
    if (data.predictions?.[0]?.video?.bytesBase64Encoded) {
      return Buffer.from(data.predictions[0].video.bytesBase64Encoded, 'base64');
    }

    console.error('   ❌ Unexpected response format');
    return null;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

/**
 * Poll for video completion
 */
async function pollVideoOperation(operationName, accessToken) {
  const maxAttempts = 60; // 5 minutes max
  const pollInterval = 5000; // 5 seconds

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(
        `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }
      );

      const data = await response.json();

      if (data.done) {
        if (data.response?.predictions?.[0]?.video?.bytesBase64Encoded) {
          return Buffer.from(data.response.predictions[0].video.bytesBase64Encoded, 'base64');
        }
        if (data.error) {
          console.error(`   ❌ Operation failed: ${data.error.message}`);
          return null;
        }
      }

      console.log(`   ⏳ Waiting... (${i + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    } catch (error) {
      console.error(`   ❌ Poll error: ${error.message}`);
    }
  }

  console.error('   ❌ Timeout waiting for video');
  return null;
}

/**
 * Generate all scenario videos
 */
async function generateAllVideos() {
  console.log('🎬 Galaxy Agents - Scenario Video Generator\n');
  console.log(`📁 Input: ${INPUT_DIR}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`🎥 Model: ${VEO_MODEL}\n`);

  // Get access token
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error('❌ No access token available');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const scenarios = Object.keys(VIDEO_PROMPTS);
  let successCount = 0;
  let failCount = 0;

  for (const scenarioId of scenarios) {
    const outputPath = path.join(OUTPUT_DIR, `${scenarioId}.mp4`);

    // Skip if exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${scenarioId} (exists)`);
      successCount++;
      continue;
    }

    // Find first image for this scenario
    const scenarioDir = path.join(INPUT_DIR, scenarioId);
    if (!fs.existsSync(scenarioDir)) {
      console.log(`⏭️  Skipping ${scenarioId} (no images)`);
      failCount++;
      continue;
    }

    const images = fs.readdirSync(scenarioDir).filter(f => f.endsWith('.png'));
    if (images.length === 0) {
      console.log(`⏭️  Skipping ${scenarioId} (no images)`);
      failCount++;
      continue;
    }

    const imagePath = path.join(scenarioDir, images[0]); // Use first image
    const { prompt } = VIDEO_PROMPTS[scenarioId];

    const result = await generateVideoFromImage(scenarioId, imagePath, prompt, accessToken);

    if (typeof result === 'string') {
      // Operation ID - need to poll
      const videoBuffer = await pollVideoOperation(result, accessToken);
      if (videoBuffer) {
        fs.writeFileSync(outputPath, videoBuffer);
        console.log(`   ✅ Saved: ${outputPath}`);
        successCount++;
      } else {
        failCount++;
      }
    } else if (Buffer.isBuffer(result)) {
      fs.writeFileSync(outputPath, result);
      console.log(`   ✅ Saved: ${outputPath}`);
      successCount++;
    } else {
      failCount++;
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  console.log(`\n========================================`);
  console.log(`✅ Success: ${successCount}/${scenarios.length}`);
  console.log(`❌ Failed: ${failCount}/${scenarios.length}`);
  console.log(`========================================\n`);
}

// Run
generateAllVideos().catch(console.error);
