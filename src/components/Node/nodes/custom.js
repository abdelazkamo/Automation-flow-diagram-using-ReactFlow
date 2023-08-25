import React, { useCallback, useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import DeleteIcon from "@material-ui/icons/Delete";
import { ClickAwayListener } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { saveEntireState } from "../../../store/action/action";

function CustomNode({ id, isConnectable }) {
  const data = useSelector((state) => state.yourReducer);
  const dispatch = useDispatch();
  console.log("data", data);

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    setInitialData(data);
  }, [data]);

  const [state, setState] = useState({
    message: initialData?.message,
    userInput: initialData?.userInput,
    btn1: initialData?.btn1,
    btn2: initialData?.btn2,
    isNodeClicked: false,
  });

  // useEffect(() => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     message: data?.yourReducer?.message,
  //     userInput: data?.yourReducer?.userInput,
  //     btn1: data?.yourReducer?.btn1,
  //     btn2: data?.yourReducer?.btn2,
  //   }));
  // }, [state]);

  const { deleteElements } = useReactFlow();

  const handleDeleteNode = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  const [isHover, setIsHover] = useState(false);

  const handleSaveState = useCallback(() => {
    dispatch(saveEntireState(state));
  }, [dispatch, state]);

  useEffect(() => {
    handleSaveState();
  }, [state]);

  const handleNodeFocus = () => {
    setState((prevState) => ({
      ...prevState,
      isNodeClicked: true,
    }));
  };

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
      <div className="text-updater-node" onClick={handleNodeFocus}>
        <div className="custom_header">
          <div style={{ padding: "5px" }}>
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
        {data?.message && (
          <div className="sub_header">
            <div
              style={{
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "5px",
              }}
            >
              Send Message
            </div>
            <div style={{ fontSize: "9px", paddingTop: "5px", minHeight: 15 }}>
              {data.message}
            </div>
          </div>
        )}

        {data?.userInput && (
          <div className="sub_header">
            <div
              style={{
                marginBottom: "5px",
                paddingBottom: "5px",
                borderBottom: "1px solid #e7e7e7",
              }}
            >
              User input
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <div
                style={{
                  border: "1px solid #e7e7e7",
                  borderRadius: "5px",
                  padding: "5px",
                  fontSize: "9px",
                  minHeight: 50,
                }}
              >
                {data.userInput}
              </div>
              {data.btn1 && (
                <div
                  style={{
                    border: "1px solid #e7e7e7",
                    position: "relative",
                    borderRadius: "5px",
                    fontSize: "9px",
                    padding: "3px",
                    display: "flex",
                  }}
                >
                  <div style={{ minHeight: 15 }}>{data.btn1}</div>

                  <Handle
                    type="source"
                    position={Position.Right}
                    id="a"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    isConnectable={isConnectable}
                  />
                </div>
              )}
              {data.btn2 && (
                <div
                  style={{
                    border: "1px solid #e7e7e7",
                    position: "relative",
                    borderRadius: "5px",
                    fontSize: "9px",
                    padding: "3px",
                    display: "flex",
                  }}
                >
                  <div style={{ minHeight: 15 }}>{data.btn2}</div>
                  <Handle
                    type="source"
                    position={Position.Right}
                    id="ab"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    isConnectable={isConnectable}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <div className="footer">
          <Handle
            type="source"
            position={Position.Right}
            id="ac"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "8px",
            }}
            isConnectable={isConnectable}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomNode;
