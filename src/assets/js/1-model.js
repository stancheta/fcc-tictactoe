/**
 * Model Object
 */
function Model() {
  this.board = {
    'left-top': 0,
    'middle-top': 0,
    'right-top': 0,
    'left-center': 0,
    'middle-center': 0,
    'right-center': 0,
    'left-bottom': 0,
    'middle-bottom': 0,
    'right-bottom': 0
  };
  this.remainingSpaces = 9;
  this.win = false;
}

// deals with the first move of every game (special case)
Model.prototype.firstMove = function() {
  var firstMoves = ['middle-center', 'left-top', 'right-top',
                    'left-bottom', 'right-bottom'];
  var move = firstMoves[Math.floor((Math.random() * 5))];
  this._updateBoard(move);
  return move;
};

// resets the model
Model.prototype.clearModel = function() {
  for (var key in this.board) {
    this.board[key] = 0;
  }
  this.remainingSpaces = 9;
  this.win = false;
};

// deals with moves after the player has moved
Model.prototype.nextMove = function(move, last) {
  this._updateBoard(move, last);
  var nextMove = this._getNextMove();
  this._updateBoard(nextMove, 'opponent');
  return nextMove;
};

// checks to see if either player could win
Model.prototype._checkNearWin = function() {
  var board = this.board;
};

// checks to see if either player has won
Model.prototype._checkWin = function() {
  var board = this.board;
  return false;
};

// checks the board for the opponent's next move
Model.prototype._getNextMove = function() {
  var board = this.board;
  var max = -1;
  var move = [];
  for (var key in board) {
    if (board[key] !== 'player' && board[key] !== 'opponent' &&
      board[key] >= max) {
      max = board[key];
      move.push(key);
    }
  }
  console.log(move);
  return (move[0]);
};

// updates the state of the board
Model.prototype._updateBoard = function(move, player) {
  if (player === 'player') {
    this.board[move] = 'player';
  } else {
    this.board[move] = 'opponent';
  }
  this.remainingSpaces -= 1;
  if (this._checkWin() === true) {
    this.win = true;
  }
};
