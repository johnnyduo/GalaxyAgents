import React from 'react';
import { AgentMetadata } from '../types';
import { Shield, Hash } from 'lucide-react';
import LottieAvatar from './LottieAvatar';

interface AgentCardProps {
  agent: AgentMetadata;
  isActive: boolean;
  onToggle: () => void;
  onClick: () => void;
  status?: 'idle' | 'negotiating' | 'streaming' | 'offline';
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive, onToggle, onClick, status }) => {
  const currentStatus = status || agent.status;
  const buttonText = isActive ? 'Deactivate' : 'Register';
  
  const getStatusColor = () => {
    if (!isActive) return 'bg-gray-500';
    switch (currentStatus) {
      case 'streaming': return 'bg-neon-green animate-pulse';
      case 'negotiating': return 'bg-yellow-500 animate-pulse';
      case 'offline': return 'bg-red-500';
      default: return 'bg-neon-green animate-pulse';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer transition-all duration-300
        rounded-xl border backdrop-blur-md overflow-hidden
        ${isActive 
          ? 'border-neon-green bg-neon-green/10 shadow-[0_0_15px_rgba(67,255,77,0.3)]' 
          : 'border-white/10 bg-white/5 hover:border-neon-green/50'}
      `}
    >
      {/* Status Indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
          {isActive ? currentStatus : 'offline'}
        </span>
      </div>
      
      <div className="p-4 flex flex-col items-center text-center">
        {/* Sprite Avatar Container */}
        <div className="w-20 h-20 mb-4 relative">
            <div className="absolute inset-0 bg-neon-green/20 rounded-full blur-xl opacity-50"></div>
            {agent.avatarType === 'lottie' ? (
              <LottieAvatar
                animationPath={agent.avatar}
                width={80}
                height={80}
                className="relative z-10 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] transition-all group-hover:scale-110 duration-300"
              />
            ) : (
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] transition-all group-hover:scale-110 duration-300"
                style={{ imageRendering: 'pixelated' }}
              />
            )}
        </div>

        <h3 className="text-white font-bold font-mono tracking-tight">{agent.name}</h3>
        <p className="text-neon-green text-xs mb-3">{agent.role}</p>
        
        <div className="w-full grid grid-cols-2 gap-2 text-[10px] text-gray-400 font-mono mb-4">
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded justify-center">
            <Shield size={10} className="text-neon-green" />
            <span>TS: {agent.trustScore}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded justify-center">
            <Hash size={10} />
            <span>#{agent.tokenId}</span>
          </div>
        </div>

        <div className="flex gap-2 w-full mt-auto">
           <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className={`
              flex-1 py-1 px-2 rounded text-[10px] font-bold font-mono uppercase tracking-wider border transition-all
              ${isActive
                ? 'border-neon-green bg-neon-green text-black hover:bg-white hover:border-white'
                : 'border-white/20 text-white/60 hover:border-white hover:text-white'}
            `}
           >
             {buttonText}
           </button>
        </div>
      </div>
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-green opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-green opacity-50"></div>
    </div>
  );
};

export default AgentCard;