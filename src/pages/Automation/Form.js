import { useCallback, useEffect, useState } from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Form.css";

import { useSelector, useDispatch } from "react-redux";
import { saveEntireState } from "../../store/action/action";

const useStyles = makeStyles(() => ({
  formContainer: {
    flexGrow: 1,
    overflowY: "auto",
    minHeight: "100vh",
  },
}));
const Form = () => {
  const classes = useStyles();

  const data = useSelector((state) => state); // Get the entire state
  const dispatch = useDispatch();

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    setInitialData(data);
  }, [data]);

  const [state, setState] = useState({
    message: initialData?.message,
    userInput: initialData?.userInput,
    btn1: initialData?.btn1,
    btn2: initialData?.btn2,
    isNodeClicked: true,
  });

  const handleSaveState = () => {
    dispatch(saveEntireState(state)); // Dispatch the action with the current state
  };

  useEffect(() => {
    handleSaveState();
  }, [state]);

  const onChangeMessage = useCallback((evt) => {
    setState((prevState) => ({
      ...prevState,
      message: evt.target.value,
    }));
  }, []);
  const onChangeUserInput = useCallback((evt) => {
    setState((prevState) => ({
      ...prevState,
      userInput: evt.target.value,
    }));
  }, []);
  const onChangeBtn1 = useCallback((evt) => {
    setState((prevState) => ({
      ...prevState,
      btn1: evt.target.value,
    }));
  }, []);
  const onChangeBtn2 = useCallback((evt) => {
    setState((prevState) => ({
      ...prevState,
      btn2: evt.target.value,
    }));
  }, []);
  return (
    <div className={classes.formContainer}>
      {data?.yourReducer?.isNodeClicked && (
        <Grid container>
          <div className="node">
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
                style={{
                  borderBottom: "1px solid #e7e7e7",
                  paddingBottom: "5px",
                }}
              >
                Send Message
              </div>
              <input
                id="text"
                name="text"
                type="text"
                placeholder="Enter message"
                style={{
                  border: "none",
                  outline: "none",

                  paddingTop: "5px",
                }}
                onChange={onChangeMessage}
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <textarea
                  type="text"
                  name="userInput"
                  value={state.userInput}
                  onChange={onChangeUserInput}
                  style={{
                    border: "1px solid #e7e7e7",
                    borderRadius: "5px",
                    padding: "5px",
                    outline: "none",
                    height: 50,
                    resize: "none",
                  }}
                />

                <div
                  style={{
                    border: "1px solid #e7e7e7",
                    borderRadius: "5px",

                    padding: "3px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  <input
                    type="text"
                    name="btn1"
                    value={state.btn1}
                    style={{
                      border: "none",
                      padding: "5px",
                      outline: "none",
                    }}
                    onChange={onChangeBtn1}
                  />
                </div>

                <div
                  style={{
                    border: "1px solid #e7e7e7",
                    borderRadius: "5px",

                    padding: "3px",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                  }}
                >
                  <input
                    type="text"
                    name="btn2"
                    value={state.btn2}
                    style={{
                      border: "none",
                      padding: "5px",
                      outline: "none",
                    }}
                    onChange={onChangeBtn2}
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>
      )}
    </div>
  );
};

export default Form;
