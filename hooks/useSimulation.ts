import { useReducer, useCallback, useRef } from 'react';
import {
  SimulationState,
  SimulationEvent,
  FraudScenario,
  AgentAlignment,
  AgentMetadata,
  ScenarioStep,
} from '../types';
import { AGENTS, EVIL_VARIANTS } from '../constants';
import { playSoundForStep, speakStepContent } from '../services/soundService';

// ===========================
// REDUCER
// ===========================

type SimAction =
  | { type: 'START_SETUP' }
  | { type: 'SET_USER_PROFILE'; name: string; money: number }
  | { type: 'LOAD_SCENARIO'; scenario: FraudScenario }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'NEXT_STEP' }
  | { type: 'TRANSFORM_AGENT'; agentId: string; alignment: AgentAlignment }
  | { type: 'MONEY_CHANGE'; amount: number; stepId: string; agentId: string }
  | { type: 'LOG_EVENT'; event: SimulationEvent }
  | { type: 'COMPLETE' }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'RESET' };

const initialState: SimulationState = {
  status: 'idle',
  currentScenario: null,
  currentStepIndex: 0,
  userProfile: { name: '', money: 0, moneyRemaining: 0 },
  agentAlignments: {},
  timeline: [],
  startedAt: null,
  completedAt: null,
  speed: 1,
  transformingAgentId: null,
};

function simulationReducer(state: SimulationState, action: SimAction): SimulationState {
  switch (action.type) {
    case 'START_SETUP':
      return { ...initialState, status: 'setup' };

    case 'SET_USER_PROFILE':
      return {
        ...state,
        userProfile: {
          name: action.name,
          money: action.money,
          moneyRemaining: action.money,
        },
      };

    case 'LOAD_SCENARIO': {
      const alignments: Record<string, AgentAlignment> = {};
      action.scenario.involvedAgents.forEach(id => {
        alignments[id] = 'good';
      });
      return {
        ...state,
        currentScenario: action.scenario,
        currentStepIndex: 0,
        agentAlignments: alignments,
        timeline: [],
        startedAt: Date.now(),
        completedAt: null,
        status: 'playing',
      };
    }

    case 'PLAY':
      return { ...state, status: 'playing' };

    case 'PAUSE':
      return { ...state, status: 'paused' };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStepIndex: state.currentStepIndex + 1,
      };

    case 'TRANSFORM_AGENT':
      return {
        ...state,
        agentAlignments: {
          ...state.agentAlignments,
          [action.agentId]: action.alignment,
        },
        transformingAgentId: action.alignment === 'transitioning' ? action.agentId : null,
      };

    case 'MONEY_CHANGE': {
      const newRemaining = state.userProfile.moneyRemaining + action.amount;
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          moneyRemaining: Math.max(0, newRemaining),
        },
        timeline: [
          ...state.timeline,
          {
            timestamp: Date.now(),
            stepId: action.stepId,
            type: 'money_flow',
            agentId: action.agentId,
            content: `฿${Math.abs(action.amount).toLocaleString()} transferred`,
            moneyChange: action.amount,
          },
        ],
      };
    }

    case 'LOG_EVENT':
      return {
        ...state,
        timeline: [...state.timeline, action.event],
      };

    case 'COMPLETE':
      return { ...state, status: 'completed', completedAt: Date.now() };

    case 'SET_SPEED':
      return { ...state, speed: action.speed };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// ===========================
// HOOK
// ===========================

export function useSimulation() {
  const [state, dispatch] = useReducer(simulationReducer, initialState);
  const playbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (playbackTimer.current) {
      clearTimeout(playbackTimer.current);
      playbackTimer.current = null;
    }
  }, []);

  const startSetup = useCallback(() => {
    clearTimer();
    dispatch({ type: 'START_SETUP' });
  }, [clearTimer]);

  const setUserProfile = useCallback((name: string, money: number) => {
    dispatch({ type: 'SET_USER_PROFILE', name, money });
  }, []);

  const loadAndPlay = useCallback((scenario: FraudScenario) => {
    clearTimer();
    dispatch({ type: 'LOAD_SCENARIO', scenario });
  }, [clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    dispatch({ type: 'PAUSE' });
  }, [clearTimer]);

  const resume = useCallback(() => {
    dispatch({ type: 'PLAY' });
  }, []);

  const setSpeed = useCallback((speed: number) => {
    dispatch({ type: 'SET_SPEED', speed });
  }, []);

  const processStep = useCallback((step: ScenarioStep): void => {
    // Play sound effect for step type
    playSoundForStep(step.type, step.alignment);

    // Optionally speak the content (TTS)
    speakStepContent(step.content.th, step.type);

    // Log event
    dispatch({
      type: 'LOG_EVENT',
      event: {
        timestamp: Date.now(),
        stepId: step.id,
        type: step.type,
        agentId: step.agentId,
        content: step.content.th,
        moneyChange: step.moneyChange,
      },
    });

    // Handle transformation
    if (step.type === 'transformation') {
      dispatch({
        type: 'TRANSFORM_AGENT',
        agentId: step.agentId,
        alignment: 'transitioning',
      });
      // After a short delay, set to evil
      setTimeout(() => {
        dispatch({
          type: 'TRANSFORM_AGENT',
          agentId: step.agentId,
          alignment: 'evil',
        });
      }, 2000);
    }

    // Handle reveal — reverse all evil agents back to good
    if (step.type === 'reveal') {
      // Small delay, then transform all back
      setTimeout(() => {
        AGENTS.forEach(agent => {
          dispatch({
            type: 'TRANSFORM_AGENT',
            agentId: agent.id,
            alignment: 'good',
          });
        });
      }, 2000);
    }

    // Handle money flow
    if (step.type === 'money_flow' && step.moneyChange) {
      dispatch({
        type: 'MONEY_CHANGE',
        amount: step.moneyChange,
        stepId: step.id,
        agentId: step.agentId,
      });
    }
  }, []);

  const advanceStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const complete = useCallback(() => {
    clearTimer();
    dispatch({ type: 'COMPLETE' });
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    dispatch({ type: 'RESET' });
  }, [clearTimer]);

  // Get display data for an agent (returns evil variant if alignment is evil)
  const getAgentDisplayData = useCallback(
    (agent: AgentMetadata): AgentMetadata & { colorTheme?: { primary: string; glow: string; border: string } } => {
      const alignment = state.agentAlignments[agent.id];
      if (alignment === 'evil' || alignment === 'transitioning') {
        const evil = EVIL_VARIANTS[agent.id];
        if (evil) {
          return {
            ...agent,
            name: alignment === 'evil' ? evil.name : agent.name,
            description: evil.description,
            personality: evil.personality,
            trustScore: evil.trustScore,
            colorTheme: evil.colorTheme,
          };
        }
      }
      return { ...agent, colorTheme: undefined };
    },
    [state.agentAlignments]
  );

  // Get current step
  const currentStep = state.currentScenario?.steps[state.currentStepIndex] ?? null;

  // Is simulation active?
  const isActive = state.status === 'playing' || state.status === 'paused';

  return {
    state,
    dispatch,
    currentStep,
    isActive,

    // Actions
    startSetup,
    setUserProfile,
    loadAndPlay,
    pause,
    resume,
    setSpeed,
    processStep,
    advanceStep,
    complete,
    reset,
    getAgentDisplayData,

    // Refs for external timer management
    playbackTimer,
    clearTimer,
  };
}
