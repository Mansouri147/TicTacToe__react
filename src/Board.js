import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import "./Board.css";

function Board({ givenRows, squares, onClick, xIsNext }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      Array(givenRows)
        .fill(null)
        .map((item, i) => i)
    );
  }, [givenRows]);

  return (
    <div className="board">
      {rows.map((row) => (
        <div key={row} className="board__row">
          {rows.map((i) => {
            let squareIndex = i + rows.length * row;
            return (
              <Square
                key={`square${row}${squareIndex}`}
                value={squares[squareIndex]}
                onClick={() => onClick([squareIndex])}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
