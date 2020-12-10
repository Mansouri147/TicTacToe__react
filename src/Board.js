import React from "react";
import Square from "./Square";

function Board(i) {

  return (
    <div className="board">
      <Square value={i} />
      <Square value={i} />
      <Square value={i} />
      <Square value={i} />
      <Square value={i} />
      <Square value={i} />
      <Square value={i} />
      <Square value={i} />
      <Square value={i} />
    </div>
  );
}

export default Board;
