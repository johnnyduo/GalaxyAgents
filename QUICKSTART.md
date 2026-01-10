# Galaxy Agents - Quick Start Guide

## 🚀 Getting Started

### Installation
```bash
cd /Library/WebServer/Documents/GalaxyAgent
yarn install
```

### Development
```bash
yarn dev
```
Then open http://localhost:5173

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
- `components/LoginPage.tsx` - Authentication
- `services/auth.ts` - Auth service
- `services/api.ts` - External APIs
- `constants.ts` - Agent definitions

## 🛠️ Available Scripts

- `yarn dev` - Start dev server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

## 🎯 Features Removed

- ✅ All Hedera blockchain integration
- ✅ Web3 wallet connections
- ✅ Smart contracts
- ✅ Hardhat configuration
- ✅ EIP-8004 and x402 streaming

## 🆕 Features Added

- ✅ Web2 username/password authentication
- ✅ Guest login mode
- ✅ Simplified agent activation
- ✅ Clean UI without blockchain complexity

## 📝 Notes

This is a fresh Git repository with no connection to the original Hedera-based project.
All dependencies have been cleaned and reinstalled with yarn.

**Have fun building with Galaxy Agents! 🌌**
