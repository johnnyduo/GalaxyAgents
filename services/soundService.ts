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
export function speak(text: string, lang: 'th-TH' | 'en-US' = 'th-TH'): Promise<void> {
  if (!ttsEnabled) return Promise.resolve();

  return new Promise((resolve) => {
    // Check if Speech Synthesis is supported
    if (!('speechSynthesis' in window)) {
      console.warn('❌ Web Speech API not supported in this browser');
      resolve();
      return;
    }

    try {
      // DON'T auto-cancel - causes interruptions
      // Let component manage cancellation explicitly

      let hasStarted = false;
      let hasEnded = false;

      const speakWithVoice = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
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
        };

        utterance.onend = () => {
          hasEnded = true;
          resolve();
        };

        utterance.onerror = (event) => {
          if (!hasEnded) {
            resolve();
          }
        };

        // Speak
        window.speechSynthesis.speak(utterance);

        // Chrome fix: Resume if paused (Chrome bug workaround)
        setTimeout(() => {
          if (!hasStarted && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }, 100);

        // Timeout fallback (if speech doesn't start in 5 seconds)
        setTimeout(() => {
          if (!hasStarted) {
            window.speechSynthesis.cancel();
            resolve();
          }
        }, 5000);
      };

      // Wait for voices to load
      const voices = window.speechSynthesis.getVoices();

      if (voices.length > 0) {
        speakWithVoice();
      } else {
        // Set timeout for voice loading
        const timeout = setTimeout(() => {
          resolve();
        }, 2000);

        window.speechSynthesis.addEventListener('voiceschanged', () => {
          clearTimeout(timeout);
          speakWithVoice();
        }, { once: true });

        // Trigger voice loading
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
export async function speakStepContent(content: string, stepType: string): Promise<void> {
  // Clean up emojis and special characters for TTS
  const cleanText = content
    .replace(/[📱💳💸🔗🚨🔍📚🛡️⚠️]/g, '')
    .replace(/\[.*?\]/g, '') // Remove [Kerry Express] etc
    .trim();

  if (cleanText.length > 0) {
    await speak(cleanText);
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
