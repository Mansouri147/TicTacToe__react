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

const unflat = (squares, rows) =>
  squares
    ? squares.reduce(
        (acc, item, i) =>
          i % rows ? acc : [...acc, squares.slice(i, i + rows)],
        []
      )
    : undefined;

const checkWin = (winLineLen, board) => {
  if (board) {
    for (let i = 0; i < board.length - winLineLen; i++) {
      for (let j = 0; j < board[i].length - winLineLen; j++) {
        //Cols
        if (
          board[i][j] != null &&
          board[i][j] == board[i + 1][j] &&
          board[i + 1][j] == board[i + 2][j]
        ) {
          console.log("Cols");
          return board[i][j];
        }
        //Rows
        if (
          board[i][j] != null &&
          board[i][j] == board[i][j + 1] &&
          board[i][j + 1] == board[i][j + 2]
        ) {
          console.log("Rows");
          return board[i][j];
        }
        //DiagonalOne
        if (
          board[i][j] != null &&
          board[i][j] == board[i + 1][j + 1] &&
          board[i + 1][j + 1] == board[i + 2][j + 2]
        ) {
          console.log("diagonal one");
          return board[i][j];
        }
      }
    }
    for (let i = winLineLen; i <= board.length - 1; i++) {
      for (let j = 0; j <= board.length - (winLineLen + 1); j++) {
        // Diagonal two
        if (
          board[i][j] != null &&
          board[i][j] == board[i - 1][j + 1] &&
          board[i - 1][j + 1] == board[i - 2][j + 2]
        )
          return board[i][j];
      }
    }
  }
};

function Game() {
  const [clickIndex, setClickIndex] = useState(undefined);
  const winLineLen = useRef(3); // or given from user
  const styles = useListStyles();
  const [rows, setRows] = useState(6);
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
    const h = history.slice(0, stepNumber + 1);
    const current = h[h.length - 1];
    const squares = current.squares.slice();

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

  // const winner = calculateWinner(current.squares, rows);

  let winning = 0;

  let XOBoard = unflat(current.squares, rows);

  let winner = checkWin(3, XOBoard);

  const checkForWinner = (e) => {
    let rowCheck, columnCheck, diagRightToLeft, diagLeftToRight;
    let moveNumber = e;
    let winninglineN = 2;
    let player = xIsNext ? "X" : "O";

    rowCheck = 0;
   const scanRight = () => {
      // Going right
      for (let i = 1; i <= winninglineN; i++) {
        if (current.squares[moveNumber + i] === player) {
          rowCheck++;
          console.log("right");
        } else {
          break;
        }
      }
    };

    const scanLeft = () => {
      //Going left
      for (let i = 1; i <= winninglineN; i++) {
        if (current.squares[moveNumber - i] === player) {
          rowCheck++;
          console.log("left");
        } else {
          break;
        }
      }
    };

    columnCheck = 0;
    const scanUp = () => {
      //Going up
      for (let i = 1; i <= winninglineN; i++) {
        if (current.squares[moveNumber - i * rows] === player) {
          columnCheck++;
          console.log("up");
        } else {
          break;
        }
      }
    };

    const scanDown = () => {
      //Going down
      for (let i = 1; i <= winninglineN; i++) {
        if (current.squares[moveNumber + i * rows] === player) {
          columnCheck++;
          console.log("down");
        } else {
          break;
        }
      }
    };

    diagRightToLeft = 0;
    const scanUpRight = () => {
      // Going up right

      for (let i = 1; i <= winninglineN; i++) {
        if (current.squares[moveNumber - i * (rows - 1)] === player) {
          diagRightToLeft++;
          console.log("up right");
        } else {
          break;
        }
      }
    };

    const scanDownLeft = () => {
      // Going down left
      for (let i = 1; i <= winninglineN; i++) {
        if (current.squares[moveNumber + i * (rows - 1)] === player) {
          diagRightToLeft++;
        } else {
          break;
        }
      }
    };

    diagLeftToRight = 0;
    const scanUpLeft = () => {
      // Going up left
      for (let i = 1; i <= winninglineN; i++) {
        console.log({
          i,
          moveNumber,
          player,
          other: current.squares[moveNumber - i * (rows + 1)],
          index: moveNumber - i * (rows + 1),
        });
        if (current.squares[moveNumber - i * (rows + 1)] === player) {
          diagLeftToRight++;

        } else {
          break;
        }
      }
    };

    const scanDownRight = () => {
      // Going down right
      for (let i = 1; i <= winninglineN; i++) {
        if (current.squares[moveNumber + i * (rows + 1)] === player) {
          diagLeftToRight++;
          console.log("down right");
        } else {
          break;
        }
      }
    };

    scanRight();
    scanLeft();
    scanUp();
    scanDown();
    scanUpRight();
    scanDownLeft();
    scanUpLeft();
    scanDownRight();

    if (
      rowCheck >= 3 ||
      columnCheck >= 3 ||
      diagRightToLeft >= 3 ||
      diagLeftToRight >= 3
    ) {
      console.log(`${player} won`);
    }
    console.log(
      "rowCheck >>>",
      rowCheck,
      "columnCheck",
      columnCheck,
      "diagRightToLeft",
      diagRightToLeft,
      "diagLeftToRight",
      diagLeftToRight
    );
  };

  // if (winner || squares[i]) {
  //   return;
  // }

  // let XOBoard = [
  //   ['X', "X", "X", 5, 2],
  //   ["O", 6, 7, 8, 9],
  //   ["O", 11, 12, 13, 14],
  //   [5, 16, 17, 18, 19],
  //   ["X", 21, 22, 23, 24],
  // ];

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
            checkForWinner(parseInt(e));
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
