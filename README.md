# 🌌 Galaxy Agents - Autonomous AI Agent Intelligence Network

A modern web application featuring autonomous AI agents that can analyze crypto markets, process news, and coordinate intelligent tasks. Built with React, TypeScript, and cutting-edge AI technology.

![Galaxy Agents](https://img.shields.io/badge/Galaxy-Agents-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)

---

## 🌟 Features

### 🤖 Intelligent AI Agents
- **Galaxy Commander** - Strategic orchestration and decision making
- **Market Navigator** - Real-time crypto market intelligence
- **Data Archivist** - News aggregation and sentiment analysis
- **AI Oracle** - Powered by Google Gemini for advanced insights

### 🎮 Dual Operation Modes
- **Manual Mode** - Direct control over individual agents
- **Auto Mode** - Commander orchestrates team autonomously

### 🔐 Simple Authentication
- Username/Password registration and login
- Guest mode for quick access
- Secure local session management

### 📊 Real-Time Data Integration
- **CoinGecko API** - Live cryptocurrency prices and market data
- **News API** - Crypto news aggregation and analysis
- **Google Gemini AI** - Advanced AI-powered insights

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- API Keys (optional, works without them):
  - Google Gemini API key
  - News API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GalaxyAgent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**
   
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEWS_API_KEY=your_news_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

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
npm run build
```

### Preview Production Build
```bash
npm run preview
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
