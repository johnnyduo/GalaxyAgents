/**
 * Web Audio API Sound Generator
 * Generate simple sound effects without external files
 */

const audioContext = typeof window !== 'undefined' && 'AudioContext' in window
  ? new AudioContext()
  : null;

export function playBeep(frequency: number = 440, duration: number = 0.1, volume: number = 0.3): void {
  if (!audioContext) return;

  try {
    // Resume AudioContext if suspended (Safari requirement)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    // Silently ignore
  }
}

export function playNotification(): void {
  playBeep(800, 0.1, 0.2); // High pitch, short
}

export function playAlert(): void {
  playBeep(600, 0.15, 0.25); // Medium pitch, slightly longer
}

export function playWarning(): void {
  playBeep(400, 0.2, 0.3); // Low pitch, longer
}

export function playSuccess(): void {
  // Two-tone success sound
  setTimeout(() => playBeep(523, 0.1, 0.2), 0);    // C5
  setTimeout(() => playBeep(659, 0.15, 0.25), 100); // E5
}

export function playMoneyLoss(): void {
  // Descending tone (sad sound)
  setTimeout(() => playBeep(600, 0.1, 0.2), 0);
  setTimeout(() => playBeep(500, 0.1, 0.2), 100);
  setTimeout(() => playBeep(400, 0.15, 0.25), 200);
}

export function playTransformation(): void {
  // Rising then falling tone
  setTimeout(() => playBeep(300, 0.1, 0.2), 0);
  setTimeout(() => playBeep(500, 0.1, 0.2), 100);
  setTimeout(() => playBeep(400, 0.1, 0.2), 200);
}

export function playReveal(): void {
  // Quick rising tone
  setTimeout(() => playBeep(400, 0.08, 0.15), 0);
  setTimeout(() => playBeep(600, 0.08, 0.15), 80);
  setTimeout(() => playBeep(800, 0.1, 0.2), 160);
}
