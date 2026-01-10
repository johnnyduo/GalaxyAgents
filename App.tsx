import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AGENTS, INITIAL_LOGS, AGENT_ABILITIES } from './constants';
import { AgentMetadata, LogMessage, AgentTaskResult } from './types';
import UserBar from './components/UserBar';
import FlowCanvas from './components/FlowCanvas';
import AgentCard from './components/AgentCard';
import ConsolePanel from './components/ConsolePanel';
import AgentDetailPanel from './components/AgentDetailPanel';
import { AgentDialogue } from './components/AgentDialogue';
import { AgentResultsPage } from './components/AgentResultsPage';
import { ProcessTasksPanel } from './components/ProcessTasksPanel';
import { AgentProgressBar } from './components/AgentProgressBar';
import { CaptainControlPanel } from './components/CaptainControlPanel';
import LandingPage from './components/LandingPage';
import { BarChart3, X, ListChecks } from 'lucide-react';
import { orchestrator, cryptoService, newsService, agentStatusManager, geminiService } from './services/api';
import { testAPIs } from './testAPIs';
import { authService } from './services/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast-custom.css';

// Make test function available in browser console
if (typeof window !== 'undefined') {
  (window as any).testAPIs = testAPIs;
  
  // Helper: Clear all test agents
  (window as any).clearAllAgents = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('activeAgents') || k.startsWith('taskResults'));
    keys.forEach(k => localStorage.removeItem(k));
    console.log(`✅ Cleared ${keys.length} agent data entries`);
    console.log('Reload the page to start fresh');
  };
}

const App: React.FC = () => {
  // Auto-create guest session on first load
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      authService.loginAsGuest();
    }
  }, []);
  
  const [showLanding, setShowLanding] = useState<boolean>(true);
  
  // --- State ---
  const [activeAgents, setActiveAgents] = useState<string[]>(() => {
    const stored = localStorage.getItem('activeAgents');
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogMessage[]>(INITIAL_LOGS);
  const [streamingEdges, setStreamingEdges] = useState<string[]>([]);
  const [persistentEdges, setPersistentEdges] = useState<Array<{source: string, target: string}>>(() => {
    const saved = localStorage.getItem('agentConnections');
    return saved ? JSON.parse(saved) : [];
  });
  const [agentStatuses, setAgentStatuses] = useState<Record<string, 'idle' | 'negotiating' | 'streaming' | 'offline'>>({});
  const [activeDialogue, setActiveDialogue] = useState<{
    agentId: string;
    dialogue: string;
  } | null>(null);
  
  // Random dialogue bubbles for active agents
  const [randomDialogues, setRandomDialogues] = useState<Record<string, {
    dialogue: string;
    timestamp: number;
  }>>({});
  
  const [taskResults, setTaskResults] = useState<AgentTaskResult[]>(() => {
    const stored = localStorage.getItem('taskResults');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [showResultsPage, setShowResultsPage] = useState(false);
  const [showProcessTasks, setShowProcessTasks] = useState(false);
  const [agentPositions, setAgentPositions] = useState<Record<string, { x: number; y: number }>>({});
  
  // --- Mode Control State ---
  const [operationMode, setOperationMode] = useState<'auto' | 'manual'>(() => {
    const saved = localStorage.getItem('operationMode');
    return (saved === 'auto' || saved === 'manual') ? saved : 'manual';
  });
  const [commanderBudget, setCommanderBudget] = useState<number>(100);
  const [budgetSpent, setBudgetSpent] = useState<number>(0);
  const [pendingFundRequest, setPendingFundRequest] = useState<boolean>(false);

  // Persist operation mode
  useEffect(() => {
    localStorage.setItem('operationMode', operationMode);
  }, [operationMode]);

  // --- Agent Task Progress Tracking ---
  const [agentProgress, setAgentProgress] = useState<Record<string, {
    isActive: boolean;
    progress: number;
    task: string;
    startTime: number;
  }>>({});

  // --- Commander Custom Order ---
  const [commanderCustomOrder, setCommanderCustomOrder] = useState<string>('');

  // --- Persist taskResults to localStorage ---
  useEffect(() => {
    localStorage.setItem('taskResults', JSON.stringify(taskResults));
  }, [taskResults]);

  // --- Memoized callback for closing dialogue ---
  const handleCloseDialogue = useCallback(() => {
    setActiveDialogue(null);
  }, []);

  // --- Memoized callback for node position changes ---
  const handleNodePositionsChange = useCallback((positions: Record<string, { x: number; y: number }>) => {
    setAgentPositions(positions);
  }, []);

  // --- Memoized callback for edge changes ---
  const handleEdgesChange = useCallback((edges: any[]) => {
    setPersistentEdges(edges);
    localStorage.setItem('agentConnections', JSON.stringify(edges));
  }, []);

  // --- Initialization: Check API Status ---
  useEffect(() => {
    const checkAPIs = async () => {
      addLog('SYSTEM', '🚀 Galaxy Agents Defense Network Initializing...');
      addLog('SYSTEM', '💡 TIP: Run testAPIs() in browser console to verify all API connections');
      
      setTimeout(() => {
        addLog('SYSTEM', '✅ Gemini AI: Ready for agent intelligence');
        addLog('SYSTEM', '✅ Fraud Pattern Database: Ready for scam detection');
        addLog('SYSTEM', '✅ News API: Ready for sentiment analysis');
        addLog('SYSTEM', '✅ AI Network: Online and operational');
        addLog('SYSTEM', '🛡️ Defense systems ready. Agents standing by.');
      }, 1000);
    };
    
    checkAPIs();
  }, []);

  // Persist active agents
  useEffect(() => {
    localStorage.setItem('activeAgents', JSON.stringify(activeAgents));
  }, [activeAgents]);

  // Random dialogue generator - makes agents chat periodically
  useEffect(() => {
    if (activeAgents.length === 0) return;

    const showRandomDialogue = () => {
      // Pick a random active agent
      const randomIndex = Math.floor(Math.random() * activeAgents.length);
      const agentId = activeAgents[randomIndex];
      const agent = AGENTS.find(a => a.id === agentId);
      
      if (!agent || !agent.personality?.dialogues) return;
      
      // Pick a random dialogue from the agent's personality
      const dialogues = agent.personality.dialogues;
      const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
      
      // Show dialogue bubble
      setRandomDialogues(prev => ({
        ...prev,
        [agentId]: {
          dialogue: randomDialogue,
          timestamp: Date.now()
        }
      }));
      
      // Auto-hide after 5-8 seconds
      const hideDelay = 5000 + Math.random() * 3000;
      setTimeout(() => {
        setRandomDialogues(prev => {
          const newDialogues = { ...prev };
          delete newDialogues[agentId];
          return newDialogues;
        });
      }, hideDelay);
    };

    // Show dialogues at random intervals (8-20 seconds)
    const interval = setInterval(() => {
      if (Math.random() > 0.2) { // 80% chance to show dialogue
        showRandomDialogue();
      }
    }, 8000 + Math.random() * 12000);

    // Initial dialogue after short delay
    const initialTimeout = setTimeout(showRandomDialogue, 3000 + Math.random() * 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [activeAgents]);

  // Log helper
  const addLog = useCallback((agent: string, message: string) => {
    const newLog: LogMessage = {
      id: `log_${Date.now()}_${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: agent === 'SYSTEM' ? 'SYSTEM' : agent === 'COMMANDER' ? 'COMMANDER' : 'A2A',
      content: message
    };
    setLogs(prev => [...prev.slice(-99), newLog]);
  }, []);

  // Activate agent (simplified without blockchain)
  const handleActivateAgent = useCallback((agentId: string) => {
    if (activeAgents.includes(agentId)) {
      toast.info('Agent is already active');
      return;
    }

    const agent = AGENTS.find(a => a.id === agentId);
    if (!agent) return;

    addLog('SYSTEM', `🤖 Activating ${agent.name}...`);
    
    // Simulate agent activation
    setTimeout(() => {
      setActiveAgents(prev => [...prev, agentId]);
      setAgentStatuses(prev => ({ ...prev, [agentId]: 'idle' }));
      addLog(agent.name, `✅ ${agent.name} is now online and ready!`);
      
      // Random personality dialogue
      if (agent.personality?.dialogues) {
        const randomDialogue = agent.personality.dialogues[Math.floor(Math.random() * agent.personality.dialogues.length)];
        setTimeout(() => addLog(agent.name, randomDialogue), 1000);
      }
      
      toast.success(`${agent.name} activated!`);
    }, 1500);
  }, [activeAgents, addLog]);

  // Deactivate agent
  const handleDeactivateAgent = useCallback((agentId: string) => {
    const agent = AGENTS.find(a => a.id === agentId);
    if (!agent) return;

    addLog('SYSTEM', `🔌 Deactivating ${agent.name}...`);
    
    setTimeout(() => {
      setActiveAgents(prev => prev.filter(id => id !== agentId));
      setAgentStatuses(prev => {
        const newStatuses = { ...prev };
        delete newStatuses[agentId];
        return newStatuses;
      });
      
      addLog(agent.name, `👋 ${agent.name} has gone offline.`);
      toast.info(`${agent.name} deactivated`);
    }, 1000);
  }, [addLog]);

  // Delete agent permanently
  const handleDeleteAgent = useCallback((agentId: string) => {
    const agent = AGENTS.find(a => a.id === agentId);
    if (!agent) return;

    addLog('SYSTEM', `🗑️ Removing ${agent.name} from the network...`);
    
    // Deactivate first if active
    setActiveAgents(prev => prev.filter(id => id !== agentId));
    setAgentStatuses(prev => {
      const newStatuses = { ...prev };
      delete newStatuses[agentId];
      return newStatuses;
    });
    
    // Remove from progress tracking
    setAgentProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[agentId];
      return newProgress;
    });
    
    addLog('SYSTEM', `✅ ${agent.name} has been removed from the team.`);
    toast.success(`${agent.name} deleted successfully`);
  }, [addLog]);

  // Execute agent task (AI-powered)
  const executeAgentTask = useCallback(async (agentId: string, taskDescription?: string) => {
    const agent = AGENTS.find(a => a.id === agentId);
    if (!agent) return;

    // Update progress tracking
    setAgentProgress(prev => ({
      ...prev,
      [agentId]: {
        isActive: true,
        progress: 0,
        task: taskDescription || `Executing ${agent.role}`,
        startTime: Date.now()
      }
    }));

    addLog(agent.name, `🎯 Starting task: ${taskDescription || agent.role}`);
    
    // Show dialogue
    const dialogues = agent.personality?.dialogues || [];
    const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)] || 'Processing...';
    setActiveDialogue({ agentId, dialogue });

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAgentProgress(prev => {
        const current = prev[agentId];
        if (!current || current.progress >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return {
          ...prev,
          [agentId]: {
            ...current,
            progress: Math.min(current.progress + Math.random() * 20, 90)
          }
        };
      });
    }, 500);

    try {
      // Call appropriate service based on agent role
      let result: any = {};
      
      if (agent.role === 'Navigator') {
        // Crypto market data
        const prices = await cryptoService.getMultiplePrices(['bitcoin', 'ethereum', 'solana']);
        result = { type: 'market_data', data: prices, agentRole: agent.role };
      } else if (agent.role === 'Archivist') {
        // News and sentiment
        const news = await newsService.getCryptoNews();
        result = { type: 'news', data: news, agentRole: agent.role };
      } else if (agent.role === 'Oracle') {
        // AI analysis
        const analysis = await geminiService.chat({
          prompt: `As an AI oracle, provide a brief crypto market insight for ${taskDescription || 'general market conditions'}`
        });
        result = { type: 'ai_analysis', data: { analysis: analysis.text }, agentRole: agent.role };
      } else {
        // Generic task completion
        result = { type: 'task_complete', data: { status: 'Success', agentRole: agent.role } };
      }

      // Complete progress
      setAgentProgress(prev => ({
        ...prev,
        [agentId]: {
          ...prev[agentId],
          progress: 100,
          isActive: false
        }
      }));

      // Save result
      const taskResult: AgentTaskResult = {
        agentId,
        agentName: agent.name,
        taskType: 'custom_order',
        timestamp: Date.now(),
        status: 'success',
        data: result,
        summary: `Task completed successfully!`
      };

      setTaskResults(prev => [taskResult, ...prev].slice(0, 50));
      addLog(agent.name, `✅ Task completed successfully!`);
      
      // Clear dialogue after delay
      setTimeout(() => setActiveDialogue(null), 2000);
      
      toast.success(`${agent.name} completed task!`);
    } catch (error) {
      console.error('Task execution error:', error);
      addLog('ERROR', `❌ ${agent.name} task failed: ${error}`);
      
      setAgentProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[agentId];
        return newProgress;
      });
      
      toast.error(`Task failed for ${agent.name}`);
    }
  }, [addLog]);

  // Commander orchestration
  const handleCommanderAction = useCallback(async (customOrder?: string) => {
    if (operationMode !== 'auto') {
      toast.info('Switch to AUTO mode for Big Boss orchestration');
      return;
    }

    const commander = AGENTS.find(a => a.id === 'a0');
    if (!commander || !activeAgents.includes('a0')) {
      toast.error('Commander must be active for orchestration');
      return;
    }

    addLog(commander.name, '👑 Initiating strategic orchestration...');
    
    const order = customOrder || 'Analyze current market conditions and coordinate team';
    
    // Execute commander's analysis
    await executeAgentTask('a0', order);
    
    // Coordinate other active agents
    const otherAgents = activeAgents.filter(id => id !== 'a0');
    if (otherAgents.length > 0) {
      addLog(commander.name, `Delegating tasks to ${otherAgents.length} team members...`);
      
      for (const agentId of otherAgents.slice(0, 3)) {
        const agent = AGENTS.find(a => a.id === agentId);
        if (agent) {
          setTimeout(() => {
            executeAgentTask(agentId, `Coordinated by Commander: ${agent.role} analysis`);
          }, Math.random() * 2000);
        }
      }
    }
  }, [operationMode, activeAgents, executeAgentTask, addLog]);

  // Handle logout - create new guest session
  const handleLogout = useCallback(() => {
    authService.logout();
    authService.loginAsGuest();
    setShowLanding(true);
    toast.info('Logged out - new guest session created');
  }, []);

  const handleLaunchApp = useCallback(() => {
    setShowLanding(false);
  }, []);

  const handleBackToLanding = useCallback(() => {
    setShowLanding(true);
  }, []);

  // Get selected agent
  const selectedAgent = selectedAgentId ? AGENTS.find(a => a.id === selectedAgentId) || null : null;

  // Main app UI
  const mainApp = (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Top Bar */}
      <UserBar onLogoClick={handleBackToLanding} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col overflow-hidden">
          {/* Mode Control */}
          <div className="p-4 border-b border-white/10">
            <CaptainControlPanel
              mode={operationMode}
              onModeChange={setOperationMode}
            />
          </div>

          {/* Agent Cards */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {AGENTS.map((agent) => {
              const isActive = activeAgents.includes(agent.id);
              const status = agentStatuses[agent.id] || (isActive ? 'idle' : 'offline');
              const progress = agentProgress[agent.id];

              return (
                <div key={agent.id} className="relative">
                  <AgentCard
                    agent={agent}
                    isActive={isActive}
                    status={status}
                    onClick={() => setSelectedAgentId(agent.id)}
                    onToggle={() => {
                      if (isActive) {
                        handleDeactivateAgent(agent.id);
                      } else {
                        handleActivateAgent(agent.id);
                      }
                    }}
                  />
                  {progress?.isActive && (
                    <AgentProgressBar
                      agentName={agent.name}
                      progress={progress.progress}
                      task={progress.task}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Results Summary */}
          {taskResults.length > 0 && (
            <div className="p-4 border-t border-white/10 space-y-2">
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-green-400 uppercase tracking-wider">Mission Results</span>
                  <span className="text-neon-green font-bold font-mono">{taskResults.length}</span>
                </div>
                <button
                  onClick={() => setShowResultsPage(!showResultsPage)}
                  className="w-full bg-neon-green/10 hover:bg-neon-green/20 border border-neon-green/30 text-neon-green font-semibold py-2 px-4 rounded transition-all flex items-center justify-center gap-2 text-sm font-mono"
                >
                  <BarChart3 size={16} />
                  {showResultsPage ? 'HIDE DETAILS' : 'VIEW DETAILS'}
                </button>
              </div>
              
              {/* Process Tasks Button */}
              <button
                onClick={() => setShowProcessTasks(true)}
                className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/30 text-blue-400 font-semibold py-2.5 px-4 rounded transition-all flex items-center justify-center gap-2 text-sm font-mono"
              >
                <ListChecks size={16} />
                PROCESS TASKS
              </button>
            </div>
          )}
        </div>

        {/* Center: Flow Canvas & Console */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Canvas */}
          <div className="flex-1 relative">
            <FlowCanvas
              agents={AGENTS}
              activeAgents={activeAgents}
              selectedAgentId={selectedAgentId}
              onAgentSelect={setSelectedAgentId}
              streamingEdges={streamingEdges}
              persistentEdges={persistentEdges}
              onEdgesChange={handleEdgesChange}
              agentStatuses={agentStatuses}
              onNodePositionsChange={handleNodePositionsChange}
              randomDialogues={randomDialogues}
            />

            {/* Dialogue Overlay */}
            {activeDialogue && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                <AgentDialogue
                  agent={AGENTS.find(a => a.id === activeDialogue.agentId)!}
                  dialogue={activeDialogue.dialogue}
                  onClose={handleCloseDialogue}
                />
              </div>
            )}
          </div>

          {/* Console */}
          <div className="h-48 z-30">
            <ConsolePanel logs={logs} />
          </div>
        </div>

        {/* Right Sidebar: Details Panel */}
        <AgentDetailPanel
          agent={selectedAgent}
          onClose={() => setSelectedAgentId(null)}
          onActivate={handleActivateAgent}
          onDeactivate={handleDeactivateAgent}
          onExecuteTask={executeAgentTask}
          onDeleteAgent={handleDeleteAgent}
          isActive={selectedAgent ? activeAgents.includes(selectedAgent.id) : false}
        />

        {/* Results Floating Panel */}
        {showResultsPage && (
          <div className="absolute bottom-4 right-4 w-96 max-h-[500px] bg-black/95 backdrop-blur-md border border-neon-green/30 rounded-lg shadow-2xl shadow-neon-green/20 flex flex-col z-50 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-neon-green" />
                <h3 className="font-bold text-white font-mono">Mission Results</h3>
              </div>
              <button
                onClick={() => setShowResultsPage(false)}
                className="text-white/50 hover:text-white transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {taskResults.map((result, index) => (
                <div key={`result_${index}_${result.timestamp}`} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-neon-green/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-white text-sm font-mono">{result.agentName}</div>
                      <div className="text-xs text-gray-400 font-mono">{result.summary}</div>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded font-mono ${
                      result.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {result.status === 'success' ? '✓ SUCCESS' : '✗ FAILED'}
                    </div>
                  </div>
                  <div className="text-xs text-white/60 font-mono">
                    {new Date(result.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Process Tasks Panel */}
      {showProcessTasks && (
        <ProcessTasksPanel
          agents={AGENTS}
          results={taskResults}
          onClose={() => setShowProcessTasks(false)}
          activeAgents={activeAgents}
          agentConnections={persistentEdges}
          agentStatuses={agentStatuses}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );

  // Show landing page on first visit
  if (showLanding) {
    return <LandingPage onLaunchApp={handleLaunchApp} />;
  }

  return mainApp;
};

export default App;
