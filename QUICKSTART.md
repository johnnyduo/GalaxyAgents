# Galaxy Agents - Quick Start Guide

## 🚀 Getting Started

### Installation
```bash
cd /Library/WebServer/Documents/GalaxyAgent
yarn install
```

### Configuration
Create `.env` file:
```bash
cp .env.example .env
```

Add your Gemini AI API key to `.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Development
```bash
yarn dev
```
Then open http://localhost:3001

### Production Build
```bash
yarn build
yarn preview
```

## 🔐 First Time Setup

1. Launch the app
2. Create an account or login as guest
3. Activate agents from the sidebar
4. Start exploring!

## 🧪 Testing

Open browser console and run:
```javascript
testAPIs()
```

## 📁 Key Files

- `App.tsx` - Main application logic
- `components/` - All React components
- `services/api.ts` - Google Gemini AI & News API integration
- `services/auth.ts` - Authentication service
- `constants.ts` - Agent definitions and personalities
- `types.ts` - TypeScript type definitions

## 🛠️ Available Scripts

- `yarn dev` - Start dev server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

## 🎯 What's Included

- ✅ 7 Specialized Fraud Defense Agents
- ✅ Google Gemini AI Integration
- ✅ Dynamic Agent Dialogues
- ✅ Interactive Canvas with ReactFlow
- ✅ Real-time Task Processing
- ✅ Guest Login Mode
- ✅ Clean Web2 Architecture

## 📝 Notes

This is a pure Web2 fraud defense system with no blockchain dependencies.
All agents work together using AI to protect against digital scams and fraud.

**Have fun building with Galaxy Agents! 🌌**
