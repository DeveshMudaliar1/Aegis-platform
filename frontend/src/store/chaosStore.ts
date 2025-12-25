import { create } from 'zustand';

interface TableDrift {
  tableName: string;
  drifts: { originalField: string; brokenField: string; }[];
  sql: string;
}

interface ChaosState {
  isChaosActive: boolean;
  activeNodeId: string | null; // Currently viewed in Inspector
  attackMap: Record<string, { label: string, columns: string[] }>; // nodeID -> {label, columns}
  infectedNodes: string[];
  vixScore: number;
  fleetDriftData: TableDrift[];
  
  setActiveNode: (id: string, label: string, fields: string[]) => void;
  toggleColumn: (nodeId: string, label: string, field: string) => void;
  triggerFleetChaos: (infected: string[], score: number, fleetData: TableDrift[]) => void;
  resolveChaos: () => void;
}

export const useChaosStore = create<ChaosState>((set) => ({
  isChaosActive: false,
  activeNodeId: null,
  attackMap: {},
  infectedNodes: [],
  vixScore: 12.5,
  fleetDriftData: [],
  
  setActiveNode: (id) => set({ activeNodeId: id }),
  
  toggleColumn: (nodeId, label, field) => set((state) => {
    const currentTarget = state.attackMap[nodeId] || { label, columns: [] };
    const newColumns = currentTarget.columns.includes(field)
      ? currentTarget.columns.filter(f => f !== field)
      : [...currentTarget.columns, field];
    
    const newMap = { ...state.attackMap };
    if (newColumns.length === 0) delete newMap[nodeId];
    else newMap[nodeId] = { label, columns: newColumns };
    
    return { attackMap: newMap };
  }),

  triggerFleetChaos: (infected, score, fleetData) => set({ 
    isChaosActive: true, 
    infectedNodes: infected, 
    vixScore: score, 
    fleetDriftData: fleetData 
  }),

  resolveChaos: () => set({ 
    isChaosActive: false, 
    activeNodeId: null, 
    attackMap: {}, 
    infectedNodes: [], 
    vixScore: 12.5, 
    fleetDriftData: [] 
  })
}));
