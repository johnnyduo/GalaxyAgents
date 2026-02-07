import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, Zap } from 'lucide-react';
import { SimulationState } from '../types';

interface SimulationControlsProps {
  simulation: SimulationState;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  simulation,
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
}) => {
  const { status, currentStepIndex, currentScenario, speed, userProfile } = simulation;
  const totalSteps = currentScenario?.steps.length ?? 0;
  const progress = status === 'completed' ? 100 : totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;
  const isPlaying = status === 'playing';

  return (
    <div className="bg-black/90 backdrop-blur-md border-t border-red-500/30 px-4 py-2 flex items-center gap-3">
      {/* Play/Pause */}
      <div className="flex items-center gap-1">
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={status === 'completed'}
          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all disabled:opacity-30"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={onStep}
          disabled={status === 'completed'}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-all disabled:opacity-30"
          title="ขั้นตอนถัดไป"
        >
          <SkipForward size={14} />
        </button>
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-all"
          title="เริ่มใหม่"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 mx-2">
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-0.5">
          <span className="text-[11px] font-mono text-gray-500">
            ขั้นที่ {currentStepIndex + 1}/{totalSteps}
          </span>
          <span className="text-[11px] font-mono text-gray-500">
            {status === 'completed' ? 'จบแล้ว' : status === 'playing' ? 'กำลังเล่น' : status === 'paused' ? 'หยุดชั่วคราว' : status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Speed Controls */}
      <div className="flex items-center gap-1">
        <Zap size={12} className="text-gray-500" />
        {[0.5, 1, 2].map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
              speed === s
                ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* Money Display */}
      <div className="text-right min-w-[80px]">
        <div className={`text-xs font-mono font-bold ${
          userProfile.moneyRemaining < userProfile.money * 0.5
            ? 'text-red-400'
            : 'text-neon-green'
        }`}>
          ฿{userProfile.moneyRemaining.toLocaleString()}
        </div>
        {userProfile.moneyRemaining < userProfile.money && (
          <div className="text-[10px] font-mono text-red-500">
            -{((userProfile.money - userProfile.moneyRemaining) / userProfile.money * 100).toFixed(0)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationControls;
