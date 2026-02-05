import { FraudScenario } from '../types';
import { callCenterScenario } from './call-center';
import { smsPhishingScenario } from './sms-phishing';
import { romanceScamScenario } from './romance-scam';
import { ponziSchemeScenario } from './ponzi-scheme';
import { fakeInvestmentScenario } from './fake-investment';
import { jobScamScenario } from './job-scam';
import { loanAppScenario } from './loan-app';
import { qrScamScenario } from './qr-scam';
import { socialImpersonationScenario } from './social-impersonation';
import { simSwapScenario } from './sim-swap';

export const FRAUD_SCENARIOS: FraudScenario[] = [
  callCenterScenario,
  smsPhishingScenario,
  romanceScamScenario,
  socialImpersonationScenario,
  ponziSchemeScenario,
  fakeInvestmentScenario,
  jobScamScenario,
  loanAppScenario,
  qrScamScenario,
  simSwapScenario,
];

export {
  callCenterScenario,
  smsPhishingScenario,
  romanceScamScenario,
  socialImpersonationScenario,
  ponziSchemeScenario,
  fakeInvestmentScenario,
  jobScamScenario,
  loanAppScenario,
  qrScamScenario,
  simSwapScenario,
};
