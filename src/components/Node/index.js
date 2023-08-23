import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import "./custom.css";

import Custom from "./custom.js";
import Custom2 from "./custom2.js";
import Custom3 from "./custom3.js";
import Custom4 from "./custom4.js";

import ButtonEdge from "./customEdge";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component

// our custom nodes
const nodeTypes = {
  customNode1: Custom,
  customNode2: Custom2,
  customNode3: Custom3,
  customNode4: Custom4,
};

// our custom edges
const edgeTypes = {
  buttonedge: ButtonEdge,
};
const rfStyle = {
  backgroundColor: "#F7F7FA",
};

const initialNodes = [
  {
    id: "node-1",
    type: "customNode1",
    position: { x: 0, y: 0 },
  },
  {
    id: "node-2",
    type: "customNode2",
    position: { x: 190, y: 0 },
  },
  {
    id: "node-3",
    type: "customNode3",
    position: { x: 380, y: 0 },
  },
  {
    id: "node-4",
    type: "customNode4",
    position: { x: 570, y: 0 },
  },
];

const initialEdges = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    type: "buttonedge",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "edge-2",
    source: "node-2",
    target: "node-3",
    type: "buttonedge",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "edge-3",
    source: "node-3",
    target: "node-4",
    type: "buttonedge",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "buttonedge",
            markerEnd: { type: MarkerType.ArrowClosed },

            data: { setEdges },
          },
          eds
        )
      ),
    [setEdges]
  );
  const proOptions = { hideAttribution: true };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        style={rfStyle}
      >
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
    </div>
  );
}

export default Flow;
