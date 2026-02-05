import React, { useState } from 'react';
import { FraudScenario } from '../types';
import { FRAUD_SCENARIOS } from '../scenarios';
import { Play, Shield, Users, Clock, AlertTriangle } from 'lucide-react';

interface SimulationSetupProps {
  onStart: (scenario: FraudScenario, name: string, money: number) => void;
  onCancel: () => void;
}

const difficultyColors = {
  beginner: 'text-green-400 border-green-500/30 bg-green-500/10',
  intermediate: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  advanced: 'text-red-400 border-red-500/30 bg-red-500/10',
};

const categoryIcons: Record<string, string> = {
  call_center: '📞',
  sms_phishing: '📱',
  romance_scam: '💔',
  social_impersonation: '👤',
  qr_scam: '📷',
  ponzi_scheme: '📈',
  fake_investment: '💰',
  job_scam: '💼',
  loan_app: '🏦',
  sim_swap: '📶',
};

const SimulationSetup: React.FC<SimulationSetupProps> = ({ onStart, onCancel }) => {
  const [name, setName] = useState('คุณสมชาย');
  const [money, setMoney] = useState(500000);
  const [selectedScenario, setSelectedScenario] = useState<FraudScenario | null>(
    FRAUD_SCENARIOS[0] || null
  );

  const handleStart = () => {
    if (!selectedScenario) return;
    onStart(selectedScenario, name, money);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-red-500/30 bg-red-500/5">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={16} className="text-red-400" />
          <h2 className="text-red-400 font-bold font-mono text-sm">จำลองสถานการณ์โกง</h2>
        </div>
        <p className="text-gray-500 text-[10px] font-mono">
          เรียนรู้กลโกงจริงๆ ผ่านการจำลอง เพื่อป้องกันตัวเอง
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* User Profile */}
        <div className="space-y-3">
          <label className="text-xs text-gray-500 font-mono uppercase flex items-center gap-1">
            <Users size={10} />
            ข้อมูลเหยื่อ (จำลอง)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อของคุณ"
            className="w-full px-3 py-2 text-sm bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-red-400 focus:outline-none font-mono"
          />
          <div>
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-gray-500">เงินในบัญชี</span>
              <span className="text-neon-green font-bold">฿{money.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={1000000}
              step={10000}
              value={money}
              onChange={(e) => setMoney(Number(e.target.value))}
              className="w-full accent-red-500"
            />
            <div className="flex justify-between text-[8px] font-mono text-gray-600">
              <span>฿10,000</span>
              <span>฿1,000,000</span>
            </div>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="space-y-2">
          <label className="text-xs text-gray-500 font-mono uppercase flex items-center gap-1">
            <Shield size={10} />
            เลือกสถานการณ์
          </label>
          {FRAUD_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedScenario?.id === scenario.id
                  ? 'border-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(255,68,68,0.2)]'
                  : 'border-white/10 bg-black/30 hover:border-white/30'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{categoryIcons[scenario.category] || '⚠️'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-bold text-xs font-mono truncate">
                      {scenario.titleTh}
                    </span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded border font-mono ${difficultyColors[scenario.difficulty]}`}>
                      {scenario.difficulty === 'beginner' ? 'ง่าย' : scenario.difficulty === 'intermediate' ? 'ปานกลาง' : 'ยาก'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2">
                    {scenario.description.th}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[9px] font-mono text-gray-600">
                    <span className="flex items-center gap-0.5">
                      <Clock size={8} />
                      ~{Math.round(scenario.estimatedDuration / 60)} นาที
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Users size={8} />
                      {scenario.involvedAgents.length} ตัว
                    </span>
                    <span className="text-red-400 font-bold">
                      เสี่ยง ฿{scenario.moneyLost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {FRAUD_SCENARIOS.length === 0 && (
            <div className="text-center py-8 text-gray-600 text-xs font-mono">
              ยังไม่มีสถานการณ์ให้เลือก
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={handleStart}
          disabled={!selectedScenario}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 font-mono text-sm shadow-lg shadow-red-500/20"
        >
          <Play size={16} />
          เริ่มจำลอง
        </button>
        <button
          onClick={onCancel}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 font-mono text-xs py-2 px-4 rounded-lg transition-all"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default SimulationSetup;
