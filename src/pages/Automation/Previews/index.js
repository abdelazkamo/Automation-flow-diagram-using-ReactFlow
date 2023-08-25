import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomNode from "../../../components/Node";

const useStyles = makeStyles(() => ({
  formContainer: {
    flexGrow: 1,
    overflowY: "auto",
    marginBottom: "5rem",
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <div className={classes.formContainer}>
      <CustomNode />
    </div>
  );
};

export default Index;
