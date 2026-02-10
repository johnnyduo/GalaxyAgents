/**
 * Sound Service - Audio effects + Thai TTS for simulations
 *
 * Features:
 * - Sound effects (using Web Audio API - no external files)
 * - Thai Text-to-Speech via Web Speech API
 * - Simple, lean implementation
 */

import * as WebAudio from './webAudioSounds';

type SoundType = 'notification' | 'alert' | 'moneyLoss' | 'transformation' | 'success' | 'warning' | 'reveal';

// Settings
let soundEnabled = true;
let ttsEnabled = true;
let volume = 0.5;

/**
 * Play a sound effect using Web Audio API
 */
export function playSound(type: SoundType): void {
  if (!soundEnabled) return;

  try {
    // Map sound types to Web Audio functions
    switch (type) {
      case 'notification':
        WebAudio.playNotification();
        break;
      case 'alert':
        WebAudio.playAlert();
        break;
      case 'warning':
        WebAudio.playWarning();
        break;
      case 'success':
        WebAudio.playSuccess();
        break;
      case 'moneyLoss':
        WebAudio.playMoneyLoss();
        break;
      case 'transformation':
        WebAudio.playTransformation();
        break;
      case 'reveal':
        WebAudio.playReveal();
        break;
    }
  } catch (error) {
    // Silently ignore sound errors
  }
}

/**
 * Play sound based on step type
 */
export function playSoundForStep(
  stepType: 'dialogue' | 'action' | 'transformation' | 'money_flow' | 'reveal' | 'education',
  alignment: 'good' | 'evil' | 'transitioning'
): void {
  switch (stepType) {
    case 'transformation':
      playSound('transformation');
      break;
    case 'money_flow':
      playSound('moneyLoss');
      break;
    case 'reveal':
      playSound('reveal');
      break;
    case 'education':
      playSound('success');
      break;
    case 'action':
      if (alignment === 'evil') {
        playSound('warning');
      } else {
        playSound('notification');
      }
      break;
    case 'dialogue':
      if (alignment === 'evil') {
        playSound('alert');
      }
      break;
  }
}

/**
 * Speak text using Web Speech API (Thai)
 */
export function speak(text: string, lang: 'th-TH' | 'en-US' = 'th-TH', speed: number = 1): Promise<void> {
  if (!ttsEnabled) return Promise.resolve();

  // Split long text into chunks to prevent Chrome's ~15s TTS cutoff bug
  const chunks = splitTextIntoChunks(text, 80);

  // Speak chunks sequentially
  return chunks.reduce((chain, chunk) => {
    return chain.then(() => speakChunk(chunk, lang, speed));
  }, Promise.resolve());
}

/**
 * Split Thai text into natural chunks at sentence boundaries
 */
function splitTextIntoChunks(text: string, maxLength: number): string[] {
  if (text.length <= maxLength) return [text];

  const chunks: string[] = [];
  // Split at Thai sentence-ending particles, spaces, or punctuation
  const separators = /([。！？\.\!\?]+|[\s,，、]+(?=[ก-๙a-zA-Z]))/;
  const sentences = text.split(separators).filter(s => s.trim().length > 0);

  let current = '';
  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength && current.length > 0) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim().length > 0) {
    chunks.push(current.trim());
  }

  return chunks.length > 0 ? chunks : [text];
}

/**
 * Detect browser type for TTS workarounds
 */
const isSafari = typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isChrome = typeof navigator !== 'undefined' &&
  /Chrome/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);

/**
 * Speak a single chunk of text with browser-specific workarounds
 * - Chrome: pause/resume keepalive to prevent ~15s cutoff
 * - Safari: polling-based completion detection (onend unreliable)
 */
function speakChunk(text: string, lang: 'th-TH' | 'en-US', speed: number = 1): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      let hasStarted = false;
      let hasEnded = false;
      let keepAliveInterval: ReturnType<typeof setInterval> | null = null;
      let pollingInterval: ReturnType<typeof setInterval> | null = null;

      const cleanup = () => {
        if (keepAliveInterval) { clearInterval(keepAliveInterval); keepAliveInterval = null; }
        if (pollingInterval) { clearInterval(pollingInterval); pollingInterval = null; }
      };

      const finish = () => {
        if (hasEnded) return;
        hasEnded = true;
        cleanup();
        resolve();
      };

      const speakWithVoice = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        // Adjust rate based on speed, but cap at 1.5 for intelligibility
        // 0.5x → 0.45, 1x → 0.9, 2x → 1.5 (capped)
        utterance.rate = Math.min(0.9 * speed, 1.5);
        utterance.pitch = 1;
        utterance.volume = volume;

        // Try to find a Thai voice
        const voices = window.speechSynthesis.getVoices();
        const thaiVoice = voices.find(v => v.lang.startsWith('th'));

        if (thaiVoice) {
          utterance.voice = thaiVoice;
        }

        utterance.onstart = () => {
          hasStarted = true;

          // CHROME ONLY: Pause/resume every 10s to prevent ~15s cutoff bug
          // Safari doesn't need this and it can cause issues
          if (isChrome) {
            keepAliveInterval = setInterval(() => {
              if (!hasEnded && window.speechSynthesis.speaking) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
              }
            }, 10000);
          }

          // SAFARI FIX: Poll speechSynthesis.speaking as backup for unreliable onend
          // Also works as universal fallback for all browsers
          pollingInterval = setInterval(() => {
            if (hasStarted && !hasEnded && !window.speechSynthesis.speaking) {
              finish();
            }
          }, 200);
        };

        utterance.onend = () => {
          finish();
        };

        utterance.onerror = () => {
          finish();
        };

        // Speak
        window.speechSynthesis.speak(utterance);

        // Chrome fix: Resume if paused (Chrome bug workaround)
        if (isChrome) {
          setTimeout(() => {
            if (!hasStarted && window.speechSynthesis.paused) {
              window.speechSynthesis.resume();
            }
          }, 100);
        }

        // Timeout fallback (if speech doesn't start in 5 seconds)
        setTimeout(() => {
          if (!hasStarted) {
            window.speechSynthesis.cancel();
            finish();
          }
        }, 5000);

        // Safety timeout: max 30s per chunk
        setTimeout(() => {
          if (!hasEnded) {
            window.speechSynthesis.cancel();
            finish();
          }
        }, 30000);
      };

      // Wait for voices to load
      const voices = window.speechSynthesis.getVoices();

      if (voices.length > 0) {
        speakWithVoice();
      } else {
        const timeout = setTimeout(() => {
          finish();
        }, 2000);

        window.speechSynthesis.addEventListener('voiceschanged', () => {
          clearTimeout(timeout);
          speakWithVoice();
        }, { once: true });

        window.speechSynthesis.getVoices();
      }
    } catch (error) {
      resolve();
    }
  });
}

/**
 * Speak step content
 */
export async function speakStepContent(content: string, stepType: string, speed: number = 1): Promise<void> {
  // Clean up emojis and special characters for TTS
  const cleanText = content
    .replace(/[📱💳💸🔗🚨🔍📚🛡️⚠️]/g, '')
    .replace(/\[.*?\]/g, '') // Remove [Kerry Express] etc
    .trim();

  if (cleanText.length > 0) {
    await speak(cleanText, 'th-TH', speed);
  }
}

/**
 * Enable/disable sound effects
 */
export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  localStorage.setItem('galaxy_sound_enabled', String(enabled));
}

/**
 * Enable/disable TTS
 */
export function setTTSEnabled(enabled: boolean): void {
  ttsEnabled = enabled;
  localStorage.setItem('galaxy_tts_enabled', String(enabled));
}

/**
 * Set volume (0-1)
 */
export function setVolume(vol: number): void {
  volume = Math.max(0, Math.min(1, vol));
  localStorage.setItem('galaxy_sound_volume', String(volume));
}

/**
 * Get current settings
 */
export function getSoundSettings(): { soundEnabled: boolean; ttsEnabled: boolean; volume: number } {
  return { soundEnabled, ttsEnabled, volume };
}

/**
 * Initialize from localStorage
 */
export function initSoundService(): void {
  const savedSound = localStorage.getItem('galaxy_sound_enabled');
  const savedTTS = localStorage.getItem('galaxy_tts_enabled');
  const savedVolume = localStorage.getItem('galaxy_sound_volume');

  if (savedSound !== null) soundEnabled = savedSound === 'true';
  if (savedTTS !== null) ttsEnabled = savedTTS === 'true';
  if (savedVolume !== null) volume = parseFloat(savedVolume);

  // Don't preload sounds to avoid 404 errors
  // Sound effects are disabled until we have proper audio files

  // Load voices (needed for TTS)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
}

/**
 * Stop all sounds
 */
export function stopAllSounds(): void {
  // Web Audio API sounds stop automatically
  // Only need to cancel TTS
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Auto-init when module loads
if (typeof window !== 'undefined') {
  initSoundService();
}
