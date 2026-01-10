// API Testing Utility for Galaxy Agents Fraud Defense
// Use this to verify your API keys are working correctly

import { geminiService, coingeckoService, newsService } from './services/api';

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

  console.log('\n');

  // Test CoinGecko (for crypto fraud detection)
  console.log('2️⃣ Testing CoinGecko API (Fraud Detection)...');
  try {
    const prices = await coingeckoService.getMultiplePrices(['bitcoin', 'ethereum']);
    console.log('✅ Crypto Data Available:', Object.keys(prices).length, 'coins');
    console.log('   Bitcoin:', `$${prices.bitcoin?.usd?.toFixed(2) || 'N/A'}`);
  } catch (error) {
    console.error('❌ CoinGecko failed:', error);
  }

  console.log('\n');

  // Test News API
  console.log('3️⃣ Testing News API (Fraud Intelligence)...');
  try {
    const sentiment = await newsService.getCryptoNews('fraud scam');
    console.log('✅ Fraud News Available');
    console.log(`   Articles Found: ${sentiment.articles.length}`);
    if (sentiment.articles.length > 0) {
      console.log(`   Latest: "${sentiment.articles[0].title.substring(0, 60)}..."`);
    }
  } catch (error) {
    console.error('❌ News API failed:', error);
  }

  console.log('\n');

  // Test Hedera Mirror Node
  console.log('4️⃣ Testing Hedera Mirror Node...');
  try {
    const transactions = await hederaService.getRecentTransactions(undefined, 5);
    console.log(`✅ Hedera Transactions: ${transactions.length} recent found`);
    
    const networkStats = await hederaService.getNetworkStats();
    if (!networkStats.error) {
      console.log('✅ Hedera Network: Connected successfully');
    }
  } catch (error) {
    console.error('❌ Hedera API failed:', error);
  }

  console.log('\n');

  // Test Orchestrator (Combined Intelligence)
  console.log('5️⃣ Testing Unified Orchestrator...');
  try {
    const intelligence = await orchestrator.getAgentIntelligence('Oracle', 'ETH/USD');
    console.log('✅ Agent Intelligence Gathered:');
    if (intelligence.marketData) {
      console.log(`   📊 Market: ETH at $${intelligence.marketData.price.toFixed(2)}`);
    }
    if (intelligence.sentiment) {
      console.log(`   📰 Sentiment: ${intelligence.sentiment.overallSentiment}`);
    }
    if (intelligence.aiInsight) {
      console.log(`   🤖 AI Insight: "${intelligence.aiInsight.substring(0, 80)}..."`);
    }
  } catch (error) {
    console.error('❌ Orchestrator failed:', error);
  }

  console.log('\n═══════════════════════════════════════');
  console.log('✨ Testing Complete!\n');
  console.log('💡 Tips:');
  console.log('   - If any test fails, check your .env.local file');
  console.log('   - Ensure API keys are valid and not rate-limited');
  console.log('   - Hedera Mirror Node requires no API key');
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
