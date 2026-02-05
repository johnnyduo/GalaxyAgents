import React, { useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  NodeProps,
  Handle,
  Position,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
} from 'reactflow';
import { AgentMetadata, AgentAlignment } from '../types';
import LottieAvatar from './LottieAvatar';
import gsap from 'gsap';

// --- Custom Agent Node Component ---
const AgentNode = React.memo(({ data }: NodeProps) => {
  const { agent, dialogue, onCloseDialogue, alignment, colorTheme } = data as {
    agent: AgentMetadata;
    dialogue: string | null;
    onCloseDialogue: () => void;
    alignment?: AgentAlignment;
    colorTheme?: { primary: string; glow: string; border: string };
    isStreaming: boolean;
    currentAction: string;
  };

  const isEvil = alignment === 'evil';
  const isTransitioning = alignment === 'transitioning';
  const isEvilish = isEvil || isTransitioning;

  // Refs for GSAP animation
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Color computations
  const borderColor = isEvilish ? (colorTheme?.border || '#FF4444') : 'rgba(67, 255, 77, 0.5)';
  const glowColor = isEvilish ? (colorTheme?.glow || 'rgba(255, 68, 68, 0.6)') : 'rgba(67, 255, 77, 0.2)';
  const nameColor = isEvilish ? (colorTheme?.primary || '#FF4444') : '#43FF4D';
  const handleColor = isEvil ? (colorTheme?.primary || '#FF4444') : '#43FF4D';

  // GSAP transformation animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isTransitioning) {
      const tl = gsap.timeline();
      tl
        // 1. Shake/vibrate
        .to(container, { x: '+=3', duration: 0.05, repeat: 9, yoyo: true, ease: 'none' })
        // 2. Border glow tween
        .to(container, {
          borderColor: colorTheme?.border || '#FF4444',
          boxShadow: `0 0 20px ${colorTheme?.glow || 'rgba(255,68,68,0.6)'}, 0 0 40px ${colorTheme?.glow || 'rgba(255,68,68,0.3)'}`,
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.3')
        // 3. Avatar hue shift
        .to(avatarWrapRef.current, {
          filter: 'hue-rotate(180deg) saturate(2)',
          duration: 0.3,
          ease: 'power1.in',
        }, '-=0.3')
        // 4. Name crossfade
        .to(nameRef.current, { opacity: 0, y: -5, duration: 0.2 })
        .set(nameRef.current, { y: 5 })
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.2 })
        // 5. Badge appears
        .fromTo(badgeRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );

      return () => { tl.kill(); };
    }

    if (alignment === 'good') {
      // Reverse to good — smooth transition back
      gsap.to(avatarWrapRef.current, { filter: 'none', duration: 0.4 });
      gsap.to(container, {
        borderColor: 'rgba(67, 255, 77, 0.5)',
        boxShadow: '0 0 10px rgba(67, 255, 77, 0.2)',
        duration: 0.5,
      });
      gsap.to(badgeRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
    }
  }, [alignment, isTransitioning, colorTheme]);

  return (
    <div
      ref={containerRef}
      className={`
        relative w-32 flex flex-col items-center rounded-xl p-1 border-2 transition-colors
        ${data.isStreaming && !isEvil ? 'filter drop-shadow-[0_0_10px_#43FF4D]' : ''}
      `}
      style={{
        borderColor: isEvil ? borderColor : 'transparent',
        boxShadow: isEvil ? `0 0 20px ${glowColor}` : 'none',
      }}
    >
      {/* COMPROMISED badge */}
      <div
        ref={badgeRef}
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[7px] font-bold font-mono whitespace-nowrap z-10"
        style={{
          opacity: isEvil ? 1 : 0,
          background: colorTheme?.primary || '#FF4444',
          color: '#fff',
          boxShadow: `0 0 10px ${colorTheme?.glow || 'rgba(255,68,68,0.5)'}`,
        }}
      >
        แปลงร่าง
      </div>

      {/* Dialogue bubble */}
      {dialogue && (
        <div className="absolute left-[50%] bottom-full mb-2 z-50 pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 rounded-lg p-2 shadow-2xl w-[140px] backdrop-blur-sm"
               style={{
                 borderColor: isEvilish ? (colorTheme?.primary || '#FF4444') : '#39ff14',
                 boxShadow: isEvilish
                   ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`
                   : '0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(57, 255, 20, 0.2)',
                 animation: 'gentle-float 3s ease-in-out infinite'
               }}>
            <div className="absolute left-3 bottom-0 transform translate-y-full w-0 h-0 border-t-[8px] border-r-[8px] border-t-gray-900 border-r-transparent"></div>

            <div className="flex items-start gap-1.5">
              <div className="flex-1 min-w-0">
                <p className="text-white text-[10px] leading-relaxed font-medium">{dialogue}</p>
              </div>
              <button
                onClick={onCloseDialogue}
                className="text-gray-400 hover:text-white transition-all hover:scale-110 flex-shrink-0 mt-0.5"
                aria-label="Close dialogue"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !border-none" style={{ background: handleColor }} />

      {/* Avatar container — GSAP targets avatarWrapRef for hue-rotate */}
      <div ref={avatarWrapRef} className="relative w-20 h-20 mb-2">
        <div
          className={`
            absolute inset-0 rounded-full border-2 border-dashed transition-colors
            ${!isEvilish && data.isStreaming ? 'border-neon-green animate-spin-slow' : ''}
            ${!isEvilish && !data.isStreaming ? 'border-white/20' : ''}
          `}
          style={isEvilish ? { borderColor: colorTheme?.border || '#FF4444' } : {}}
        ></div>

        {agent.avatarType === 'lottie' ? (
          <div className="w-full h-full p-2">
            <LottieAvatar animationPath={agent.avatar} width={64} height={64} />
          </div>
        ) : (
          <img
            src={agent.avatar}
            alt={agent.name}
            className="w-full h-full object-contain p-2"
            style={{ imageRendering: 'pixelated' }}
          />
        )}
      </div>

      {/* Name label */}
      <div
        ref={nameRef}
        className="bg-black/80 backdrop-blur border px-3 py-1 rounded-md text-center min-w-[120px] transition-colors"
        style={{ borderColor: isEvilish ? borderColor : 'rgba(67, 255, 77, 0.5)' }}
      >
        <div className="text-[10px] font-mono uppercase font-bold truncate" style={{ color: nameColor }}>
          {agent.name}
        </div>
        {data.currentAction && (
          <div className="text-[9px] text-white/70 truncate animate-pulse">{data.currentAction}</div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !border-none" style={{ background: handleColor }} />

      {data.isStreaming && !isEvil && (
        <div className="absolute -right-4 top-0 bg-neon-green text-black text-[8px] font-bold px-1 rounded animate-bounce">
          x402
        </div>
      )}
    </div>
  );
});

// Define outside component to prevent re-creation
const nodeTypes = { agentNode: AgentNode };
const proOptions = { hideAttribution: true };

interface FlowCanvasProps {
  agents: (AgentMetadata & { colorTheme?: { primary: string; glow: string; border: string } })[];
  activeAgents: string[];
  selectedAgentId?: string | null;
  onAgentSelect?: (agentId: string) => void;
  streamingEdges: string[];
  onNodePositionsChange?: (positions: Record<string, { x: number; y: number }>) => void;
  activeDialogue?: { agentId: string; dialogue: string } | null;
  onCloseDialogue?: () => void;
  persistentEdges?: Array<{source: string, target: string}>;
  onEdgesChange?: (edges: Array<{source: string, target: string}>) => void;
  agentStatuses?: Record<string, 'idle' | 'negotiating' | 'streaming' | 'offline'>;
  randomDialogues?: Record<string, { dialogue: string; timestamp: number }>;
  agentAlignments?: Record<string, AgentAlignment>;
  isSimulationActive?: boolean;
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({
  agents,
  activeAgents,
  streamingEdges,
  onNodePositionsChange,
  activeDialogue,
  onCloseDialogue,
  persistentEdges = [],
  onEdgesChange: onPersistentEdgesChange,
  randomDialogues = {},
  agentAlignments = {},
  isSimulationActive = false,
}) => {
  const prevActiveAgentsRef = useRef<string[]>([]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Debounced position save
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save node positions when they change (debounced)
  React.useEffect(() => {
    if (nodes.length === 0) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      const positions: Record<string, { x: number; y: number }> = {};
      nodes.forEach(node => {
        if (node.position) {
          positions[node.id] = { x: node.position.x, y: node.position.y };
        }
      });
      localStorage.setItem('nodePositions', JSON.stringify(positions));
      onNodePositionsChange?.(positions);
    }, 300);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [nodes, onNodePositionsChange]);

  // Sync nodes when activeAgents list changes (add/remove)
  React.useEffect(() => {
    const prev = prevActiveAgentsRef.current;
    const changed = prev.length !== activeAgents.length || prev.some((id, i) => id !== activeAgents[i]);

    if (!changed && prev.length > 0) return;
    prevActiveAgentsRef.current = activeAgents;

    const savedPos = localStorage.getItem('nodePositions');
    const positions = savedPos ? JSON.parse(savedPos) : {};

    setNodes(currentNodes => {
      return activeAgents.map((id, index) => {
        const agent = agents.find(a => a.id === id);
        if (!agent) return null;
        const existingNode = currentNodes.find(n => n.id === id);
        const position = existingNode?.position || positions[id] || { x: 100 + (index * 250), y: 100 + (index % 2) * 150 };

        return {
          id: agent.id,
          type: 'agentNode',
          position,
          data: {
            agent,
            isStreaming: false,
            currentAction: '',
            dialogue: null,
            onCloseDialogue: onCloseDialogue || (() => {}),
            alignment: agentAlignments[agent.id] || 'good',
            colorTheme: (agent as any).colorTheme,
          },
        };
      }).filter(Boolean) as any[];
    });
  }, [activeAgents, agents, onCloseDialogue, setNodes, agentAlignments]);

  // Update alignment + colorTheme on node data when agentAlignments change
  React.useEffect(() => {
    setNodes(nds =>
      nds.map(node => {
        const agent = agents.find(a => a.id === node.id);
        const newAlignment = agentAlignments[node.id] || 'good';
        if (node.data.alignment !== newAlignment || node.data.agent !== agent) {
          return {
            ...node,
            data: {
              ...node.data,
              agent: agent || node.data.agent,
              alignment: newAlignment,
              colorTheme: (agent as any)?.colorTheme,
            },
          };
        }
        return node;
      })
    );
  }, [agentAlignments, agents, setNodes]);

  // Update dialogue overlays (both active and random)
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        // Active dialogue takes priority
        if (activeDialogue && node.id === activeDialogue.agentId) {
          return {
            ...node,
            data: {
              ...node.data,
              dialogue: activeDialogue.dialogue,
              onCloseDialogue: onCloseDialogue || (() => {})
            }
          };
        }

        // Random dialogue (only when no active dialogue)
        const randomDialogue = randomDialogues[node.id];
        if (randomDialogue && !activeDialogue) {
          return {
            ...node,
            data: {
              ...node.data,
              dialogue: randomDialogue.dialogue,
              onCloseDialogue: () => {}
            }
          };
        }

        // Clear dialogue
        if (node.data.dialogue) {
          return { ...node, data: { ...node.data, dialogue: null } };
        }

        return node;
      })
    );
  }, [randomDialogues, activeDialogue, onCloseDialogue, setNodes]);

  // Update edges when activeAgents or persistentEdges change
  React.useEffect(() => {
    const newEdges = persistentEdges
      .filter(conn => activeAgents.includes(conn.source) && activeAgents.includes(conn.target))
      .map(conn => ({
        id: `reactflow__edge-${conn.source}-${conn.target}`,
        source: conn.source,
        target: conn.target,
        animated: true,
        style: { stroke: '#43FF4D', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#43FF4D' },
      }));

    setEdges(newEdges);
  }, [activeAgents, persistentEdges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      setEdges((eds) => addEdge({
        ...params,
        animated: true,
        style: { stroke: '#43FF4D', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#43FF4D' },
      }, eds));

      if (onPersistentEdgesChange) {
        const exists = persistentEdges.some(e => e.source === params.source && e.target === params.target);
        if (!exists) {
          onPersistentEdgesChange([...persistentEdges, { source: params.source!, target: params.target! }]);
        }
      }
    },
    [setEdges, onPersistentEdgesChange, persistentEdges]
  );

  return (
    <div className="w-full h-full bg-[#050505] relative">
      {/* SIMULATION MODE banner */}
      {isSimulationActive && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-lg bg-red-500/20 border border-red-500/50 backdrop-blur-md">
          <span className="text-red-400 font-mono text-xs font-bold tracking-widest animate-pulse">
            กำลังจำลองสถานการณ์
          </span>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-black"
        proOptions={proOptions}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color={isSimulationActive ? '#2d1215' : '#1f2937'}
        />
        <Controls
          className="!bg-gray-900 !border-neon-green/30 !rounded-lg !shadow-lg"
        />
      </ReactFlow>

      {activeAgents.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h2 className="text-2xl font-mono text-white/30 font-bold">ยังไม่มี Agent</h2>
            <p className="text-neon-green/50 text-sm font-mono mt-2">เปิดใช้งาน Agent เพื่อเริ่มต้น</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowCanvas;
