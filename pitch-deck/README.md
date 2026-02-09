# Galaxy Agents - Pitch Deck Materials

## Round 2 Submission (Deadline: 11 Feb 2026 @ 11:59 PM)

This folder contains all materials for the competition pitch deck submission.

---

## Files Overview

### Business Model Canvas

| File | Language | Description |
|------|----------|-------------|
| `BUSINESS_MODEL_CANVAS.md` | English | Comprehensive BMC with all 9 building blocks |
| `BUSINESS_MODEL_CANVAS_TH.md` | Thai | ฉบับภาษาไทยครบถ้วน |

### Google Apps Script (Pitch Deck Generator)

| File | Language | Slides |
|------|----------|--------|
| `create_pitch_deck.gs` | English | 19 slides, 16:9 format |
| `create_pitch_deck_thai.gs` | Thai | 19 สไลด์, อัตราส่วน 16:9 |

---

## How to Use the Apps Script

### Step 1: Open Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New project"

### Step 2: Paste the Script
1. Delete any existing code
2. Copy the entire contents of `create_pitch_deck.gs` (English) or `create_pitch_deck_thai.gs` (Thai)
3. Paste into the script editor

### Step 3: Run the Script
1. Save the project (Ctrl+S)
2. Click "Run" or select `createGalaxyAgentsPitchDeck` / `createGalaxyAgentsPitchDeckThai`
3. Authorize the script when prompted (first time only)
4. Wait for completion (usually 30-60 seconds)

### Step 4: Find Your Presentation
1. Check the execution log for the presentation URL
2. Or find "Galaxy Agents - Pitch Deck" in your Google Drive

---

## Slide Structure (19 Slides)

| # | Section | Content |
|---|---------|---------|
| 01 | Cover | Title, tagline, branding |
| 02 | Team Profile | Team members & responsibilities |
| 03 | Problem | Thailand's ฿115B scam crisis |
| 04 | Solution | Galaxy Agents & 7 AI Agents |
| 05 | Key Features | 6 main features |
| 06 | User Insight | 3 personas & key insight |
| 07 | Fraud Impact | Societal impact & UN SDGs |
| 08 | Tech Stack | Frontend, AI/ML, Backend, Infrastructure |
| 09 | Architecture | System architecture diagram |
| 10 | Methodology | Agile, DevOps, QA, User Research |
| 11 | Timeline | Q1-Q4 2026 roadmap |
| 12 | Market Potential | TAM $65B, SAM $500M, SOM $15M |
| 13 | Target Customer | B2C, B2B, B2B2C, Government |
| 14 | Value Propositions | For users & enterprises |
| 15 | Revenue Model | Pricing tiers & projections |
| 16 | Competitive | Landscape & moats |
| 17 | Go-to-Market | 3-phase strategy |
| 18 | Demo | Working prototype metrics |
| 19 | Call to Action | Thank you & contact |

---

## Color Palette (from Galaxy Agents Web App)

| Color | Hex | Usage |
|-------|-----|-------|
| Neon Green | `#43FF4D` | Primary accent, success |
| Black BG | `#0A0F1A` | Slide backgrounds |
| Dark Card | `#111827` | Card backgrounds |
| Danger Red | `#FF4444` | Warnings, problems |
| Warning Orange | `#F59E0B` | Caution, timelines |
| Blue | `#3B82F6` | Info, B2C |
| Purple | `#6366F1` | B2B, tech |
| Teal | `#14B8A6` | Infrastructure |
| White | `#FFFFFF` | Primary text |
| Gray | `#9CA3AF` | Secondary text |

---

## Key Statistics with Sources

| Stat | Value | Source |
|------|-------|--------|
| Thailand annual fraud losses | ฿115.3B | GASA Thailand 2025 |
| Thai adults facing scams | 72% | GASA Thailand 2025 |
| Scam victim rate | 6 in 10 | Nation Thailand |
| Scam texts detected (2024) | 130M | Insurance Journal |
| Mobile wallet users | 51M | Statista 2025 |
| PromptPay registrations | 77M | Bank of Thailand |
| Fintech companies | 177 | Fintech News Singapore |
| Digital banking accounts | 144.3M | Bank of Thailand |
| AI Fraud Market (2025) | $14.72B | Precedence Research |
| AI Fraud Market (2034) | $65.35B | Precedence Research |
| CAGR | 18.06% | Precedence Research |

---

## Fonts Used

| Font | Usage |
|------|-------|
| Kanit | Thai titles, headings |
| Sarabun | Thai body text |
| IBM Plex Mono | Code, numbers, labels |

---

## Images

The script references royalty-free images from Pexels. For the final presentation, replace placeholders with:
- Demo screenshots from galaxyagents.vercel.app
- Team photos
- Agent character illustrations

---

## Customization Tips

1. **Add Team Photos**: Replace the avatar circles with actual team photos
2. **Insert Screenshots**: Add app screenshots in slide 18 (Demo)
3. **Update Contact Info**: Customize slide 19 with your actual contact details
4. **Add Logo**: Replace the logo placeholder with your actual logo

---

## Technical Notes

- Google Slides API has limited gradient support; the script uses solid colors with alpha
- Fonts must be available in Google Slides; Kanit and Sarabun are Google Fonts
- The script creates a new presentation each time; existing ones are not overwritten
- 16:9 aspect ratio is the Google Slides default

---

## Competition Requirements Checklist

- [x] Max. 8-minute Video Presentation (script included in slides)
- [x] Pitch Deck (PowerPoint/Slides Format)
- [x] Business Model Canvas (Submitted Separately)

### Presentation Coverage

- [x] 1. Team Profile - Team Name, Backgrounds, Responsibilities
- [x] 2. Problem & Solution - Statement, Proposed Solution, Key Features, User Insight
- [x] 3. Fraud-reduction / Cybersecurity Impact - Societal impact
- [x] 4. Tech Execution - Stack, Architecture, Methodology, Timeline, Tools
- [x] 5. Business Model - TAM/SAM/SOM, Customers, Values, Revenue, Competition, GTM
- [x] Working Prototype/Demo (MVP 1)

---

*Created: February 2026*
*Last Updated: 2026-02-09*
