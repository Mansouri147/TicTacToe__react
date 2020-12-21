import React, { useState, useEffect, useRef } from "react";
import Board from "../Board";
import "./styles.css";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  makeStyles,
} from "@material-ui/core";
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

// const unflat = (squares, rows, player) => {
// let test1 = squares.map((square) => (square === player ? square : null));
//   console.log("test1 >>>>>", test1);
//   let test2 = [];
//   for (let i = 0; i < rows; i++) {
//     test2 = [...test2, test1.slice(i, i + rows)];
//   }
//   return test2;
// };
const unflat = (arr, rows) =>
  arr
    .map((e, i) => {
      return i % rows === 0 ? arr.slice(i, i + rows) : null;
    })
    .filter((e) => {
      return e;
    });

const Rows = (squares, winCeiling, rows) => {
  let winner = false;
  let OutputRows = [...new Array(rows).keys()].map((x) =>
    [...new Array(rows).keys()].map((i) => (i = i))
  );
  squares.forEach((row, rowIndex) => {
    let inc = 0;
    row.forEach((value, valueIndex) => {
      if (value == "X") {
        inc++;
      } else {
        inc = 0;
      }
      OutputRows[rowIndex][valueIndex] = inc;
    });
  });
  OutputRows.some((row) => row.some((value) => (winner = value == winCeiling)));
  console.log("winner >>>>>>>>>>", winner);
  return winner;
};

const Columns = (squares, rows, winCeiling) => {
  let winner = false;
  let OutputColumns = [...new Array(rows).keys()].map((x) =>
    [...new Array(rows).keys()].map((i) => (i = i))
  );
  squares.forEach((row, i) => {
    let inc = 0;
    squares.forEach((row, valueIndex) => {
      if (row[i] == "X") {
        inc++;
      } else {
        inc = 0;
      }
      OutputColumns[i][valueIndex] = inc;
    });
  });

  OutputColumns.some((row) =>
    row.some((value) => (winner = value == winCeiling))
  );
  return winner;
};

const diagonalLeftToRight = (squares, rows, winCeiling) => {
  let winner = false;
  // this is making an array of 4 arrays inside of it filled with null as initial values
  let OutputSquares = [...new Array(rows).keys()].map((x) =>
    [...new Array(rows).keys()].map((i) => i + x * rows)
  );
  //i goes from last row to first row.
  let counter = 1,
    i = rows - 1,
    j = 0,
    k = 1;
  while (i >= 0) {
    while (i < rows && j < rows) {
      console.log(OutputSquares[i][j]);
      if (squares[i][j] != "X") {
        counter = 0;
      }
      OutputSquares[i][j] = counter++;
      i++, j++;
    }
    j = 0;
    ++k;
    i = rows - k;
  }

  //j goes from second column to last column
  (i = 0), (j = 1), (k = 1), (counter = 1);
  while (j < rows) {
    while (i < rows && j < rows) {
      if (squares[i][j] != "X") {
        counter = 0;
      }
      OutputSquares[i][j] = counter++;
      i++, j++;
    }
    i = 0;
    k++;
    j = k;
  }
  OutputSquares.some((row) =>
    row.some((value) => (winner = value == winCeiling))
  );
  return winner;
};

const diagonalRightToLeft = (squares, rows, winCeiling) => {
  let winner = false;
  // this is making an array of 4 arrays inside of it filled with null as initial values
  let OutputSquares = [...new Array(rows).keys()].map((x) =>
    [...new Array(rows).keys()].map((i) => i + x * rows)
  );
  //  i goes from last row to first row.
  let rowIndex = rows - 2,
    valueIndex = rows - 1,
    k = rows - 2,
    counter = 1;
  while (rowIndex >= 0) {
    while (rowIndex >= 0 && valueIndex > 0) {
      if (squares[rowIndex][valueIndex] != "X") {
        counter = 0;
      }
      OutputSquares[rowIndex][valueIndex] = counter++;
      rowIndex--, valueIndex--;
    }
    valueIndex = rows - 1;
    k--;
    rowIndex = k;
    counter = 1;
  }

  //j goes from second column to last column
  (rowIndex = rows - 1), (valueIndex = rows - 1), (k = rows - 1), (counter = 1);
  while (valueIndex >= 0) {
    while (rowIndex >= 0 && valueIndex >= 0) {
      if (squares[rowIndex][valueIndex] != "X") {
        counter = 0;
      }
      OutputSquares[rowIndex][valueIndex] = counter++;
      rowIndex--, valueIndex--;
    }
    rowIndex = rows - 1;
    k--;
    valueIndex = k;
    // add this in the end _______________________________________________________
    counter = 1;
  }
  OutputSquares.some((row) =>
    row.some((value) => (winner = value == winCeiling))
  );
  return winner;
};

const calculateWinner = (Matrix, rows, winCeiling, player) => {
  let filteredSq = Matrix.map((square) => (square === player ? square : null));
  let board = unflat(filteredSq, rows);
  let rowWinner = Rows(board, rows, winCeiling);
  let colWinner = Columns(board, 3, 3);
  let diagonalOneWinner = diagonalLeftToRight(board, rows, winCeiling);
  let diagonalTwoWinner = diagonalRightToLeft(board, rows, winCeiling);
  console.log("diagonalTwoWinner", diagonalTwoWinner);
  return colWinner || rowWinner || diagonalOneWinner || diagonalTwoWinner;
};

function Game() {
  const [clickIndex, setClickIndex] = useState(undefined);
  const winCeiling = useRef(3); // or given from user
  const [player, setPlayer] = useState("X");
  const styles = useListStyles();
  const [rows, setRows] = useState(3);
  const [input, setInput] = useState(6);
  const [lines, setLines] = useState(
    [...new Array(rows).keys()].map((x) =>
      [...new Array(rows).keys()].map((i) => i + x * rows)
    )
  );
  const [history, setHistory] = useState([
    {
      squares: Array(rows ** 2).fill(null),
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

    if (winner || squares[i]) {
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
    setPlayer(xIsNext ? "X" : "O");
  };

  const jumpTo = (step) => setStepNumber(step);

  useEffect(() => {
    setXIsNext(stepNumber % 2 === 0);
  }, [stepNumber]);

  const current = history[stepNumber];
  let winner;
  useEffect(() => {
    winner = calculateWinner(current.squares, rows, winCeiling.current, player);
  }, [current.squares, rows, player]);
  console.log("winner<<<< ", winner);
  // if (winner) {
  //   winner = xIsNext ? "O" : "X"
  // }

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
        <div
          className={`${
            winner == "X" ? "xwinner" : winner == "O" ? "owinner" : ""
          } board__winner`}
        >
          {current.squares.includes(null) && !winner
            ? winner
              ? "Winner: " + winner
              : "Next player: " + (xIsNext ? "X" : "O")
            : "Draw"}
        </div>
        <Board
          givenRows={rows}
          squares={current.squares}
          onClick={(e) => {
            handleClick(e);
            // checkForWinner(parseInt(e));
          }}
          xIsNext={xIsNext}
        />
      </div>
      <div className="game__info">
        <ol className={`${styles.list} info__list`}>
          {history.map((step, move, l) => (
            <li key={move}>
              <Button
                color="default"
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
