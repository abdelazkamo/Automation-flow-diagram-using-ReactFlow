import { useCallback, useLayoutEffect, useState } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MarkerType,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./nodes/custom.css";

import Custom from "./nodes/custom.js";
import Custom2 from "./nodes/custom2.js";
import Custom3 from "./nodes/custom3.js";
import Custom4 from "./nodes/custom4.js";

import ButtonEdge from "./edges/customEdge";

const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

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
  const [clickedNode, setClickedNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onNodeClick = useCallback(
    (node) => {
      setClickedNode(node);
    },
    [setClickedNode]
  );

  console.log("Node clicked:", clickedNode);

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
  // Hide reactflow attribution
  const proOptions = { hideAttribution: true };

  const { fitView } = useReactFlow();

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);

          window.requestAnimationFrame(() => fitView());
        }
      );
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: "RIGHT", useInitialNodes: true });
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        style={rfStyle}
      >
        <Controls />
        <Panel position="top-right">
          <button onClick={() => onLayout({ direction: "DOWN" })}>
            vertical layout
          </button>

          <button onClick={() => onLayout({ direction: "RIGHT" })}>
            horizontal layout
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
