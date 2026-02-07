import React from 'react';
import { Zap, Hand, Film } from 'lucide-react';

export type OperationMode = 'auto' | 'manual' | 'simulation';

interface CaptainControlPanelProps {
  mode: OperationMode;
  onModeChange: (mode: OperationMode) => void;
}

export const CaptainControlPanel: React.FC<CaptainControlPanelProps> = ({
  mode,
  onModeChange
}) => {
  return (
    <div className={`bg-black/90 backdrop-blur-md border rounded-lg shadow-lg p-2 transition-all ${
      mode === 'simulation'
        ? 'border-red-500/30 shadow-red-500/10'
        : 'border-neon-green/30 shadow-neon-green/10'
    }`}>
      <div className="flex items-center gap-1 bg-black/50 rounded-lg p-0.5 border border-white/10">
        <button
          onClick={() => onModeChange('manual')}
          className={`
            flex items-center gap-1.5 px-2 py-2 rounded text-xs font-bold font-mono transition-all flex-1 justify-center
            ${mode === 'manual'
              ? 'bg-neon-green text-black shadow-sm'
              : 'text-white/50 hover:text-white/80'
            }
          `}
          title="ควบคุมเอง"
        >
          <Hand size={12} />
          ควบคุม
        </button>
        <button
          onClick={() => onModeChange('auto')}
          className={`
            flex items-center gap-1.5 px-2 py-2 rounded text-xs font-bold font-mono transition-all flex-1 justify-center
            ${mode === 'auto'
              ? 'bg-neon-green text-black shadow-sm'
              : 'text-white/50 hover:text-white/80'
            }
          `}
          title="อัตโนมัติ"
        >
          <Zap size={12} />
          อัตโนมัติ
        </button>
        <button
          onClick={() => onModeChange('simulation')}
          className={`
            flex items-center gap-1.5 px-2 py-2 rounded text-xs font-bold font-mono transition-all flex-1 justify-center
            ${mode === 'simulation'
              ? 'bg-red-500 text-white shadow-sm shadow-red-500/50'
              : 'text-white/50 hover:text-red-400'
            }
          `}
          title="จำลองกลโกง"
        >
          <Film size={12} />
          จำลอง
        </button>
      </div>
    </div>
  );
};
