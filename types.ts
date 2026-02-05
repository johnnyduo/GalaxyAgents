export enum AgentRole {
  COMMANDER = 'ผู้บัญชาการ',
  SCOUT = 'นักสืบ',
  MEMORY = 'คลังความจำ',
  GUARDIAN = 'เทวดาผู้คุ้มครอง',
  TRAINER = 'ครูฝึกสอน',
  FINANCE_GUARD = 'ผู้พิทักษ์การเงิน',
  ALERT = 'สายฟ้าแจ้งเตือน',
}

export interface AgentPersonality {
  traits: string[];
  dialogues: string[];
}

export interface AgentMetadata {
  id: string;
  name: string;
  role: AgentRole;
  description: string;
  capabilities: string[];
  tokenId: number; // EIP-8004
  trustScore: number;
  walletAddress: string;
  spriteSeed: string;
  avatar: string; // Path to local animated sprite (GIF or Lottie JSON)
  avatarType?: 'gif' | 'lottie'; // Animation type
  status: 'idle' | 'negotiating' | 'streaming' | 'offline';
  personality?: AgentPersonality;
}

export interface AgentTaskResult {
  agentId: string;
  agentName: string;
  taskType: 'fraud_detection' | 'pattern_analysis' | 'database_search' | 'verification' | 'user_assistance' | 'education' | 'alert_broadcast' | 'strategic_command' | 'custom_order';
  timestamp: number;
  status: 'success' | 'failed' | 'pending' | 'error';
  data?: any;
  summary: string;
  txHash?: string; // For audit trail
  txUrl?: string; // Link to full report
}

export interface LogMessage {
  id: string;
  timestamp: string;
  type: 'A2A' | 'x402' | 'SYSTEM' | 'COMMANDER' | 'SIMULATION' | 'SCAM_ALERT';
  content: string;
  agentId?: string;
}

// ===========================
// SIMULATION TYPES
// ===========================

export type AgentAlignment = 'good' | 'evil' | 'transitioning';

export interface EvilVariant {
  name: string;
  description: string;
  personality: AgentPersonality;
  avatar: string;
  avatarType: 'lottie' | 'gif';
  colorTheme: {
    primary: string;
    glow: string;
    border: string;
  };
  trustScore: number;
}

export type FraudCategory =
  | 'call_center'
  | 'sms_phishing'
  | 'romance_scam'
  | 'social_impersonation'
  | 'qr_scam'
  | 'ponzi_scheme'
  | 'fake_investment'
  | 'job_scam'
  | 'loan_app'
  | 'sim_swap';

export interface ScenarioStep {
  id: string;
  order: number;
  type: 'dialogue' | 'action' | 'transformation' | 'money_flow' | 'reveal' | 'education';
  agentId: string;
  alignment: AgentAlignment;
  content: {
    th: string;
    en: string;
  };
  duration: number;
  edgeAnimation?: {
    source: string;
    target: string;
    style: 'data_flow' | 'money_flow' | 'alert';
  };
  mediaHint?: string;
  moneyChange?: number;
}

export interface FraudScenario {
  id: string;
  titleTh: string;
  titleEn: string;
  category: FraudCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  description: {
    th: string;
    en: string;
  };
  involvedAgents: string[];
  evilAgents: string[];
  victimSetup: {
    defaultName: string;
    defaultMoney: number;
    scenarioContext: { th: string; en: string };
  };
  steps: ScenarioStep[];
  moneyLost: number;
  educationalPoints: { th: string; en: string }[];
  realWorldCases: string[];
}

export interface SimulationEvent {
  timestamp: number;
  stepId: string;
  type: ScenarioStep['type'];
  agentId: string;
  content: string;
  moneyChange?: number;
}

export interface SimulationState {
  status: 'idle' | 'setup' | 'playing' | 'paused' | 'completed' | 'reviewing';
  currentScenario: FraudScenario | null;
  currentStepIndex: number;
  userProfile: {
    name: string;
    money: number;
    moneyRemaining: number;
  };
  agentAlignments: Record<string, AgentAlignment>;
  timeline: SimulationEvent[];
  startedAt: number | null;
  completedAt: number | null;
  speed: number;
}

