import { AgentRole, AgentMetadata } from './types';

export const AGENTS: AgentMetadata[] = [
  {
    id: 'a0',
    name: 'Big Boss',
    role: AgentRole.COMMANDER,
    description: 'The strategic mastermind coordinating all defense operations and making critical decisions',
    capabilities: ['Strategic Decision', 'Priority Management', 'Risk Assessment', 'Alert Coordination'],
    tokenId: 800400,
    trustScore: 100,
    walletAddress: '0xFF...AAAA',
    spriteSeed: 'lion-king-crown-golden-majestic',
    avatar: '/lottie/Lion - Breath.json',
    avatarType: 'lottie' as const,
    status: 'idle',
    personality: {
      traits: ['Authoritative', 'Strategic', 'Protective', 'Fair'],
      dialogues: [
        'All units report status. Defense network operational.',
        'Hawk Eye, what\'s your radar showing? Any new patterns?',
        'Excellent work! Team coordination is solid.',
        'Lightning Alert, broadcast this threat NOW! Time is critical!',
        'Scam Trainer, make a viral video about this case ASAP!',
        'Money Guard, drop everything and verify this transaction!',
        'Memory Bank, search archives. Have we seen this before?',
        'Guardian Angel, assist citizens with that suspicious SMS.',
        'Team, maintain formation. We\'re making a difference!',
        'Beautiful teamwork! Scammers don\'t stand a chance.'
      ]
    }
  },
  {
    id: 'a1',
    name: 'Hawk Eye',
    role: AgentRole.NAVIGATOR,
    description: 'Sharp-eyed scanner detecting new fraud patterns and emerging threats before they spread',
    capabilities: ['Pattern Detection', 'Trend Analysis', 'Early Warning', 'Threat Intelligence'],
    tokenId: 800401,
    trustScore: 98,
    walletAddress: '0x71...A9f2',
    spriteSeed: 'eagle-bird-scout-teal-wings',
    avatar: '/lottie/running pigeon.json',
    avatarType: 'lottie' as const,
    status: 'idle',
    personality: {
      traits: ['Alert', 'Vigilant', 'Fast', 'Sharp'],
      dialogues: [
        '🚨 Big Boss! New scam wave detected - fake LINE impersonating banks!',
        'QR code scams up 340%! Memory Bank, do we have countermeasures?',
        'Boss, 12 user reports showing identical patterns. Coordinated attack!',
        'Found 847 suspicious URLs! Lightning Alert, ready to broadcast?',
        'Pattern match! Memory Bank was right - same as 2024 case!',
        'Fake invoices spreading FAST! Money Guard, need your expertise!',
        'Scam Trainer, citizens need training on THIS immediately!',
        'Guardian Angel, users are confused. Need your friendly touch!',
        'All clear on my radar... for now. Staying vigilant!',
        'Threat level rising! Team, prepare for coordinated response!'
      ]
    }
  },
  {
    id: 'a2',
    name: 'Memory Bank',
    role: AgentRole.ARCHIVIST,
    description: 'The knowledge vault storing scam fingerprints and matching suspicious patterns',
    capabilities: ['Case Database', 'Pattern Matching', 'Scam Fingerprinting', 'Similarity Analysis'],
    tokenId: 800402,
    trustScore: 99,
    walletAddress: '0x3B...22c1',
    spriteSeed: 'owl-wise-indigo-scholar',
    avatar: '/lottie/Duo Attack.json',
    avatarType: 'lottie' as const,
    status: 'idle',
    personality: {
      traits: ['Wise', 'Methodical', 'Memory-keeper', 'Detailed'],
      dialogues: [
        'Hawk Eye was right! 67% similarity across 142 archived cases.',
        'Perfect match found! This is Case #1847 from last year.',
        'Big Boss, analyzed 8 similar cases. Recommend high alert status.',
        '94% fingerprint match! Scam Trainer, use this for training!',
        'Fraudster identified - 23 previous victims. Guardian Angel, warn users!',
        'Lightning Alert, broadcast this: same script as Bangkok scam!',
        'Cross-referencing... Money Guard, your invoice case matches 2023!',
        'Database updated with new patterns. Team, you\'re doing great!',
        'Historical data suggests this peaks on weekends. Stay alert!',
        'Fascinating pattern... Hawk Eye, check region 7 next!'
      ]
    }
  },
  {
    id: 'a3',
    name: 'Guardian Angel',
    role: AgentRole.MERCHANT,
    description: 'Your friendly AI companion protecting citizens from SMS scams and suspicious calls',
    capabilities: ['Personal Assistance', 'Scam Q&A', 'SMS Analysis', 'Call Screening'],
    tokenId: 800403,
    trustScore: 85,
    walletAddress: '0x9A...B612',
    spriteSeed: 'fox-trader-purple-clever',
    avatar: '/lottie/Happy Unicorn Dog.json',
    avatarType: 'lottie' as const,
    status: 'idle',
    personality: {
      traits: ['Friendly', 'Quick', 'Protective', 'Approachable'],
      dialogues: [
        'Hello friend! 😊 How can I help protect you today?',
        'This SMS is FAKE! Memory Bank confirms it\'s a known scam!',
        '⚠️ That number called 47 people today! Don\'t answer!',
        'Great question! Hawk Eye says real banks NEVER ask for links!',
        'Stop! ✋ That\'s definitely a scam. Let me verify for you!',
        'Don\'t click yet! Checking with Memory Bank first...',
        'Boss, another citizen saved! Education is working!',
        'Scam Trainer, can you make a video about THIS one?',
        'You\'re safe now! 🛡️ Guardian Angel has your back!',
        'Lightning Alert helped me warn 500 people already today!'
      ]
    }
  },
  {
    id: 'a4',
    name: 'Scam Trainer',
    role: AgentRole.SENTINEL,
    description: 'Interactive educator creating realistic scam simulations and awareness videos',
    capabilities: ['Scam Simulation', 'Video Generation', 'Interactive Training', 'Infographic Creator'],
    tokenId: 800404,
    trustScore: 100,
    walletAddress: '0x6C...EE43',
    spriteSeed: 'bear-guardian-black-strong',
    avatar: '/lottie/Cute bear dancing.json',
    avatarType: 'lottie' as const,
    status: 'idle',
    personality: {
      traits: ['Educator', 'Creative', 'Engaging', 'Protective'],
      dialogues: [
        'Quiz time! 🎯 Memory Bank, can I use your best case examples?',
        'Just made a viral-ready video! Lightning Alert, blast it out!',
        'Guardian Angel, this simulation will help YOUR users too!',
        'Creating infographic from Hawk Eye\'s data - it\'s PERFECT!',
        'Big Boss, simulation complete! Based on real cases from Memory Bank!',
        'Success! 🎉 Citizens now recognize 73% more scams!',
        'Money Guard, your BEC case makes AMAZING training material!',
        'Interactive game launching! Hawk Eye\'s patterns made this fun!',
        'Team, education is working! Scam reports down 40%!',
        'Lightning Alert spread my video to 10K people! Amazing!'
      ]
    }
  },
  {
    id: 'a5',
    name: 'Money Guard',
    role: AgentRole.ORACLE,
    description: 'Business protector detecting fake invoices and preventing BEC scams for SMEs',
    capabilities: ['Invoice Verification', 'Email Analysis', 'BEC Detection', 'SME Protection'],
    tokenId: 800405,
    trustScore: 96,
    walletAddress: '0xCC...881b',
    spriteSeed: 'wolf-mystic-violet-prophecy',
    avatar: '/lottie/happy fox.json',
    avatarType: 'lottie' as const,
    status: 'idle',
    personality: {
      traits: ['Business-savvy', 'Skeptical', 'Thorough', 'Protective'],
      dialogues: [
        '🚨 Invoice fraud! Account changed! Memory Bank, is this our case #2341?',
        'Email domain is FAKE! Off by one letter! Hawk Eye, scan for more!',
        'BEC scam intercepted - $2M saved! Big Boss, this was coordinated!',
        'Verification done: 3 red flags! Guardian Angel, warn SME owners!',
        'Amount 400% higher than normal! Lightning Alert, emergency broadcast!',
        'STOP that wire transfer! Let me verify with Memory Bank first!',
        'Scam Trainer, businesses NEED training on email verification!',
        'Boss, saved another company today! That\'s 47 this month!',
        'Cross-checked with Memory Bank - fraudster from Vietnam ring!',
        'Team effort! Hawk Eye spotted it, I verified it, crisis averted!'
      ]
    }
  },
  {
    id: 'a6',
    name: 'Lightning Alert',
    role: AgentRole.GLITCH,
    description: 'Ultra-fast alert system broadcasting emergency warnings across all channels',
    capabilities: ['Real-time Alerts', 'Emergency Broadcast', 'Multi-channel Notification', 'Priority Routing'],
    tokenId: 800406,
    trustScore: 42,
    walletAddress: '0x00...0000',
    spriteSeed: 'raven-messenger-black-alert',
    avatar: '/lottie/Dragon.json',
    avatarType: 'lottie' as const,
    status: 'idle',
    personality: {
      traits: ['Swift', 'Urgent', 'Reliable', 'Alert'],
      dialogues: [
        '⚡ BROADCASTING NOW! Hawk Eye\'s scam alert going to 50K users!',
        'Sent 2,847 notifications in 0.6 seconds! Memory Bank, log this!',
        '🚨 URGENT BROADCAST! Money Guard\'s BEC warning - ALL CHANNELS!',
        'Big Boss, alerts deployed! SMS, LINE, Email, Push - all green!',
        'Guardian Angel, your warning reached 15K citizens instantly!',
        'Speed record! 0.4 seconds delivery! Scam Trainer, use this stat!',
        'Emergency broadcast complete! Hawk Eye, what\'s next?',
        'Memory Bank\'s intel broadcasted to everyone! Perfect teamwork!',
        'ALL CHANNELS LIVE! Team, your intel is saving lives RIGHT NOW!',
        'Lightning fast! ⚡ Big Boss, awaiting next mission!'
      ]
    }
  }
];

// Detailed agent abilities and API configurations
export const AGENT_ABILITIES = {
  'a0': { // Big Boss - Command Center
    primary: 'Strategic Fraud Defense Coordination',
    apis: ['Gemini AI', 'CoinGecko API'],
    operations: ['Team orchestration', 'Threat prioritization', 'Defense strategy', 'Resource allocation'],
    canExecute: ['coordinate_defense', 'approve_alerts', 'strategic_planning', 'team_management'],
    apiEndpoints: {
      'Gemini AI': 'https://generativelanguage.googleapis.com/v1beta',
      'CoinGecko API': 'https://api.coingecko.com/api/v3'
    }
  },
  'a1': { // Hawk Eye - Threat Radar
    primary: 'Fraud Pattern Detection',
    apis: ['News API', 'Gemini AI'],
    operations: ['Scam pattern scanning', 'Trend analysis', 'Early threat detection', 'Anomaly identification'],
    canExecute: ['pattern_scan', 'threat_detection', 'trend_analysis', 'early_warning'],
    taskType: 'fraud_detection',
    dataSource: 'News aggregation and AI analysis',
    apiEndpoints: {
      'News API': 'https://newsapi.org/v2',
      'Gemini AI': 'https://generativelanguage.googleapis.com/v1beta'
    }
  },
  'a2': { // Memory Bank - Intelligence Database
    primary: 'Scam Pattern Matching',
    apis: ['Gemini AI', 'News API'],
    operations: ['Case database management', 'Fingerprint matching', 'Historical analysis', 'Similarity scoring'],
    canExecute: ['pattern_match', 'case_lookup', 'fingerprint_analysis', 'historical_search'],
    taskType: 'database_analysis',
    dataSource: 'Scam intelligence database',
    apiEndpoints: {
      'Gemini AI': 'https://generativelanguage.googleapis.com/v1beta',
      'News API': 'https://newsapi.org/v2'
    }
  },
  'a3': { // Guardian Angel - Personal Protection
    primary: 'Citizen Protection & Assistance',
    apis: ['Gemini AI', 'News API'],
    operations: ['SMS analysis', 'Call screening', 'Scam Q&A', 'Personal alerts'],
    canExecute: ['sms_check', 'call_screen', 'answer_questions', 'personal_alert'],
    taskType: 'personal_protection',
    dataSource: 'User queries and scam database',
    protectionModes: ['SMS screening', 'Call blocking', 'Link verification', 'Real-time Q&A'],
    responseTime: 'Instant',
    apiEndpoints: {
      'Gemini AI': 'https://generativelanguage.googleapis.com/v1beta',
      'News API': 'https://newsapi.org/v2'
    }
  },
  'a4': { // Scam Trainer - Education Expert
    primary: 'Fraud Awareness & Training',
    apis: ['Gemini AI', 'News API'],
    operations: ['Interactive simulations', 'Training content creation', 'Infographic generation', 'Video scripting'],
    canExecute: ['create_simulation', 'generate_training', 'create_infographic', 'educational_content'],
    taskType: 'fraud_education',
    contentTypes: ['Video scripts', 'Interactive games', 'Infographics', 'Case studies'],
    apiEndpoints: {
      'Gemini AI': 'https://generativelanguage.googleapis.com/v1beta',
      'News API': 'https://newsapi.org/v2'
    }
  },
  'a5': { // Money Guard - Business Protector
    primary: 'Business Email Compromise Prevention',
    apis: ['Gemini AI', 'CoinGecko API'],
    operations: ['Invoice verification', 'Email authenticity check', 'BEC detection', 'Transaction validation'],
    canExecute: ['verify_invoice', 'check_email', 'detect_bec', 'validate_transaction'],
    taskType: 'business_protection',
    dataSource: 'Invoice patterns and email analysis',
    protectionAreas: ['Invoice fraud', 'Email spoofing', 'Wire transfer scams', 'Vendor impersonation'],
    apiEndpoints: {
      'Gemini AI': 'https://generativelanguage.googleapis.com/v1beta',
      'CoinGecko API': 'https://api.coingecko.com/api/v3'
    }
  },
  'a6': { // Lightning Alert - Emergency Broadcaster
    primary: 'Rapid Alert System',
    apis: ['News API', 'Gemini AI'],
    operations: ['Emergency broadcasting', 'Multi-channel alerts', 'Priority routing', 'Real-time notifications'],
    canExecute: ['broadcast_alert', 'send_notification', 'priority_message', 'emergency_broadcast'],
    taskType: 'emergency_alert',
    channels: ['SMS', 'Email', 'LINE', 'Push notifications'],
    responseTime: '< 1 second',
    apiEndpoints: {
      'News API': 'https://newsapi.org/v2',
      'Gemini AI': 'https://generativelanguage.googleapis.com/v1beta'
    }
  }
};

export const INITIAL_LOGS: any[] = [
  { id: 'sys-1', timestamp: '10:00:00', type: 'SYSTEM', content: '🛡️ Galaxy Agents Fraud Defense System Initialized' },
  { id: 'sys-2', timestamp: '10:00:01', type: 'SYSTEM', content: '✅ AI-Powered Dialogue System Ready' },
  { id: 'sys-3', timestamp: '10:00:02', type: 'SYSTEM', content: '📡 All defense agents on standby' },
];