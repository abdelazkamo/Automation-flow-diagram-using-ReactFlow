import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import DeleteIcon from "@material-ui/icons/Delete";
import IMG from "../img/2.png";
import VIDEO from "../img/video.mp4";

const handleStyle = {
  background: "#B7D0F0",
  width: "6px",
  height: "6px",
  borderRadius: "60%",
};

function CustomNode2({ id, isConnectable }) {
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
          }}
        >
          Image
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div
            style={{
              border: "1px solid #e7e7e7",
              borderRadius: "0 0 5px 5px",
              padding: "5px",
              fontSize: "9px",
              marginBottom: "5px",
            }}
          >
            <img
              src={IMG}
              alt="image"
              style={{ width: "120px", height: "40px" }}
            />
          </div>
        </div>
        <div
          style={{
            marginBottom: "5px",
          }}
        >
          Video
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div>
            <video
              controls
              width="125px"
              height="45px"
              style={{
                border: "1px solid #e7e7e7",
                borderRadius: "0 0 5px 5px",
              }}
            >
              <source src={VIDEO} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="footer"></div>

      <Handle
        type="target"
        position={Position.Top}
        id="b"
        style={{
          background: "#B7D0F0",
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
          bottom: 7,
          right: 10,
        }}
      >
        <Handle
          type="source"
          position={Position.Bottom}
          id="c"
          style={handleStyle}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}

export default CustomNode2;
