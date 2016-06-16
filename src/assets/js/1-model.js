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

  this.check = [['left-top', 'left-center', 'left-bottom'],
                ['left-top', 'middle-top', 'right-top'],
                ['left-bottom', 'middle-bottom', 'right-bottom'],
                ['right-top', 'right-center', 'right-bottom'],
                ['left-center', 'middle-center', 'right-center'],
                ['middle-top', 'middle-center', 'middle-bottom'],
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
  this._reactToMove(move);
};

// deals with the first move of every game (special case)
Model.prototype.firstMove = function() {
  var firstMoves = ['middle-center', 'left-top', 'right-top',
                    'left-bottom', 'right-bottom'];
  this._addWeight(firstMoves, 10);
  // var move = firstMoves[Math.floor((Math.random() * firstMoves.length))];
  var move = this._getNextMove();
  this._updateBoard(move);
  return move;
};

// deals with moves after the player has moved
Model.prototype.nextOpponentMove = function() {
  var nextMove = this._getNextMove();
  this._updateBoard(nextMove, 'opponent');
  return nextMove;
};

// takes an array of moves and adds a given weight to the board
Model.prototype._addWeight = function(arr, weight) {
  for (var i = 0; i < arr.length; i++) {
    if (this.board[arr[i]] !== 'player' && this.board[arr[i]] !== 'opponent') {
      if (weight === 0) {
        this.board[arr[i]] = 0;
      } else {
        this.board[arr[i]] = weight + parseInt(this.board[arr[i]], 10);
      }
    }
  }
};

// checks to see if either player could win
Model.prototype._checkNearWin = function() {
  var board = this.board;
  var check = this.check;
  var playerScore = 0;
  var opponentScore = 0;
  var openTile = 0;
  for (var i = 0; i < check.length; i++) {
    playerScore = 0;
    opponentScore = 0;
    openTile = 0;
    for (var j = 0; j < check[i].length; j++) {
      if (board[check[i][j]] === 'player') {
        playerScore++;
      } else if (board[check[i][j]] === 'opponent') {
        opponentScore++;
      } else {
        openTile++;
      }
      if (playerScore === 2 && openTile === 1) {
        this._addWeight(check[i], 25);
      }
      if (opponentScore === 2 && openTile === 1) {
        this._addWeight(check[i], 50);
      }
    }
  }
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
  if (this.remainingSpaces < 6) {
    this._checkNearWin();
  }
  var moves = this._getMoves();
  return moves[Math.floor((Math.random() * moves.length))];
};

Model.prototype._getMoves = function() {
  var board = this.board;
  var max = -1;
  var moves = [];
  for (var key in board) {
    if (board[key] !== 'player' && board[key] !== 'opponent') {
      if (board[key] > max) {
        max = board[key];
        moves = [];
        moves.push(key);
      } else if (board[key] === max) {
        moves.push(key);
      }
    }
  }
  // console.log("highest: " + max);
  return moves;
};

// reacts to player move
Model.prototype._reactToMove = function(playerMove) {
  var edgeMoves = ['left-center', 'middle-top',
      'middle-bottom', 'right-center'];
  if (edgeMoves.indexOf(playerMove) > -1) {
    this._addWeight(this.check[edgeMoves.indexOf(playerMove)], 0);
  }
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
