/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game{
  constructor(p1, p2, WIDTH = 7, HEIGHT = 6 ){
      this.WIDTH = WIDTH;
      this.HEIGHT = HEIGHT;
      
      this.p1 = p1.color ? this.p1 = p1 : {color : 'red'};
      this.p2 = p2.color ? this.p2 = p2 : {color : 'blue'}
      // otherPlayers ? otherPlayers.forEach((p) => this[p] = p) : null;

      this.currPlayer = this.p1; // active player: 1 or 2
      
      this.makeBoard();
      this.makeHtmlBoard();
  }
/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

makeBoard() {
  this.board = []; // array of rows, each row is array of cells  (board[y][x])

  for (let y = 0; y < this.HEIGHT; y++) {
    this.board.push(Array.from({ length: this.WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

makeHtmlBoard() {
  const board = document.getElementById('board');

  // make column tops (clickable area for adding a piece to that column)
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', this.handleClick.bind(this));

  for (let x = 0; x < this.WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);

  // make main part of board
  for (let y = 0; y < this.HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < this.WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

findSpotForCol(x) {
  for (let y = this.HEIGHT - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML board */

placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.style.backgroundColor = this.currPlayer.color;
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = this.findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  this.board[y][x] = this.currPlayer;
  this.placeInTable(y, x);

  // check for tie
  if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
  }

  // check for win
  if (this.checkForWin()) {
    this.gameOver = true;
    document.querySelector('#column-top').removeEventListener('click', this.handleClick.bind(this))
    return this.endGame(`The ${this.currPlayer.color} player won!`);
  }

  // switch players
  this.currPlayer =
    this.currPlayer === this.p1 ? this.p2 : this.p1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

checkForWin() {
  const {HEIGHT , WIDTH, board, currPlayer} = this;
  function _win(cells) {
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

  for (let y = 0; y < this.HEIGHT; y++) {
    for (let x = 0; x < this.WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
}

class Player{
  constructor(color){
  this.color = color
  }
}

const gameForm = document.querySelector('#game-form');

gameForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  return new Game(new Player(document.querySelector('#p1-input').value), new Player(colorInputTwo = document.querySelector('#p2-input').value ))
})
// [...new Player(document.querySelector("#p+-input").value)]