/* globals $on, $id, $class, document */

/**
 * View Object
 */
function View() {
  this.$boxes = $class(document, 'box');
}

// sets initial board events
View.prototype.setBoard = function(type, callback) {
  var self = this;
  $on($id(document, 'board'), 'click', function(e) {
    var tar = e.target;
    if (tar && tar.classList.contains('box') && tar.classList.length === 1) {
      self.draw(tar, 'player', type);
      callback();
    }
  });
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

// helper function to draw marks on the board
View.prototype._drawMark = function(type) {
  var newMark = document.createElement('i');
  newMark.classList.add('fa');
  newMark.classList.add('fa-' + type);
  return newMark;
};
