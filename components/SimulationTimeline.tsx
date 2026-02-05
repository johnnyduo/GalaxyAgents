import React from 'react';
import { ScenarioStep } from '../types';

interface SimulationTimelineProps {
  steps: ScenarioStep[];
  currentIndex: number;
  onJumpTo: (index: number) => void;
}

const stepTypeIcons: Record<string, string> = {
  action: '⚡',
  dialogue: '💬',
  transformation: '🔄',
  money_flow: '💸',
  reveal: '🔍',
  education: '📚',
};

const stepTypeColors: Record<string, string> = {
  action: 'bg-blue-500',
  dialogue: 'bg-gray-500',
  transformation: 'bg-purple-500',
  money_flow: 'bg-red-500',
  reveal: 'bg-yellow-500',
  education: 'bg-green-500',
};

const SimulationTimeline: React.FC<SimulationTimelineProps> = ({
  steps,
  currentIndex,
  onJumpTo,
}) => {
  return (
    <div className="bg-black/80 backdrop-blur-md border-t border-white/10 px-4 py-2">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 pb-1">
        {steps.map((step, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isFuture = i > currentIndex;

          return (
            <button
              key={step.id}
              onClick={() => onJumpTo(i)}
              className={`
                flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-[10px] transition-all relative group
                ${isCurrent ? 'ring-2 ring-red-400 ring-offset-1 ring-offset-black scale-125' : ''}
                ${isPast ? stepTypeColors[step.type] + ' opacity-60' : ''}
                ${isCurrent ? stepTypeColors[step.type] : ''}
                ${isFuture ? 'bg-gray-800 opacity-40' : ''}
              `}
              title={`ขั้นที่ ${i + 1}: ${step.type} — ${step.content.th.substring(0, 40)}...`}
            >
              {stepTypeIcons[step.type] || '•'}

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className={`absolute left-full w-1 h-0.5 top-1/2 -translate-y-1/2 ${
                  isPast ? 'bg-white/30' : 'bg-gray-800'
                }`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SimulationTimeline;
