import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import "./Board.css";

function Board({ givenRows, squares, onClick ,xIsNext}) {
  const [rows, setRows] = useState([]);
  const [renderSquare, setRenderSquare] = useState([]);
  const incrementor = useRef(0);
  
  useEffect(() => {
    setRows(
      Array(givenRows)
        .fill("n")
        .map((item, i) => (item = i))
    );
  }, [givenRows]);

  useEffect(() => {
    setRenderSquare(rows);
  }, [rows]);

  return (
    <div className="board">
      {rows.map((row) => (
        <div key={row} className="board__row">
          {renderSquare.map((i) => {
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
