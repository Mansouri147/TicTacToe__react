import React from "react";
import Game from "./Game";

function App(i) {
  // renderSquare(i) 
  const status = "Next player: X";
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <h1>hello</h1>
        {/* {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)} */}
      </div>
      <div className="board-row">
        {/* {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)} */}
      </div>
      <div className="board-row">
        {/* {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)} */}
      </div>
      <Game />
    </div>
  );
}

export default App;
