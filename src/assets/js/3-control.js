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

// handles win event
Controller.prototype._handleWin = function() {

};

// Controls what happens after player move has ended
Controller.prototype.nextMove = function(prevMove) {
  var that = this;
  var move = '';
  if (prevMove === null) { // first move
    move = that.model.firstMove();
  } else { // not first move
    move = that.model.nextMove(prevMove, 'player');
  }
  that.view.draw($id(document, move), 'opponent', that.model.opponent);
  if (this.model.win === true) {
    this._handleWin();
  } else if (this.model.remainingSpaces === 0) {
    console.log('full');
    this._clearGame();
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
