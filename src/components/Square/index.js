import React from "react";
import "./styles.css";
import { Button, IconButton } from "@material-ui/core";

function Square(props) {
  return (
    <Button
      variant="outlined"
      className="square__button"
      onClick={props.onClick}
      fontSize="large"
      style={{ fontSize: 100 }}
      color={
        props.value == "X"
          ? "primary"
          : props.value == "O"
          ? "secondary"
          : "default"
      }
    >
      {props.value}
    </Button>
  );
}

export default Square;
