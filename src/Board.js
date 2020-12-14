import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import "./Board.css";

function Board({ givenRows, squares, onClick }) {
  const [rows, setRows] = useState([]);
  const [renderSquare, setRenderSquare] = useState([]);
  const incrementor = useRef(0)

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
      {rows.map((row, index) => (
        <div key={index} className="board__row">
          {renderSquare.map((i) => {
            // Each row should return three squares so we have 9 Square components from 0 to 8
            row == 0 ? incrementor.current : incrementor.current += 3
            i += incrementor.current

            return (
              <Square
                key={`square${index}${i}`}
                value={squares[i]}
                onClick={() => onClick([i])}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
