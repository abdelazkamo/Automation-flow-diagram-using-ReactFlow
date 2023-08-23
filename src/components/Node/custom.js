import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import DeleteIcon from "@material-ui/icons/Delete";

function CustomNode({ id, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const { deleteElements } = useReactFlow();

  const handleDeleteNode = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="container"
    >
      {isHover && (
        <div className="deleteIcon">
          <DeleteIcon
            style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            onClick={handleDeleteNode}
          />
        </div>
      )}
      <div className="text-updater-node">
        <div
          style={{
            display: "flex",
          }}
          className="custom_header"
        >
          <div
            style={{
              padding: "5px",
            }}
          >
            <WhatsAppIcon
              style={{
                fontSize: "16px",
                color: "#22D954",
                borderRadius: "5px",
                padding: "2px",
                backgroundColor: "#fff",
                boxShadow: "0px 0px 2px 0.5px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
          <div style={{ marginTop: "5px" }}>Send Message</div>
        </div>
        <div className="sub_header">
          <div
            style={{ borderBottom: "1px solid #e7e7e7", paddingBottom: "5px" }}
          >
            Send Message
          </div>
          <input
            id="text"
            name="text"
            placeholder="Enter message"
            style={{
              border: "none",
              outline: "none",
              fontSize: "9px",
              paddingTop: "5px",
            }}
            onChange={onChange}
          />
        </div>
        <div style={{ height: "160px" }} className="sub_header">
          <div
            style={{
              marginBottom: "5px",
              paddingBottom: "5px",
              borderBottom: "1px solid #e7e7e7",
            }}
          >
            User input
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div
              style={{
                border: "1px solid #e7e7e7",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "9px",
              }}
            >
              By the way, Can you please type your email? So, we can contact you
              and let you know more about us and our products
            </div>
            <div
              style={{
                border: "1px solid #e7e7e7",
                borderRadius: "5px",
                fontSize: "9px",
                padding: "3px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div>btn1</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  color: "blue",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                o
              </div>
            </div>
            <div
              style={{
                border: "1px solid #e7e7e7",
                borderRadius: "5px",
                fontSize: "9px",
                padding: "3px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div>btn2</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                o
              </div>
            </div>
          </div>
        </div>
        <div className="footer"></div>
        <Handle
          type="source"
          position={Position.Right}
          id="a"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}

export default CustomNode;
