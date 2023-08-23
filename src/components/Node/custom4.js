import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import DeleteIcon from "@material-ui/icons/Delete";

const handleStyle = {
  background: "#ADADAD",
  width: "6px",
  height: "6px",
  borderRadius: "60%",
};

function TextUpdaterNode({ id, isConnectable }) {
  const { deleteElements } = useReactFlow();
  const handleDeleteNode = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="text-updater-node"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="custom_header">
        <div
          style={{
            padding: "5px",
          }}
        >
          <FlashOnIcon
            style={{
              fontSize: "16px",
              color: "#8F4496",
              borderRadius: "5px",
              padding: "2px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 2px 0.5px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        <div style={{ marginTop: "5px" }}>Actions</div>
        {isHover && (
          <div className="deleteIcon">
            <DeleteIcon
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
              onClick={handleDeleteNode}
            />
          </div>
        )}
      </div>

      <div
        style={{
          padding: "8px",
          margin: "5px",
          fontSize: "9px",
          border: "1px solid #e7e7e7",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        Add an Action
      </div>

      <div className="footer"></div>
      <Handle
        type="target"
        position={Position.Top}
        id="f"
        style={{
          background: "#ADADAD",
          width: "6px",
          height: "6px",
          borderRadius: "60%",
          left: 10,
        }}
        isConnectable={isConnectable}
      />

      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        <Handle
          type="source"
          position={Position.Bottom}
          id="g"
          style={handleStyle}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}

export default TextUpdaterNode;
