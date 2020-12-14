import React, { useState, useEffect } from "react";
import Board from "./Board";
import "./Game.css";
import { FormControl, IconButton, Input } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const getRowCol = (num) => {
  const RowCol = {
    1: { row: 1, col: 1 },
    2: { row: 1, col: 2 },
    3: { row: 1, col: 3 },
    4: { row: 2, col: 1 },
    5: { row: 2, col: 2 },
    6: { row: 2, col: 3 },
    7: { row: 3, col: 1 },
    8: { row: 3, col: 2 },
    9: { row: 3, col: 3 },
  };
  return [RowCol[num].row, RowCol[num].col];
};

function Game() {
  const [rows, setRows] = useState(3);
  const [input, setInput] = useState(3);
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      moveNumber: 0,
      sorter: 0,
    },
  ]);

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const moveNumber = parseInt(i) + 1;
    const h = history.slice(0, stepNumber + 1);
    const current = h[h.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      history.concat([
        {
          squares: squares,
          moveNumber,
          sorter: stepNumber + 1,
        },
      ])
    );

    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => setStepNumber(step);

  useEffect(() => {
    setXIsNext(stepNumber % 2 === 0);
  }, [stepNumber]);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  // setHistory([...history].sort((a, b) => b.sorter - a.sorter));

  return (
    <div className="game">
      <div className="game__input">
        <form className="app__form">
          <FormControl className="app__formControl">
            <Input
              className="app__input"
              placeholder="Number of rows Required"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton
              className="app__iconButton"
              variant="contained"
              color="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setRows(parseInt(input));
              }}
            >
              <SendRoundedIcon />
            </IconButton>
          </FormControl>
        </form>
      </div>
      <div className="game__board">
        <Board
          givenRows={rows}
          squares={current.squares}
          onClick={(e) => handleClick(e)}
        />
      </div>
      <div className="game__info">
        <div>
          {winner
            ? "Winner: " + winner
            : "Next player: " + (xIsNext ? "X" : "O")}
        </div>
        <ol>
          {history.map((step, move, l) => (
            <li key={move}>
              <button
                style={{
                  fontWeight: move === stepNumber ? "600" : undefined,
                }}
                onClick={() => jumpTo(move)}
              >
                {move
                  ? `Go to move at row: ${getRowCol(step.moveNumber)[0]} col: ${
                      getRowCol(step.moveNumber)[1]
                    } and step #${step.sorter}`
                  : "Go to game start"}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Game;
