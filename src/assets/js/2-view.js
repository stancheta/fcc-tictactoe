/* globals $on, $id, $class, $addClass, $removeClass, document */

/**
 * View Object
 */
function View() {
  this.$board = $id(document, 'board');
  this.$boxes = $class(document, 'box');

  this.boardClickable = true;
  this.showWin = false;
}

// clears the board
View.prototype.clearBoard = function() {
  for (var i = 0; i < this.$boxes.length; i++) {
    this.$boxes[i].className = 'box';
    this._removeAllChildren(this.$boxes[i]);
  }
  this.showWin = false;
};

// draws marks and colors on the board
View.prototype.draw = function(target, color, type) {
  var markDict = {x: 'times', o: 'circle-o'};
  var box = target;
  $addClass(box, 'box-' + color);
  $addClass(box, 'box-' + type);
  box.appendChild(this._drawMark(markDict[type]));
};

// Pauses the board's click events for the amount of time entered
View.prototype.pauseBoard = function(time) {
  var that = this;
  this.boardClickable = false;
  setTimeout(function() {
    that.boardClickable = true;
  }, time);
};

// sets initial board events
View.prototype.setBoard = function(type, callback) {
  var that = this;
  $on(this.$board, 'click', function(e) {
    var tar = e.target;
    if (that.boardClickable === true && tar && tar.classList.contains('box') &&
      tar.classList.length === 1) {
      that.draw(tar, 'player', type);
      callback(tar.id);
    }
  });
};

// toggles winning color
View.prototype.toggleWin = function(arr, winner) {
  for (var i = 0; i < arr.length; i++) {
    var currid = $id(document, arr[i]);
    if (this.showWin === false) {
      $removeClass(currid, winner);
      $addClass(currid, 'box-winner');
    } else {
      $removeClass(currid, 'box-winner');
      $addClass(currid, winner);
    }
  }
  this.showWin = !this.showWin;
};

// helper function to draw marks on the board
View.prototype._drawMark = function(type) {
  var newMark = document.createElement('i');
  $addClass(newMark, 'fa');
  $addClass(newMark, 'fa-' + type);
  return newMark;
};

// helper function to remove all children from a node
View.prototype._removeAllChildren = function(target) {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
};
