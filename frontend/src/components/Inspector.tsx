import { useChaosStore } from '../store/chaosStore';
import { Database, CheckCircle2, Circle } from 'lucide-react';
import initialData from '../data/mock_graph.json';

export default function Inspector() {
  const { activeNodeId, attackMap, toggleColumn, isChaosActive, fleetDriftData } = useChaosStore();
  
  if (!activeNodeId) return null;
  const node = initialData.nodes.find(n => n.id === activeNodeId);
  if (!node) return null;

  const currentSelection = attackMap[activeNodeId]?.columns || [];
  const tableDrift = fleetDriftData.find(d => d.tableName === node.data.label);

  return (
    <div className="absolute left-5 top-24 w-80 bg-[#111]/95 backdrop-blur-lg border border-white/10 rounded-3xl p-6 z-40 shadow-2xl animate-in fade-in slide-in-from-left-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg"><Database size={18} className="text-blue-400" /></div>
          <h2 className="text-sm font-black uppercase tracking-tighter">{node.data.label}</h2>
        </div>
      </div>

      <div className="space-y-2">
        {node.data.fields.map((field: string) => {
          const isT = currentSelection.includes(field);
          const drift = tableDrift?.drifts.find(d => d.originalField === field);
          
          return (
            <button
              key={field}
              disabled={isChaosActive}
              onClick={() => toggleColumn(node.id, node.data.label, field)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                isT ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/5 border-transparent hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {isT ? <CheckCircle2 size={16} className="text-blue-400" /> : <Circle size={16} className="text-gray-700" />}
                <span className={`text-xs font-mono ${drift ? 'line-through text-red-500' : 'text-gray-400'}`}>{field}</span>
              </div>
              {drift && <span className="text-[10px] font-bold text-[#00ff9d]">{drift.brokenField}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
