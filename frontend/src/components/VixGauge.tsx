import { useChaosStore } from '../store/chaosStore';

export default function VixGauge() {
  const { vixScore, isChaosActive } = useChaosStore();

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a]/90 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-6">
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">System Risk</span>
        <span className="text-xs font-bold text-gray-400">DATA VIX INDEX</span>
      </div>
      <div className="h-8 w-px bg-white/10" />
      <div className="flex items-baseline gap-1">
        <span className={`text-4xl font-black font-mono transition-colors duration-500 ${isChaosActive ? 'text-red-500' : 'text-[#00ff9d]'}`}>
          {vixScore.toFixed(1)}
        </span>
        <span className="text-gray-600 text-xs font-bold">/ 100</span>
      </div>
    </div>
  );
}
