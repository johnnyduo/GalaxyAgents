import React, { useEffect, useRef } from 'react';
import { FraudScenario, SimulationState } from '../types';
import { AlertTriangle, Shield, BookOpen, RotateCcw, ArrowLeft, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

type OverlayMode = 'intro' | 'reveal' | 'completed' | null;

interface ScenarioOverlayProps {
  mode: OverlayMode;
  scenario: FraudScenario;
  simulation: SimulationState;
  onDismiss: () => void;
  onPlayAgain: () => void;
  onExit: () => void;
}

const ScenarioOverlay: React.FC<ScenarioOverlayProps> = ({
  mode,
  scenario,
  simulation,
  onDismiss,
  onPlayAgain,
  onExit,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mode || !overlayRef.current || !contentRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(contentRef.current,
      { scale: 0.8, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [mode]);

  if (!mode) return null;

  const moneyLost = simulation.userProfile.money - simulation.userProfile.moneyRemaining;
  const lostPercent = simulation.userProfile.money > 0
    ? ((moneyLost / simulation.userProfile.money) * 100).toFixed(0)
    : '0';
  const durationSec = simulation.startedAt
    ? Math.round(((simulation.completedAt || Date.now()) - simulation.startedAt) / 1000)
    : 0;

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={mode === 'intro' ? onDismiss : undefined}
    >
      <div
        ref={contentRef}
        className="max-w-md w-full mx-4 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* === INTRO OVERLAY === */}
        {mode === 'intro' && (
          <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-red-500/30 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">
                {scenario.category === 'call_center' ? '📞' : '⚠️'}
              </div>
              <h2 className="text-red-400 font-bold font-mono text-lg mb-1">
                {scenario.titleTh}
              </h2>
              <p className="text-gray-500 text-xs font-mono">{scenario.titleEn}</p>
            </div>

            <div className="bg-black/50 rounded-lg p-4 mb-4 border border-white/10">
              <p className="text-gray-300 text-sm leading-relaxed">
                {scenario.victimSetup.scenarioContext.th}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-[10px] text-gray-500 font-mono">ความยาก</div>
                <div className={`text-xs font-bold font-mono ${
                  scenario.difficulty === 'beginner' ? 'text-green-400' :
                  scenario.difficulty === 'intermediate' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {scenario.difficulty.toUpperCase()}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-[10px] text-gray-500 font-mono">เงินเสี่ยง</div>
                <div className="text-xs font-bold text-red-400 font-mono">
                  ฿{scenario.moneyLost.toLocaleString()}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-[10px] text-gray-500 font-mono">สเตป</div>
                <div className="text-xs font-bold text-white font-mono">
                  {scenario.steps.length}
                </div>
              </div>
            </div>

            <button
              onClick={onDismiss}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3 rounded-lg font-mono text-sm transition-all shadow-lg shadow-red-500/20"
            >
              เริ่มจำลอง →
            </button>
          </div>
        )}

        {/* === REVEAL OVERLAY === */}
        {mode === 'reveal' && (
          <div className="bg-gradient-to-b from-red-950 via-gray-900 to-black border border-red-500/50 rounded-2xl p-6">
            <div className="text-center mb-4">
              <AlertTriangle size={48} className="text-red-400 mx-auto mb-2 animate-pulse" />
              <h2 className="text-red-400 font-bold font-mono text-xl mb-1">
                นี่คือกลโกง!
              </h2>
              <p className="text-gray-400 text-xs font-mono">THIS WAS A SCAM!</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
              <div className="text-red-300 text-sm leading-relaxed">
                ทั้งหมดเป็นการจำลอง "<strong>{scenario.titleTh}</strong>"
                — Agent ที่แปลงร่าง ไม่ใช่ตัวจริง ในชีวิตจริง ระวังคนที่โทรมาอ้างว่าเป็นตำรวจ/ธนาคาร!
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-red-400 text-2xl font-bold font-mono">
                -฿{moneyLost.toLocaleString()}
              </div>
              <div className="text-gray-500 text-[10px] font-mono">
                เสียไป {lostPercent}% ของเงินทั้งหมด
              </div>
            </div>

            <button
              onClick={onDismiss}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg font-mono text-sm transition-all border border-white/20"
            >
              ดูบทเรียน →
            </button>
          </div>
        )}

        {/* === COMPLETED OVERLAY === */}
        {mode === 'completed' && (
          <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-neon-green/30 rounded-2xl p-6">
            <div className="text-center mb-5">
              <Shield size={48} className="text-neon-green mx-auto mb-2" />
              <h2 className="text-neon-green font-bold font-mono text-lg mb-1">
                จบการจำลอง
              </h2>
              <p className="text-gray-500 text-xs font-mono">SIMULATION COMPLETE</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                <div className="text-[10px] text-gray-500 font-mono mb-1">เงินที่เสียไป</div>
                <div className="text-red-400 text-lg font-bold font-mono">
                  ฿{moneyLost.toLocaleString()}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <div className="text-[10px] text-gray-500 font-mono mb-1">เงินที่เหลือ</div>
                <div className="text-neon-green text-lg font-bold font-mono">
                  ฿{simulation.userProfile.moneyRemaining.toLocaleString()}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <div className="text-[10px] text-gray-500 font-mono mb-1">เวลาที่ใช้</div>
                <div className="text-white text-lg font-bold font-mono">
                  {durationSec}s
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <div className="text-[10px] text-gray-500 font-mono mb-1">Events</div>
                <div className="text-white text-lg font-bold font-mono">
                  {simulation.timeline.length}
                </div>
              </div>
            </div>

            {/* Educational Points */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen size={12} className="text-neon-green" />
                <span className="text-[10px] text-neon-green font-mono uppercase">บทเรียนสำคัญ</span>
              </div>
              <div className="space-y-1.5">
                {scenario.educationalPoints.slice(0, 4).map((point, i) => (
                  <div key={i} className="flex items-start gap-2 bg-neon-green/5 border border-neon-green/10 rounded-lg p-2">
                    <CheckCircle size={12} className="text-neon-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-xs leading-relaxed">{point.th}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Cases */}
            {scenario.realWorldCases.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle size={12} className="text-red-400" />
                  <span className="text-[10px] text-red-400 font-mono uppercase">เคสจริงในไทย</span>
                </div>
                <div className="space-y-1">
                  {scenario.realWorldCases.map((c, i) => (
                    <div key={i} className="text-gray-500 text-[10px] font-mono pl-2 border-l border-red-500/30">
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={onPlayAgain}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3 rounded-lg font-mono text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
              >
                <RotateCcw size={14} />
                เล่นอีกครั้ง
              </button>
              <button
                onClick={onExit}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 font-mono text-xs py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={12} />
                กลับหน้าหลัก
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioOverlay;
