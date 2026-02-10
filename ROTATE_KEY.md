# 🔑 Quick Key Rotation Guide

## ⚡ 5-Minute Fix

### Step 1: Revoke Old Key (2 minutes)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find API key: `AIzaSyBAvCAX6cw2DtC-s8VNG2pU7woJxRW8ZHQ`
3. Click the **trash icon** or **DELETE**
4. Confirm deletion

### Step 2: Generate New Key (1 minute)
1. Still on https://console.cloud.google.com/apis/credentials
2. Click **+ CREATE CREDENTIALS** → **API Key**
3. Copy the new key (starts with `AIza...`)
4. Click **RESTRICT KEY** (recommended):
   - Application restrictions: None (or HTTP referrers for web)
   - API restrictions: Generative Language API
   - Save

### Step 3: Update Local Environment (1 minute)
1. Open your `.env` file:
   ```bash
   nano /Library/WebServer/Documents/GalaxyAgent/.env
   ```

2. Replace old key with new key:
   ```env
   VITE_GEMINI_API_KEY=AIza_YOUR_NEW_KEY_HERE
   ```

3. Save and close (Ctrl+X, then Y, then Enter)

### Step 4: Test (1 minute)
```bash
# Restart your dev server
npm run dev

# Test in browser:
# 1. Open app
# 2. Activate an agent
# 3. Execute a task
# 4. Check that AI responses work
```

---

## ✅ You're Done!

Your app is now secure with a fresh API key.

**IMPORTANT:** Never commit `.env` files or put keys in code!

---

## 🔒 Optional: Add Pre-commit Protection

Prevent future accidents:

```bash
# Install detect-secrets
pip install detect-secrets

# Scan your repo
detect-secrets scan > .secrets.baseline

# Add to git hooks (create .git/hooks/pre-commit):
#!/bin/bash
detect-secrets-hook --baseline .secrets.baseline
```

---

**Need help?** Read: [SECURITY_INCIDENT.md](./SECURITY_INCIDENT.md)
