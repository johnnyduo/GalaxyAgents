/**
 * IndexedDB Storage Service for Galaxy Agents
 * Handles persistent storage for simulation history, task results, and app state.
 * No external dependencies — uses raw IndexedDB API.
 */

import { AgentTaskResult, SimulationRecord } from '../types';

const DB_NAME = 'galaxy-agents';
const DB_VERSION = 1;

const STORES = {
  TASK_RESULTS: 'taskResults',
  SIMULATION_HISTORY: 'simulationHistory',
  APP_STATE: 'appState',
} as const;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      // Task results: indexed by agentId and timestamp
      if (!db.objectStoreNames.contains(STORES.TASK_RESULTS)) {
        const taskStore = db.createObjectStore(STORES.TASK_RESULTS, { keyPath: 'id', autoIncrement: true });
        taskStore.createIndex('agentId', 'agentId', { unique: false });
        taskStore.createIndex('timestamp', 'timestamp', { unique: false });
        taskStore.createIndex('taskType', 'taskType', { unique: false });
      }

      // Simulation history: indexed by scenarioId and completedAt
      if (!db.objectStoreNames.contains(STORES.SIMULATION_HISTORY)) {
        const simStore = db.createObjectStore(STORES.SIMULATION_HISTORY, { keyPath: 'id' });
        simStore.createIndex('scenarioId', 'scenarioId', { unique: false });
        simStore.createIndex('completedAt', 'completedAt', { unique: false });
      }

      // Key-value store for app state (nodePositions, activeAgents, etc.)
      if (!db.objectStoreNames.contains(STORES.APP_STATE)) {
        db.createObjectStore(STORES.APP_STATE, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ===========================
// TASK RESULTS
// ===========================

export async function saveTaskResult(result: AgentTaskResult): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.TASK_RESULTS, 'readwrite');
    tx.objectStore(STORES.TASK_RESULTS).add({ ...result, id: `${result.agentId}-${result.timestamp}` });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function saveTaskResults(results: AgentTaskResult[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.TASK_RESULTS, 'readwrite');
    const store = tx.objectStore(STORES.TASK_RESULTS);
    for (const result of results) {
      store.put({ ...result, id: `${result.agentId}-${result.timestamp}` });
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getTaskResults(limit = 100): Promise<AgentTaskResult[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.TASK_RESULTS, 'readonly');
    const store = tx.objectStore(STORES.TASK_RESULTS);
    const index = store.index('timestamp');
    const request = index.openCursor(null, 'prev');
    const results: AgentTaskResult[] = [];

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor && results.length < limit) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getTaskResultsByAgent(agentId: string): Promise<AgentTaskResult[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.TASK_RESULTS, 'readonly');
    const store = tx.objectStore(STORES.TASK_RESULTS);
    const index = store.index('agentId');
    const request = index.getAll(agentId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function clearTaskResults(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.TASK_RESULTS, 'readwrite');
    tx.objectStore(STORES.TASK_RESULTS).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ===========================
// SIMULATION HISTORY
// ===========================

export async function saveSimulationRecord(record: SimulationRecord): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.SIMULATION_HISTORY, 'readwrite');
    tx.objectStore(STORES.SIMULATION_HISTORY).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getSimulationHistory(limit = 50): Promise<SimulationRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.SIMULATION_HISTORY, 'readonly');
    const store = tx.objectStore(STORES.SIMULATION_HISTORY);
    const index = store.index('completedAt');
    const request = index.openCursor(null, 'prev');
    const results: SimulationRecord[] = [];

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor && results.length < limit) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getSimulationsByScenario(scenarioId: string): Promise<SimulationRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.SIMULATION_HISTORY, 'readonly');
    const index = tx.objectStore(STORES.SIMULATION_HISTORY).index('scenarioId');
    const request = index.getAll(scenarioId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function clearSimulationHistory(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.SIMULATION_HISTORY, 'readwrite');
    tx.objectStore(STORES.SIMULATION_HISTORY).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ===========================
// APP STATE (key-value)
// ===========================

export async function saveAppState(key: string, value: any): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.APP_STATE, 'readwrite');
    tx.objectStore(STORES.APP_STATE).put({ key, value });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAppState<T = any>(key: string): Promise<T | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.APP_STATE, 'readonly');
    const request = tx.objectStore(STORES.APP_STATE).get(key);
    request.onsuccess = () => {
      resolve(request.result ? request.result.value : null);
    };
    request.onerror = () => reject(request.error);
  });
}

// ===========================
// MIGRATION: localStorage → IndexedDB
// ===========================

export async function migrateFromLocalStorage(): Promise<void> {
  try {
    // Migrate task results
    const storedResults = localStorage.getItem('taskResults');
    if (storedResults) {
      const results: AgentTaskResult[] = JSON.parse(storedResults);
      if (results.length > 0) {
        await saveTaskResults(results);
        localStorage.removeItem('taskResults');
      }
    }

    // Migrate node positions
    const positions = localStorage.getItem('nodePositions');
    if (positions) {
      await saveAppState('nodePositions', JSON.parse(positions));
      localStorage.removeItem('nodePositions');
    }

    // Migrate active agents
    const agents = localStorage.getItem('activeAgents');
    if (agents) {
      await saveAppState('activeAgents', JSON.parse(agents));
      localStorage.removeItem('activeAgents');
    }

    // Migrate agent connections
    const connections = localStorage.getItem('agentConnections');
    if (connections) {
      await saveAppState('agentConnections', JSON.parse(connections));
      localStorage.removeItem('agentConnections');
    }

    // Migrate operation mode
    const mode = localStorage.getItem('operationMode');
    if (mode) {
      await saveAppState('operationMode', mode);
      localStorage.removeItem('operationMode');
    }
  } catch (err) {
    console.warn('Migration from localStorage failed, will use fresh state:', err);
  }
}

// ===========================
// EXPORT: Full data dump for download
// ===========================

export async function exportAllData(): Promise<{
  taskResults: AgentTaskResult[];
  simulationHistory: SimulationRecord[];
  exportedAt: number;
}> {
  const [taskResults, simulationHistory] = await Promise.all([
    getTaskResults(500),
    getSimulationHistory(100),
  ]);

  return {
    taskResults,
    simulationHistory,
    exportedAt: Date.now(),
  };
}
