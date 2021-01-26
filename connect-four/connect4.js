/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board =  []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is an array of cells  (board[y][x])
 */

// TODO: set "board" to empty HEIGHT x WIDTH matrix array
const makeBoard = () => {
  for(let i = board.length; i < HEIGHT; i++) board.push(Array.from({length : WIDTH}));
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {

  const htmlBoard = document.querySelector('#board');
  const top = document.createElement("tr");

  // creates choosing area; where to place their piece.
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // appends a td to the choosing area.
  for (let x = 0; x < WIDTH; x++) {

    const headCell = document.createElement("td");

    headCell.setAttribute("id", x);
    top.append(headCell);
  };

  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    // for every 'height', it creates a table row.

    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // this creates a td; Gives it id of y-x, then appends it to the row. does this for every 'width'.
      const cell = document.createElement("td");

      cell.setAttribute("id", `${y}-${x}`);
      board[y][x] = ([y , x]);
      row.append(cell);
    }

    htmlBoard.append(row);

  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
const findSpotForCol = (x) => { 
  for(let y = board.length - 1; y >= 0; y--){
    for(let xAxis = board[y].length - 1; xAxis >= 0; xAxis--){
       if(board[y][xAxis][1] === x){
          // board[y].splice(xAxis, 1);
          board[y][xAxis] = [currPlayer];
          return y;
       }
        }
  };
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
const placeInTable= (y, x) => {

  const player = currPlayer === 1 ? 'p1' : 'p2';
  const divPiece = document.createElement('div');
  const slot = document.querySelector(`#${CSS.escape(y)}-${CSS.escape(x)}`);

  divPiece.classList = `piece ${player}`
  divPiece.classList.add('fall');

  slot.append(divPiece);

  }

  /** endGame: announce game end */
  const endGame = (msg) => {

    alert(msg);

    top.removeEventListener('click', top);

  }

  /** handleClick: handle click of column top to play piece */
  const handleClick = (evt) => {
    
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  
  if (y === null) return;

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) return endGame(`Player ${currPlayer} won!`);

  // check for tie
  let count = 0;
  
  board.forEach((y, i) => board[i].forEach((x, iX) => (board[i][iX] === 1 || board[i][iX] === 2) ? count++ : null));
  
  // check if all cells in board are filled; if so call, call endGame
  if(count === WIDTH * HEIGHT) (count = 0, endGame("It's a tie!"));

  // switch players
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {

  const _win = (cells) => {

    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(

      ([y, x]) =>
      y >= 0 &&
      y < HEIGHT &&
      x >= 0 &&
      x < WIDTH &&
      board[y][x] === currPlayer
        );
        
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {

    for (let x = 0; x < WIDTH; x++) {

      //loop through all cells in the board array to check if all possible angles match to four.
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //passes possible combinations to _win, where it's verified.

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) return true;
    }
  }
}

makeBoard();
makeHtmlBoard();
