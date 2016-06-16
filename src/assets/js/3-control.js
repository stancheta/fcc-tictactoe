/**
 * Controller Object
 * @param {Model} model instance
 * @param {View} view instance
 */
function Controller(model, view) {
  this.model = model;
  this.view = view;
}

// sets player from modal and sets board using that information
Controller.prototype.setPlayer = function(opt) {
  if (opt === 'x') {
    this.model.player = 'x';
    this.model.opponent = 'o';
  } else {
    this.model.player = 'o';
    this.model.opponent = 'x';
  }

  this.view.setBoard(this.model.player, this.nextMove);
};

// Controls what happens after player move has ended
Controller.prototype.nextMove = function() {

};
