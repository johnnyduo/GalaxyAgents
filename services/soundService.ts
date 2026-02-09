/**
 * Sound Service - Audio effects + Thai TTS for simulations
 *
 * Features:
 * - Sound effects (alert, money loss, transformation, etc.)
 * - Thai Text-to-Speech via Web Speech API
 * - Simple, lean implementation
 */

// Sound effect URLs (using free sounds from public CDN)
const SOUND_URLS = {
  notification: 'https://cdn.freesound.org/previews/536/536108_11861866-lq.mp3',
  alert: 'https://cdn.freesound.org/previews/352/352661_5121236-lq.mp3',
  moneyLoss: 'https://cdn.freesound.org/previews/619/619839_1648170-lq.mp3',
  transformation: 'https://cdn.freesound.org/previews/320/320181_5260872-lq.mp3',
  success: 'https://cdn.freesound.org/previews/341/341695_5858296-lq.mp3',
  warning: 'https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3',
  reveal: 'https://cdn.freesound.org/previews/456/456966_9159316-lq.mp3',
};

type SoundType = keyof typeof SOUND_URLS;

// Audio cache
const audioCache: Record<string, HTMLAudioElement> = {};

// Settings
let soundEnabled = true;
let ttsEnabled = true;
let volume = 0.5;

/**
 * Preload a sound effect
 */
function preloadSound(type: SoundType): HTMLAudioElement {
  if (!audioCache[type]) {
    const audio = new Audio(SOUND_URLS[type]);
    audio.preload = 'auto';
    audio.volume = volume;
    audioCache[type] = audio;
  }
  return audioCache[type];
}

/**
 * Play a sound effect
 */
export function playSound(type: SoundType): void {
  if (!soundEnabled) return;

  try {
    const audio = preloadSound(type);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {
      // Autoplay blocked, ignore
    });
  } catch (error) {
    console.warn('Sound playback failed:', error);
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

  return new Promise((resolve, reject) => {
    // Check if Speech Synthesis is supported
    if (!('speechSynthesis' in window)) {
      console.warn('TTS not supported');
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = volume;

    // Try to find a Thai voice
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(v => v.lang.startsWith('th'));
    if (thaiVoice) {
      utterance.voice = thaiVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.warn('TTS error:', event);
      resolve(); // Don't reject, just continue
    };

    window.speechSynthesis.speak(utterance);
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

  // Update cached audio elements
  Object.values(audioCache).forEach(audio => {
    audio.volume = volume;
  });
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

  // Preload common sounds
  preloadSound('notification');
  preloadSound('alert');
  preloadSound('transformation');
  preloadSound('moneyLoss');

  // Load voices (needed for TTS)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
}

/**
 * Stop all sounds
 */
export function stopAllSounds(): void {
  Object.values(audioCache).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Auto-init when module loads
if (typeof window !== 'undefined') {
  initSoundService();
}
