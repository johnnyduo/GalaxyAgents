# 🛡️ Galaxy Agents - AI Fraud Defense

> **Multi-Agent AI System for Digital Fraud Prevention**  
> Built for Thai Market with AI-Powered Intelligence

A modern web application featuring 7 specialized AI agents working together to protect citizens and businesses from digital fraud. Built with React, TypeScript, and Google Gemini AI.

[![Galaxy Agents](https://img.shields.io/badge/Galaxy-Agents-39ff14)](https://github.com/johnnyduo/GalaxyAgents)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev/)

---

## 🌟 Features

### 🤖 7 Specialized AI Agents
- **Big Boss** - Command Center for strategic fraud defense coordination
- **Hawk Eye** - Threat Radar detecting new scam patterns and fraud tactics
- **Memory Bank** - Scam Intelligence database with historical pattern matching
- **Guardian Angel** - Personal Protection AI for citizens with friendly assistance
- **Scam Trainer** - Interactive simulations and fraud awareness education
- **Money Guard** - SME Transaction Guardian against Business Email Compromise
- **Lightning Alert** - Rapid emergency alert broadcaster across multiple channels

### ✨ AI-Powered Dynamic Dialogues
- **Google Gemini Integration** - Real-time AI-generated contextual responses
- **Personality System** - Each agent has unique communication style
- **Context Awareness** - Dialogues adapt to current tasks and situations
- **Fallback System** - Rule-based responses when AI unavailable
- **Smart Caching** - Optimized performance with 3-minute cache TTL

### 🎯 Core Capabilities
- **Pattern Detection** - Identifies new scam tactics before they spread
- **Real-time Alerts** - Multi-channel emergency notifications (SMS, Email, LINE)
- **Interactive Training** - Scam simulations and educational content
- **Invoice Verification** - Protects SMEs from fraudulent invoices
- **SMS/Call Screening** - Personal protection for individuals
- **Market Analysis** - Crypto fraud detection and price monitoring
- **News Intelligence** - Real-time fraud news aggregation

### 🎮 Dual Operation Modes
- **Manual Mode** - Direct control over individual agents
- **Auto Mode** - Big Boss orchestrates team autonomously with AI coordination

### 🗑️ Agent Management
- **Activate/Deactivate** - Control agent status in real-time
- **Delete Agents** - Permanently remove agents from team
- **Progress Tracking** - Monitor agent task execution
- **Task Assignment** - Execute custom fraud detection tasks

### 🔐 Simple Authentication
- Guest mode for quick access
- Secure local session management
- No blockchain required (Web2 architecture)

### 🌐 API Integrations
- **Google Gemini AI** - Dynamic dialogues, market analysis, strategy generation
- **CoinGecko API** - Cryptocurrency price monitoring
- **News API** - Crypto news aggregation and fraud alerts
- **KPlus Payment** - Thai payment gateway (coming soon)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Yarn
- API Keys:
  - **Required**: Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))
  - Optional: News API, CoinGecko API

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johnnyduo/GalaxyAgents.git
   cd GalaxyAgents
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure environment**
   
   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   # Optional:
   # VITE_NEWS_API_KEY=your_news_api_key_here
   # VITE_COINGECKO_API_KEY=your_coingecko_api_key_here
   ```

4. **Start development server**
   ```bash
   yarn dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3001`
   - Use guest mode or create an account
   - Start activating agents!

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📖 Usage

### Getting Started
1. Create an account or login as guest
2. Activate agents from the sidebar
3. Select an agent to view details and execute tasks
4. View results in the results page

### Testing APIs
Open browser console and run:
```javascript
testAPIs()
```

This will test all API connections and show their status.

---

## 🏗️ Project Structure

```
GalaxyAgent/
├── components/          # React components
│   ├── LoginPage.tsx   # Authentication UI
│   ├── UserBar.tsx     # User navigation bar
│   ├── AgentCard.tsx   # Agent display cards
│   └── ...
├── services/           # API and service layers
│   ├── auth.ts        # Authentication service
│   ├── api.ts         # External API integrations
│   └── ...
├── constants.ts       # Agent definitions and config
├── types.ts          # TypeScript type definitions
├── App.tsx           # Main application component
└── index.tsx         # Application entry point
```

---

## 🔧 Technology Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 6.2
- **UI Libraries**: 
  - Lucide React (icons)
  - React Flow (visual canvas)
  - Lottie React (animations)
  - React Toastify (notifications)
- **AI/Data APIs**:
  - Google Gemini AI
  - CoinGecko
  - News API

---

## 🎨 Agent Roles

| Agent | Role | Capabilities |
|-------|------|--------------|
| Galaxy Commander | Strategic Leader | Orchestration, Risk Management, Decision Making |
| Market Navigator | Market Intel | Price Tracking, Volume Analysis, Market Trends |
| Data Archivist | Information | News Aggregation, Sentiment Analysis, Event Detection |
| AI Oracle | Insights | AI Analysis, Pattern Recognition, Predictions |

---

## 🛠️ Development

### Build for Production
```bash
yarn build
```

### Preview Production Build
```bash
yarn preview
```

### Clear All Data
Open browser console:
```javascript
clearAllAgents()
```

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Google Gemini AI for advanced language processing
- CoinGecko for comprehensive crypto market data
- React and the amazing open-source community

---

## 📧 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Built with ❤️ using modern web technologies**
