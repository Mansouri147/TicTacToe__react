import React, { useState, useEffect } from "react";
import Board from "./Board";
import "./Game.css";
import { Button, FormControl, IconButton, Input, makeStyles } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";


const useListStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    height: "50vh",
    width: "20vw",
    position: "relative",
    overflow: "scroll",
  },
}));

const unflat = (squares, rows) =>
  squares.reduce(
    (acc, item, i) => (i % rows ? acc : [...acc, squares.slice(i, i + rows)]),
    []
  );

const checkRows = (squares) => {
  let rows = squares
    .map((array) =>
      array.every((num) => array[0] == num) ? array[0] : undefined
    )
    .filter((item) => item)[0];
  return rows;
};

const checkCols = (squares) => {
  for (let i = 0; i <= squares.length - 1; i++) {
    let column = squares.map((item) => {
      return item[i];
    });
    let colResult = column.reduce((acc, num) => (acc == num ? acc : undefined));
    if (colResult) return colResult;
  }
};

// checking first diagonal
const checkStDgl = (squares) => {
  try {
  let stdgl = squares.every((array, i) => squares[0][0] == array[i])
    ? squares[0][0]
    : undefined;
  let winners = squares.reduce((acc, array, i) => {if (squares[0][0] && squares[0][0] == array[i]) { acc.push(array[i]); return acc} else return undefined},[])
  return {stdgl: stdgl, winners: winners};
  } catch {(err) => console.log(err)}
};

// check second diagonal
const checkNdDgl = (squares) => {
  let nddgl = squares.every(
    (array, i) => squares[0][array.length - 1] == array[array.length - i - 1]
  )
    ? squares[0][squares[0].length - 1]
    : undefined;
  return nddgl;
};

function calculateWinner(bareSquares, rows) {
  const squaresUnflated = unflat(bareSquares, rows);
  const rowsRes = checkRows(squaresUnflated);
  const colsRes = checkCols(squaresUnflated);
  const stDgRes = checkStDgl(squaresUnflated);
  const ndDgRes = checkNdDgl(squaresUnflated);

  console.log('winners squares', stDgRes.winners)

  return rowsRes || colsRes || stDgRes.stdgl || ndDgRes;
}

function Game() {
  const styles = useListStyles()
  const [rows, setRows] = useState(3);
  const [input, setInput] = useState(3);
  const [lines, setLines] = useState(
    [...new Array(rows).keys()].map((x) =>
      [...new Array(rows).keys()].map((i) => i + x * rows)
    )
  );

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
    console.log("move n°", moveNumber);
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
  const winner = calculateWinner(current.squares, rows);
  console.log(current.squares)
  
    // setHistory([...history].sort((a, b) => b.sorter - a.sorter));
    const getRowCol = (num) => {
      const col = lines
        .map((array, i) => array.indexOf(num))
        .filter((item) => item >= 0);
      const row = lines
        .map((array, i) => (array.includes(num) ? i + 1 : undefined))
        .filter((item) => item);
      return [row, col];
    };

  return (
    <div className="game">
      <div className="game__input">
        <form className="game__form">
          <FormControl className="game__formControl">
            <Input
              className="game__input"
              placeholder="Number of rows Required"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton
              className="game__iconButton"
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
      <div className={`${winner == 'X' ? 'xwinner' : winner == 'O' ? 'owinner' : ""} board__winner`}>
          {current.squares.includes(null)
            ? winner
              ? "Winner: " + winner
              : "Next player: " + (xIsNext ? "X" : "O")
            : "Draw"}
        </div>
        <Board
          givenRows={rows}
          squares={current.squares}
          onClick={(e) => handleClick(e)}
          xIsNext={xIsNext}
        />
      </div>
      <div className="game__info">
        <ol className={`${styles.list} info__list`}>
          {history.map((step, move, l) => (
            <li key={move}>
              <Button 
                color='default'
                style={{
                  fontWeight: move === stepNumber ? 600 : undefined,
                }}
                onClick={() => jumpTo(move)}
              >
                {move
                  ? `Go to move at row: ${getRowCol(step.moveNumber)[1]} col: ${
                      getRowCol(step.moveNumber)[0]
                    } and step #${step.sorter}`
                  : "Go to game start"}
              </Button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Game;
