import { Zap, Play } from 'lucide-react';
import { useChaosStore } from '../store/chaosStore';
import initialData from '../data/mock_graph.json';

export default function ChaosBar() {
  const { attackMap, triggerFleetChaos, isChaosActive } = useChaosStore();
  const targetIds = Object.keys(attackMap);

  const handleFleetInject = () => {
    if (targetIds.length === 0) return;

    const infected = [...targetIds];
    const stack = [...targetIds];
    while (stack.length > 0) {
      const current = stack.pop();
      initialData.edges.forEach(edge => {
        if (edge.source === current && !infected.includes(edge.target)) {
          infected.push(edge.target);
          stack.push(edge.target);
        }
      });
    }

    const fleetData = targetIds.map(nodeId => {
      const target = attackMap[nodeId];
      const tableName = target.label.toLowerCase().replace(/ /g, '_');
      const drifts = target.columns.map(col => ({
        originalField: col,
        brokenField: col.substring(0, 3) + "_err"
      }));

      const selectLines = drifts.map(d => d.brokenField + " AS " + d.originalField).join(', ');
      const sql = "CREATE VIEW " + tableName + "_patch AS\nSELECT " + selectLines + ", * \nEXCEPT (" + target.columns.join(', ') + ")\nFROM " + tableName + ";";

      return { tableName: target.label, drifts, sql };
    });

    const totalColumns = targetIds.reduce((acc, id) => acc + attackMap[id].columns.length, 0);
    const score = Math.min(12.5 + (targetIds.length * 20) + (totalColumns * 5) + (infected.length * 5), 99.9);

    triggerFleetChaos(infected, score, fleetData);
  };

  if (isChaosActive) return null;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-[#111]/90 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Active Targets</span>
          <span className="text-sm font-black text-blue-400">{targetIds.length} TABLES</span>
        </div>
        <div className="flex flex-col border-l border-white/10 pl-4">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Total Payload</span>
          <span className="text-sm font-black text-red-500">
            {targetIds.reduce((acc, id) => acc + attackMap[id].columns.length, 0)} COLUMNS
          </span>
        </div>
      </div>
      <button 
        onClick={handleFleetInject}
        className="px-10 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-tighter flex items-center gap-3 transition-all"
      >
        <Zap size={18} fill="currentColor" /> Execute Fleet Chaos
      </button>
    </div>
  );
}
