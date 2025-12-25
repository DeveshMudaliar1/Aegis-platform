import { useChaosStore } from '../store/chaosStore';
import { ShieldAlert, Terminal, CheckCircle, Boxes } from 'lucide-react';

export default function Copilot() {
  const { isChaosActive, resolveChaos, fleetDriftData } = useChaosStore();
  if (!isChaosActive) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-[460px] bg-[#0a0a0a] border-l border-white/5 p-8 z-[100] shadow-[-50px_0_100px_rgba(0,0,0,0.9)] overflow-y-auto scroll-smooth">
      {/* Header Section */}
      <div className="flex items-center gap-4 text-red-500 mb-12">
        <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
            <ShieldAlert size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter italic leading-none">Fleet Failure</h2>
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">Multi-Service Correlation Active</p>
        </div>
      </div>

      {/* Remediation List */}
      <div className="space-y-12">
        {fleetDriftData.map((data, i) => (
          <div key={i} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="flex items-center gap-2 text-gray-400">
              <Boxes size={14} className="text-red-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-300">{data.tableName} Remediation</h3>
            </div>
            
            <div className="bg-[#111] border border-white/5 p-5 rounded-3xl space-y-4 shadow-inner">
               <div className="space-y-2">
                 {data.drifts.map((d, j) => (
                   <div key={j} className="flex justify-between font-mono text-[11px] py-1 border-b border-white/[0.02]">
                     <span className="text-gray-500">{d.originalField}</span>
                     <div className="flex items-center gap-2">
                        <span className="text-white opacity-20">&rarr;</span>
                        <span className="text-red-400 font-bold">{d.brokenField}</span>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="space-y-2">
                  <div className="flex items-center gap-2 opacity-50">
                    <Terminal size={10} />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Semantic Bridge SQL</span>
                  </div>
                  <pre className="text-[11px] text-[#00ff9d] font-mono leading-relaxed whitespace-pre-wrap bg-black/60 p-4 rounded-2xl border border-white/5 shadow-lg">
                    {data.sql}
                  </pre>
               </div>
            </div>
          </div>
        ))}

        {/* THE FIX: The Button is now part of the scrolling flow, at the very end */}
        <div className="pt-10 pb-20">
            <button 
                onClick={resolveChaos}
                className="group relative w-full bg-[#00ff9d] hover:bg-[#00e68e] text-black font-black py-6 rounded-3xl shadow-[0_20px_50px_rgba(0,255,157,0.15)] transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-3">
                    <CheckCircle size={22} /> 
                    <span className="text-lg">EXECUTE GLOBAL HEAL</span>
                </span>
            </button>
            <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6">
                Requires Senior Engineer Authorization
            </p>
        </div>
      </div>
    </div>
  );
}
