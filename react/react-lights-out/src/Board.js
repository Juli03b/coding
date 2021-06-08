import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows="6", ncols="6", chanceLightStartsOn=.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    Array.from({length: nrows}).forEach( (i, idx, arr) => {
      const column = [];

      Array.from({length: ncols}).forEach( i => {
        const trueOrFalse = () => {
          const chance = Math.random() * chanceLightStartsOn;
          const trueFalse = chance > chanceLightStartsOn * chanceLightStartsOn ? false : true;
          
          return trueFalse;
        }

        column.push(trueOrFalse(chanceLightStartsOn));
      });
      
      initialBoard.push(column);
    });

    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    // check that every value in every column is true
    let hasWon;

    board.forEach(col => {
      if(!col.every((val) => val)) hasWon = false;
      else
        hasWon = true;
    });

    return hasWon;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];

          if(x < ncols - 1 && x >= 0) boardCopy[y][x + 1] = !boardCopy[y][x + 1]; // right
          if(x - 1 < ncols - 1 && x - 1 >= 0) boardCopy[y][x - 1] = !boardCopy[y][x - 1]; // left
          if(y < nrows && y > 0) boardCopy[y - 1][x] = !boardCopy[y - 1][x]; // top
          if(y < nrows - 1 && y >= 0) boardCopy[y + 1][x] = !boardCopy[y + 1][x]; // bottom
        }
      };
      const newBoard = [...oldBoard];

      flipCell(y, x, newBoard)

      return newBoard;
    });
  }

  if(hasWon()) return <h1>You've won!!!</h1>;

  return (
    <table className="board">
      {board.map( (col, y) => 
        (<tr key={y}>
          {col.map( (cell, x) => <Cell key={`${y}-${x}`} flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={cell} />)}
        </tr>)
      )}
    </table>
  );
}

export default Board;
