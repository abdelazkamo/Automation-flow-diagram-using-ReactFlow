import React, { useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "reactflow";

import "./customEdge.css";
import { useCallback } from "react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Handle edge click event
  const reactFlow = useReactFlow();

  const onEdgeClick = useCallback(
    (evt: { stopPropagation: () => void }, id: string) => {
      evt.stopPropagation();
      reactFlow.setEdges((edges) => edges.filter((edge) => edge.id !== id));
    },
    [reactFlow]
  );
  const [isHover, setIsHover] = useState(false);

  return (
    <g
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {isHover && (
            <button
              className="edgebutton"
              onClick={(event) => onEdgeClick(event, id)}
            >
              ×
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </g>
  );
}
