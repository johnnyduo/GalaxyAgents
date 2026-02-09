/**
 * ScenarioMedia - Displays AI-generated images during simulation playback
 *
 * Shows contextual images for each scenario step when available.
 * Falls back to a subtle placeholder when no image exists.
 */

import React, { useState, useEffect } from 'react';
import { ScenarioStep } from '../types';

interface ScenarioMediaProps {
  scenarioId: string;
  currentStep: ScenarioStep | null;
  isPlaying: boolean;
}

// Map of available pre-generated images
const AVAILABLE_IMAGES: Record<string, string[]> = {
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

export const ScenarioMedia: React.FC<ScenarioMediaProps> = ({
  scenarioId,
  currentStep,
  isPlaying,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!currentStep || !scenarioId) {
      setImageSrc(null);
      setShowImage(false);
      return;
    }

    // Check if this step has a pre-generated image
    const availableSteps = AVAILABLE_IMAGES[scenarioId] || [];
    const hasImage = availableSteps.includes(currentStep.id);

    if (hasImage) {
      const newSrc = `/scenario-images/${scenarioId}/${currentStep.id}.png`;
      setImageSrc(newSrc);
      setImageLoaded(false);
      // Slight delay for smooth transition
      setTimeout(() => setShowImage(true), 100);
    } else {
      setShowImage(false);
      setTimeout(() => setImageSrc(null), 300);
    }
  }, [scenarioId, currentStep?.id]);

  if (!imageSrc) {
    return null;
  }

  return (
    <div
      className={`scenario-media-container ${showImage && imageLoaded ? 'visible' : 'hidden'}`}
      style={{
        position: 'absolute',
        bottom: '120px',
        right: '20px',
        width: '320px',
        maxHeight: '240px',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid rgba(67, 255, 77, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(67, 255, 77, 0.1)',
        transition: 'all 0.3s ease-out',
        opacity: showImage && imageLoaded ? 1 : 0,
        transform: showImage && imageLoaded ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(67, 255, 77, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Image */}
      <img
        src={imageSrc}
        alt="Scenario illustration"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageLoaded(false);
          setShowImage(false);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Step indicator badge */}
      {currentStep && (
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            padding: '4px 8px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: '#43FF4D',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {currentStep.type === 'reveal' || currentStep.type === 'education' ? '📚 ' : '🎬 '}
          {currentStep.id}
        </div>
      )}

      {/* Playing indicator */}
      {isPlaying && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            backgroundColor: '#43FF4D',
            borderRadius: '50%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ScenarioMedia;
