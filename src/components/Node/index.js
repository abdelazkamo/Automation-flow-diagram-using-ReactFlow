import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
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
import Modal from "react-modal";

import Custom from "./nodes/custom.js";
import Custom2 from "./nodes/custom2.js";
import Custom3 from "./nodes/custom3.js";
import Custom4 from "./nodes/custom4.js";

import ButtonEdge from "./edges/customEdge";

Modal.setAppElement("#root"); // Set the app element for accessibility

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
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      width: 100,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })),
      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

const nodeTypes = {
  customNode1: Custom,
  customNode2: Custom2,
  customNode3: Custom3,
  customNode4: Custom4,
};

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

  const [showModal, setShowModal] = useState(false);
  const [sourceNodeId, setSourceNodeId] = useState(null);
  const [targetNodeId, setTargetNodeId] = useState(null);

  const handleEdgeStart = (event, sourceNode) => {
    setSourceNodeId(sourceNode.id);
  };

  const handleEdgeEnd = (event, targetNode) => {
    // setTargetNodeId(targetNode.id);
    setShowModal(true);
  };

  const handleNodeTypeSelect = (selectedNodeType) => {
    setShowModal(false);

    const newTargetNode = {
      id: Date.now().toString(),
      type: selectedNodeType,
      position: { x: 200, y: 200 },
    };

    setNodes((prevNodes) => [...prevNodes, newTargetNode]);

    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `edge-${sourceNodeId}-${targetNodeId}`,
        source: sourceNodeId,
        target: newTargetNode.id,
      },
    ]);

    setSourceNodeId(null);
    setTargetNodeId(null);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setSourceNodeId(null);
    setTargetNodeId(null);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const connectionCreated = useRef(false);

  const onConnect = useCallback(
    (connection) => {
      connectionCreated.current = true;
      setShowModal(false);

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
      );
    },
    [setEdges, setShowModal]
  );

  const onConnectEnd = useCallback(() => {
    // if no connection was created, show an alert (or in your case a modal)
    if (!connectionCreated.current) {
      //alert("Connection was dropped but no connection was created.");
      setShowModal(true);
    }

    // reset the flag
    connectionCreated.current = false;
  }, [connectionCreated]);

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

  useLayoutEffect(() => {
    onLayout({ direction: "RIGHT", useInitialNodes: true });
  }, []);
  const modalStyles = {
    content: {
      width: "100px",
      height: "120px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  };
  const optionStyles = {
    border: "1px solid black",
    textAlign: "center",
    cursor: "pointer",
    display: "block",
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // onConnectStart={handleEdgeStart}
        // onConnectEnd={handleEdgeEnd}
        fitView
        style={rfStyle}
      >
        <Controls />
        <Panel position="top-right">
          <button onClick={() => onLayout({ direction: "RIGHT" })}>
            Horizontal Layout
          </button>
        </Panel>
      </ReactFlow>
      <Modal
        isOpen={showModal}
        onRequestClose={handleModalCancel}
        style={modalStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div
          onClick={() => handleNodeTypeSelect("customNode4")}
          style={optionStyles}
        >
          Action
        </div>
        <div
          onClick={() => handleNodeTypeSelect("customNode1")}
          style={optionStyles}
        >
          Message
        </div>
        <div
          onClick={() => handleNodeTypeSelect("customNode3")}
          style={optionStyles}
        >
          Condition
        </div>
        <div onClick={handleModalCancel} style={optionStyles}>
          Cancel
        </div>
      </Modal>
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
