import { ReactFlowProvider } from 'reactflow';
import FlowGraph from './components/FlowGraph';
import VixGauge from './components/VixGauge';
import ChaosBar from './components/ChaosBar';
import Copilot from './components/Copilot';
import Inspector from './components/Inspector';

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="w-screen h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="w-full h-full">
          <FlowGraph />
        </div>
        <Inspector />
        <VixGauge />
        <ChaosBar />
        <Copilot />
        <div className="absolute top-5 left-5 z-50 pointer-events-none">
          <h1 className="text-2xl font-black tracking-tighter">AEGIS</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">AI Assurance & Resilience</p>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
