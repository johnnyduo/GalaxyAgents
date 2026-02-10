# 🚨 Security Incident Report

**Date:** 2026-02-10
**Severity:** CRITICAL
**Status:** IN PROGRESS

## Incident Summary

Google API key was accidentally committed to git history in commit `f5296ef9`.

**Exposed Key:** `AIzaSyBAvCAX6cw2DtC-s8VNG2pU7woJxRW8ZHQ`
**File:** `.claude/settings.local.json` (line 21)
**Commit:** `f5296ef - feat: Add dynamic scenario images...`

---

## ✅ Immediate Actions Taken

1. ✅ **Removed `.claude/` from git tracking**
   - Added to `.gitignore`
   - Executed `git rm --cached -r .claude/`

2. ⏳ **Key Rotation Required** (USER ACTION NEEDED)
   - Go to: https://console.cloud.google.com/apis/credentials
   - Delete key: `AIzaSyBAvCAX6cw2DtC-s8VNG2pU7woJxRW8ZHQ`
   - Generate new key
   - Update local `.env` file

3. ⏳ **Git History Cleanup** (OPTIONAL - see below)

---

## 📋 Action Checklist

### Critical (Do Now!)
- [ ] **Revoke exposed API key** at Google Cloud Console
- [ ] **Generate new API key**
- [ ] **Update `.env` with new key**
- [ ] **Test that app still works with new key**

### Important (Do Soon)
- [ ] **Commit `.gitignore` changes**
- [ ] **Push updated `.gitignore` to remote**
- [ ] **Review Google Cloud audit logs** for unauthorized usage

### Optional (If repo is public or shared)
- [ ] **Rewrite git history** to remove key (see instructions below)
- [ ] **Force push cleaned history** (WARNING: destructive!)
- [ ] **Notify team members** to re-clone repo

---

## 🔧 Git History Cleanup (OPTIONAL)

**WARNING:** Only do this if:
- Your repo is public, OR
- Other people have access to your repo

**Steps to remove key from git history:**

```bash
# 1. Install git-filter-repo (if not installed)
brew install git-filter-repo  # macOS
# OR
pip install git-filter-repo

# 2. Backup your repo first!
cd /Library/WebServer/Documents/GalaxyAgent
cp -r . ../GalaxyAgent-BACKUP

# 3. Remove the sensitive file from all history
git filter-repo --path .claude/settings.local.json --invert-paths

# 4. Force push (WARNING: rewrites history!)
git push origin --force --all
git push origin --force --tags

# 5. Ask collaborators to re-clone
# They must run: git clone <repo-url> GalaxyAgent-new
```

**Alternative (Simpler but less thorough):**

```bash
# Use BFG Repo-Cleaner
brew install bfg  # macOS

# Remove file from history
bfg --delete-files settings.local.json

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

---

## 🛡️ Prevention Measures

### Implemented
1. ✅ Added `.claude/` to `.gitignore`
2. ✅ Documented incident

### Recommended
1. **Use environment variables only**
   - Never hardcode keys in any file
   - Always use `.env` (already gitignored)

2. **Pre-commit hooks**
   ```bash
   # Install pre-commit
   pip install pre-commit

   # Add to .pre-commit-config.yaml
   - repo: https://github.com/Yelp/detect-secrets
     rev: v1.4.0
     hooks:
       - id: detect-secrets
   ```

3. **Secret scanning**
   - Enable GitHub secret scanning (if using GitHub)
   - Use `gitleaks` or `trufflehog` locally

4. **Regular audits**
   - Monthly review of `.gitignore`
   - Check for accidentally committed secrets

---

## 📊 Impact Assessment

### What was exposed?
- Google Gemini API Key
- Located in: `.claude/settings.local.json`
- Commit: `f5296ef9`
- Visible to: Anyone with repo read access

### Potential damage?
- **If key is still active:** Unauthorized API usage charges
- **If repo is public:** High risk - key can be harvested by bots
- **If repo is private:** Lower risk - only collaborators affected

### Likelihood of exploitation?
- **Public repo:** Very High (bots scan GitHub in minutes)
- **Private repo:** Low (only trusted collaborators)

---

## 🎯 Next Steps

1. **IMMEDIATELY:** Revoke the exposed key
2. **Within 1 hour:** Generate and test new key
3. **Within 24 hours:** Review Google Cloud billing for unauthorized usage
4. **Within 1 week:** Implement pre-commit hooks (optional)

---

## 📞 Support

- Google Cloud Support: https://cloud.google.com/support
- GitHub Security: https://docs.github.com/en/code-security

---

**Created by:** Claude (Security Incident Response)
**Status:** Awaiting user action on key rotation
