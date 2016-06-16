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

  $on($id(document, 'btn-x'), 'click', function() {
    ticTacToe.controller.setPlayer('x');
    $myModal.modal('hide');
  });
  $on($id(document, 'btn-o'), 'click', function() {
    ticTacToe.controller.setPlayer('o');
    $myModal.modal('hide');
  });
  ticTacToe.controller.nextMove();
}

$on(document, 'DOMContentLoaded', setup);
