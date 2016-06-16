/* globals document, $id */

/**
 * Controller Object
 * @param {Model} model instance
 * @param {View} view instance
 */
function Controller(model, view) {
  this.model = model;
  this.view = view;
}

// Controls what happens after player move has ended
Controller.prototype.nextMove = function(prevMove) {
  var that = this;
  var move = '';
  if (prevMove === null) { // first move
    move = that.model.firstMove();
  } else { // not first move
    that.model.enterPlayerMove(prevMove, 'player');
    // this._checkBoardState(); for checking player
    move = that.model.nextOpponentMove();
  }
  this.view.draw($id(document, move), 'opponent', that.model.opponent);
  if (this.model.remainingSpaces < 5) {
    this._checkBoardState();
  }
};

// sets player from modal and sets board using that information
Controller.prototype.setPlayer = function(opt) {
  var that = this;
  if (opt === 'x') {
    that.model.player = 'x';
    that.model.opponent = 'o';
  } else {
    that.model.player = 'o';
    that.model.opponent = 'x';
  }

  that.view.setBoard(that.model.player, function(d) {
    that.nextMove(d);
  });
};

// clears the model and the board
Controller.prototype._clearGame = function() {
  var that = this;
  this.model.clearModel();
  this.view.pauseBoard(1500);
  setTimeout(function() {
    that.view.clearBoard();
  }, 1000);
  setTimeout(function() {
    that.nextMove(null);
  }, 1500);
};

// checks if board is full or if a player has won
Controller.prototype._checkBoardState = function() {
  if (this.model.win === true) {
    this._handleWin();
  } else if (this.model.remainingSpaces === 0) {
    this._clearGame();
  }
};

// handles win event
Controller.prototype._handleWin = function() {
  var that = this;
  this.view.pauseBoard(2500);
  var notifyTimer = setInterval(function() {
    that.view.toggleWin(that.model.winningArr, that.winner);
  }, 500);
  setTimeout(function() {
    clearInterval(notifyTimer);
    that._clearGame();
  }, 2500);
};
