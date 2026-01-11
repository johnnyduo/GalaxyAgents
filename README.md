# 🛡️ Galaxy Agents - AI Fraud Defense Platform

> **Multi-Agent AI System for Digital Fraud Prevention**  
> Enterprise-grade fraud detection powered by Google Gemini AI

🌐 **Live Demo**: [https://galaxy-agents.vercel.app](https://galaxy-agents.vercel.app)

A professional fraud defense platform featuring 7 specialized AI agents working in coordination to protect individuals and businesses from digital fraud, scams, and cybersecurity threats. Built with modern React architecture and powered exclusively by Google Gemini AI.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev/)

---

## 🌟 Features

### 🤖 7 Specialized AI Agents

Each agent has unique capabilities powered by Google Gemini AI with specialized prompting:

- **Big Boss** - Strategic Command Center coordinating multi-agent fraud defense operations
- **Hawk Eye** - Advanced Threat Radar detecting emerging scam patterns and fraud tactics
- **Memory Bank** - Comprehensive Scam Intelligence Database with historical pattern analysis
- **Guardian Angel** - Personal Protection AI providing friendly fraud prevention assistance
- **Scam Trainer** - Interactive Education Platform with simulation-based training
- **Money Guard** - SME Transaction Guardian preventing Business Email Compromise (BEC)
- **Lightning Alert** - Real-time Emergency Alert System with multi-channel broadcasting

### 🎯 9 Fraud Detection Task Types

All tasks powered by Gemini AI's advanced language understanding:

1. **Fraud Detection** - Identify suspicious patterns, phishing attempts, and scam indicators
2. **Pattern Analysis** - Analyze fraud schemes and social engineering tactics
3. **Database Search** - Cross-reference against known scam databases
4. **Verification** - Validate legitimacy of emails, invoices, and transactions
5. **User Assistance** - Help fraud victims with recovery and reporting
6. **Education** - Train users to recognize and avoid scams
7. **Alert Broadcast** - Distribute warnings across multiple channels
8. **Strategic Command** - Big Boss coordination and threat prioritization
9. **Custom Order** - Captain-directed special operations

### 🎮 Dual Operation Modes

- **Manual Mode** - Direct control over individual agent task execution
- **Captain's Command Mode** - Big Boss orchestrates coordinated team operations with AI-driven prioritization

### 📊 Operations Dashboard

- **Unified Command Center** - Monitor all agent activities in real-time
- **Task Results Display** - Detailed fraud analysis with AI-generated insights
- **Budget Tracking** - USD-based cost monitoring ($0.002 per Gemini AI task)
- **Data Management** - Auto-migration from legacy data, manual clear options
- **Scrollable Interface** - Professional layout optimized for high-volume operations

### 💬 AI-Powered Dynamic Dialogues

- **Context-Aware Responses** - Dialogues adapt to current tasks and agent personality
- **Personality System** - Each agent has unique communication style and expertise
- **Fallback System** - Rule-based responses ensure reliability when AI unavailable
- **Smart Caching** - Optimized performance with intelligent rate limiting

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and **Yarn** package manager
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/GalaxyAgent.git
   cd GalaxyAgent
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

---

## 📖 Usage Guide

### Basic Operations

1. **Activate Agents** - Select agents from the main interface to activate them
2. **Execute Tasks** - Click on an agent to assign fraud detection tasks
3. **View Results** - Monitor task execution and AI analysis in the Operations Dashboard
4. **Captain's Command** - Enable Auto Mode for coordinated multi-agent operations

### Testing API Connection

Open browser console and run:
```javascript
testAPIs()
```

This validates the Gemini API connection and displays configuration status.

### Clear All Data

To reset the platform (localStorage):
```javascript
clearAllAgents()
```

---

## 🏗️ Project Structure

```
GalaxyAgent/
├── components/              # React UI components
│   ├── AgentCard.tsx       # Agent display cards
│   ├── AgentDetailPanel.tsx # Agent task execution interface
│   ├── AgentDialogue.tsx   # AI-powered dialogue system
│   ├── AgentProgressBar.tsx # Task progress visualization
│   ├── AgentResultsPage.tsx # Detailed task results display
│   ├── CaptainControlPanel.tsx # Auto mode coordination
│   ├── CaptainFundPanel.tsx # Budget and cost tracking
│   ├── ConsolePanel.tsx    # System console output
│   ├── FlowCanvas.tsx      # Visual agent network
│   ├── LandingPage.tsx     # Main application interface
│   ├── LottieAvatar.tsx    # Animated agent avatars
│   ├── ModeControl.tsx     # Manual/Auto mode toggle
│   ├── OperationsDashboard.tsx # Unified command center
│   └── WalletBar.tsx       # User balance display
├── services/               # Service layer
│   ├── api.ts             # Gemini AI integration
│   └── dialogueGenerator.ts # AI dialogue generation
├── constants.ts           # Agent definitions, abilities, personalities
├── types.ts              # TypeScript type definitions
├── App.tsx               # Main application logic
├── index.tsx             # Application entry point
├── vite.config.ts        # Vite build configuration
├── tsconfig.json         # TypeScript compiler options
└── package.json          # Project dependencies
```

---

## 🔧 Technology Stack

### Frontend
- **React 19.2** - Modern UI with concurrent rendering
- **TypeScript 5.8** - Type-safe development
- **Vite 6.2** - Lightning-fast build tool and dev server

### UI Libraries
- **Lucide React** - Consistent icon system
- **React Flow** - Visual agent network representation
- **Lottie React** - Animated agent avatars
- **React Toastify** - User notifications

### AI & APIs
- **Google Gemini AI** - All fraud detection, analysis, and dialogue generation
  - Cost: $0.002 per task
  - Rate limiting: Smart throttling to prevent quota exhaustion
  - Fallback system: Rule-based responses for high availability

### State Management
- **React Hooks** - useState, useEffect, useCallback for local state
- **LocalStorage** - Persistent agent data and task history
- **Auto-migration** - Seamless upgrade from legacy data structures

---

## 🎨 Agent Specifications

| Agent | Personality | Primary Tasks | Gemini Prompt Focus |
|-------|------------|---------------|---------------------|
| **Big Boss** | Authoritative, strategic, commanding | Strategic Command, Custom Order | "Military commander with decades of fraud defense experience" |
| **Hawk Eye** | Sharp, observant, analytical | Fraud Detection, Pattern Analysis | "Cyber detective with expertise in emerging scam tactics" |
| **Memory Bank** | Methodical, detailed, archival | Database Search, Pattern Analysis | "Forensic analyst specializing in scam pattern matching" |
| **Guardian Angel** | Caring, protective, friendly | User Assistance, Verification | "Compassionate fraud prevention expert helping victims" |
| **Scam Trainer** | Educational, engaging, professional | Education, Fraud Detection | "Cybersecurity educator creating awareness campaigns" |
| **Money Guard** | Professional, vigilant, business-focused | Verification, Fraud Detection | "Corporate security expert preventing BEC and invoice fraud" |
| **Lightning Alert** | Urgent, clear, action-oriented | Alert Broadcast, Strategic Command | "Emergency response coordinator for rapid threat notification" |

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server (port 3000)
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Required
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional (legacy - no longer used)
# VITE_NEWS_API_KEY=not_required
# VITE_TWELVEDATA_API_KEY=not_required
```

### API Configuration

All API integration is in [services/api.ts](services/api.ts):

```typescript
// Gemini AI Service
const geminiService = {
  analyzeWithGemini: async (prompt: string, context?: string) => {
    // Smart rate limiting (max 60 calls/minute)
    // Returns AI-generated fraud analysis
  }
}
```

### Adding New Agents

1. **Define agent in [constants.ts](constants.ts)**:
```typescript
{
  id: 'new_agent_id',
  name: 'Agent Name',
  specialty: 'Fraud specialty',
  personality: 'Communication style',
  catchphrases: ['Catchphrase 1', 'Catchphrase 2'],
  avatar: '/lottie/avatar.json'
}
```

2. **Configure abilities**:
```typescript
export const AGENT_ABILITIES: Record<AgentId, Ability[]> = {
  new_agent_id: [
    {
      name: 'Fraud Detection',
      taskType: 'fraud_detection',
      api: 'gemini',
      cost: 0.002,
      description: 'Detect fraud patterns'
    }
  ]
}
```

3. **Define Captain's mission in [components/AgentResultsPage.tsx](components/AgentResultsPage.tsx)**:
```typescript
case 'new_agent_id':
  return "Mission description for Captain's Command mode";
```

### Task Execution Flow

1. User activates agent → `App.tsx` updates state
2. User clicks "Process Tasks" → Generates tasks based on agent abilities
3. Tasks execute via `services/api.ts` → Gemini AI analyzes fraud scenarios
4. Results stored in localStorage → Display in Operations Dashboard
5. Dialogues generated via `services/dialogueGenerator.ts` → AI-powered responses

---

## 📊 Operations Dashboard

The unified command center ([components/OperationsDashboard.tsx](components/OperationsDashboard.tsx)) provides:

### Features
- **Auto-migration** - Detects and clears legacy data from previous versions
- **Manual data clear** - "Clear Data" button for fresh start
- **Scrollable layout** - Professional flex-based layout with overflow handling
- **Accurate costs** - Simplified calculation: `results.length × $0.002`
- **Agent name lookup** - Uses current AGENTS array, not stored names
- **Task filtering** - View results by specific agent

### Data Structure
```typescript
interface TaskResult {
  id: string;
  agentId: AgentId;
  agentName: string;
  taskType: TaskType;
  taskName: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  data: any; // Gemini AI response
  error?: string;
}
```

---

## 🔐 Security & Privacy

- **API Key Security** - Environment variables, never committed to repo
- **Client-side Only** - No backend server, all processing in browser
- **LocalStorage** - User data stored locally, no external transmission
- **Rate Limiting** - Prevents API quota exhaustion
- **Error Handling** - Graceful fallbacks for API failures

---

## 🚀 Deployment

### Vercel (Recommended)

The project includes [vercel.json](vercel.json) configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard:
- `VITE_GEMINI_API_KEY` - Your Google Gemini API key

### Other Platforms

Build production bundle:
```bash
yarn build
```

Deploy the `dist/` folder to:
- **Netlify** - Drag & drop or Git integration
- **GitHub Pages** - Use `gh-pages` branch
- **AWS S3 + CloudFront** - Static site hosting
- **Firebase Hosting** - `firebase deploy`

---

## 🧪 Testing & Validation

### API Testing
```javascript
// Browser console
testAPIs()
```

Expected output:
```
🧪 Testing API Integrations...
✅ Gemini AI: Connected
💰 Estimated cost per task: $0.002
```

### Error Checking

The platform includes comprehensive error handling:
- Gemini API failures → Fallback to rule-based responses
- Rate limit exceeded → Smart throttling with retry
- Network errors → User-friendly error messages
- Invalid API key → Clear setup instructions

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - Powering all fraud detection intelligence
- **React Team** - Modern UI framework
- **Vite** - Next-generation build tool
- **TypeScript** - Type safety and developer experience

---

## 📧 Support & Contributing

### Report Issues
Open an issue in the repository with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser console errors (if any)

### Feature Requests
Submit enhancement ideas via GitHub Issues with:
- Use case description
- Proposed solution
- Impact on existing functionality

### Pull Requests
Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make changes with clear commit messages
4. Test thoroughly
5. Submit PR with description

---

**Built with ❤️ for fraud prevention and digital safety**
