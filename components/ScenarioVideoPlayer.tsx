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
import { playSound } from '../services/soundService';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const images = SCENARIO_IMAGES[scenario.id] || [];
  const totalImages = images.length;

  // Get step content for current image
  const getCurrentStepContent = useCallback(() => {
    const stepId = images[currentIndex];
    const step = scenario.steps.find(s => s.id === stepId);
    return step?.content.th || '';
  }, [currentIndex, images, scenario.steps]);

  // Typewriter effect
  useEffect(() => {
    if (!showText) {
      setDisplayedText('');
      return;
    }

    const fullText = getCurrentStepContent();
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [showText, currentIndex, getCurrentStepContent]);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || totalImages === 0) return;

    // Show text after 0.5s
    const textTimer = setTimeout(() => setShowText(true), 500);

    // Advance to next slide after 4s
    const slideTimer = setTimeout(() => {
      setShowText(false);

      if (currentIndex < totalImages - 1) {
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          playSound('notification');
        }, 500);
      } else {
        // Completed
        setIsPlaying(false);
        playSound('success');
        onComplete?.();
      }
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(slideTimer);
    };
  }, [isPlaying, currentIndex, totalImages, onComplete]);

  // Play sound on mount
  useEffect(() => {
    if (autoPlay) {
      playSound('alert');
    }
  }, [autoPlay]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      setShowText(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setShowText(false);
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
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
      style={{
        boxShadow: '0 0 60px rgba(67, 255, 77, 0.2)',
      }}
    >
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

      {/* Cinematic bars */}
      <div className="absolute inset-x-0 top-0 h-12 bg-black z-20" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-black z-20" />

      {/* Title */}
      <div className="absolute top-16 left-6 z-30">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
          {scenario.titleTh}
        </h2>
        <p className="text-sm text-neon-green mt-1">
          Galaxy Agents • Fraud Simulation
        </p>
      </div>

      {/* Text overlay with typewriter */}
      <div
        className="absolute bottom-24 left-6 right-6 z-30 transition-all duration-500"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-neon-green/30">
          <p className="text-white text-lg leading-relaxed min-h-[3rem]">
            {displayedText}
            {showText && displayedText.length < getCurrentStepContent().length && (
              <span className="animate-pulse text-neon-green">|</span>
            )}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-6 right-6 z-30">
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

      {/* Controls */}
      <div className="absolute bottom-2 right-6 z-30 flex items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="text-white/60 hover:text-white disabled:opacity-30 transition"
        >
          ◀
        </button>
        <button
          onClick={handlePlayPause}
          className="w-10 h-10 rounded-full bg-neon-green/20 border border-neon-green/50 flex items-center justify-center text-neon-green hover:bg-neon-green/30 transition"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === totalImages - 1}
          className="text-white/60 hover:text-white disabled:opacity-30 transition"
        >
          ▶
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-white/60 hover:text-white transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Slide counter */}
      <div className="absolute top-16 right-6 z-30">
        <span className="text-white/60 text-sm font-mono">
          {currentIndex + 1} / {totalImages}
        </span>
      </div>

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
      `}</style>
    </div>
  );
};

export default ScenarioVideoPlayer;
