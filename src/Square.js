import React from "react";
import "./Square.css";
import { Button, IconButton } from "@material-ui/core";

function Square(props) {
  return (
    <IconButton>
      <Button
        variant="outlined"
        className="square"
        onClick={props.onClick}
        color={props.value == "X" ? "primary" : props.value == "O" ? "secondary" : ""}
      >
        {props.value}
      </Button>
    </IconButton>
  );
}

export default Square;
