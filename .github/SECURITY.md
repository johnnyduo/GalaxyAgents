# Security Policy

## Exposed API Key Notice

**Status:** Known exposure in commit `f5296ef9`
**Key:** Google Gemini API Key
**Decision:** User accepted risk (time constraints)
**Date:** 2026-02-10

### Recommended Actions for Repository Viewers

If you are viewing this repository:
1. **Do not use** the exposed API key
2. This key may be revoked at any time
3. Usage tracking is enabled on the Google Cloud project

### For Repository Owner

**Important reminders:**
- Monitor Google Cloud billing regularly
- Set up billing alerts at: https://console.cloud.google.com/billing
- The key can be revoked anytime at: https://console.cloud.google.com/apis/credentials

### Reporting a Security Issue

If you discover a security vulnerability, please contact the repository owner directly rather than opening a public issue.

---

**Note:** This is a development/educational project. Production deployments should use proper secret management.
