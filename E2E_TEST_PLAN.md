# Galaxy Agent - End-to-End Testing Plan
**Date:** 2026-02-10
**Version:** 1.0
**Platform:** macOS (Darwin 25.2.0)

## Overview
Comprehensive testing plan for the Galaxy Agents fraud simulation platform, covering all user flows, interactions, and platform compatibility.

---

## 1. Application Initialization & Landing Page

### 1.1 Initial Load
- [ ] Landing page displays correctly with animated background
- [ ] "เข้าสู่ระบบ" (Launch App) button is visible and functional
- [ ] Guest session is auto-created on first load
- [ ] Sound service initializes without errors
- [ ] No console errors on page load

### 1.2 Navigation
- [ ] Clicking launch button hides landing page and shows main app
- [ ] Logo click returns to landing page from main app
- [ ] State persists when navigating back to landing and returning

### 1.3 Storage Migration
- [ ] LocalStorage data migrates to IndexedDB on first load
- [ ] Migration completes without errors
- [ ] Data is accessible after migration

**Status:** ✅ READY FOR TESTING

---

## 2. Agent Management Lifecycle

### 2.1 Agent Activation
- [ ] Click inactive agent card shows "Activate" button
- [ ] Activation shows loading animation
- [ ] Agent appears in FlowCanvas after activation
- [ ] Agent status changes from 'offline' to 'idle'
- [ ] Console log shows activation message
- [ ] Toast notification appears: "Agent เปิดใช้งานแล้ว!"
- [ ] Agent greeting dialogue appears after activation
- [ ] Random dialogues start appearing for active agent

### 2.2 Agent Deactivation
- [ ] Click active agent shows "Deactivate" button
- [ ] Deactivation removes agent from canvas
- [ ] Agent status changes to 'offline'
- [ ] Console log shows deactivation message
- [ ] Toast notification appears
- [ ] Random dialogues stop for deactivated agent

### 2.3 Agent Detail Panel
- [ ] Clicking agent card opens detail panel
- [ ] Panel shows all agent info: name, role, personality, dialogues
- [ ] "Execute Task" button is visible for active agents
- [ ] Custom task input field works correctly
- [ ] Close button hides panel
- [ ] Panel scrolls correctly on small screens

### 2.4 Agent Persistence
- [ ] Active agents persist after page reload
- [ ] Agent positions on canvas persist after reload
- [ ] Agent connections persist after reload

**Status:** ⏳ PENDING

---

## 3. Manual Mode Operation

### 3.1 Mode Selection
- [ ] Manual mode is default on startup
- [ ] Mode selector shows "MANUAL" highlighted
- [ ] Manual mode allows direct agent control

### 3.2 Agent Task Execution
- [ ] Execute task without custom description uses default role task
- [ ] Execute task with custom description uses provided task
- [ ] Progress bar appears during execution
- [ ] Progress animates from 0% to 100%
- [ ] Dialogue bubble shows during execution
- [ ] AI (Gemini) API is called correctly
- [ ] Task result is stored in IndexedDB
- [ ] Task result appears in Operations Dashboard
- [ ] Console log shows task summary
- [ ] Toast notification shows success
- [ ] Agent returns to idle after completion

### 3.3 AI Integration per Agent Role
**Commander (a0):**
- [ ] Generates strategic command responses
- [ ] Returns proper task result structure

**Scout (a1):**
- [ ] Detects fraud patterns
- [ ] Returns fraud_detection task type

**Memory (a2):**
- [ ] Searches fraud database
- [ ] Returns pattern_analysis task type

**Guardian (a3):**
- [ ] Assists user verification
- [ ] Returns user_assistance task type

**Trainer (a4):**
- [ ] Creates educational content
- [ ] Returns education task type

**Finance Guard (a5):**
- [ ] Verifies invoices/emails
- [ ] Returns verification task type

**Alert (a6):**
- [ ] Broadcasts alerts
- [ ] Returns alert_broadcast task type

### 3.4 Error Handling
- [ ] API failures show error toast
- [ ] Progress bar clears on error
- [ ] Agent returns to idle on error
- [ ] Console shows error message

**Status:** ⏳ PENDING

---

## 4. Auto Mode Operation

### 4.1 Mode Activation
- [ ] Switching to Auto mode shows commander controls
- [ ] Auto mode label highlights correctly
- [ ] Cannot execute commander action without Commander active

### 4.2 Commander Orchestration
- [ ] Commander activation required for orchestration
- [ ] "Execute Strategic Order" button works
- [ ] Custom order input field works
- [ ] Commander task executes first
- [ ] Other active agents receive auto-assigned tasks
- [ ] Tasks execute in sequence with delays
- [ ] All tasks complete successfully
- [ ] All results stored in IndexedDB

### 4.3 Multi-Agent Coordination
- [ ] Up to 3 agents execute automatically after commander
- [ ] Each agent gets role-appropriate task
- [ ] Dialogue bubbles show for each agent
- [ ] Progress bars track each agent separately
- [ ] Console shows all agent activities

**Status:** ⏳ PENDING

---

## 5. Simulation Mode - Full Scenario Playback

### 5.1 Simulation Setup
- [ ] Switch to Simulation mode opens setup panel
- [ ] All scenarios display with correct info
- [ ] Difficulty badges show correct colors
- [ ] Scenario selection highlights selected scenario
- [ ] User profile inputs work (name, money slider)
- [ ] Money slider range: ฿10,000 - ฿1,000,000
- [ ] "เริ่มจำลอง" button enables when scenario selected
- [ ] "ยกเลิก" returns to previous mode

### 5.2 Scenario Start (Intro Overlay)
- [ ] Click "เริ่มจำลอง" shows intro overlay
- [ ] Intro overlay shows scenario title
- [ ] Intro overlay shows scenario description
- [ ] Intro overlay shows difficulty and category
- [ ] Intro overlay shows involved agents
- [ ] Involved agents activate automatically
- [ ] "เริ่มเลย" button dismisses intro
- [ ] Clicking outside does not close overlay

### 5.3 Playback Controls
**Play/Pause:**
- [ ] Scenario auto-plays after intro dismiss
- [ ] Pause button stops playback
- [ ] Play button resumes from current step
- [ ] Timeline freezes when paused

**Speed Control:**
- [ ] 0.5x speed doubles step duration
- [ ] 1x speed is default
- [ ] 2x speed halves step duration
- [ ] Speed changes apply to current step

**Step Navigation:**
- [ ] Step forward advances one step
- [ ] Step processes current step correctly
- [ ] Step shows dialogue bubble
- [ ] Step updates timeline

### 5.4 Step Processing
**Dialogue Steps:**
- [ ] Agent speaks dialogue
- [ ] Dialogue bubble appears on canvas
- [ ] Console shows dialogue log
- [ ] Step advances after duration

**Transformation Steps:**
- [ ] Evil agent icon changes (shows mask/disguise)
- [ ] Agent name shows real identity in parentheses
- [ ] Alignment tracked correctly
- [ ] Transformation animation plays

**Money Steps:**
- [ ] Money deducted from tracker
- [ ] Money tracker updates in real-time
- [ ] Transaction logged in timeline
- [ ] Amount shown in console

**Reveal Steps:**
- [ ] Playback pauses automatically
- [ ] Reveal overlay shows
- [ ] Overlay shows "เปิดโปง!" message
- [ ] Overlay shows evil agents
- [ ] Overlay shows techniques used
- [ ] "เข้าใจแล้ว" button dismisses and resumes
- [ ] Clicking outside does not close

**Education Steps:**
- [ ] Prevention tips show in overlay
- [ ] Education content is readable
- [ ] Console logs education message

### 5.5 Money Tracker
- [ ] Displays total and remaining money
- [ ] Updates in real-time during playback
- [ ] Shows percentage lost
- [ ] Color changes as money decreases (green → yellow → red)
- [ ] Position: top-right, visible at all times

### 5.6 Timeline
- [ ] Shows all steps as dots
- [ ] Current step highlighted
- [ ] Completed steps show different color
- [ ] Timeline scrolls for long scenarios
- [ ] Hovering shows step type/info

### 5.7 Completion Overlay
- [ ] Appears automatically at scenario end
- [ ] Shows final money lost
- [ ] Shows evil agents revealed
- [ ] Shows "เล่นอีกครั้ง" button → returns to setup
- [ ] Shows "ออกจากจำลอง" button → returns to manual mode
- [ ] Statistics saved to IndexedDB

### 5.8 Simulation Record Persistence
- [ ] Completed simulation saves to IndexedDB
- [ ] Record includes: scenario, user profile, timeline, money lost
- [ ] Record retrievable after page reload
- [ ] Multiple simulations stored separately

**Status:** ⏳ PENDING

---

## 6. Scenario Media (AI-Generated Images)

### 6.1 Image Display During Simulation
- [ ] Images appear for steps with available images
- [ ] Images load correctly from `/scenario-images/`
- [ ] Smooth fade-in transition
- [ ] Ken Burns effect (zoom/pan) plays
- [ ] Position: bottom-right, non-intrusive
- [ ] Step badge shows current step ID
- [ ] Playing indicator pulses during playback
- [ ] No images for steps without pre-generated images
- [ ] Hidden on mobile (< 640px width)

### 6.2 Image Sources
**Verify images exist for:**
- [ ] sms-phishing-001: sms-03, sms-04, sms-07, sms-11
- [ ] call-center-001: cc-02, cc-05, cc-08, cc-12
- [ ] romance-scam-001: rs-02, rs-05, rs-08, rs-11
- [ ] social-impersonation-001: si-02, si-05, si-08
- [ ] ponzi-scheme-001: ps-02, ps-05, ps-08
- [ ] fake-investment-001: fi-02, fi-05, fi-08
- [ ] job-scam-001: js-02, js-05, js-08
- [ ] loan-app-001: la-02, la-05, la-08, la-11
- [ ] qr-scam-001: qr-02, qr-05, qr-08
- [ ] sim-swap-001: ss-02, ss-05, ss-08, ss-11

### 6.3 Error Handling
- [ ] Missing images fail gracefully (no display)
- [ ] No console errors for missing images
- [ ] Component continues working after image error

**Status:** ⏳ PENDING

---

## 7. Video Preview Player

### 7.1 Preview Trigger
- [ ] "ดูวิดีโอตัวอย่าง" button shows on each scenario card
- [ ] Button click opens modal overlay
- [ ] Modal covers entire screen
- [ ] Click outside modal closes preview
- [ ] Close button (✕) closes preview

### 7.2 Cinematic Playback
- [ ] Auto-plays on open
- [ ] Ken Burns effect animates smoothly
- [ ] Crossfade transitions between slides
- [ ] Typewriter text effect displays step content
- [ ] Text appears after 0.5s
- [ ] Each slide shows for ~4 seconds
- [ ] Progress bars animate correctly
- [ ] Slide counter shows current/total

### 7.3 Controls
- [ ] Play/pause button toggles playback
- [ ] Previous button goes back (disabled at start)
- [ ] Next button advances (disabled at end)
- [ ] Manual navigation pauses auto-advance
- [ ] Controls visible and accessible

### 7.4 Audio Integration
- [ ] Alert sound plays on open
- [ ] Notification sound on slide advance
- [ ] Success sound on completion
- [ ] Respects sound settings

### 7.5 Responsive Design
- [ ] Scales properly on all screen sizes
- [ ] Controls accessible on mobile
- [ ] Text readable on small screens
- [ ] Cinematic bars adjust for mobile
- [ ] Aspect ratio maintained

**Status:** ⏳ PENDING

---

## 8. Data Persistence (IndexedDB)

### 8.1 Active Agents
- [ ] Active agents saved on change
- [ ] Active agents loaded on page load
- [ ] Persistence survives page reload

### 8.2 Agent Connections
- [ ] Edge connections saved when changed
- [ ] Connections loaded on startup
- [ ] Connections persist after reload

### 8.3 Node Positions
- [ ] Node positions saved via FlowCanvas
- [ ] Positions loaded on startup
- [ ] Positions persist after reload

### 8.4 Task Results
- [ ] Each task result saved individually
- [ ] Up to 50 recent results stored
- [ ] Results loaded on startup
- [ ] Results display in Operations Dashboard
- [ ] Old results automatically pruned

### 8.5 Simulation Records
- [ ] Completed simulations saved
- [ ] Records include all metadata
- [ ] Records retrievable after reload
- [ ] No duplicate records

### 8.6 Operation Mode
- [ ] Manual/Auto mode persists
- [ ] Simulation mode does NOT persist (resets to manual)
- [ ] Mode restored correctly on reload

**Status:** ⏳ PENDING

---

## 9. Operations Dashboard

### 9.1 Access
- [ ] Dashboard opens from floating action button
- [ ] Dashboard opens from sidebar button
- [ ] Button shows task count badge
- [ ] Dashboard overlays main view

### 9.2 Display
- [ ] Shows all task results (newest first)
- [ ] Each result shows: agent, task type, timestamp, summary
- [ ] Results grouped by agent
- [ ] Scrollable for many results
- [ ] Back button closes dashboard

### 9.3 Data Accuracy
- [ ] All executed tasks appear
- [ ] Timestamps accurate
- [ ] Summaries match task results
- [ ] AI-generated data displays correctly

**Status:** ⏳ PENDING

---

## 10. FlowCanvas & Agent Visualization

### 10.1 Node Rendering
- [ ] All active agents display as nodes
- [ ] Inactive agents do not display
- [ ] Node positions draggable
- [ ] Positions save after drag
- [ ] Agent icons display correctly

### 10.2 Agent Alignment (Simulation Mode)
- [ ] Good agents show normal appearance
- [ ] Evil agents show disguise/mask icon
- [ ] Transformed agents show name change
- [ ] Alignment colors differ (if applicable)

### 10.3 Dialogue Bubbles
- [ ] Active dialogue appears above agent
- [ ] Random dialogues appear periodically
- [ ] Bubbles auto-hide after duration
- [ ] Only one active dialogue at a time
- [ ] Bubbles positioned correctly

### 10.4 Connections/Edges
- [ ] Edges drawn between connected agents
- [ ] Persistent edges saved
- [ ] Streaming edges animate (if used)
- [ ] Edges color-coded by status

### 10.5 Zoom & Focus
- [ ] Auto-zoom to active agent (if implemented)
- [ ] Manual zoom controls work
- [ ] Pan/drag canvas works
- [ ] Reset view button works

**Status:** ⏳ PENDING

---

## 11. Console Panel

### 11.1 Log Display
- [ ] Initial system logs appear
- [ ] Agent activation/deactivation logged
- [ ] Task execution logged
- [ ] Simulation events logged
- [ ] Newest logs at bottom
- [ ] Auto-scrolls to newest log

### 11.2 Log Types
- [ ] SYSTEM logs (gray/white)
- [ ] A2A logs (agent-to-agent)
- [ ] SIMULATION logs (yellow/orange)
- [ ] SCAM_ALERT logs (red)
- [ ] COMMANDER logs (blue)

### 11.3 Performance
- [ ] Logs limited to last 100 entries
- [ ] No performance lag with many logs
- [ ] Smooth scrolling

**Status:** ⏳ PENDING

---

## 12. Sound & Audio

### 12.1 Sound Effects
- [ ] Alert sound on important events
- [ ] Success sound on task completion
- [ ] Error sound on failures
- [ ] Notification sound on updates
- [ ] UI click sounds (if enabled)

### 12.2 Text-to-Speech
- [ ] TTS speaks key dialogues (if enabled)
- [ ] Voice matches language (Thai)
- [ ] Volume adjustable
- [ ] Can be muted

### 12.3 Settings
- [ ] Sound on/off toggle works
- [ ] Volume control works
- [ ] Settings persist after reload

**Status:** ⏳ PENDING

---

## 13. Responsive Design

### 13.1 Desktop (≥1024px)
- [ ] All panels visible
- [ ] FlowCanvas has adequate space
- [ ] No horizontal scrolling
- [ ] All features accessible

### 13.2 Tablet (768px - 1023px)
- [ ] Sidebar adjusts width
- [ ] Canvas resizes appropriately
- [ ] Controls remain accessible
- [ ] No layout breaks

### 13.3 Mobile (< 768px)
- [ ] Sidebar width adjusts (320px → full width)
- [ ] Canvas visible
- [ ] Controls stack vertically if needed
- [ ] Text remains readable
- [ ] Buttons tappable (min 44px)
- [ ] Scenario media hidden on small screens
- [ ] Video player controls accessible

### 13.4 Mobile Specific
- [ ] Touch interactions work
- [ ] No hover-dependent features
- [ ] Modals fill screen properly
- [ ] Virtual keyboard doesn't break layout

**Status:** ⏳ PENDING

---

## 14. Error Handling & Edge Cases

### 14.1 Network Errors
- [ ] Offline mode handled gracefully
- [ ] API timeout shows user-friendly error
- [ ] Failed tasks don't break app
- [ ] Retry mechanism works

### 14.2 Data Errors
- [ ] Invalid scenario data handled
- [ ] Missing images don't break player
- [ ] Corrupted IndexedDB recovers
- [ ] Invalid user inputs validated

### 14.3 State Errors
- [ ] No scenario selected → button disabled
- [ ] No active agents → appropriate message
- [ ] Empty results → dashboard shows message
- [ ] Invalid mode transitions prevented

### 14.4 Browser Compatibility
- [ ] IndexedDB not supported → fallback message
- [ ] LocalStorage quota exceeded → handled
- [ ] Older browsers → graceful degradation

**Status:** ⏳ PENDING

---

## 15. Performance & Optimization

### 15.1 Load Time
- [ ] Initial page load < 3 seconds
- [ ] Images lazy-load where possible
- [ ] No blocking JavaScript
- [ ] CSS loads efficiently

### 15.2 Runtime Performance
- [ ] Smooth animations (60fps)
- [ ] No jank during playback
- [ ] Efficient re-renders (React optimization)
- [ ] Memory usage stable (no leaks)

### 15.3 Data Size
- [ ] IndexedDB size reasonable
- [ ] Old data pruned automatically
- [ ] Large images optimized
- [ ] Network payload minimized

**Status:** ⏳ PENDING

---

## 16. Security & Privacy

### 16.1 Data Storage
- [ ] No sensitive data in localStorage
- [ ] Guest sessions isolated
- [ ] No PII collected without consent
- [ ] Data stays client-side

### 16.2 API Security
- [ ] API keys not exposed in client
- [ ] HTTPS enforced
- [ ] No XSS vulnerabilities
- [ ] Input sanitization working

**Status:** ⏳ PENDING

---

## 17. Final Integration Test

### 17.1 Complete User Journey
1. [ ] Land on landing page
2. [ ] Click launch app
3. [ ] Activate 3 agents
4. [ ] Execute tasks in manual mode
5. [ ] Check Operations Dashboard
6. [ ] Switch to auto mode
7. [ ] Execute commander orchestration
8. [ ] Switch to simulation mode
9. [ ] Select scenario
10. [ ] Preview video
11. [ ] Start simulation
12. [ ] Watch full playback with images
13. [ ] Complete scenario
14. [ ] Play again
15. [ ] Exit simulation
16. [ ] Reload page → verify persistence
17. [ ] Return to landing
18. [ ] Launch again → verify state

### 17.2 Multi-Scenario Test
- [ ] Complete all 10 scenarios successfully
- [ ] Each scenario displays unique content
- [ ] All evil agents reveal correctly
- [ ] All images load correctly
- [ ] All videos play correctly

**Status:** ⏳ PENDING

---

## 18. Platform-Specific Checks (macOS)

### 18.1 Browser Compatibility
- [ ] Safari latest version
- [ ] Chrome latest version
- [ ] Firefox latest version
- [ ] Edge latest version

### 18.2 macOS Features
- [ ] Trackpad gestures work (zoom, pan)
- [ ] Keyboard shortcuts work
- [ ] Full screen mode works
- [ ] Dark mode respected

**Status:** ⏳ PENDING

---

## Test Execution Log

### Session 1: 2026-02-10
**Tester:** Claude
**Environment:** macOS Darwin 25.2.0, Chrome/Safari
**Build:** Latest from main branch

**Results:** _To be filled during testing_

---

## Known Issues & Fixes Required

_To be populated during testing_

---

## Test Summary

**Total Checkpoints:** ~300
**Passed:** _TBD_
**Failed:** _TBD_
**Blocked:** _TBD_
**Pass Rate:** _TBD%_

---

## Sign-off

- [ ] All critical paths tested
- [ ] All blockers resolved
- [ ] Performance acceptable
- [ ] Platform compatibility verified
- [ ] Ready for production

**Tester Signature:** ________________
**Date:** ________________
