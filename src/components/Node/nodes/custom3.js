import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

const handleStyle = {
  background: "#ADADAD",
  width: "6px",
  height: "6px",
  borderRadius: "60%",
};

function CustomNode3({ id, isConnectable }) {
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
          <FilterListIcon
            style={{
              fontSize: "16px",
              color: "#096a09",
              borderRadius: "5px",
              padding: "2px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 2px 0.5px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        <div style={{ marginTop: "5px" }}>Condition</div>
        {isHover && (
          <div className="deleteIcon">
            <DeleteIcon
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
              onClick={handleDeleteNode}
            />
          </div>
        )}
      </div>
      <div className="sub_header">
        <div style={{ paddingBottom: "5px", fontSize: "9px" }}>
          First name is Abdel Aziz
        </div>
      </div>
      <div className="sub_header">
        <div
          style={{
            fontSize: "9px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <div>First name Equal Abdel Aziz</div>
          <div>Last name Not equal Kamo</div>
          <div>Email Has any value</div>
          <div>Tag Unknown</div>
          <div>Working hours Equal In working hours</div>
        </div>
      </div>
      <div
        style={{
          fontSize: "7px",
          textAlign: "right",
        }}
        className="footer"
      >
        <span style={{ marginRight: "20px" }}>Not match any conditions</span>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        id="d"
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
          id="e"
          style={handleStyle}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}

export default CustomNode3;
