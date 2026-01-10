import React, { useState, useEffect } from 'react';
import { AgentTaskResult, AgentMetadata } from '../types';
import { Shield, Search, Target, Zap, Clock, CheckCircle, XCircle, AlertCircle, DollarSign, Activity, Server, ExternalLink, ChevronDown, ChevronUp, Users, TrendingUp, Radio, Brain, Database, Bell } from 'lucide-react';
import { AGENT_ABILITIES } from '../constants';
import LottieAvatar from './LottieAvatar';

interface ProcessTasksPanelProps {
  agents: AgentMetadata[];
  results: AgentTaskResult[];
  onClose: () => void;
  activeAgents?: string[];
  agentConnections?: Array<{source: string, target: string}>;
  agentStatuses?: Record<string, 'idle' | 'negotiating' | 'streaming' | 'offline'>;
}

export const ProcessTasksPanel: React.FC<ProcessTasksPanelProps> = ({ 
  agents, 
  results, 
  onClose, 
  activeAgents = [],
  agentConnections = [],
  agentStatuses = {}
}) => {
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set(['a0'])); // Big Boss expanded by default
  const [totalCost, setTotalCost] = useState(0);
  const [apiCalls, setApiCalls] = useState(0);

  // Calculate costs and API usage
  useEffect(() => {
    const geminiCalls = results.filter(r => r.taskType === 'sentiment_analysis' || r.taskType === 'price_prediction').length;
    const coingeckoCalls = results.filter(r => r.taskType === 'market_research').length;
    const newsCalls = results.filter(r => r.taskType === 'sentiment_analysis').length;
    
    // Cost estimates: Gemini $0.002/call, CoinGecko free, News API $0.0001/call
    const cost = (geminiCalls * 0.002) + (newsCalls * 0.0001);
    setTotalCost(cost);
    setApiCalls(geminiCalls + coingeckoCalls + newsCalls);
  }, [results]);

  const toggleAgent = (agentId: string) => {
    setExpandedAgents(prev => {
      const next = new Set(prev);
      if (next.has(agentId)) {
        next.delete(agentId);
      } else {
        next.add(agentId);
      }
      return next;
    });
  };

  const getTaskIcon = (taskType: string) => {
    switch (taskType) {
      case 'fraud_detection': return <Shield className="w-4 h-4" />;
      case 'pattern_analysis': return <Search className="w-4 h-4" />;
      case 'database_search': return <Database className="w-4 h-4" />;
      case 'user_assistance': return <Users className="w-4 h-4" />;
      case 'education': return <Brain className="w-4 h-4" />;
      case 'verification': return <CheckCircle className="w-4 h-4" />;
      case 'alert_broadcast': return <Bell className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: AgentTaskResult['status']) => {
    switch (status) {
      case 'success': 
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-xs font-mono">
            <CheckCircle className="w-3 h-3" />
            <span>COMPLETED</span>
          </div>
        );
      case 'failed': 
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-xs font-mono">
            <XCircle className="w-3 h-3" />
            <span>FAILED</span>
          </div>
        );
      case 'pending': 
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-400 text-xs font-mono animate-pulse">
            <Radio className="w-3 h-3" />
            <span>PROCESSING</span>
          </div>
        );
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get commander's orders for each agent
  const getCommanderOrder = (agentId: string) => {
    const orders: { [key: string]: string } = {
      'a1': 'Monitor all fraud patterns and emerging scam techniques. Scan news feeds and user reports for new threats. Alert team immediately.',
      'a2': 'Search historical database for similar cases. Match scam fingerprints. Provide intelligence on fraudster patterns and modus operandi.',
      'a3': 'Assist citizens with suspicious SMS and calls. Answer questions about potential scams. Provide friendly, immediate protection.',
      'a4': 'Create awareness content and training simulations. Educate public about fraud prevention. Make engaging videos and infographics.',
      'a5': 'Verify all business invoices and emails. Detect BEC scams targeting SMEs. Protect companies from wire transfer fraud.',
      'a6': 'Broadcast urgent alerts across all channels. Send emergency warnings when new scams detected. Maximum speed delivery required.'
    };
    return orders[agentId] || 'Standby for orders from Big Boss.';
  };

  // Get subordinate agents (agents connected as targets)
  const getSubordinates = (agentId: string) => {
    return agentConnections
      .filter(c => c.source === agentId)
      .map(c => agents.find(a => a.id === c.target))
      .filter(Boolean) as AgentMetadata[];
  };

  // Get commander (agents connected as sources)
  const getCommander = (agentId: string) => {
    const incoming = agentConnections.find(c => c.target === agentId);
    if (incoming) {
      return agents.find(a => a.id === incoming.source);
    }
    return null;
  };

  // Group results by agent
  const resultsByAgent = results.reduce((acc, result) => {
    if (!acc[result.agentId]) {
      acc[result.agentId] = [];
    }
    acc[result.agentId].push(result);
    return acc;
  }, {} as Record<string, AgentTaskResult[]>);

  // Calculate agent metrics
  const calculateAgentMetrics = (agentId: string, agentResults: AgentTaskResult[]) => {
    const successCount = agentResults.filter(r => r.status === 'success').length;
    const ability = AGENT_ABILITIES[agentId as keyof typeof AGENT_ABILITIES];
    const apiUsage = ability?.apis || [];
    
    // Estimate cost based on API usage
    let estimatedCost = 0;
    agentResults.forEach(result => {
      if (result.taskType === 'sentiment_analysis') estimatedCost += 0.002; // Gemini
      if (result.taskType === 'market_research') estimatedCost += 0; // CoinGecko free
      if (result.taskType === 'custom_order') estimatedCost += 0.002; // Gemini
    });
    
    return {
      totalTasks: agentResults.length,
      successRate: agentResults.length > 0 ? ((successCount / agentResults.length) * 100).toFixed(0) : '0',
      estimatedCost: estimatedCost.toFixed(4),
      apiUsage: apiUsage.join(', '),
      status: agentStatuses[agentId] || 'offline'
    };
  };

  // Sort agents: Big Boss first, then by activity
  const sortedAgentIds = activeAgents.sort((a, b) => {
    if (a === 'a0') return -1;
    if (b === 'a0') return 1;
    const aResults = resultsByAgent[a]?.length || 0;
    const bResults = resultsByAgent[b]?.length || 0;
    return bResults - aResults;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green/50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-neon-green/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-neon-green/20 to-transparent border-b border-neon-green/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 font-mono flex items-center gap-3">
                <Activity className="w-8 h-8 text-neon-green animate-pulse" />
                Process Tasks & Operations
              </h2>
              <p className="text-gray-400 text-sm font-mono">
                Real-time command hierarchy, task delegation, and operational metrics
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
            >
              <XCircle className="w-6 h-6 text-gray-400 group-hover:text-white" />
            </button>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-black/40 border border-neon-green/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-neon-green" />
                <span className="text-xs text-gray-400 font-mono">ACTIVE AGENTS</span>
              </div>
              <div className="text-2xl font-bold text-neon-green font-mono">{activeAgents.length}</div>
            </div>
            <div className="bg-black/40 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400 font-mono">TOTAL TASKS</span>
              </div>
              <div className="text-2xl font-bold text-blue-400 font-mono">{results.length}</div>
            </div>
            <div className="bg-black/40 border border-purple-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Server className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400 font-mono">API CALLS</span>
              </div>
              <div className="text-2xl font-bold text-purple-400 font-mono">{apiCalls}</div>
            </div>
            <div className="bg-black/40 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-gray-400 font-mono">TOTAL COST</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400 font-mono">${totalCost.toFixed(4)}</div>
            </div>
          </div>
        </div>

        {/* Agent List */}
        <div className="overflow-y-auto max-h-[calc(90vh-280px)] p-6">
          {sortedAgentIds.length === 0 ? (
            <div className="text-center py-20">
              <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 font-mono">No active agents. Activate agents to see their tasks.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedAgentIds.map(agentId => {
                const agent = agents.find(a => a.id === agentId);
                if (!agent) return null;

                const agentResults = resultsByAgent[agentId] || [];
                const metrics = calculateAgentMetrics(agentId, agentResults);
                const isExpanded = expandedAgents.has(agentId);
                const isBigBoss = agentId === 'a0';
                const subordinates = getSubordinates(agentId);
                const commander = getCommander(agentId);
                const ability = AGENT_ABILITIES[agentId as keyof typeof AGENT_ABILITIES];

                return (
                  <div key={agentId} className={`
                    border rounded-xl overflow-hidden transition-all
                    ${isBigBoss 
                      ? 'border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 to-transparent' 
                      : 'border-gray-700 bg-gray-900/50'
                    }
                  `}>
                    {/* Agent Header */}
                    <div 
                      onClick={() => toggleAgent(agentId)}
                      className="cursor-pointer hover:bg-white/5 transition-colors p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className="relative">
                            <div className={`
                              w-16 h-16 rounded-full border-2 p-1
                              ${metrics.status === 'streaming' ? 'border-neon-green animate-pulse' :
                                metrics.status === 'negotiating' ? 'border-yellow-500 animate-pulse' :
                                metrics.status === 'idle' ? 'border-neon-green' :
                                'border-gray-600'}
                            `}>
                              {agent.avatarType === 'lottie' ? (
                                <LottieAvatar 
                                  animationPath={agent.avatar}
                                  width={56}
                                  height={56}
                                />
                              ) : (
                                <img 
                                  src={agent.avatar} 
                                  alt={agent.name}
                                  className="w-full h-full object-contain rounded-full"
                                />
                              )}
                            </div>
                            {isBigBoss && (
                              <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                                ★
                              </div>
                            )}
                          </div>

                          {/* Agent Info */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-bold font-mono text-lg ${isBigBoss ? 'text-yellow-400' : 'text-white'}`}>
                                {agent.name}
                              </h3>
                              {isBigBoss && (
                                <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-mono rounded">
                                  COMMANDER
                                </span>
                              )}
                            </div>
                            <p className="text-neon-green text-sm mb-2">{agent.role}</p>
                            <p className="text-gray-400 text-xs max-w-2xl">{ability?.primary || agent.description}</p>
                          </div>
                        </div>

                        {/* Metrics & Toggle */}
                        <div className="flex items-center gap-4">
                          {/* Quick Stats */}
                          <div className="flex gap-3 text-xs">
                            <div className="text-center">
                              <div className="text-gray-400 font-mono mb-1">TASKS</div>
                              <div className="text-white font-bold font-mono">{metrics.totalTasks}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-gray-400 font-mono mb-1">SUCCESS</div>
                              <div className="text-green-400 font-bold font-mono">{metrics.successRate}%</div>
                            </div>
                            <div className="text-center">
                              <div className="text-gray-400 font-mono mb-1">COST</div>
                              <div className="text-yellow-400 font-bold font-mono">${metrics.estimatedCost}</div>
                            </div>
                          </div>

                          {/* Expand Icon */}
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-gray-700 bg-black/40 p-4 space-y-4">
                        
                        {/* Command Hierarchy */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Commander's Order */}
                          <div className="bg-gray-900/50 border border-neon-green/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-neon-green" />
                              <span className="text-xs font-mono text-neon-green">
                                {isBigBoss ? 'STRATEGIC MISSION' : 'ORDERS FROM COMMAND'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">
                              {isBigBoss 
                                ? 'Coordinate all fraud defense operations. Prioritize threats, allocate resources, and ensure team effectiveness. Protect citizens from all scam threats.'
                                : getCommanderOrder(agentId)
                              }
                            </p>
                          </div>

                          {/* Team Structure */}
                          <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-4 h-4 text-blue-400" />
                              <span className="text-xs font-mono text-blue-400">TEAM STRUCTURE</span>
                            </div>
                            {commander && (
                              <div className="mb-2">
                                <span className="text-xs text-gray-400">Reports to: </span>
                                <span className="text-sm text-yellow-400 font-mono">{commander.name}</span>
                              </div>
                            )}
                            {subordinates.length > 0 ? (
                              <div>
                                <span className="text-xs text-gray-400">Managing: </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {subordinates.map(sub => (
                                    <span key={sub.id} className="text-xs px-2 py-0.5 bg-neon-green/20 text-neon-green rounded border border-neon-green/30 font-mono">
                                      {sub.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">No subordinates assigned</span>
                            )}
                          </div>
                        </div>

                        {/* API & Operations */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Server className="w-4 h-4 text-purple-400" />
                              <span className="text-xs font-mono text-purple-400">API SERVICES</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {ability?.apis.map((api, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 font-mono">
                                  {api}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-4 h-4 text-yellow-400" />
                              <span className="text-xs font-mono text-yellow-400">CAPABILITIES</span>
                            </div>
                            <div className="text-xs text-gray-300 space-y-0.5">
                              {ability?.operations.slice(0, 3).map((op, idx) => (
                                <div key={idx}>• {op}</div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Recent Tasks */}
                        {agentResults.length > 0 && (
                          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-3">
                              <Activity className="w-4 h-4 text-neon-green" />
                              <span className="text-xs font-mono text-neon-green">RECENT OPERATIONS</span>
                            </div>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              {agentResults.slice(-5).reverse().map((result, idx) => (
                                <div key={idx} className="bg-black/40 border border-gray-700 rounded p-2">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <div className="flex items-center gap-2">
                                      {getTaskIcon(result.taskType)}
                                      <span className="text-xs font-mono text-white">{result.summary}</span>
                                    </div>
                                    {getStatusBadge(result.status)}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatTimestamp(result.timestamp)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
