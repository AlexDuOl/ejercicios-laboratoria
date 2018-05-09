window.onload = function() {
  let main = document.getElementsByTagName('main')[0];
  let board = createBoard(main, 5, 5);

  let player=  createPlayer(2,2,"blue",board);
  player.draw();
  window.board=board;
};