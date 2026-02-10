/**
 * ScenarioVideoPlayer - Cinematic slideshow from AI-generated images
 *
 * Creates a dramatic video-like experience using:
 * - Ken Burns effect (zoom/pan)
 * - Smooth crossfade transitions
 * - Text overlays with typewriter effect
 * - Sound effects sync
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FraudScenario, ScenarioStep } from '../types';
import { playSound, speak, stopAllSounds, getSoundSettings, setTTSEnabled, setVolume, setSoundEnabled } from '../services/soundService';

interface ScenarioVideoPlayerProps {
  scenario: FraudScenario;
  autoPlay?: boolean;
  onComplete?: () => void;
  onClose?: () => void;
}

// Map of available images per scenario
const SCENARIO_IMAGES: Record<string, string[]> = {
  'sms-phishing-001': ['sms-03', 'sms-04', 'sms-07', 'sms-11'],
  'call-center-001': ['cc-02', 'cc-05', 'cc-08', 'cc-12'],
  'romance-scam-001': ['rs-02', 'rs-05', 'rs-08', 'rs-11'],
  'social-impersonation-001': ['si-02', 'si-05', 'si-08'],
  'ponzi-scheme-001': ['ps-02', 'ps-05', 'ps-08'],
  'fake-investment-001': ['fi-02', 'fi-05', 'fi-08'],
  'job-scam-001': ['js-02', 'js-05', 'js-08'],
  'loan-app-001': ['la-02', 'la-05', 'la-08', 'la-11'],
  'qr-scam-001': ['qr-02', 'qr-05', 'qr-08'],
  'sim-swap-001': ['ss-02', 'ss-05', 'ss-08', 'ss-11'],
};

// Ken Burns animation variants
const kenBurnsVariants = [
  { start: 'scale(1) translate(0, 0)', end: 'scale(1.15) translate(-3%, -2%)' },
  { start: 'scale(1.1) translate(2%, 0)', end: 'scale(1) translate(-2%, 2%)' },
  { start: 'scale(1) translate(0, 2%)', end: 'scale(1.2) translate(2%, -2%)' },
  { start: 'scale(1.15) translate(-2%, -1%)', end: 'scale(1) translate(0, 0)' },
];

export const ScenarioVideoPlayer: React.FC<ScenarioVideoPlayerProps> = ({
  scenario,
  autoPlay = true,
  onComplete,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [showOpeningTitle, setShowOpeningTitle] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [showEndCredits, setShowEndCredits] = useState(false);
  const [playbackQuality, setPlaybackQuality] = useState<'normal' | 'smooth' | 'cinematic'>('cinematic');
  const [showBrowserWarning, setShowBrowserWarning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlayingVoiceRef = useRef(false);
  const currentSceneRef = useRef(0);
  const voiceQueueRef = useRef<Promise<void>>(Promise.resolve());
  const isUnmountedRef = useRef(false);
  const currentTTSPromiseRef = useRef<Promise<void> | null>(null);

  // Detect Chrome on macOS (show warning but keep TTS enabled - fixed with keepalive workaround)
  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
    const isMac = /Mac/.test(navigator.platform);
    if (isChrome && isMac) {
      setShowBrowserWarning(true);
    }
  }, []);

  const images = SCENARIO_IMAGES[scenario.id] || [];
  const totalImages = images.length;

  // Ensure TTS is enabled and clean slate when video player opens
  useEffect(() => {
    // Mark as mounted
    isUnmountedRef.current = false;

    // CRITICAL: Cancel any existing TTS to prevent overlap!
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Reset voice queue to break any ongoing Promise chains
    voiceQueueRef.current = Promise.resolve();

    const settings = getSoundSettings();
    if (!settings.ttsEnabled) {
      console.log('🔊 Enabling TTS for video player');
      setTTSEnabled(true);
    }
    if (settings.volume < 0.3) {
      console.log('🔊 Setting volume to 50% for better voice clarity');
      setVolume(0.5);
    }

    // Enable sound effects for cinematic experience
    setSoundEnabled(true);

    return () => {
      // Mark as unmounted - this stops all ongoing voice playback
      isUnmountedRef.current = true;

      // Clean up on unmount - stop all voices
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      voiceQueueRef.current = Promise.resolve();
    };
  }, []);

  // Cinematic narrative subtitles for the short film
  const getCinematicNarrative = useCallback(() => {
    const narratives: Record<string, Record<string, string>> = {
      'sms-phishing-001': {
        'sms-03': 'วันหนึ่ง คุณได้รับ SMS จากธนาคาร บอกว่าบัญชีถูกระงับ',
        'sms-04': 'ข้อความบอกให้คลิกลิงก์ด่วน มิฉะนั้นจะโดนปิดบัญชี',
        'sms-07': 'คุณตกใจ คลิกลิงก์ไป กรอกข้อมูลส่วนตัวและรหัสผ่าน',
        'sms-11': 'วินาทีต่อมา เงินในบัญชีหายไป แก๊งกลโกงโอนเงินออกหมด',
      },
      'call-center-001': {
        'cc-02': 'โทรศัพท์ดัง ฝ่ายตำรวจโทรมา บอกว่าคุณมีหมายจับ',
        'cc-05': 'พวกเขาบอกให้โอนเงินเพื่อพิสูจน์ตัวตน ไม่งั้นจะถูกจับ',
        'cc-08': 'คุณกลัว รีบโอนเงินไปตามที่สั่ง หวังว่าจะพ้นเรื่อง',
        'cc-12': 'แต่นั่นคือกลโกง ไม่มีหมายจับจริง เงินของคุณหายไปแล้ว',
      },
      'romance-scam-001': {
        'rs-02': 'คุณพบรักออนไลน์ คุยกันดีมาก เขาดูใจดีมาก',
        'rs-05': 'เขาบอกว่ามีปัญหาเรื่องเงิน ขอให้ช่วยเหลือหน่อย',
        'rs-08': 'คุณโอนเงินไปช่วย เชื่อว่าจะได้พบกันจริงสักวัน',
        'rs-11': 'แต่หลังได้เงินไป เขาหายตัว ไม่มีใครตอบเลย',
      },
      'social-impersonation-001': {
        'si-02': 'LINE จากเพื่อน บอกว่ามีเหตุฉุกเฉิน ต้องการเงินด่วน',
        'si-05': 'เพื่อนร้องขอให้โอนเงิน สัญญาว่าจะคืนพรุ่งนี้',
        'si-08': 'คุณโอนไป คิดว่าช่วยเพื่อน แต่นั่นคือบัญชีปลอม',
      },
      'ponzi-scheme-001': {
        'ps-02': 'เพื่อนชวนลงทุน สัญญาผลตอบแทนสูง 30% ต่อเดือน',
        'ps-05': 'คุณลงทุนไป ได้กำไรเดือนแรกจริงๆ คิดว่าโชคดี',
        'ps-08': 'แต่หลังจากนั้น ระบบล่ม เงินหายหมด ไม่มีใครรับผิดชอบ',
      },
      'fake-investment-001': {
        'fi-02': 'โฆษณาสุดปัง ลงทุนหุ้นต่างประเทศ รับรองกำไร',
        'fi-05': 'คุณลงทุน แอปบอกว่ากำไรพุ่ง แต่ถอนเงินไม่ได้',
        'fi-08': 'พอถามเรื่องถอน บริษัทหายตัว เว็บปิดไปแล้ว',
      },
      'job-scam-001': {
        'js-02': 'ประกาศรับสมัครงาน เงินเดือนสูง ไม่ต้องมีประสบการณ์',
        'js-05': 'แต่ต้องโอนค่าฝึกอบรมก่อน สัญญาว่าจะคืนให้',
        'js-08': 'คุณโอนไป แต่หลังจากนั้น ไม่มีงาน ไม่มีใครติดต่อกลับ',
      },
      'loan-app-001': {
        'la-02': 'แอปกู้เงินง่ายๆ ไม่ต้องค้ำประกัน อนุมัติเร็ว',
        'la-05': 'คุณกู้ไป แต่ดอกเบี้ยโหด เพิ่มขึ้นทุกวัน',
        'la-08': 'ไม่จ่าย ก็โดนขู่ ครอบครัวถูกรบกวน',
        'la-11': 'ท้ายที่สุด เงินที่คืนมากกว่าที่กู้หลายเท่า',
      },
      'qr-scam-001': {
        'qr-02': 'คุณซื้อของออนไลน์ ร้านส่ง QR Code มาให้สแกน',
        'qr-05': 'คุณสแกนจ่ายเงิน แต่ของไม่มาส่ง',
        'qr-08': 'พอติดตาม ร้านบอกว่าไม่ได้รับเงิน QR Code นั้นเป็นของคนอื่น',
      },
      'sim-swap-001': {
        'ss-02': 'ซิมการ์ดคุณใช้ไม่ได้ทันใด โทรออกไม่ได้',
        'ss-05': 'มีคนแอบทำซิมใหม่ด้วยข้อมูลคุณ ยึดเบอร์ไป',
        'ss-08': 'พวกเขาเข้าถึงบัญชีธนาคารผ่าน OTP',
        'ss-11': 'ภายในชั่วโมง เงินในบัญชีถูกโอนหมด',
      },
    };

    const stepId = images[currentIndex];
    const scenarioNarratives = narratives[scenario.id] || {};

    // If narrative exists, use it. Otherwise fall back to step content
    if (scenarioNarratives[stepId]) {
      return scenarioNarratives[stepId];
    }

    // Fallback to step content
    const step = scenario.steps.find(s => s.id === stepId);
    return step?.content.th || '';
  }, [currentIndex, images, scenario.id, scenario.steps]);

  // Typewriter effect (faster for shorter text)
  useEffect(() => {
    if (!showText) {
      setDisplayedText('');
      return;
    }

    const fullText = getCinematicNarrative();
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Faster typewriter (20ms instead of 30ms)

    return () => clearInterval(interval);
  }, [showText, currentIndex, getCinematicNarrative]);

  // Auto-advance slides with voice narration
  useEffect(() => {
    if (!isPlaying || totalImages === 0) return;

    // Update current scene ref
    currentSceneRef.current = currentIndex;

    // CRITICAL: Cancel previous scene's speech immediately and break the queue chain
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    voiceQueueRef.current = Promise.resolve();
    setIsSpeaking(false);

    // Delay for first scene: 600ms to ensure opening cleanup is complete
    const delay = currentIndex === 0 ? 600 : 0;
    const sceneNumber = currentIndex;

    const textTimer = setTimeout(() => {
      setShowText(true);

      const content = getCinematicNarrative();
      const settings = getSoundSettings();

      // Start voice playback directly (no chaining — previous chain was reset above)
      voiceQueueRef.current = (async () => {
        if (isUnmountedRef.current) return;
        if (currentSceneRef.current !== sceneNumber) return;

        if (content && settings.ttsEnabled) {
          try {
            const cleanText = content
              .replace(/[📱💳💸🔗🚨🔍📚🛡️⚠️🎬💔👤📷📈💰💼🏦📶]/g, '')
              .replace(/\[.*?\]/g, '')
              .trim();

            if (isUnmountedRef.current || currentSceneRef.current !== sceneNumber) return;

            setIsSpeaking(true);
            await speak(cleanText, 'th-TH');

            if (isUnmountedRef.current || currentSceneRef.current !== sceneNumber) {
              setIsSpeaking(false);
              return;
            }

            setIsSpeaking(false);

            // Dramatic pause after voice completes
            await new Promise(resolve => setTimeout(resolve, 1200));

            if (isUnmountedRef.current || currentSceneRef.current !== sceneNumber) return;

            advanceToNextSlide();
          } catch (err) {
            if (!isUnmountedRef.current) {
              setIsSpeaking(false);
              await new Promise(resolve => setTimeout(resolve, 2000));
              if (!isUnmountedRef.current && currentSceneRef.current === sceneNumber) {
                advanceToNextSlide();
              }
            }
          }
        } else {
          // TTS disabled — advance after 4s
          await new Promise(resolve => setTimeout(resolve, 4000));
          if (!isUnmountedRef.current && currentSceneRef.current === sceneNumber) {
            advanceToNextSlide();
          }
        }
      })();
    }, delay);

    const advanceToNextSlide = () => {
      setShowText(false);

      setTimeout(() => {
        if (currentIndex < totalImages - 1) {
          setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
          }, 200);
        } else {
          setIsPlaying(false);
          setShowEndCredits(true);

          setTimeout(() => {
            speak('จบวิดีโอจำลองสถานการณ์ ขอบคุณที่รับชม', 'th-TH').catch(() => {});
          }, 500);

          setTimeout(() => {
            onComplete?.();
          }, 3000);
        }
      }, 100);
    };

    return () => {
      clearTimeout(textTimer);
      // Cancel speech on cleanup (scene change, pause, unmount)
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, [isPlaying, currentIndex, totalImages, onComplete, images, scenario.id, scenario.steps, getCinematicNarrative]);

  // Note: delay variable is defined inside useEffect, so no dependency needed

  // Play opening sound and announce title with cinematic intro
  useEffect(() => {
    if (!autoPlay) return;

    const playOpening = async () => {
      // Show title for 2 seconds (NO sound at opening - Safari blocks it)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // DON'T cancel here - init useEffect already cleaned everything
      // Canceling here causes race condition with scene 1 voice!

      // Start actual video - scene 1 will have its own voice
      setShowOpeningTitle(false);
      setVideoStarted(true);
    };

    playOpening();

    // No cleanup needed - let scenes handle their own voice lifecycle
  }, [autoPlay]);

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause - stop current voice narration
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      // Stop current narration
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setShowText(false);
      // NO sound - cleaner UX
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      // Stop current narration
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setShowText(false);
      // NO sound - cleaner UX
      setTimeout(() => setCurrentIndex(prev => prev - 1), 300);
    }
  };

  if (totalImages === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-xl">
        <p className="text-gray-400">ไม่มีภาพสำหรับ scenario นี้</p>
      </div>
    );
  }

  const currentVariant = kenBurnsVariants[currentIndex % kenBurnsVariants.length];

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 0 60px rgba(67, 255, 77, 0.2)',
        }}
      >
      {/* Opening Title Card - Cinematic */}
      {showOpeningTitle && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center animate-fade-in">
          <div className="text-center space-y-6 px-6">
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-neon-green/20 via-blue-500/20 to-purple-500/20 border-2 border-neon-green/50 rounded-full backdrop-blur-xl">
              <span className="text-2xl">🛡️</span>
              <span className="text-neon-green font-bold text-xl tracking-wider">GALAXY AGENTS</span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-2xl animate-slide-up">
                {scenario.titleTh}
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 font-mono animate-slide-up-delay">
                {scenario.titleEn}
              </p>
            </div>

            {/* Category Badge */}
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base animate-fade-in-delay">
              <span className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 font-mono">
                {scenario.difficulty === 'beginner' ? '🟢 ระดับง่าย' : scenario.difficulty === 'intermediate' ? '🟡 ระดับกลาง' : '🔴 ระดับยาก'}
              </span>
              <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 font-mono">
                ⚠️ กลโกง
              </span>
            </div>

            {/* Loading indicator */}
            <div className="pt-6 animate-pulse">
              <div className="w-48 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />

      {/* Image with Ken Burns */}
      {images.map((stepId, index) => (
        <div
          key={stepId}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <img
            src={`/scenario-images/${scenario.id}/${stepId}.png`}
            alt={`Scene ${index + 1}`}
            className="w-full h-full object-cover"
            style={{
              transform: isPlaying ? currentVariant.end : currentVariant.start,
              transition: 'transform 4s ease-out',
            }}
          />
        </div>
      ))}

      {/* Cinematic bars - smaller bottom (no subtitle inside) */}
      <div className="absolute inset-x-0 top-0 h-8 sm:h-12 bg-black z-20" />
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black via-black/95 to-transparent z-20" />

      {/* Title - responsive sizing */}
      <div className="absolute top-10 sm:top-16 left-3 sm:left-6 right-12 z-30">
        <h2 className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg truncate">
          {scenario.titleTh}
        </h2>
        <p className="text-xs sm:text-sm text-neon-green mt-0.5 sm:mt-1">
          Galaxy Agents • Fraud Simulation
        </p>
      </div>

      {/* Bottom control panel - compact, no subtitle */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Progress bar */}
        <div className="px-3 sm:px-6 pb-1.5">
          <div className="flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 rounded-full overflow-hidden bg-white/20"
              >
                <div
                  className="h-full bg-neon-green transition-all duration-300"
                  style={{
                    width: index < currentIndex ? '100%' : index === currentIndex && isPlaying ? '100%' : '0%',
                    transition: index === currentIndex ? 'width 4s linear' : 'width 0.3s',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className="px-3 sm:px-6 pb-2 flex items-center justify-between">
          {/* Left: Play controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="text-white/60 hover:text-white disabled:opacity-30 transition p-1"
              title="ก่อนหน้า"
            >
              ◀
            </button>
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neon-green/20 border border-neon-green/50 flex items-center justify-center text-neon-green hover:bg-neon-green/30 transition text-sm sm:text-base"
              title={isPlaying ? 'หยุด' : 'เล่น'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === totalImages - 1}
              className="text-white/60 hover:text-white disabled:opacity-30 transition p-1"
              title="ถัดไป"
            >
              ▶
            </button>

            {/* Slide counter */}
            {isSpeaking && (
              <div className="hidden sm:flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-neon-green/40">
                <span className="text-neon-green text-xs">🔊</span>
                <span className="text-neon-green text-xs font-mono animate-pulse">พากย์</span>
              </div>
            )}
          </div>

          {/* Right: Settings + Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Scene counter */}
            <span className="text-white/60 text-xs sm:text-sm font-mono">
              {currentIndex + 1} / {totalImages}
            </span>

            {/* Volume/TTS Toggle */}
            <div className="relative">
          <button
            onClick={() => setShowVolumeControl(!showVolumeControl)}
            className={`text-sm sm:text-base transition p-1 ${getSoundSettings().ttsEnabled ? 'text-neon-green' : 'text-white/40'}`}
            title="เสียงพากย์"
          >
            {getSoundSettings().ttsEnabled ? '🔊' : '🔇'}
          </button>

          {showVolumeControl && (
            <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm border border-neon-green/30 rounded-lg p-3 min-w-[180px] shadow-2xl">
              <div className="space-y-3">
                {/* TTS Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getSoundSettings().ttsEnabled}
                    onChange={(e) => {
                      setTTSEnabled(e.target.checked);
                    }}
                    className="w-4 h-4 accent-neon-green"
                  />
                  <span className="text-white text-xs">เสียงพากย์ไทย</span>
                </label>

                {/* Volume Control */}
                <div className="pt-1 border-t border-white/10">
                  <span className="text-white/60 text-[10px] block mb-1">ระดับเสียง</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={getSoundSettings().volume * 100}
                    onChange={(e) => {
                      setVolume(Number(e.target.value) / 100);
                    }}
                    className="w-full accent-neon-green"
                  />
                </div>

                {/* Playback Quality */}
                <div className="pt-1 border-t border-white/10">
                  <span className="text-white/60 text-[10px] block mb-1.5">คุณภาพการเล่น</span>
                  <div className="space-y-1">
                    {[
                      { value: 'normal', label: 'ปกติ (4s)', desc: 'เร็ว' },
                      { value: 'smooth', label: 'ลื่นไหล (5s)', desc: 'กลาง' },
                      { value: 'cinematic', label: 'ซีนีมา (7s)', desc: 'คมชัด' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer text-xs">
                        <input
                          type="radio"
                          name="quality"
                          value={option.value}
                          checked={playbackQuality === option.value}
                          onChange={(e) => setPlaybackQuality(e.target.value as any)}
                          className="w-3 h-3 accent-neon-green"
                        />
                        <span className="text-white flex-1">{option.label}</span>
                        <span className="text-white/50 text-[10px]">{option.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

            {onClose && (
              <button
                onClick={() => {
                  stopAllSounds();
                  onClose();
                }}
                className="text-white/60 hover:text-white transition p-1"
                title="ปิด"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Browser Warning - Chrome on macOS */}
      {showBrowserWarning && (
        <div className="absolute top-16 left-4 right-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3 backdrop-blur-md z-30">
          <div className="flex items-start gap-2">
            <span className="text-yellow-400 text-lg">⚠️</span>
            <div className="flex-1">
              <p className="text-yellow-400 font-medium text-sm mb-1">
                เสียงพากย์อาจไม่ทำงานใน Chrome บน macOS
              </p>
              <p className="text-yellow-200/80 text-xs mb-2">
                Chrome มี bug กับ Web Speech API แนะนำให้ใช้ Safari แทน
              </p>
              <button
                onClick={() => setShowBrowserWarning(false)}
                className="text-yellow-300 hover:text-yellow-100 text-xs underline"
              >
                ปิดข้อความนี้
              </button>
            </div>
          </div>
        </div>
      )}



      {/* End Credits */}
      {showEndCredits && (
        <div className="absolute inset-0 z-50 bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center animate-fade-in">
          <div className="text-center space-y-8 px-6 max-w-2xl">
            {/* Completion Badge */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500/20 via-neon-green/20 to-green-500/20 border-2 border-neon-green rounded-2xl backdrop-blur-xl shadow-2xl shadow-neon-green/20 animate-slide-up">
              <span className="text-4xl">✅</span>
              <div className="text-left">
                <h3 className="text-neon-green font-bold text-2xl">จบการจำลอง</h3>
                <p className="text-green-400 text-sm font-mono">Simulation Complete</p>
              </div>
            </div>

            {/* Scenario Info */}
            <div className="animate-slide-up-delay">
              <h2 className="text-white font-bold text-xl sm:text-2xl mb-2">{scenario.titleTh}</h2>
              <p className="text-gray-400 text-sm sm:text-base">{scenario.description.th}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 animate-fade-in-delay">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                <div className="text-neon-green text-2xl font-bold">{totalImages}</div>
                <div className="text-white/60 text-xs mt-1">ฉาก</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                <div className="text-yellow-400 text-2xl font-bold">
                  {scenario.difficulty === 'beginner' ? '🟢' : scenario.difficulty === 'intermediate' ? '🟡' : '🔴'}
                </div>
                <div className="text-white/60 text-xs mt-1">ระดับ</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                <div className="text-red-400 text-2xl font-bold">฿{(scenario.moneyLost / 1000).toFixed(0)}K</div>
                <div className="text-white/60 text-xs mt-1">เสียหาย</div>
              </div>
            </div>

            {/* Credits */}
            <div className="pt-6 space-y-2 text-xs text-white/40 font-mono animate-fade-in-delay">
              <p>🛡️ Galaxy Agents • Fraud Prevention Platform</p>
              <p>Powered by AI • Voice by Web Speech API</p>
              <p className="text-neon-green/60">ขอบคุณที่รับชม • Thank you for watching</p>
            </div>
          </div>
        </div>
      )}

      {/* Vignette effect */}
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <style>{`
        @keyframes ken-burns {
          0% { transform: ${currentVariant.start}; }
          100% { transform: ${currentVariant.end}; }
        }

        @keyframes voice-wave {
          0%, 100% {
            height: 8px;
            opacity: 0.6;
          }
          50% {
            height: 16px;
            opacity: 1;
          }
        }

        /* Smooth image transitions */
        @keyframes slide-fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up-delay {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          30% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          0%, 50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up-delay 1.2s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1.5s ease-out;
        }
      `}</style>
      </div>

      {/* External Subtitle - below player */}
      <div
        className="transition-all duration-300 min-h-[3rem] flex items-center justify-center"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? 'translateY(0)' : 'translateY(-5px)',
        }}
      >
        {showText && (
          <div className="relative bg-black/90 backdrop-blur-sm rounded-lg px-6 py-3 border border-neon-green/30 max-w-4xl">
            {/* Voice indicator */}
            {isSpeaking && (
              <div className="absolute -top-2 left-4 flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-neon-green rounded-full"
                    style={{
                      height: '6px',
                      animation: `voice-wave 0.8s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <p className="relative text-white text-sm sm:text-base leading-relaxed font-medium drop-shadow text-center">
              {displayedText}
              {displayedText.length < getCinematicNarrative().length && (
                <span className="animate-pulse text-neon-green font-bold ml-1">|</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioVideoPlayer;
