import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { AgentAlignment } from '../types';

interface TransformationRefs {
  containerRef: React.RefObject<HTMLDivElement | null>;
  nameRef: React.RefObject<HTMLDivElement | null>;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  avatarRef: React.RefObject<HTMLDivElement | null>;
}

export function useAgentTransformation() {
  const timelinesRef = useRef<Map<string, gsap.core.Timeline>>(new Map());

  const playTransformation = useCallback(
    (agentId: string, refs: TransformationRefs, alignment: AgentAlignment, colorTheme?: { primary: string; glow: string; border: string }) => {
      const { containerRef, nameRef, badgeRef, avatarRef } = refs;

      // Kill any existing timeline for this agent
      const existing = timelinesRef.current.get(agentId);
      if (existing) {
        existing.kill();
        timelinesRef.current.delete(agentId);
      }

      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        onComplete: () => timelinesRef.current.delete(agentId),
      });

      if (alignment === 'transitioning') {
        const borderColor = colorTheme?.border || '#FF4444';
        const glowColor = colorTheme?.glow || 'rgba(255, 68, 68, 0.6)';

        tl
          // 1. Shake/vibrate (0.5s)
          .to(container, {
            x: '+=3',
            duration: 0.05,
            repeat: 9,
            yoyo: true,
            ease: 'none',
          })
          // 2. Border color tween green → red (0.8s)
          .to(container, {
            borderColor,
            boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
            duration: 0.8,
            ease: 'power2.inOut',
          }, '-=0.3')
          // 3. Avatar hue shift (0.3s)
          .to(avatarRef.current, {
            filter: 'hue-rotate(180deg) saturate(2)',
            duration: 0.3,
            ease: 'power1.in',
          }, '-=0.3')
          // 4. Name crossfade (0.4s)
          .to(nameRef.current, {
            opacity: 0,
            y: -5,
            duration: 0.2,
          })
          .set(nameRef.current, { y: 5 })
          .to(nameRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.2,
          })
          // 5. "COMPROMISED" badge appears (0.3s)
          .fromTo(
            badgeRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
          );
      } else if (alignment === 'good') {
        // Reverse: back to good
        tl
          .to(badgeRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
          })
          .to(avatarRef.current, {
            filter: 'none',
            duration: 0.4,
            ease: 'power2.out',
          })
          .to(container, {
            borderColor: 'rgba(67, 255, 77, 0.5)',
            boxShadow: '0 0 10px rgba(67, 255, 77, 0.2)',
            duration: 0.5,
            ease: 'power2.out',
          }, '-=0.3')
          .to(nameRef.current, {
            opacity: 0,
            duration: 0.15,
          })
          .to(nameRef.current, {
            opacity: 1,
            duration: 0.15,
          });
      }

      timelinesRef.current.set(agentId, tl);
      return tl;
    },
    []
  );

  const killAll = useCallback(() => {
    timelinesRef.current.forEach(tl => tl.kill());
    timelinesRef.current.clear();
  }, []);

  return { playTransformation, killAll };
}
