/* global Model, View, Controller, $on, $id, document, $*/

/**
 * tictactoe Object
 */
function TicTacToe() {
  this.model = new Model();
  this.view = new View();
  this.controller = new Controller(this.model, this.view);
}

var ticTacToe = new TicTacToe();

/**
 * Shows modal to start the game.
 */
function setup() {
  var $myModal = $('#myModal');
  $myModal.modal({
    backdrop: 'static',
    keyboard: 'false'
  });
  $myModal.modal('show');

  var modalCallback = function(choice) {
    ticTacToe.controller.setPlayer(choice);
    $myModal.modal('hide');
    ticTacToe.controller.nextMove(null);
  };

  $on($id(document, 'btn-x'), 'click', function() {
    modalCallback('x');
  });
  $on($id(document, 'btn-o'), 'click', function() {
    modalCallback('y');
  });
}

$on(document, 'DOMContentLoaded', setup);
