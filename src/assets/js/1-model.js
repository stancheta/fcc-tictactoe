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

  this.check = [['left-top', 'middle-top', 'right-top'],
                ['left-center', 'middle-center', 'right-center'],
                ['left-bottom', 'middle-bottom', 'right-bottom'],
                ['left-top', 'left-center', 'left-bottom'],
                ['middle-top', 'middle-center', 'middle-bottom'],
                ['right-top', 'right-center', 'right-bottom'],
                ['left-top', 'middle-center', 'right-bottom'],
                ['right-top', 'middle-center', 'left-bottom']];

  this.remainingSpaces = 9;
  this.win = false;
  this.winner = '';
  this.winningArr = [];
}

// resets the model
Model.prototype.clearModel = function() {
  for (var key in this.board) {
    this.board[key] = 0;
  }
  this.remainingSpaces = 9;
  this.win = false;
  this.winner = '';
  this.winningArr = [];
};

Model.prototype.enterPlayerMove = function(move, last) {
  this._updateBoard(move, last);
};

// deals with the first move of every game (special case)
Model.prototype.firstMove = function() {
  var firstMoves = ['middle-center', 'left-top', 'right-top',
                    'left-bottom', 'right-bottom'];
  var move = firstMoves[Math.floor((Math.random() * 5))];
  this._updateBoard(move);
  return move;
};

// deals with moves after the player has moved
Model.prototype.nextOpponentMove = function() {
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
  var check = this.check;
  var playerScore = 0;
  var opponentScore = 0;

  for (var i = 0; i < check.length; i++) {
    playerScore = 0;
    opponentScore = 0;
    for (var j = 0; j < check[i].length; j++) {
      if (board[check[i][j]] === 'player') {
        playerScore++;
      } else if (board[check[i][j]] === 'opponent') {
        opponentScore++;
      }
      if (opponentScore === 3) {
        this.win = true;
        this.winningArr = check[i];
        // this.winningArr.push('opponent');
        this.winner = 'opponent';
        return true;
      }
      // copy ^ for playerScore
    }
  }
  return false;
};

// checks the board for the opponent's next move
Model.prototype._getNextMove = function() {
  var moves = this._getMoves();
  return moves[0];
};

Model.prototype._getMoves = function() {
  var board = this.board;
  var max = -1;
  var moves = [];
  for (var key in board) {
    if (board[key] !== 'player' && board[key] !== 'opponent' &&
      board[key] >= max) {
      max = board[key];
      moves.push(key);
    }
  }
  return moves;
};

// updates the state of the board
Model.prototype._updateBoard = function(move, player) {
  if (player === 'player') {
    this.board[move] = 'player';
  } else {
    this.board[move] = 'opponent';
  }
  this.remainingSpaces -= 1;
  if (this.remainingSpaces < 5 && this._checkWin() === true) {
    this.win = true;
  }
};
