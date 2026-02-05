import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface MoneyTrackerProps {
  total: number;
  remaining: number;
  className?: string;
}

const MoneyTracker: React.FC<MoneyTrackerProps> = ({ total, remaining, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLSpanElement>(null);
  const prevRemaining = useRef(remaining);
  const [floatingLoss, setFloatingLoss] = useState<{ amount: number; id: number } | null>(null);

  const lost = total - remaining;
  const lostPercent = total > 0 ? (lost / total) * 100 : 0;

  // Animate on money change
  useEffect(() => {
    const diff = prevRemaining.current - remaining;
    prevRemaining.current = remaining;

    if (diff > 0) {
      // Money decreased — flash red + show floating loss
      setFloatingLoss({ amount: diff, id: Date.now() });

      if (containerRef.current) {
        gsap.fromTo(containerRef.current,
          { boxShadow: '0 0 30px rgba(255, 68, 68, 0.8)' },
          { boxShadow: '0 0 10px rgba(255, 68, 68, 0.2)', duration: 1.5, ease: 'power2.out' }
        );
      }

      if (amountRef.current) {
        gsap.fromTo(amountRef.current,
          { scale: 1.3, color: '#FF4444' },
          { scale: 1, color: remaining < total * 0.5 ? '#FF4444' : '#43FF4D', duration: 0.8, ease: 'elastic.out(1, 0.5)' }
        );
      }

      // Clear floating loss after animation
      setTimeout(() => setFloatingLoss(null), 2000);
    }
  }, [remaining, total]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-black/90 backdrop-blur-md border rounded-lg p-3 min-w-[160px] ${className}`}
      style={{
        borderColor: remaining < total * 0.3 ? '#FF4444' : remaining < total * 0.5 ? '#F59E0B' : 'rgba(67, 255, 77, 0.3)',
      }}
    >
      {/* Label */}
      <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mb-1">
        เงินในบัญชี
      </div>

      {/* Amount */}
      <span
        ref={amountRef}
        className={`text-lg font-mono font-bold block ${
          remaining < total * 0.5 ? 'text-red-400' : 'text-neon-green'
        }`}
      >
        ฿{remaining.toLocaleString()}
      </span>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.max(0, 100 - lostPercent)}%`,
            background: remaining < total * 0.3
              ? 'linear-gradient(to right, #FF4444, #DC2626)'
              : remaining < total * 0.5
                ? 'linear-gradient(to right, #F59E0B, #EF4444)'
                : 'linear-gradient(to right, #43FF4D, #22C55E)',
          }}
        />
      </div>

      {/* Lost amount */}
      {lost > 0 && (
        <div className="text-[9px] font-mono text-red-500 mt-1">
          เสียไป ฿{lost.toLocaleString()} ({lostPercent.toFixed(0)}%)
        </div>
      )}

      {/* Floating loss animation */}
      {floatingLoss && (
        <div
          key={floatingLoss.id}
          className="absolute -top-6 right-2 text-red-400 font-bold font-mono text-sm pointer-events-none"
          style={{
            animation: 'floatUp 2s ease-out forwards',
          }}
        >
          -฿{floatingLoss.amount.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default MoneyTracker;
