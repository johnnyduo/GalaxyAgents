// API Service Layer for Galaxy Agents Fraud Defense
// Integrates: Gemini AI for intelligent fraud detection and analysis

import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize Gemini AI
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

// ===========================
// SMART CACHING LAYER
// ===========================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class SmartCache {
  private prefix = 'galaxy_cache_';

  set<T>(key: string, data: T, ttlSeconds: number = 300): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + (ttlSeconds * 1000)
      };
      localStorage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch (e) {
      console.warn('Cache write failed:', e);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      
      // Check if expired
      if (Date.now() > entry.expiresAt) {
        this.delete(key);
        return null;
      }

      return entry.data;
    } catch (e) {
      console.warn('Cache read failed:', e);
      return null;
    }
  }

  delete(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (e) {
      console.warn('Cache delete failed:', e);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn('Cache clear failed:', e);
    }
  }
}

const cache = new SmartCache();

// ===========================
// API RATE LIMITER
// ===========================

class RateLimiter {
  private calls: Record<string, number[]> = {};
  private limits: Record<string, { maxCalls: number; windowMs: number }> = {
    gemini: { maxCalls: 10, windowMs: 60000 } // 10 calls per minute
  };

  canMakeCall(service: string): boolean {
    const now = Date.now();
    const limit = this.limits[service];
    
    if (!limit) return true; // No limit defined

    // Initialize if needed
    if (!this.calls[service]) {
      this.calls[service] = [];
    }

    // Remove old calls outside the window
    this.calls[service] = this.calls[service].filter(
      timestamp => now - timestamp < limit.windowMs
    );

    // Check if we can make a new call
    return this.calls[service].length < limit.maxCalls;
  }

  recordCall(service: string): void {
    const now = Date.now();
    if (!this.calls[service]) {
      this.calls[service] = [];
    }
    this.calls[service].push(now);
  }

  getRemainingCalls(service: string): number {
    const limit = this.limits[service];
    if (!limit) return Infinity;

    const now = Date.now();
    if (!this.calls[service]) return limit.maxCalls;

    const recentCalls = this.calls[service].filter(
      timestamp => now - timestamp < limit.windowMs
    );

    return Math.max(0, limit.maxCalls - recentCalls.length);
  }

  getTimeUntilReset(service: string): number {
    const limit = this.limits[service];
    if (!limit || !this.calls[service] || this.calls[service].length === 0) {
      return 0;
    }

    const now = Date.now();
    const oldestCall = Math.min(...this.calls[service]);
    const resetTime = oldestCall + limit.windowMs;
    
    return Math.max(0, resetTime - now);
  }
}

const rateLimiter = new RateLimiter();

// ===========================
// GEMINI AI SERVICE
// ===========================

export interface GeminiRequest {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GeminiResponse {
  text: string;
  candidates?: any[];
  error?: string;
}

export const geminiService = {
  async chat(request: GeminiRequest): Promise<GeminiResponse> {
    if (!GEMINI_API_KEY) {
      console.warn('Gemini API key not configured');
      return { text: 'API key not configured', error: 'MISSING_API_KEY' };
    }

    // Check rate limit
    if (!rateLimiter.canMakeCall('gemini')) {
      const waitTime = Math.ceil(rateLimiter.getTimeUntilReset('gemini') / 1000);
      console.warn(`⏳ Gemini rate limit reached. Wait ${waitTime}s. Remaining calls: ${rateLimiter.getRemainingCalls('gemini')}`);
      return { 
        text: `Rate limit: ${rateLimiter.getRemainingCalls('gemini')} calls remaining`, 
        error: 'RATE_LIMITED' 
      };
    }

    try {
      rateLimiter.recordCall('gemini');
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: request.prompt,
      });
      
      const text = response.text || 'No response';
      
      return { text };
    } catch (error: any) {
      // Handle specific error cases
      let errorMessage = 'AI service temporarily unavailable';
      let shouldLogError = true;
      
      if (error?.message?.includes('overloaded') || error?.error?.message?.includes('overloaded')) {
        errorMessage = 'AI service is busy, please try again';
        shouldLogError = false;
      } else if (error?.message?.includes('quota') || error?.message?.includes('429')) {
        errorMessage = 'Daily quota exceeded - AI disabled until reset';
        shouldLogError = true;
        console.error('🚨 GEMINI QUOTA EXCEEDED - Disabling AI calls');
      } else if (error?.message?.includes('UNAVAILABLE') || error?.error?.status === 'UNAVAILABLE') {
        errorMessage = 'AI service temporarily down';
        shouldLogError = false;
      }
      
      if (shouldLogError) {
        console.error('Gemini API error:', error);
      } else {
        console.warn('Gemini API:', errorMessage);
      }
      
      return { 
        text: errorMessage, 
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR' 
      };
    }
  },

  // Agent-specific intelligence queries with caching
  async analyzeMarket(symbol: string, data: any): Promise<string> {
    // Cache key based on symbol and price (rounded to reduce cache misses)
    const priceRounded = Math.round(data.price / 10) * 10; // Round to nearest $10
    const cacheKey = `market_analysis_${symbol}_${priceRounded}`;
    
    // Check cache first (5 minutes TTL)
    const cached = cache.get<string>(cacheKey);
    if (cached) {
      return cached;
    }

    const prompt = `As a fraud analysis expert, analyze the following data: ${JSON.stringify(data)}. Provide a concise 2-sentence security insight.`;
    const response = await this.chat({ prompt, temperature: 0.5 });
    
    // Cache successful responses
    if (response.text && !response.error) {
      cache.set(cacheKey, response.text, 300); // 5 minutes
    }
    
    return response.text;
  },

  async generateStrategy(agentRole: string, context: string): Promise<string> {
    // Don't cache strategies - they should be dynamic
    // But check rate limit before calling
    if (!rateLimiter.canMakeCall('gemini')) {
      return 'Systems monitoring. Standing by for next opportunity.';
    }

    const prompt = `You are a ${agentRole} agent in a decentralized AI network. Given context: ${context}. Suggest the next optimal action in 1 sentence.`;
    const response = await this.chat({ prompt, temperature: 0.8 });
    return response.text;
  },

  async generateTechnicalSignal(asset: string, currentPrice: number, priceData: any): Promise<{
    signal: 'BUY' | 'SELL' | 'HOLD';
    confidence: number;
    analysis: string;
    entry: number;
    target: number;
    stopLoss: number;
    reasoning: string;
  }> {
    // Check rate limit
    if (!rateLimiter.canMakeCall('gemini')) {
      return {
        signal: 'HOLD',
        confidence: 0,
        analysis: 'AI rate limited - analysis pending',
        entry: currentPrice,
        target: currentPrice,
        stopLoss: currentPrice * 0.95,
        reasoning: 'Rate limit reached'
      };
    }

    const prompt = `You are a fraud defense analyst examining suspicious transaction patterns.

Transaction Analysis Context: ${JSON.stringify(priceData)}
Current Assessment: ${currentPrice}

Analyze this transaction pattern and provide:
1. Risk signal (HIGH_RISK/MEDIUM_RISK/LOW_RISK)
2. Confidence level (0-100)
3. Brief analysis (2-3 sentences, clear and actionable)
4. Recommended action
5. Key fraud indicators

Provide response in this exact JSON format:
{
  "signal": "HIGH_RISK/MEDIUM_RISK/LOW_RISK",
  "confidence": 85,
  "analysis": "Brief analysis here",
  "entry": "recommended_action",
  "target": "expected_outcome",
  "stopLoss": "fallback_plan",
  "reasoning": "Key fraud indicators"
}`;

    try {
      const response = await this.chat({ prompt, temperature: 0.3 });
      
      // Try to parse JSON response
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          signal: parsed.signal || 'HOLD',
          confidence: parsed.confidence || 50,
          analysis: parsed.analysis || response.text.substring(0, 200),
          entry: parsed.entry || currentPrice,
          target: parsed.target || currentPrice * 1.08,
          stopLoss: parsed.stopLoss || currentPrice * 0.95,
          reasoning: parsed.reasoning || 'Technical analysis'
        };
      }
      
      // Fallback parsing
      const signal = response.text.toUpperCase().includes('BUY') ? 'BUY' : 
                    response.text.toUpperCase().includes('SELL') ? 'SELL' : 'HOLD';
      
      return {
        signal: signal as 'BUY' | 'SELL' | 'HOLD',
        confidence: 65,
        analysis: response.text.substring(0, 200),
        entry: currentPrice,
        target: signal === 'BUY' ? currentPrice * 1.08 : currentPrice * 0.95,
        stopLoss: currentPrice * 0.95,
        reasoning: 'AI technical analysis'
      };
    } catch (error) {
      console.error('Technical signal generation error:', error);
      return {
        signal: 'HOLD',
        confidence: 0,
        analysis: 'Analysis error - standing by',
        entry: currentPrice,
        target: currentPrice,
        stopLoss: currentPrice * 0.95,
        reasoning: 'Error in analysis'
      };
    }
  },

  // Generate dynamic agent dialogue based on context (FRAUD DEFENSE FOCUSED)
  async generateAgentDialogue(agentName: string, agentRole: string, context: string = ''): Promise<string> {
    if (!ai || !GEMINI_API_KEY) {
      // Fallback to rule-based responses
      const ruleBased = {
        'Big Boss': [
          'All units report status. Defense network operational.',
          'Analyzing threat patterns across all sectors.',
          'Coordinating team response. Stay vigilant.',
          'Strategic position secure. Maintaining watch.'
        ],
        'Hawk Eye': [
          'Scanning for new fraud patterns... Systems online.',
          'Threat radar active. Monitoring suspicious activity.',
          'Pattern analysis in progress. No major threats detected.',
          'Eyes on the horizon. Defense perimeter secure.'
        ],
        'Memory Bank': [
          'Cross-referencing scam database... Match probability: calculating.',
          'Historical pattern analysis complete. Similarities found.',
          'Knowledge vault updated with new threat signatures.',
          'Archived cases reviewed. Intelligence ready.'
        ],
        'Guardian Angel': [
          'Personal protection active. How can I help you today?',
          'Standing by to assist. Your safety is my priority.',
          'Monitoring for suspicious messages and calls.',
          'Ready to answer your fraud prevention questions.'
        ],
        'Scam Trainer': [
          'Training simulation ready. Lets learn fraud tactics together.',
          'Creating new awareness content for current threats.',
          'Interactive defense drills available. Stay sharp!',
          'Education modules updated with latest scam types.'
        ],
        'Money Guard': [
          'Business transaction monitoring active.',
          'Invoice verification systems running smoothly.',
          'BEC defense protocols engaged. Your finances are protected.',
          'SME shield operational. Zero tolerance for fraud.'
        ],
        'Lightning Alert': [
          'Alert system armed. Ready for rapid deployment.',
          'Multi-channel broadcast systems tested and ready.',
          'Emergency notification network: OPERATIONAL',
          'Standing by for urgent threat warnings.'
        ]
      };

      const dialogues = ruleBased[agentName as keyof typeof ruleBased] || ['Agent ready and operational.'];
      return dialogues[Math.floor(Math.random() * dialogues.length)];
    }

    // AI-powered dynamic dialogue
    const cacheKey = `dialogue_${agentName}_${context.substring(0, 20)}`;
    const cached = cache.get<string>(cacheKey);
    if (cached) return cached;

    if (!rateLimiter.canMakeCall('gemini')) {
      // Return rule-based fallback when rate limited
      const ruleBased = {
        'Big Boss': 'Command center monitoring. All systems nominal.',
        'Hawk Eye': 'Threat detection active. Scanning continues.',
        'Memory Bank': 'Database analysis ongoing. Patterns logged.',
        'Guardian Angel': 'Protection mode engaged. Standing by.',
        'Scam Trainer': 'Training systems ready. Education continues.',
        'Money Guard': 'Transaction watch active. Funds secured.',
        'Lightning Alert': 'Alert systems primed. Ready to broadcast.'
      };
      return ruleBased[agentName as keyof typeof ruleBased] || 'Agent operational.';
    }

    const roleContext = {
      'Big Boss': 'strategic commander coordinating fraud defense',
      'Hawk Eye': 'vigilant scanner detecting fraud patterns',
      'Memory Bank': 'knowledge keeper of scam intelligence',
      'Guardian Angel': 'friendly protector of citizens',
      'Scam Trainer': 'educational expert on fraud awareness',
      'Money Guard': 'business transaction guardian',
      'Lightning Alert': 'rapid alert broadcaster'
    };

    const prompt = `You are ${agentName}, a ${roleContext[agentName as keyof typeof roleContext] || agentRole} AI agent in a fraud defense network.

Context: ${context || 'normal operations'}

Generate a brief, professional status update or commentary (1-2 sentences max) that fits your role. Be concise, authoritative, and focused on fraud defense. Use present tense.`;

    try {
      rateLimiter.recordCall('gemini');
      const response = await this.chat({ prompt, temperature: 0.7 });
      
      if (response.text && !response.error) {
        cache.set(cacheKey, response.text, 180); // 3 minutes
        return response.text;
      }
      
      // Fallback
      return `${agentName}: Systems operational. Defense protocols active.`;
    } catch (error) {
      console.warn('Dialogue generation error:', error);
      return `${agentName}: Ready and monitoring.`;
    }
  }
};

// ===========================
// NEWS SENTIMENT SERVICE
// ===========================

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface NewsSentiment {
  articles: NewsArticle[];
  overallSentiment: 'bullish' | 'bearish' | 'neutral';
  score: number; // -1 to 1
  error?: string;
}

export const newsService = {
  async getCryptoNews(query: string = 'fraud scam'): Promise<NewsSentiment> {
    // Stub function - returns fallback only (News API removed, use Gemini AI instead)
    return this._getFallbackNews();
  },

  _analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const lowerText = text.toLowerCase();
    const positiveWords = ['surge', 'rally', 'gain', 'bull', 'rise', 'growth', 'profit', 'success'];
    const negativeWords = ['crash', 'fall', 'bear', 'loss', 'decline', 'drop', 'fail', 'risk'];

    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  },

  _calculateOverallSentiment(articles: NewsArticle[]): number {
    if (articles.length === 0) return 0;

    const scores = articles.map(a => {
      if (a.sentiment === 'positive') return 1;
      if (a.sentiment === 'negative') return -1;
      return 0;
    });

    return scores.reduce((sum, score) => sum + score, 0) / articles.length;
  },

  _getFallbackNews(): NewsSentiment {
    return {
      articles: [
        {
          title: 'Fraud Defense Intelligence Update',
          description: 'AI-powered fraud detection systems remain vigilant against emerging scam tactics.',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: 'Gemini AI',
          sentiment: 'positive'
        }
      ],
      overallSentiment: 'neutral',
      score: 0
    };
  }
};

// ===========================
// UNIFIED API ORCHESTRATOR
// ===========================

export interface AgentIntelligence {
  sentiment?: NewsSentiment;
  onchainData?: any;
  aiInsight?: string;
  timestamp: number;
}

export const orchestrator = {
  async getMarketResearch(topic: string = 'fraud detection trends'): Promise<AgentIntelligence> {
    const results: AgentIntelligence = {
      timestamp: Date.now()
    };

    try {
      // Generate AI-powered fraud intelligence
      try {
        const prompt = `Provide a brief intelligence briefing on current ${topic} focusing on emerging fraud patterns, prevention strategies, and market risks.`;
        const aiResponse = await geminiService.generateAgentDialogue(
          'Intelligence Analyst',
          prompt,
          `Analyzing ${topic}`
        );
        
        if (aiResponse && !aiResponse.includes('unavailable') && !aiResponse.includes('busy')) {
          results.aiInsight = aiResponse;
        } else {
          results.aiInsight = `Analyzing ${topic} for fraud defense intelligence...`;
        }
      } catch (error) {
        results.aiInsight = `Intelligence analysis for ${topic} is currently being processed...`;
      }

      return results;
    } catch (error) {
      console.error('Intelligence research error:', error);
      return results;
    }
  },

  async getAgentIntelligence(agentRole: string, symbol: string = 'ETH/USD'): Promise<AgentIntelligence> {
    const results: AgentIntelligence = {
      timestamp: Date.now()
    };

    try {
      // Parallel API calls for efficiency - simplified for fraud defense
      const [sentiment] = await Promise.all([
        newsService.getCryptoNews('fraud scam').catch(() => undefined)
      ]);

      results.sentiment = sentiment;

      // Generate AI insight based on collected data (non-blocking)
      try {
        if (sentiment) {
          const context = `Fraud defense monitoring with ${sentiment.overallSentiment} sentiment in scam news`;
          const aiResponse = await geminiService.generateStrategy(agentRole, context);
          // Only use AI response if it's not an error message
          if (aiResponse && !aiResponse.includes('unavailable') && !aiResponse.includes('busy')) {
            results.aiInsight = aiResponse;
          } else {
            results.aiInsight = `Monitoring fraud patterns. Sentiment: ${sentiment.overallSentiment}`;
          }
        } else {
          results.aiInsight = 'Awaiting fraud intelligence feed. Systems operational.';
        }
      } catch (error) {
        // Fallback insight when AI is unavailable
        results.aiInsight = 'Fraud defense systems operational. Standing by for intelligence updates.';
      }

      return results;
    } catch (error) {
      console.error('Orchestrator error:', error);
      return results;
    }
  },

  // analyzeMultiChainActivity() removed - not needed for fraud defense
  async analyzeFraudPatterns(): Promise<any> {
    // Fraud defense focused analysis
    const newsData = await newsService.getCryptoNews('scam fraud')
      .catch(() => ({ articles: [], overallSentiment: 'neutral' as const, score: 0 }));

    return {
      fraudNews: newsData,
      timestamp: Date.now()
    };
  }
};

// ===========================
// UTILITY FUNCTIONS
// ===========================

export const apiUtils = {
  // Get rate limiter status for all services
  getRateLimitStatus() {
    return {
      gemini: {
        remaining: rateLimiter.getRemainingCalls('gemini'),
        limit: 10,
        resetIn: rateLimiter.getTimeUntilReset('gemini')
      }
    };
  },

  // Clear all caches
  clearCache() {
    cache.clear();
    console.log('🧹 All API caches cleared');
  },

  // Get cache stats
  getCacheStats() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('galaxy_cache_'));
    return {
      totalEntries: keys.length,
      keys: keys.map(k => k.replace('galaxy_cache_', ''))
    };
  },

  // Check if we should make an API call (smart throttling)
  shouldMakeApiCall(service: 'gemini'): boolean {
    const remaining = rateLimiter.getRemainingCalls(service);
    
    // Reserve some calls for critical operations
    if (service === 'gemini') {
      return remaining > 2; // Keep 2 calls in reserve
    }
    
    return remaining > 0;
  }
};

// --- Agent Status Cache for FlowCanvas ---
// Tracks recent agent activities for fast FlowCanvas status updates
interface AgentActivityCache {
  [agentId: string]: {
    status: string;
    timestamp: number;
  };
}

const agentStatusCache: AgentActivityCache = {};
const STATUS_CACHE_TTL = 30000; // 30 seconds

export const agentStatusManager = {
  // Update agent status
  setStatus(agentId: string, status: string) {
    agentStatusCache[agentId] = {
      status,
      timestamp: Date.now()
    };
  },

  // Get current status (returns 'Idling...' if expired)
  getStatus(agentId: string): string {
    const cached = agentStatusCache[agentId];
    if (!cached) return 'Idling...';
    
    const age = Date.now() - cached.timestamp;
    if (age > STATUS_CACHE_TTL) {
      return 'Idling...';
    }
    
    return cached.status;
  },

  // Clear status for specific agent
  clearStatus(agentId: string) {
    delete agentStatusCache[agentId];
  },

  // Get all current statuses
  getAllStatuses(): Record<string, string> {
    const result: Record<string, string> = {};
    for (const agentId in agentStatusCache) {
      result[agentId] = this.getStatus(agentId);
    }
    return result;
  }
};

// Make utilities available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).apiUtils = apiUtils;
  (window as any).agentStatusManager = agentStatusManager;
  
  // Helpful console commands
  console.log('%c🛡️ GALAXY AGENTS FRAUD DEFENSE', 'color: #39ff14; font-weight: bold; font-size: 14px;');
  console.log('%cUse these commands in console:', 'color: #39ff14;');
  console.log('  apiUtils.getRateLimitStatus() - Check API rate limits');
  console.log('  apiUtils.getCacheStats() - View cache statistics');
  console.log('  apiUtils.clearCache() - Clear all cached data');
  console.log('  apiUtils.shouldMakeApiCall("gemini") - Check if safe to call API');
  console.log('  agentStatusManager.getAllStatuses() - View agent activity cache');
}
