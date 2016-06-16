/* globals $on, $id, $class, document */

/**
 * View Object
 */
function View() {
  this.$board = $id(document, 'board');
  this.$boxes = $class(document, 'box');

  this.boardClickable = true;
}

// clears the board
View.prototype.clearBoard = function() {
  for (var i = 0; i < this.$boxes.length; i++) {
    this.$boxes[i].className = 'box';
    this._removeAllChildren(this.$boxes[i]);
  }
};

// draws marks and colors on the board
View.prototype.draw = function(target, color, type) {
  var box = target;
  box.classList.add('box-' + color);
  box.classList.add('box-' + type);
  if (type === 'x') {
    box.appendChild(this._drawMark('times'));
  } else {
    box.appendChild(this._drawMark('circle-o'));
  }
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

// helper function to draw marks on the board
View.prototype._drawMark = function(type) {
  var newMark = document.createElement('i');
  newMark.classList.add('fa');
  newMark.classList.add('fa-' + type);
  return newMark;
};

// helper function to remove all children from a node
View.prototype._removeAllChildren = function(target) {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
};
