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
      if (!ai) {
        return { text: 'AI service not initialized', error: 'NO_AI_INSTANCE' };
      }

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

  // Generate dynamic agent dialogue based on context (FRAUD DEFENSE FOCUSED)
  async generateAgentDialogue(agentName: string, agentRole: string, context: string = ''): Promise<string> {
    if (!ai || !GEMINI_API_KEY) {
      // Fallback to rule-based responses
      const ruleBased: Record<string, string[]> = {
        'ลุงสิงห์ (Big Boss)': [
          'ทุกหน่วยรายงานสถานะ! ระบบป้องกันพร้อม!',
          'กำลังวิเคราะห์รูปแบบภัยคุกคามทุกภาคส่วน',
          'ประสานทีมตอบโต้ เฝ้าระวังต่อเนื่อง!',
          'ตำแหน่งเชิงกลยุทธ์มั่นคง รักษาการเฝ้าระวัง'
        ],
        'พี่เหยี่ยว (Hawk Eye)': [
          'กำลังสแกนรูปแบบกลโกงใหม่... ระบบออนไลน์',
          'เรดาร์ภัยคุกคามทำงานอยู่ ตรวจจับกิจกรรมต้องสงสัย',
          'วิเคราะห์รูปแบบอยู่ ยังไม่พบภัยคุกคามหลัก',
          'จับตาขอบฟ้า ขอบเขตป้องกันมั่นคง'
        ],
        'ป้าฮูก (Memory Bank)': [
          'กำลังเปรียบเทียบฐานข้อมูลกลโกง... คำนวณความน่าจะเป็น',
          'วิเคราะห์รูปแบบอดีตเสร็จแล้ว พบความคล้ายจ้า',
          'อัปเดตลายเซ็นภัยคุกคามใหม่ในคลังความรู้แล้ว',
          'ทบทวนเคสเก่าเรียบร้อย ข่าวกรองพร้อมจ้า'
        ],
        'น้องฟ้า (Guardian Angel)': [
          'ระบบคุ้มครองส่วนตัวทำงานอยู่ค่ะ ช่วยอะไรได้บ้างคะ?',
          'พร้อมช่วยเหลือค่ะ ความปลอดภัยของคุณสำคัญที่สุด!',
          'กำลังเฝ้าระวังข้อความและสายโทรต้องสงสัยค่ะ',
          'พร้อมตอบคำถามเรื่องป้องกันกลโกงค่ะ!'
        ],
        'ครูหมี (Scam Trainer)': [
          'จำลองสถานการณ์พร้อม! มาเรียนรู้กลโกงด้วยกัน!',
          'กำลังสร้างสื่อสร้างความตระหนักรู้เรื่องภัยคุกคามปัจจุบัน',
          'แบบฝึกป้องกันแบบโต้ตอบพร้อมใช้แล้ว ตื่นตัวไว้นะ!',
          'สื่อการสอนอัปเดตกลโกงประเภทล่าสุดแล้ว!'
        ],
        'จ.ส.ต.จิ้งจอก (Money Guard)': [
          'ระบบตรวจสอบธุรกรรมธุรกิจทำงานอยู่ครับ',
          'ระบบตรวจสอบใบแจ้งหนี้ทำงานปกติ',
          'มาตรการป้องกัน BEC เปิดใช้งาน การเงินของคุณปลอดภัย!',
          'ระบบปกป้อง SME ทำงาน ไม่ยอมให้กลโกงผ่าน!'
        ],
        'ผบ.มังกร (Lightning Alert)': [
          'ระบบแจ้งเตือนพร้อมยิง รอส่งได้ทันที!',
          'ระบบประกาศหลายช่องทางทดสอบแล้ว พร้อมใช้งาน!',
          'เครือข่ายแจ้งเตือนฉุกเฉิน: พร้อมปฏิบัติการ!',
          'รอคำสั่งเตือนภัยคุกคามเร่งด่วน!'
        ]
      };

      const dialogues = ruleBased[agentName] || ['Agent พร้อมปฏิบัติการ'];
      return dialogues[Math.floor(Math.random() * dialogues.length)];
    }

    // AI-powered dynamic dialogue
    const cacheKey = `dialogue_${agentName}_${context.substring(0, 20)}`;
    const cached = cache.get<string>(cacheKey);
    if (cached) return cached;

    if (!rateLimiter.canMakeCall('gemini')) {
      // Return rule-based fallback when rate limited
      const ruleBased: Record<string, string> = {
        'ลุงสิงห์ (Big Boss)': 'ศูนย์บัญชาการเฝ้าระวัง ระบบทั้งหมดปกติ',
        'พี่เหยี่ยว (Hawk Eye)': 'ตรวจจับภัยคุกคามทำงานอยู่ สแกนต่อเนื่อง',
        'ป้าฮูก (Memory Bank)': 'วิเคราะห์ฐานข้อมูลอยู่ บันทึกรูปแบบแล้วจ้า',
        'น้องฟ้า (Guardian Angel)': 'โหมดคุ้มครองเปิดอยู่ค่ะ พร้อมช่วยเหลือ',
        'ครูหมี (Scam Trainer)': 'ระบบฝึกอบรมพร้อม สื่อการสอนต่อเนื่อง',
        'จ.ส.ต.จิ้งจอก (Money Guard)': 'เฝ้าระวังธุรกรรมอยู่ เงินปลอดภัยครับ',
        'ผบ.มังกร (Lightning Alert)': 'ระบบแจ้งเตือนเตรียมพร้อม รอส่งประกาศ'
      };
      return ruleBased[agentName] || 'Agent พร้อมปฏิบัติการ';
    }

    const roleContext: Record<string, string> = {
      'ลุงสิงห์ (Big Boss)': 'strategic commander coordinating fraud defense',
      'พี่เหยี่ยว (Hawk Eye)': 'vigilant scanner detecting fraud patterns',
      'ป้าฮูก (Memory Bank)': 'knowledge keeper of scam intelligence',
      'น้องฟ้า (Guardian Angel)': 'friendly protector of citizens',
      'ครูหมี (Scam Trainer)': 'educational expert on fraud awareness',
      'จ.ส.ต.จิ้งจอก (Money Guard)': 'business transaction guardian',
      'ผบ.มังกร (Lightning Alert)': 'rapid alert broadcaster'
    };

    const prompt = `You are ${agentName}, a ${roleContext[agentName] || agentRole} AI agent in a fraud defense network.

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

// Make service available globally for debugging
if (typeof window !== 'undefined') {
  console.log('%c🛡️ GALAXY AGENTS FRAUD DEFENSE', 'color: #39ff14; font-weight: bold; font-size: 14px;');
}
