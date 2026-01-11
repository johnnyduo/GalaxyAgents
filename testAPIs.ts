// API Testing Utility for Galaxy Agents Fraud Defense
// Use this to verify your API keys are working correctly

import { geminiService } from './services/api';

export const testAPIs = async () => {
  console.log('🧪 Galaxy Agents Fraud Defense - API Testing Suite\n');
  console.log('═══════════════════════════════════════\n');

  // Test Gemini AI
  console.log('1️⃣ Testing Gemini AI API...');
  try {
    const geminiResult = await geminiService.chat({
      prompt: 'Say "Hello from Galaxy Agents!" in one sentence.',
      temperature: 0.7
    });
    console.log('✅ Gemini AI:', geminiResult.text);
  } catch (error) {
    console.error('❌ Gemini AI failed:', error);
  }

  console.log('\n═══════════════════════════════════════');
  console.log('✨ Testing Complete!\n');
  console.log('💡 Tips:');
  console.log('   - If any test fails, check your .env.local file');
  console.log('   - Ensure API keys are valid and not rate-limited');
  console.log('   - Fallback data will be used if APIs are unavailable\n');
};

// Test dialogue system
export const testDialogues = () => {
  console.log('🗨️ Testing Agent Dialogues\n');
  console.log('═══════════════════════════════════════\n');
  
  // Import agents from constants
  import('./constants').then(({ AGENTS }) => {
    AGENTS.forEach((agent, index) => {
      console.log(`${index + 1}. ${agent.name} (${agent.role})`);
      
      if (agent.personality) {
        console.log(`   Traits: ${agent.personality.traits.join(', ')}`);
        console.log(`   Dialogues:`);
        agent.personality.dialogues.forEach((dialogue, i) => {
          console.log(`      ${i + 1}. "${dialogue}"`);
        });
      } else {
        console.log('   ❌ No personality defined!');
      }
      console.log('');
    });
    
    console.log('═══════════════════════════════════════');
    console.log('✨ All agent personalities loaded!\n');
  });
};

// Run tests if executed directly
if (typeof window !== 'undefined') {
  (window as any).testAPIs = testAPIs;
  (window as any).testDialogues = testDialogues;
  console.log('💻 Run testAPIs() in browser console to test all APIs');
  console.log('💬 Run testDialogues() to test agent dialogue system');
}
