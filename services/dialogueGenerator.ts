// Dynamic Dialogue Generator for Agent-to-Agent Communication
// Enhanced with Gemini AI for dynamic, contextual responses

import { AgentMetadata } from '../types';
import { coingeckoService, CryptoPriceData, geminiService } from './api';

export interface DialogueContext {
  agentId: string;
  context?: 'greeting' | 'analyzing' | 'negotiating' | 'success' | 'idle' | 'error' | 'price_alert';
  customMessage?: string;
  priceData?: CryptoPriceData;
  connectedAgents?: AgentMetadata[];
  hasTeam?: boolean;
  connectedToCaptain?: boolean;
}

export class DialogueGenerator {
  private priceCache: Map<string, CryptoPriceData> = new Map();
  private lastPriceFetch: number = 0;
  private PRICE_CACHE_TTL = 30000; // 30 seconds

  async generateDialogue(agent: AgentMetadata, context: DialogueContext): Promise<string> {
    const { 
      context: dialogueContext, 
      customMessage, 
      priceData, 
      connectedAgents = [], 
      hasTeam = false,
      connectedToCaptain = false
    } = context;

    // Handle custom error messages
    if (dialogueContext === 'error' && customMessage) {
      return `⚠️ ${customMessage}`;
    }

    const isCaptain = agent.id === 'a0';
    const dialogues = agent.personality?.dialogues || [];

    // Try Gemini-powered dynamic dialogue first
    if (dialogueContext && dialogueContext !== 'error') {
      try {
        const contextStr = this.buildContextString(agent, {
          dialogueContext,
          hasTeam,
          connectedAgents,
          priceData,
          connectedToCaptain
        });
        
        const aiDialogue = await geminiService.generateAgentDialogue(
          agent.name,
          agent.role,
          contextStr
        );
        
        if (aiDialogue && aiDialogue.length > 0) {
          return aiDialogue;
        }
      } catch (error) {
        console.warn(`AI dialogue failed for ${agent.name}, using fallback:`, error);
      }
    }

    // Fallback to rule-based dialogues
    // Captain-specific dynamic dialogues
    if (isCaptain) {
      return this.generateCaptainDialogue(agent, {
        dialogueContext,
        hasTeam,
        connectedAgents,
        priceData
      });
    }

    // Regular agent dialogues with price integration
    return this.generateAgentDialogue(agent, {
      dialogueContext,
      connectedToCaptain,
      connectedAgents,
      priceData,
      dialogues
    });
  }

  private buildContextString(
    agent: AgentMetadata,
    options: {
      dialogueContext?: string;
      hasTeam: boolean;
      connectedAgents: AgentMetadata[];
      priceData?: CryptoPriceData;
      connectedToCaptain: boolean;
    }
  ): string {
    const { dialogueContext, hasTeam, connectedAgents, priceData, connectedToCaptain } = options;
    
    const parts: string[] = [];
    
    if (dialogueContext === 'greeting') parts.push('just activated');
    else if (dialogueContext === 'analyzing') parts.push('analyzing fraud patterns');
    else if (dialogueContext === 'success') parts.push('completed task successfully');
    else if (dialogueContext === 'idle') parts.push('on standby monitoring');
    
    if (hasTeam) parts.push(`coordinating with ${connectedAgents.length} agents`);
    if (connectedToCaptain) parts.push('connected to command');
    
    if (priceData) {
      parts.push(`market conditions: ${priceData.price_change_percentage_24h > 0 ? 'rising' : 'falling'}`);
    }
    
    return parts.join(', ') || 'normal operations';
  }

  private async fetchLatestPrice(symbol: string = 'ethereum'): Promise<CryptoPriceData | null> {
    const now = Date.now();
    
    // Check cache first
    if (this.priceCache.has(symbol) && (now - this.lastPriceFetch) < this.PRICE_CACHE_TTL) {
      return this.priceCache.get(symbol) || null;
    }

    try {
      const priceData = await coingeckoService.getMarketData(symbol);
      this.priceCache.set(symbol, priceData);
      this.lastPriceFetch = now;
      return priceData;
    } catch (error) {
      console.error('Failed to fetch price for dialogue:', error);
      return null;
    }
  }

  private generateCaptainDialogue(
    agent: AgentMetadata,
    options: {
      dialogueContext?: string;
      hasTeam: boolean;
      connectedAgents: AgentMetadata[];
      priceData?: CryptoPriceData;
    }
  ): string {
    const { dialogueContext, hasTeam, connectedAgents, priceData } = options;

    // Recruitment phase - no team yet
    if (dialogueContext === 'greeting' && !hasTeam) {
      const recruitmentMessages = [
        "⚔️ Commander ready. Connect me to specialists for coordinated operations.",
        "🎯 Standing by. I require tactical support—activate and connect agents to begin.",
        "📡 Systems online. Build my network to unlock full command capabilities.",
        "🌟 Big Boss reporting. I coordinate better with a connected squad—let's assemble the team.",
        "👑 The kingdom awaits our wisdom. Summon the specialists to begin operations."
      ];
      return recruitmentMessages[Math.floor(Math.random() * recruitmentMessages.length)];
    }

    // Team coordination with price data
    if (hasTeam && priceData) {
      const agentNames = connectedAgents.map(a => a.name.split(' ')[0]).join(', ');
      const priceChange = priceData.changePercent.toFixed(2);
      const trend = priceData.changePercent >= 0 ? '📈' : '📉';
      
      if (dialogueContext === 'success') {
        return `✅ ${priceData.symbol} at $${priceData.price.toLocaleString()} ${trend} ${priceChange}%. ${agentNames}, excellent intel. Proceeding with strategy.`;
      }
      
      if (dialogueContext === 'analyzing') {
        return `🔍 ${priceData.symbol} movement detected ${trend} ${priceChange}%. ${connectedAgents[0]?.name.split(' ')[0]}, analyze market depth.`;
      }

      if (Math.abs(priceData.changePercent) > 3) {
        return `⚡ ALERT: ${priceData.symbol} ${trend} ${priceChange}% in 24h! Squad, assess risk and opportunity immediately.`;
      }

      return `💼 ${priceData.symbol}: $${priceData.price.toLocaleString()} ${trend}. Team of ${connectedAgents.length} ready. ${agentNames}, maintain vigilance.`;
    }

    // Team success without price
    if (hasTeam && dialogueContext === 'success') {
      const agentNames = connectedAgents.map(a => a.name.split(' ')[0]).join(', ');
      return `✅ Operation complete. ${agentNames}—mission success. Standing by for next directive.`;
    }

    // Team coordination messages
    if (hasTeam) {
      const teamDialogues = [
        `🎯 Squad of ${connectedAgents.length} standing ready. All agents on mission clock.`,
        `⚡ Network synchronized. ${connectedAgents[0]?.name.split(' ')[0]}, prepare status report.`,
        `💼 Command operational. ${connectedAgents.map(a => a.name.split(' ')[0]).join(', ')}—maintain positions.`,
        `🛡️ Strategic grid active. All units report nominal. Awaiting market signals.`
      ];
      return teamDialogues[Math.floor(Math.random() * teamDialogues.length)];
    }

    // Fallback to personality
    return agent.personality?.dialogues[0] || "Commander standing by.";
  }

  private generateAgentDialogue(
    agent: AgentMetadata,
    options: {
      dialogueContext?: string;
      connectedToCaptain: boolean;
      connectedAgents: AgentMetadata[];
      priceData?: CryptoPriceData;
      dialogues: string[];
    }
  ): string {
    const { dialogueContext, connectedToCaptain, priceData, dialogues } = options;

    // Price-enhanced dialogues for market-focused agents
    if (priceData && ['a1', 'a2', 'a5'].includes(agent.id)) {
      const priceStr = priceData.price < 1 
        ? `$${priceData.price.toFixed(4)}` 
        : `$${priceData.price.toLocaleString()}`;
      const changeStr = priceData.changePercent >= 0 
        ? `+${priceData.changePercent.toFixed(2)}%` 
        : `${priceData.changePercent.toFixed(2)}%`;
      const trend = priceData.changePercent >= 0 ? '📈' : '📉';

      // Agent-specific price commentary
      if (agent.id === 'a1') { // Eagleton - Market Intelligence
        if (Math.abs(priceData.changePercent) > 5) {
          return `🦅 From the heights I see: ${priceData.symbol} at ${priceStr} ${trend} ${changeStr}! Major currents shifting, Commander.`;
        }
        return `🦅 Scanning markets: ${priceData.symbol} trading ${priceStr} ${trend}. Volume: $${(priceData.volume / 1e9).toFixed(2)}B. Eyes sharp.`;
      }

      if (agent.id === 'a2') { // Athena - Sentiment Analysis
        const sentiment = priceData.changePercent > 2 ? 'Bullish winds' : priceData.changePercent < -2 ? 'Bearish shadows' : 'Neutral currents';
        return `📚 My scrolls reveal: ${priceData.symbol} at ${priceStr} ${trend}. ${sentiment} detected. Wisdom guides our path.`;
      }

      if (agent.id === 'a5') { // Luna - Technical Analysis
        const signal = priceData.changePercent > 3 ? 'breakout forming' : priceData.changePercent < -3 ? 'support testing' : 'consolidation phase';
        return `🔮 The stars align: ${priceData.symbol} ${priceStr} ${trend}. Technical pattern shows ${signal}. My visions are clear.`;
      }
    }

    // Greeting - connection incentive
    if (dialogueContext === 'greeting' && !connectedToCaptain) {
      const introMessages: Record<string, string> = {
        a1: "🦅 Eagle eyes ready. Connect me to Big Boss for tactical reconnaissance.",
        a2: "📚 Archives indexed. Link me to Big Boss for strategic intelligence support.",
        a3: "💰 Fraud sensors calibrated. Awaiting Big Boss's defense directives.",
        a4: "🛡️ Security protocols active. Connect to Big Boss for perimeter coordination.",
        a5: "🔮 Predictive models online. I serve best under Big Boss's strategy.",
        a6: "📨 Communication arrays ready. Link me to Big Boss for intel relay."
      };
      return introMessages[agent.id] || dialogues[0];
    }

    // Connected to Big Boss - collaborative dialogues
    if (connectedToCaptain && dialogueContext === 'success') {
      const teamSuccessMessages = [
        `✅ Mission complete, Big Boss. ${agent.role} data transmitted.`,
        `🎯 Objective achieved. ${agent.name.split(' ')[0]} standing by for next orders.`,
        `⚡ Task successful. Awaiting Big Boss's assessment.`,
        `📡 Intelligence delivered to Big Boss. Ready for next assignment.`
      ];
      return teamSuccessMessages[Math.floor(Math.random() * teamSuccessMessages.length)];
    }

    if (connectedToCaptain && dialogueContext === 'analyzing') {
      return `🔍 ${agent.role} analysis in progress. Will report findings to Big Boss shortly.`;
    }

    // Context-based standard dialogues
    if (dialogueContext === 'greeting') {
      return dialogues[0] || `${agent.name} reporting for duty.`;
    }

    if (dialogueContext === 'analyzing') {
      const analyticalIndex = Math.floor(dialogues.length / 3) + Math.floor(Math.random() * 2);
      return dialogues[analyticalIndex] || dialogues[Math.floor(Math.random() * dialogues.length)];
    }

    if (dialogueContext === 'success') {
      const successIndex = Math.floor(dialogues.length * 0.6) + Math.floor(Math.random() * 2);
      return dialogues[successIndex] || dialogues[Math.floor(Math.random() * dialogues.length)];
    }

    // Random personality dialogue
    return dialogues[Math.floor(Math.random() * dialogues.length)];
  }

  // Public method to get price-enhanced dialogue
  async generatePriceAwareDialogue(
    agent: AgentMetadata,
    context: Omit<DialogueContext, 'priceData'>,
    symbol: string = 'ethereum'
  ): Promise<string> {
    const priceData = await this.fetchLatestPrice(symbol);
    return this.generateDialogue(agent, { ...context, priceData: priceData || undefined });
  }

  // Clear price cache
  clearCache(): void {
    this.priceCache.clear();
    this.lastPriceFetch = 0;
  }
}

// Singleton instance
export const dialogueGenerator = new DialogueGenerator();
