import { useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { useChaosStore } from '../store/chaosStore';
import initialData from '../data/mock_graph.json';

export default function FlowGraph() {
  const { isChaosActive, infectedNodes, activeNodeId, setActiveNode, attackMap } = useChaosStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  const onNodeClick = useCallback((_: any, node: any) => {
    setActiveNode(node.id, node.data.label, node.data.fields || []);
  }, [setActiveNode]);

  useEffect(() => {
    setNodes((nds) => nds.map((node) => {
      const isInf = infectedNodes.includes(node.id);
      const isTarget = !!attackMap[node.id];
      const isViewed = activeNodeId === node.id;
      const orig = initialData.nodes.find(n => n.id === node.id)?.style || {};

      return {
        ...node,
        style: {
          ...orig,
          background: isInf ? '#450a0a' : isTarget ? '#1e3a8a' : isViewed ? '#222' : orig.background,
          border: isInf ? '2px solid #ff4d4d' : isTarget ? '2px solid #3b82f6' : isViewed ? '2px solid #555' : orig.border,
          boxShadow: isTarget ? '0 0 20px rgba(59,130,246,0.4)' : 'none',
          transition: 'all 0.3s'
        }
      };
    }));
    setEdges((eds) => eds.map((edge) => ({
      ...edge,
      style: { 
        stroke: isChaosActive && infectedNodes.includes(edge.target) ? '#ff4d4d' : '#00ff9d', 
        strokeWidth: isChaosActive && infectedNodes.includes(edge.target) ? 3 : 1 
      }
    })));
  }, [isChaosActive, infectedNodes, activeNodeId, attackMap]);

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onNodeClick={onNodeClick} fitView>
        <Background color="#111" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
