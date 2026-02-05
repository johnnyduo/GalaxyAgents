# Galaxy Agents - AI Anti-Scam Simulation Platform

> **Multi-Agent AI System for Fraud Defense & Scam Education**
> Interactive fraud simulation powered by Google Gemini AI + GSAP animations

**Live Demo**: [https://galaxy-agents.vercel.app](https://galaxy-agents.vercel.app)

7 AI agents that can transform from **good to evil** in real-time, simulating actual Thai fraud scenarios. Watch agents morph into scammers, drain money from a simulated account, and learn how to protect yourself.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?logo=greensock)](https://greensock.com/)

---

## What This Is

Galaxy Agents is a **fraud defense + education platform** with two modes:

| Mode | What It Does |
|------|-------------|
| **Defense Mode** (Manual/Auto) | Traditional fraud detection dashboard. Agents analyze threats, scan patterns, verify transactions using Gemini AI. |
| **Simulation Mode** | Interactive anti-scam education. Agents transform into scammers, act out a real Thai fraud scenario step-by-step, then reveal the scam and teach you how to spot it. |

The simulation mode is the core feature. It's designed to make people **see and feel** how scams work, so they can recognize them in real life.

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Setup

```bash
git clone https://github.com/yourusername/GalaxyAgent.git
cd GalaxyAgent
npm install

# Create .env file
echo "VITE_GEMINI_API_KEY=your_key_here" > .env

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## User Guide: Complete Journey

### Step 1: Landing Page

When you first open the app, you'll see the **Galaxy Agents landing page** with an animated hero section. Click the launch button to enter the main dashboard.

### Step 2: Main Dashboard (Defense Mode)

The dashboard has 3 columns:

```
[ Left Sidebar ]  [ Center: FlowCanvas ]  [ Right: Agent Detail ]
  Agent Cards       ReactFlow network        Task execution
  Mode Control      Agent nodes + edges      AI analysis
  Operations        Dialogue bubbles         Results
```

**Left sidebar** shows all 7 agents as cards. Click the toggle to activate/deactivate agents. Active agents appear as nodes on the FlowCanvas.

**Center** is a ReactFlow canvas where agents are visualized as animated nodes. Drag them around, connect them with edges. Active agents show random dialogue bubbles periodically.

**Mode Control** at the top of the sidebar has 3 buttons:
- **MANUAL** - Click individual agents to run tasks
- **AUTO** - Big Boss orchestrates all agents automatically
- **SIMULATE** - Enter scam simulation mode

### Step 3: Enter Simulation Mode

Click **SIMULATE** in the mode control panel. The left sidebar transforms into the **Simulation Setup** screen:

1. **Your Profile**
   - Enter your name (default: "คุณสมชาย")
   - Slide the money bar (฿10,000 - ฿1,000,000) to set your simulated bank balance

2. **Select Scenario**
   - Choose from available fraud scenarios
   - Each card shows: Thai title, difficulty badge, money at risk, agent count, estimated duration
   - Currently available: **แก๊งคอลเซ็นเตอร์** (Call Center Gang)

3. Click **"เริ่มจำลอง / START"**

### Step 4: Intro Overlay

A dramatic overlay appears showing:
- Scenario title and category icon
- Context story (e.g., "วันธรรมดา คุณกำลังทำงานอยู่ที่บ้าน โทรศัพท์ดังขึ้น...")
- Difficulty, money at risk, step count
- Click **"เริ่มจำลอง →"** to begin

All involved agents are automatically activated on the FlowCanvas. The banner **"SIMULATION MODE"** appears at the top of the canvas. Background dots turn red-tinted.

### Step 5: Watch the Scenario Play Out

The simulation auto-advances through each step. Here's what happens:

| Step Type | Visual Effect |
|-----------|--------------|
| **action** | Log entry in console, dialogue bubble on agent node |
| **transformation** | GSAP animation: node shakes, border glows red, avatar hue-shifts, name changes to evil identity, "COMPROMISED" badge appears |
| **dialogue** | Thai dialogue bubble appears on the agent node with evil color theme |
| **money_flow** | MoneyTracker (top-right) flashes red, shows "-฿200,000" floating up, progress bar shrinks |
| **reveal** | Simulation **pauses**. Dramatic red overlay: "นี่คือกลโกง!" with money lost summary. Click to continue. |
| **education** | Educational content logged in console with red SCAM_ALERT badge |

**Controls during simulation** (bar above console):

| Control | Action |
|---------|--------|
| Play/Pause | Toggle auto-advance |
| Step (skip forward) | Manually advance one step (pauses auto-play) |
| Reset | Return to setup screen |
| Speed (0.5x / 1x / 2x) | Adjust playback speed |

**MoneyTracker** (floating top-right):
- Shows remaining balance in Thai Baht
- Green when > 50%, yellow when > 30%, red when < 30%
- Animated money decrease with GSAP flash effect
- Floating "-฿X" text on each loss

**SimulationTimeline** (horizontal bar):
- Step-by-step progress indicator
- Each step shows as a circle with type icon
- Current step has a red ring
- Past steps are filled, future steps are dim

### Step 6: The Reveal

When the scenario reaches the **reveal** step:
1. Auto-play pauses automatically
2. A red overlay appears: **"นี่คือกลโกง!"** (THIS WAS A SCAM!)
3. Shows total money lost and percentage
4. Click **"ดูบทเรียน →"** to continue to education steps

After the reveal, all evil agents **transform back to good** with a reverse GSAP animation (hue-rotate removes, border returns to green, badge fades out).

### Step 7: Completion Screen

After all steps finish, the **completion overlay** appears:

**Stats Grid:**
- Money lost (red)
- Money remaining (green)
- Time elapsed
- Total events

**Educational Points** (from the scenario):
- Checklist of key lessons (e.g., "ตำรวจจริงไม่เคยโทรมาขอให้โอนเงิน")

**Real-World Cases** (Thai examples):
- Actual fraud cases with amounts and years

**Actions:**
- **"เล่นอีกครั้ง"** - Reset and go back to setup to try again
- **"กลับหน้าหลัก"** - Exit simulation and return to defense mode

### Console Log

Throughout the simulation, the console panel at the bottom shows a live log:
- **SIMULATION** entries (orange): Agent actions and dialogues
- **SCAM_ALERT** entries (red): Reveals and educational warnings
- **SYSTEM** entries (green): Platform status messages

---

## The 7 Agents

| Agent | Good Identity | Evil Identity | Role in Scam |
|-------|--------------|---------------|-------------|
| **Big Boss** | Strategic commander | พ.ต.อ.สมชาย (fake police) | Impersonates authority, threatens arrest |
| **Hawk Eye** | Threat detector | เจ้าหน้าที่ธนาคาร (fake bank officer) | Confirms fake story, requests money transfer |
| **Memory Bank** | Intelligence database | **Always good** | Voice of reason, warns about scam patterns |
| **Guardian Angel** | Protection advisor | น้องพลอย (romance scammer) | Emotional manipulation |
| **Scam Trainer** | Education platform | กูรูการลงทุน (investment guru) | Fake investment schemes |
| **Money Guard** | Transaction guardian | คุณสมคิด (fake banker) | Account manipulation |
| **Lightning Alert** | Alert broadcaster | SMS Bot (spam sender) | Phishing messages |

Memory Bank (a2) **never turns evil** - it's the anchor that always tries to warn the victim.

---

## Agent Transformation Animation

When an agent turns evil, GSAP runs a 5-phase animation sequence:

1. **Shake** (0.5s) - Node vibrates rapidly
2. **Border Glow** (0.8s) - Border color tweens from green to evil agent's color theme
3. **Hue Shift** (0.3s) - Lottie avatar gets `hue-rotate(180deg) saturate(2)` CSS filter
4. **Name Crossfade** (0.4s) - Name label fades out, shifts, fades in with evil name
5. **Badge** (0.3s) - "COMPROMISED" badge pops in with `back.out` easing

On reveal, the reverse happens: filter clears, border returns to green, badge shrinks away.

---

## Fraud Scenario Format

Each scenario is a TypeScript file in `scenarios/`:

```typescript
const scenario: FraudScenario = {
  id: 'call-center-001',
  titleTh: 'แก๊งคอลเซ็นเตอร์',
  titleEn: 'Call Center Gang',
  category: 'call_center',
  difficulty: 'beginner',        // beginner | intermediate | advanced
  estimatedDuration: 120,         // seconds
  involvedAgents: ['a0', 'a1', 'a3', 'a2'],
  evilAgents: ['a0', 'a1'],
  steps: [
    {
      id: 'cc-01',
      type: 'transformation',     // action | transformation | dialogue | money_flow | reveal | education
      agentId: 'a0',
      alignment: 'transitioning', // good | evil | transitioning
      content: { th: '...', en: '...' },
      duration: 3000,
      moneyChange: -200000,       // optional, for money_flow steps
    },
    // ... more steps
  ],
  educationalPoints: [{ th: '...', en: '...' }],
  realWorldCases: ['case 1', 'case 2'],
};
```

### Step Types

| Type | Purpose | Special Behavior |
|------|---------|-----------------|
| `action` | Scene-setting narration | Logged to console |
| `transformation` | Agent changes alignment | Triggers GSAP animation |
| `dialogue` | Agent speaks in character | Shows dialogue bubble on node |
| `money_flow` | Money is transferred | Updates MoneyTracker, shows loss animation |
| `reveal` | Scam is exposed | Pauses simulation, shows reveal overlay |
| `education` | Teaching moment | Logged as SCAM_ALERT |

---

## Architecture

```
App.tsx                          # Main wiring + state management
  ├── hooks/useSimulation.ts     # Simulation state machine (useReducer)
  ├── components/
  │   ├── FlowCanvas.tsx         # ReactFlow + AgentNode with GSAP
  │   ├── SimulationSetup.tsx    # Scenario picker + profile form
  │   ├── SimulationControls.tsx # Play/pause/step/speed controls
  │   ├── SimulationTimeline.tsx # Step progress indicator
  │   ├── MoneyTracker.tsx       # GSAP-animated money display
  │   ├── ScenarioOverlay.tsx    # Intro/reveal/completed overlays
  │   ├── CaptainControlPanel.tsx # Mode switcher (manual/auto/simulate)
  │   ├── ConsolePanel.tsx       # Live log output
  │   └── AgentCard.tsx          # Sidebar agent cards
  ├── scenarios/
  │   ├── index.ts               # Barrel export
  │   └── call-center.ts         # Call Center Gang scenario
  ├── types.ts                   # Full type system
  ├── constants.ts               # Agent defs + EVIL_VARIANTS
  └── services/api.ts            # Gemini AI integration
```

### State Machine

```
idle → setup → playing ⇄ paused → completed
                  ↑                     │
                  └─── reset ───────────┘
```

The simulation engine uses `useReducer` with these actions:
`START_SETUP`, `SET_USER_PROFILE`, `LOAD_SCENARIO`, `PLAY`, `PAUSE`, `NEXT_STEP`, `TRANSFORM_AGENT`, `MONEY_CHANGE`, `LOG_EVENT`, `COMPLETE`, `SET_SPEED`, `RESET`

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| UI | React 19.2 + TypeScript 5.8 | Component architecture |
| Build | Vite 6.2 | Dev server + production build |
| Graphs | ReactFlow 11 | Agent network visualization |
| Animation | GSAP 3 | Agent transformation effects |
| Animation | Lottie React | Animated agent avatars |
| Styling | Tailwind CSS (CDN) | Utility-first CSS |
| AI | Google Gemini (gemini-2.5-flash) | Agent dialogue + analysis |
| Icons | Lucide React | Consistent icon system |
| Toasts | React Toastify | User notifications |

---

## Environment Variables

```env
# Required
VITE_GEMINI_API_KEY=your_gemini_key

# Future (Phase 4+)
# VITE_GCP_PROJECT_ID=your_project_id
```

---

## Development

```bash
# Dev server
npm run dev

# Type check
npx tsc --noEmit

# Production build
npm run build

# Preview production
npm run preview
```

### Testing APIs

Open browser console:
```javascript
testAPIs()          // Validate Gemini connection
clearAllAgents()    // Reset all localStorage data
```

---

## Roadmap

### Completed (Phases 0-3)
- [x] Type system with AgentAlignment, FraudScenario, SimulationState
- [x] Evil agent variants (7 agents with Thai scammer identities)
- [x] Simulation state machine (useReducer + playback engine)
- [x] Setup UI (profile + scenario picker)
- [x] GSAP transformation animations (good ↔ evil)
- [x] FlowCanvas integration (dynamic borders, colors, badges)
- [x] Auto-play with speed control (0.5x/1x/2x)
- [x] MoneyTracker with GSAP-animated losses
- [x] ScenarioOverlay (intro/reveal/completed)
- [x] SimulationTimeline (step progress indicator)
- [x] SimulationControls (play/pause/step/reset)
- [x] Call Center Gang scenario (14 steps)

### Planned
- [ ] 9 more Thai fraud scenarios (SMS phishing, romance scam, Ponzi scheme, etc.)
- [ ] AI-generated scene images (Vertex AI Imagen 4)
- [ ] AI-generated video clips (Vertex AI Veo 3)
- [ ] Remotion recap video after simulation
- [ ] Screen recording during simulation
- [ ] Mobile responsive layout
- [ ] E2E tests with Playwright

---

## License

MIT

---

**Built for fraud prevention and digital safety in Thailand**
