import { Alert, styled } from "@mui/material";
import React from "react";
const AlertMessage = styled(Alert)({
  width: "350px",
  height: "50px",
  position: "absolute",
  top: "20px",
  left: "10%",
});

const AlertMessageComponent = ({message}) => {
  return <AlertMessage severity='info'>{message}</AlertMessage>;
};

export default AlertMessageComponent;
